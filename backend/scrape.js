const express = require("express");
const router = express.Router();
let cmd = require("node-cmd");
let fs = require("fs");

router.get("/:url", async function (req, res) {
	let data;
	const asosUrl = req.params.url;
	try {
		if (asosUrl.includes("https://www.asos.com/")) {
			//write url to scrape
			fs.writeFileSync("urlToScrape.txt", asosUrl);

			//write recentlySearched
			var reuslts = asosUrl.split("/");
			var recentlySeacrhedName = `${reuslts[3]} - ${reuslts[5]}`;
			dataSearched = fs.readFileSync("recentlySearched.json", "utf8");
			result = JSON.parse(dataSearched);
			result[recentlySeacrhedName] = asosUrl;
			fs.writeFileSync("recentlySearched.json", JSON.stringify(result));

			let oldfile = fs.readFileSync(`scrapedData/${recentlySeacrhedName}.json`, "utf8");
			oldfile = JSON.parse(oldfile);
			// get new data from cypress
			console.log(`cd .. & node_modules\\.bin\\cypress run --spec "cypress\\integration\\asos.spec.js"`);
			cmd.runSync(`cd .. & node_modules\\.bin\\cypress run --spec "cypress\\integration\\asos.spec.js"`);

			data = fs.readFileSync(`scrapedData/${recentlySeacrhedName}.json`, "utf8");
			data = JSON.parse(data);

			// get change newdata change by
			console.log("before changing");
			for (let index = 0; index < data.length; index++) {
				const newElement = data[index];
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
			console.log("before saving");
			fs.writeFileSync(`scrapedData/${recentlySeacrhedName}.json`, JSON.stringify(data));

			console.log("affter changing");
			res.send(data);
		} else {
			data = { error: "invalid url" };
			res.send(data);
		}
	} catch (e) {
		//console.log("Error:", e.stack);
		res.send(e.stack);
	}
});

router.get("/saved/scrapedData/:value", async function (req, res) {
	console.log("saved scrapedData");
	let filename = req.params.value;
	try {
		let data = fs.readFileSync(`scrapedData/${filename}.json`, "utf8");
		res.send(JSON.parse(data));
	} catch (e) {
		console.log("Error:", e.stack);
		// let result = {};
		// fs.writeFileSync("recentlySearched.json", JSON.stringify(result));
	}
});

router.get("/saved/recentlySearched", async function (req, res) {
	console.log("saved  recentlySearched data");
	try {
		let data = fs.readFileSync("recentlySearched.json", "utf8");
		res.send(JSON.parse(data));
	} catch (e) {
		console.log("Error:", e.stack);
	}
});

module.exports = router;
