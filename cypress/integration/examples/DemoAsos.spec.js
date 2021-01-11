import AsosPage from "../AsosPage";
const path = require("path");
describe("asos", () => {
	const asosPage = new AsosPage();
	let url;
	let arr = [];

	Cypress.on("uncaught:exception", (err, runnable) => {
		// returning false here prevents Cypress from
		// failing the test
		return false;
	});

	before(() => {
		const pathh = path.join(__dirname + "/../backend/urlToScrape.txt");
		cy.readFile(pathh).then((file) => {
			url = file;
		});
	});

	it("asos", () => {
		// full 80 reuslts
		//let url = "https://www.asos.com/men/sale/jackets-coats/cat/?cid=2112&currentpricerange=850-44890&r=1&refine=size_eu:1848|currentprice:850%3C1630&xaffid=8779";

		// 237
		//let url = "https://www.asos.com/men/sale/jackets-coats/cat/?cid=2112&currentpricerange=850-44890&r=1&refine=size_eu:1848|currentprice:850%3C2255&xaffid=8779";

		// 1500 coats resutls
		//let url = "https://www.asos.com/men/sale/jackets-coats/cat/?cid=2112&ctaref=shop|jacketscoats|mw_hp_sale&currentpricerange=750-44890&refine=size_eu:1873,1848|currentprice:750%3C7170";

		//4 items
		//let url = "https://www.asos.com/men/sale/jackets-coats/cat/?cid=2112&ctaref=shop|jacketscoats|mw_hp_sale&currentpricerange=750-44890&refine=brand:14370,17,18,16346,13762,16591,15370,13244,3234,13931,15155,16280,13656,15095,14513,15878,15059,13773,12754,12684,3253,15440,15226,14116,16299,13529,15906,13761,16549,2943,15936,224,15364,14490,16415,3735,15003,14334,16123,14644,299,12461,14097,14300,16131,14512,396,16399,401,14423,16160,12813,13073,13214,15945,15199,14156,13687,499,3182,13817,14468,15337,2986,15950,15720,15176,13623,15177,3563,14096,14441,527,12915,3594,12456,589,13621,14100,12769,2988,612,12983,14059,3414,14159,14164,14920,15407,16494,691,12758,16448,15807,12552,3312,13942,14538,3672,3029,15631,15489,16236,15203,3675,765,16174,14287,3062|size_eu:1848|currentprice:750%3C1065&sort=freshness";

		// boots only 42
		//let url = "https://www.asos.com/men/sale/shoes-trainers/cat/?cid=1935&ctaref=cat_header&currentpricerange=450-21490&refine=attribute_1047:8585|size_eu:2337";

		cy.setCookie("browseSizeSchema", "EU");
		cy.setCookie("browseCurrency", "RUB");
		cy.setCookie("browseCountry", "TR");
		cy.setCookie("browseLanguage", "TR");
		cy.visit(url);
		var reuslts = url.split("/");
		var recentlySeacrhedName = `${reuslts[3]} - ${reuslts[5]}`;
		console.log(recentlySeacrhedName);
	});
	// cy.visit(url);
	// asosPage.sortBySelect().click();
	// asosPage.selcetByNew().click({ force: true });
});
