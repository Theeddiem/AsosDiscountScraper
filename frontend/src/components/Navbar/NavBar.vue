<template>
	<div class="nav-bar">
		<div class="top-nav-bar">
			<input id="link-scrape" class="btn btn-light" placeholder="Link To Scrape.." v-model="urlToScrape" />
			<button type="button" class="btn btn-success" id="submit-btn" @click="scrapeUrlHandler">Submit</button>
		</div>
		<div class="bot-nav-bar">
			<SortSelect></SortSelect>
			<RecentlySearchedSelect @updateParentUrl="updateUrl"></RecentlySearchedSelect>
			<input id="search-input" class="btn btn-light" placeholder="Search..." v-model="searchText" @input="searchHandler" />
			<div class="loader" v-if="isLoaderVisible"></div>
		</div>
		<h1 id="styles-found" class="display-6" v-if="styelsFound() > 0">{{ styelsFound() }} styles</h1>
	</div>
</template>

<script>
import SortSelect from './Components/SortSelect.vue';
import RecentlySearchedSelect from './Components/RecentlySearchedSelect.vue';
import { scrapeData } from '../../databaseManager';
export default {
	components: { SortSelect, RecentlySearchedSelect },
	data: function() {
		return {
			urlToScrape: '',
			searchText: '',
			tempMatirx: [],
			colsPerRow: 4,
			isLoaderVisible: false
		};
	},
	mounted: function() {
		// mounted happens affter store creation
		this.tempMatirx = this.$store.state.matrixItems.map(function(arr) {
			return arr.slice();
		});
	},

	methods: {
		updateUrl: function(value) {
			this.urlToScrape = value;
		},

		searchHandler: function() {
			this.$store.state.matrixItems = this.tempMatirx.map(function(arr) {
				return arr.slice();
			});

			const filterdArray = this.$store.state.items.filter(elm => {
				return elm.description.toLowerCase().includes(this.searchText.toLowerCase());
			});

			this.$store.state.matrixItems = [];
			for (let index = 0; index < filterdArray.length; index = index + this.colsPerRow) {
				this.$store.state.matrixItems.push(filterdArray.slice(index, index + 4));
			}
		},
		scrapeUrlHandler: async function() {
			this.isLoaderVisible = true;
			this.$store.state.matrixItems = [];
			this.$store.state.items = await scrapeData(this.urlToScrape);
			this.isLoaderVisible = false;

			for (let index = 0; index < this.$store.state.items.length; index = index + 4) {
				this.$store.state.matrixItems.push(this.$store.state.items.slice(index, index + 4));
			}
		},
		styelsFound() {
			let count = 0;
			this.$store.state.matrixItems.forEach(arr => {
				count += arr.length;
			});

			return count;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	height: min-content;
}

.top-nav-bar {
	display: flex;
	flex-direction: row;
	margin-left: 6px;
	margin-top: 10px;
}

.bot-nav-bar {
	display: flex;
	flex-direction: row;
	margin-left: 10px;
	margin-top: 10px;
}

#link-scrape {
	width: 60%;
	margin-left: 5px;
	margin-right: 5px;
	height: min-content;
}

#submit-btn {
	height: min-content;
}

.display-6 {
	text-align: center;
}

.loader {
	border: 16px solid #f3f3f3; /* Light grey */
	border-top: 16px solid #3498db; /* Blue */
	border-radius: 50%;
	width: 120px;
	height: 120px;
	animation: spin 2s linear infinite;
	left: 50%;
	top: 50%;
	position: absolute;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
