const express = require("express");
const scrape = require("./scrape");
var cors = require("cors");
const path = require("path");
let fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/scrape", scrape);

const pathh = path.join(__dirname + "/../frontendb");
app.use(express.static(pathh));

const PORT = 4000;

app.listen(PORT, () => {
	console.log(`Listenning on http://localhost:${PORT}`);
});
var s = "https://www.asos.com/men/sale/jackets-coats/cat/?cid=2112&ctaref=shop|jacketscoats|mw_hp_sale&currentpricerange=750-44890&refine=size_eu:1873,1848|currentprice:750%3C7170";

// var reuslts = s.split("/");
// var recentlyAddName = `${reuslts[3]} - ${reuslts[5]}`;
// console.log(recentlyAddName);
// data = fs.readFileSync("recentlySearched.json", "utf8");
// result = JSON.parse(data);
// console.log(result.arr);
// result.arr.push({ name: "boy coats", url: "ggg" });
// result.arr.push({ name: "boy coats", url: "ggg" });
// console.log(result.arr);

// var reuslts = s.split("/");
// var recentlyAddName = `${reuslts[3]} - ${reuslts[5]}`;
// console.log(recentlyAddName);
// data = fs.readFileSync("recentlySearched.json", "utf8");
// result = JSON.parse(data);
// result[recentlyAddName] = "gola";

// fs.writeFileSync("recentlySearched.json", JSON.stringify(result));
// result.arr.push({ name: "boy coats", url: "ggg" });
// result.arr.push({ name: "boy coats", url: "ggg" });
// console.log(result.arr);
