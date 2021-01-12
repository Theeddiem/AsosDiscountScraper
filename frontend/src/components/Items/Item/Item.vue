<template>
	<div class="col grid-item ">
		<a v-bind:href="item.url">
			{{ item.description }}
			<span v-bind:style="Math.floor(item.orginalPrice * turRate) > 450 ? 'background-color:  #ffccff' : ''" class="price-details">
				{{ Math.floor(item.orginalPrice * turRate) }}ILS -> {{ Math.floor(item.newPrice * turRate) }}ILS - {{ item.discount }}%</span
			>
			<span class="price-details" v-bind:style="{ 'background-color': changeByBackgroundColor }"> {{ changeByText }} </span>
			<img v-bind:src="item.imgUrl" />
		</a>
	</div>
</template>

<script>
export default {
	props: {
		item: Object
	},
	data: function() {
		return {
			turRate: 0.0428803,
			changeByText: '',
			showchangeByText: false,
			changeByBackgroundColor: ''
		};
	},

	created: function() {
		if (this.item.changedBy > 0) {
			this.changeByText = `Discount was ${this.item.discount - this.item.changedBy}% last time :)`;
			this.changeByBackgroundColor = '#ccffe6';
		}

		if (this.item.changedBy < 0) {
			this.changeByText = `Discount was ${this.item.discount + this.item.changedBy * -1}% last time :(`;
			this.changeByBackgroundColor = '#ff6666';
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-item {
	background-color: rgba(255, 255, 255, 0.8);
	border: 1px solid rgba(0, 0, 0, 0.8);
	text-align: center;
}
a {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	color: black;
	font-size: large;
}

a:link {
	text-decoration: none;
}

.price-details {
	font-size: x-large;
	color: black;
	font-weight: bold;
	margin-bottom: 5px;
}
</style>
