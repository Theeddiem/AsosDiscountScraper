let arrJson;
let tempJson;
let recentlySearched;
setUp();

async function setUp() {
	await getRecentlySearched();
	buildRecentlySearched();
	let recentlySearchedArr = document.getElementsByClassName('form-select')[1].options;
	let value = recentlySearchedArr[recentlySearchedArr.length - 1].value;
	await getDataOwend(value);
	buildGrid();
}

async function getRecentlySearched() {
	const respone = await fetch('/api/scrape/saved/recentlySearched');
	recentlySearched = await respone.json();
}

function buildRecentlySearched() {
	cleanRecentlySearchedBox();
	const selcetBox = document.getElementsByClassName('form-select')[1];
	let option = document.createElement('option');
	for (var key of Object.keys(recentlySearched)) {
		let option = document.createElement('option');

		option.value = key;
		option.innerHTML = key;
		//console.log(key + " -> " + recentlySearched[key]);
		selcetBox.appendChild(option);
	}
}

async function getDataOwend(value) {
	console.log(value);
	const response = await fetch(`/api/scrape/saved/scrapedData/${value}`);
	arrJson = await response.json();
	tempJson = arrJson;
}

function buildAll() {
	buildGrid();
}

function buildGrid() {
	const header = document.getElementsByClassName('display-6')[0];
	if (arrJson.length !== 0) {
		header.innerHTML = 'Styles found ' + arrJson.length;
	} else {
		header.innerHTML = '';
	}
	let count = 0;
	let row;
	const gridContainer = document.getElementsByClassName('container-fluid')[0];
	for (let index = 0; index < arrJson.length; index++) {
		const obj = arrJson[index];
		let { description, orginalPrice, newPrice, url, discount, imgUrl, changedBy } = obj;
		if (imgUrl === 'undefined' || imgUrl === '') {
			count++;
		}
		orginalPrice = convert(orginalPrice);
		newPrice = convert(newPrice);

		let a = document.createElement('a');
		a.href = url;
		a.innerHTML = ` ${description}`;

		let span = document.createElement('span');
		span.innerHTML = `${orginalPrice}ILS -> ${newPrice}ILS   - ${discount}%`;
		span.className = 'span-price-details';
		if (orginalPrice > 450) {
			span.setAttribute('style', 'background-color:  #ffccff');
		}

		let changedBySpan = document.createElement('span');
		span.className = 'span-price-details';
		if (changedBy > 0) {
			changedBySpan.innerHTML = `Discount was ${discount - changedBy}% last time :)`;
			changedBySpan.setAttribute('style', 'background-color: #ccffe6');
			changedBySpan.className = 'span-price-details';
		}

		if (changedBy < 0) {
			changedBySpan.innerHTML = `Discount was ${discount + changedBy * -1}% last time :(`;
			changedBySpan.setAttribute('style', 'background-color:  #ff6666');
			changedBySpan.className = 'span-price-details';
		}

		a.appendChild(span);
		a.appendChild(changedBySpan);

		let img = document.createElement('img');
		img.src = imgUrl;
		img.href = url;

		a.appendChild(img);

		let col = document.createElement('div');
		col.className = 'col grid-item ';

		col.appendChild(a);

		if (index % 4 === 0) {
			row = document.createElement('div');
			row.className = 'row';
		}

		row.appendChild(col);
		gridContainer.appendChild(row);
	}
}

// function buildGrid() {
// 	const header = document.getElementsByClassName("display-6")[0];
// 	if (arrJson.length !== 0) {
// 		header.innerHTML = "Styles found " + arrJson.length;
// 	} else {
// 		header.innerHTML = "";
// 	}
// 	let count = 0;
// 	const gridContainer = document.getElementsByClassName("grid-container")[0];
// 	arrJson.forEach((obj) => {
// 		let { description, orginalPrice, newPrice, url, discount, imgUrl, changedBy } = obj;
// 		if (imgUrl === "undefined" || imgUrl === "") {
// 			count++;
// 		}
// 		orginalPrice = convert(orginalPrice);
// 		newPrice = convert(newPrice);

// 		let a = document.createElement("a");
// 		a.href = url;
// 		a.innerHTML = ` ${description}`;

// 		let span = document.createElement("span");
// 		span.innerHTML = `${orginalPrice}ILS -> ${newPrice}ILS   - ${discount}%`;
// 		span.className = "span-price-details";
// 		if (orginalPrice > 450) {
// 			span.setAttribute("style", "background-color:  #ffccff");
// 		}

// 		let changedBySpan = document.createElement("span");
// 		span.className = "span-price-details";
// 		if (changedBy > 0) {
// 			changedBySpan.innerHTML = `Discount was ${discount - changedBy}% last time :)`;
// 			changedBySpan.setAttribute("style", "background-color: #ccffe6");
// 			changedBySpan.className = "span-price-details";
// 		}

