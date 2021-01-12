const axios = require('axios');
let dev = ``;
if (window.location.href.includes('localhost:80')) {
	dev = `http://localhost:4000`;
}
export async function getRecentlyItems(val) {
	try {
		let value = 'men - shoes-trainers';
		const response = await axios.get(`${dev}/api/scrape/saved/scrapedData/${val}`);
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
