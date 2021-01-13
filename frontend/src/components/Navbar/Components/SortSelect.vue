<template>
	<div class="custom-select-div">
		<select class="form-select" id="select-order" v-model="currentSelect" @change="changeSortHandler">
			<option value="Sort">Sort</option>
			<option value="discount">By Discount</option>
			<option value="orginal">By Orginal Price</option>
			<option value="discountImprov">By Discount Improvment</option>
			<option value="newest">Newest First</option>
		</select>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			currentSelect: 'Sort'
		};
	},

	mounted: async function() {
		// this.$store.state.items.sort((a, b) => (a.discount > b.discount ? -1 : b.discount > a.discount ? 1 : 0));

		console.log(this.$store.state.items);
		// for (let index = 0; index < this.$store.state.items.length; index = index + 4) {
		// 	this.$store.state.matrixItems.push(this.$store.state.items.slice(index, index + 4));
		// }
		console.log('here');
	},

	methods: {
		changeSortHandler: function() {
			if (this.currentSelect !== 'Sort') {
				if (this.currentSelect === 'discount') {
					this.$store.state.items.sort((a, b) => (a.discount > b.discount ? -1 : b.discount > a.discount ? 1 : 0));
				}
				if (this.currentSelect === 'orginal') {
					this.$store.state.items.sort((a, b) => (a.orginalPrice > b.orginalPrice ? -1 : b.orginalPrice > a.orginalPrice ? 1 : 0));
				}

				if (this.currentSelect === 'discountImprov') {
					this.$store.state.items.sort((a, b) => (a.changedBy > b.changedBy ? -1 : b.changedBy > a.changedBy ? 1 : 0));
				}

				if (this.currentSelect === 'newest') {
					this.$store.state.items.sort((a, b) => (a.orderId > b.orderId ? 1 : b.orderId > a.orderId ? -1 : 0));
				}
				this.$store.state.matrixItems = [];

				for (let index = 0; index < this.$store.state.items.length; index = index + 4) {
					this.$store.state.matrixItems.push(this.$store.state.items.slice(index, index + 4));
				}
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