// 		if (changedBy < 0) {
// 			changedBySpan.innerHTML = `Discount was ${discount + changedBy * -1}% last time :(`;
// 			changedBySpan.setAttribute("style", "background-color:  #ff6666");
// 			changedBySpan.className = "span-price-details";
// 		}

// 		a.appendChild(span);
// 		a.appendChild(changedBySpan);

// 		let img = document.createElement("img");
// 		img.src = imgUrl;
// 		img.href = url;

// 		a.appendChild(img);

// 		let div = document.createElement("div");
// 		div.className = "grid-item";

// 		div.appendChild(a);
// 		gridContainer.appendChild(div);
// 	});

// 	console.log("images not found", count);
// }

document.getElementById('search input').addEventListener('input', () => {
	arrJson = tempJson;
	let value = document.getElementById('search input').value;
	const result = arrJson.filter((elm) => {
		return elm.description.toLowerCase().includes(value.toLowerCase());
	});
	arrJson = result;
	destoryAll();
	buildAll();
});

document.getElementById('submit-btn').addEventListener('click', async () => {
	let value = document.getElementById('link-scrape').value;
	document.getElementById('search input').value = '';
	document.getElementById('link-scrape').value = '';
	document.getElementById('styles-found').innerHTML = '';
	destoryAll();
	let loader = document.getElementById('loader');
	loader.setAttribute('style', 'display: block');
	arrJson = await getNewData(value);
	loader.setAttribute('style', 'display: none');
	buildAll();
});

async function getNewData(value) {
	let response;
	let scrapedData;
	if (!value) {
		return arrJson;
	} else {
		destoryAll();
		response = await fetch(`/api/scrape/${encodeURIComponent(value)}`);
		scrapedData = await response.json();
		const secondRespone = await fetch('/api/scrape/saved/recentlySearched');

		recentlySearched = await secondRespone.json();
		console.log(recentlySearched);
	}
	console.log(scrapedData);
	return scrapedData;
}

/// sort box
document.getElementsByClassName('form-select')[0].addEventListener('change', () => {
	let currentValue = document.getElementsByClassName('form-select')[0].value;
	if (currentValue !== 'sort') {
		cleanGrid();
		if (currentValue === 'discount') {
			currentValue = 1;
			arrJson.sort((a, b) => (a.discount > b.discount ? -1 : b.discount > a.discount ? 1 : 0));
		}
		if (currentValue === 'orginal') {
			currentValue = 2;
			arrJson.sort((a, b) => (a.orginalPrice > b.orginalPrice ? -1 : b.orginalPrice > a.orginalPrice ? 1 : 0));
		}

		if (currentValue === 'discountImprov') {
			currentValue = 3;
			arrJson.sort((a, b) => (a.changedBy > b.changedBy ? -1 : b.changedBy > a.changedBy ? 1 : 0));
		}

		if (currentValue === 'newest') {
			currentValue = 4;
			arrJson.sort((a, b) => (a.orderId > b.orderId ? 1 : b.orderId > a.orderId ? -1 : 0));
		}

		//document.getElementsByClassName("form-select")[0].options[currentValue].selected = true;
		buildAll();
	}
});

// recentlySearchedBox
document.getElementsByClassName('form-select')[1].addEventListener('change', async () => {
	const key = document.getElementsByClassName('form-select')[1].value;
	console.log(key);
	if (key !== 'Recently Searched') {
		const urlToPaste = recentlySearched[key];
		document.getElementById('link-scrape').value = urlToPaste;
		await getDataOwend(key);
		cleanGrid();
		buildGrid();
	} else {
		document.getElementById('link-scrape').value = '';
	}
	document.getElementsByClassName('form-select')[0].options[0].selected = true;
});

function destoryAll() {
	//document.getElementsByClassName("form-select")[0].value = 0;
	document.getElementsByClassName('form-select')[1].value = 0;
	cleanGrid();
}

function cleanGrid() {
	const gridContainer = document.getElementsByClassName('container-fluid')[0];
	while (gridContainer.lastElementChild) {
		gridContainer.removeChild(gridContainer.lastElementChild);
	}
}

function cleanRecentlySearchedBox() {
	const selcetBox = document.getElementsByClassName('form-select')[1];
	for (let i = selcetBox.childNodes.length - 1; i >= 0; i--) {
		if (selcetBox.childNodes[i].value !== 'Recently Searched') selcetBox.removeChild(selcetBox.childNodes[i]);
	}
}
function convert(num) {
	return Math.floor(num * 0.0428618);
}
