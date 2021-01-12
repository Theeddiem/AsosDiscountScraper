<template>
	<div>
		<div class="grid-container">
			<div class="container-fluid">
				<RowItems v-for="(itemsMat, i) in $store.state.matrixItems" v-bind:key="i" :itemsArr="itemsMat"></RowItems>
			</div>
		</div>
	</div>
</template>

<script>
import RowItems from './RowItems';
import { getRecentlyItems } from '../../databaseManager';
export default {
	components: { RowItems },
	props: {},
	data: function() {
		return {
			searchText: '',
			colsPerRow: 4
		};
	},

	created: async function() {
		//this.$store.state.items = await getRecentlyItems();
		console.log('store from grid', this.$store.state.items);
		for (let index = 0; index < this.$store.state.items.length; index = index + this.colsPerRow) {
			this.$store.state.matrixItems.push(this.$store.state.items.slice(index, index + this.colsPerRow));
		}
	},
	methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
</style>
