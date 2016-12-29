/*
* http requests based on https://www.npmjs.com/package/request
*
*
*/
var parseArgs = require('minimist');
var request = require('request');
var fse = require('fs-extra');
var validUrl = require('valid-url');
var util = require('util');


var reportFolder = 'report';

var queueTimeout = 10000;

// http://www.useragentstring.com/pages/useragentstring.php
/*
* google bot
* https://support.google.com/webmasters/answer/1061943?hl=ru
*/
var bot = {
	google : {
		ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
		description: 'Googlebot'
	},
	googleMobile: {
		ua: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
		description: 'Googlebot for smartphone'
	},
	bing: {
		ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
		description: 'Bingbot'
	},
	yandex: {
		ua: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
		description: 'YandexBot'
	},
	yandexBlogs: {
		ua: 'Mozilla/5.0 (compatible; YandexBlogs/0.99; robot; B; +http://yandex.com/bots)0 readers',
		description: 'YandexBlogs'
	},
	facebook: {
		ua: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
		description: 'Facebook'
	}
};


function printHelp() {
	// help
	var help = 'How to use.\n\n';
	help += '-b - bot variant for user agent string, values:\n'
	for (var prop in bot) {
		help += bot[prop].description +': -b '+prop+'\n';
	}
	help += '\n';

	help += '-u - url for request\n';
	help += 'Example: -u http://ya.ru/\n';
	help += '\n';

	help += '-d - directory for report\n';
	help += 'Example: -d yaru';
	help += '\n';

	// help += '-absLink - add domain to the css and js resources\n';
	// help += 'Example: -absLink';
	// help += '\n';

	help += '\nFull string for http request:\n\n';
	help += 'node bot -b google -u http://ya.ru/ -d yaru\n';
	help += '\n';

	help += 'Find your answer in report directory!\n';

	console.log(help)
}


function createRequest(url, dir, ua){
	if (bot[ua] && bot[ua].ua && dir !== '' && validUrl.isUri(url)) {
		var options = {
			url: url,
			headers: {
				'User-Agent': bot[ua].ua
			}
		};
		request(options, function(error, response, body){
			var filename = url.replace(/\//g,'').replace(/\./g,'').replace(/\:/g,'');
			var outputFile = reportFolder+'/'+dir+'/'+filename;
			fse.outputFile(outputFile+'_response.txt', util.inspect(response, false, null), function (err) {
			});
			fse.outputFile(outputFile+'_body.html', body, function (err) {
				if (err) {return console.error(err);}
				console.log('\n####\nSee result in: '+ outputFile+'_body.html\n####\n');
			});
		});
	}
}


var argv = parseArgs(process.argv, opts={})

if (argv.h) {
	printHelp();
	return false;
}

if (argv.u && argv.d && argv.b) {
	createRequest(argv.u, argv.d, argv.b);
} else {
	console.error('Incorrect settings!\n');
	printHelp();
}