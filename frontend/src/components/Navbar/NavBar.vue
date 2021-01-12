<template>
	<div class="nav-bar">
		<div class="top-nav-bar"><input id="link-scrape" class="btn btn-light" placeholder="Link To Scrape.." /> <button type="button" class="btn btn-success" id="submit-btn">Submit</button></div>
		<div class="bot-nav-bar">
			<SortSelect></SortSelect>
			<RecentlySearchedSelect></RecentlySearchedSelect>
			<input id="search input" class="btn btn-light" placeholder="Search..." v-model="searchText" @input="searchHandler" />
		</div>
		<h1 id="styles-found" class="display-6" v-if="$store.state.items.length > 0">styles found {{ $store.state.items.length }}</h1>
	</div>
</template>

<script>
import SortSelect from './Components/SortSelect.vue';
import RecentlySearchedSelect from './Components/RecentlySearchedSelect.vue';

export default {
	components: { SortSelect, RecentlySearchedSelect },
	data: function() {
		return {
			searchText: '',
			tempMatirx: [],
			colsPerRow: 4
		};
	},
	mounted: function() {
		// mounted happens affter store creation
		this.tempMatirx = this.$store.state.matrixItems.map(function(arr) {
			return arr.slice();
		});
	},

	methods: {
		searchHandler: function() {
			this.$store.state.matrixItems = this.tempMatirx.map(function(arr) {
				return arr.slice();
			});
			let filterdArray = this.$store.state.items.filter(elm => {
				return elm.description.toLowerCase().includes(this.searchText.toLowerCase());
			});

			this.$store.state.matrixItems = [];
			for (let index = 0; index < filterdArray.length; index = index + this.colsPerRow) {
				this.$store.state.matrixItems.push(filterdArray.slice(index, index + 4));
			}
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
</style>
