const axios = require('axios');
let dev = ``;
if (window.location.href.includes('localhost:80')) {
	dev = `http://localhost:4000`;
}
export async function getRecentlyItems(value) {
	try {
		const response = await axios.get(`${dev}/api/scrape/saved/scrapedData/${value}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

export async function getRecentlySearchedHistory() {
	try {
		const response = await axios.get(`${dev}/api/scrape/saved/recentlySearched`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

export async function scrapeData(url) {
	try {
		const response = await axios.get(`${dev}/api/scrape/${encodeURIComponent(url)}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}
