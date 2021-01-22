const express = require('express');
const router = express.Router();
let cmd = require('node-cmd');
let fs = require('fs');

router.get('/:url', async function (req, res) {
	let newData;
	let oldfile = {};
	const asosUrl = req.params.url;
	try {
		if (asosUrl.includes('https://www.asos.com/')) {
			//write url to scrape
			fs.writeFileSync('urlToScrape.txt', asosUrl);

			//write add RecentlySearchedItem to the  recentlySearched.json file
			var reuslts = asosUrl.split('/');
			var recentlySeacrhedName = `${reuslts[3]} - ${reuslts[5]}`;
			dataSearched = fs.readFileSync('recentlySearched.json', 'utf8');
			result = JSON.parse(dataSearched);
			result[recentlySeacrhedName] = asosUrl;
			fs.writeFileSync('recentlySearched.json', JSON.stringify(result));

			const path = `scrapedData/${recentlySeacrhedName}.json`;
			if (fs.existsSync(path)) {
				console.log('insdie if ');
				oldfile = fs.readFileSync(path, 'utf8');
				oldfile = JSON.parse(oldfile);
			} else {
				console.log('insdie  else');
				fs.writeFileSync(path, JSON.stringify(oldfile));
			}

			// get newData from cypress
			console.log(`cd .. & node_modules\\.bin\\cypress run --spec "cypress\\integration\\asos.spec.js"`);
			cmd.runSync(`cd .. & node_modules\\.bin\\cypress run --spec "cypress\\integration\\asos.spec.js"`);
			newData = fs.readFileSync(path, 'utf8');
			newData = JSON.parse(newData);

			// compare newData to oldFile to see discount diffrences
			console.log('before changing');
			for (let index = 0; index < newData.length; index++) {
				const newElement = newData[index];
				const results = oldfile.filter((oldElm) => {
					return oldElm.url === newElement.url;
				});
				if (results.length > 0) {
					const oldElement = results[0];
					if (newElement.discount !== oldElement.discount) {
						newElement.changedBy = newElement.discount - oldElement.discount;
					}
				}
			}
			console.log('before saving');
			fs.writeFileSync(path, JSON.stringify(newData));

			console.log('affter changing');
			res.send(newData);
		} else {
			newData = { error: 'invalid url' };
			res.send(newData);
		}
	} catch (e) {
		console.log('Error:', e.stack);
		res.send(e.stack);
	}
});

router.get('/saved/scrapedData/:value', async function (req, res) {
	console.log('saved scrapedData');
	let filename = req.params.value;
	try {
		let data = fs.readFileSync(`scrapedData/${filename}.json`, 'utf8');
		res.send(JSON.parse(data));
	} catch (e) {
		console.log('Error:', e.stack);
		// let result = {};
		// fs.writeFileSync("recentlySearched.json", JSON.stringify(result));
	}
});

router.get('/saved/recentlySearched', async function (req, res) {
	console.log('saved  recentlySearched data');
	try {
		let data = fs.readFileSync('recentlySearched.json', 'utf8');
		res.send(JSON.parse(data));
	} catch (e) {
		console.log('Error:', e.stack);
	}
});

module.exports = router;
