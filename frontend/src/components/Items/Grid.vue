<template>
	<div>
		<div class="grid-container">
			<div class="container-fluid">
				<RowItems v-for="(itemsMat, i) in matrixItems" v-bind:key="i" :itemsArr="itemsMat"></RowItems>
			</div>
		</div>
	</div>
</template>

<script>
import RowItems from './RowItems';
import { getRecentlyItems } from '../../databaseManager';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
	components: { RowItems },
	props: {},
	data: function() {
		return {
			searchText: ''
		};
	},
	methods: {
		...mapActions(['loadItems'])
	},
	computed: {
		...mapGetters(['matrixItems', 'items'])
	},
	created: async function() {
		console.log('grid created ');
		// await this.$store.dispatch('loadItems'); // other way to write it
		await this.loadItems();
	}
};
</script>

<style scoped></style>
