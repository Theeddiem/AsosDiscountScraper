<template>
	<div class="custom-select-div">
		<select class="form-select" id="recently searched" v-model="currentSelect" @change="changeRecentlySearchedHandler">
			<option selected>Recently Searched</option>
			<option v-for="(elm, i) in recentlySearchedKeys" v-bind:key="i">{{ elm }} </option>
		</select>
	</div>
</template>

<script>
import { getRecentlySearchedHistory } from '../../../databaseManager';
import { getRecentlyItems } from '../../../databaseManager';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
export default {
	props: {},
	data: function() {
		return {
			temp: [],
			recentlySearchedKeys: [],
			recentlySearchedValus: [],
			currentSelect: 'Recently Searched'
		};
	},
	computed: { ...mapGetters(['items']) },

	created: async function() {
		console.log('recentlySearchedCreated');
		this.temp = await getRecentlySearchedHistory();
		this.recentlySearchedKeys = Object.keys(this.temp);
		this.recentlySearchedValus = Object.values(this.temp);
		//	this.items = await getRecentlyItems(this.currentSelect);
	},

	methods: {
		...mapMutations(['SET_Items']),
		changeRecentlySearchedHandler: async function() {
			if (this.currentSelect !== 'Recently Searched') {
				const urlToPaste = this.temp[this.currentSelect];
				this.$emit('updateParentUrl', urlToPaste);
				console.log(this.currentSelect);
				this.SET_Items(await getRecentlyItems(this.currentSelect));
			} else {
				this.$emit('updateParentUrl', '');
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
