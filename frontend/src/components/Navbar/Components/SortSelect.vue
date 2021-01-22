<template>
	<div class="custom-select-div">
		<select class="form-select" id="select-order" v-model="currentSelect" @change="changeSortHandler">
			<option value="newest">Newest First</option>
			<option value="discount">By Discount</option>
			<option value="orginal">By Orginal Price</option>
			<option value="price high to low">By Price High To Low</option>
			<option value="price low to high">By Price Low To High</option>
			<option value="discountImprov">By Discount Improvment</option>
		</select>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';

export default {
	data: function() {
		return {
			currentSelect: 'newest'
		};
	},
	computed: { ...mapGetters(['items', 'matrixItems']) },

	methods: {
		...mapMutations(['SET_Items', 'SET_BackupItems', 'SET_Matrix']),
		changeSortHandler: function() {
			if (this.currentSelect !== 'Sort') {
				if (this.currentSelect === 'newest') {
					this.SET_Items(this.items.sort((a, b) => (a.orderId > b.orderId ? 1 : b.orderId > a.orderId ? -1 : 0)));
					this.SET_BackupItems(this.items);
				}

				if (this.currentSelect === 'discount') {
					this.SET_Items(this.items.sort((a, b) => (a.discount > b.discount ? -1 : b.discount > a.discount ? 1 : 0)));
					this.SET_BackupItems(this.items);
				}
				if (this.currentSelect === 'orginal') {
					this.SET_Items(this.items.sort((a, b) => (a.orginalPrice > b.orginalPrice ? -1 : b.orginalPrice > a.orginalPrice ? 1 : 0)));
					this.SET_BackupItems(this.items);
				}

				if (this.currentSelect === 'discountImprov') {
					this.SET_Items(this.items.sort((a, b) => (a.changedBy > b.changedBy ? -1 : b.changedBy > a.changedBy ? 1 : 0)));
					this.SET_BackupItems(this.items);
				}

				if (this.currentSelect === 'price high to low') {
					this.SET_Items(this.items.sort((a, b) => (a.newPrice > b.newPrice ? -1 : b.newPrice > a.newPrice ? 1 : 0)));
					this.SET_BackupItems(this.items);
				}

				if (this.currentSelect === 'price low to high') {
					this.SET_Items(this.items.sort((a, b) => (a.newPrice > b.newPrice ? 1 : b.newPrice > a.newPrice ? -1 : 0)));
					this.SET_BackupItems(this.items);
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
