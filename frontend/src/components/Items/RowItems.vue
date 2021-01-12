<template>
	<div class="row">
		<Item v-for="(items, i) in itemsArr" v-bind:key="i" :item="items"></Item>
	</div>
</template>

<script>
import Item from './Item/Item';
export default {
	components: { Item },

	props: {
		itemsArr: Array
	},
	data: function() {
		return {};
	},
	methods: {
		created: function() {}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
