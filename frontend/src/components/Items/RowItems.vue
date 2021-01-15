<template>
	<div class="row">
		<Item v-for="elm in itemsArr" v-bind:key="elm.url" :item="elm"></Item>
	</div>
</template>

<script>
// making v-bind:key="elm.url" makes it change all time when sorting
import Item from './Item/Item';
export default {
	components: { Item },

	props: {
		itemsArr: Array
	},
	data: function() {
		return {};
	},
	methods: {},
	created: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
