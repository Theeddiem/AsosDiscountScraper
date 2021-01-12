<template>
	<div class="col grid-item ">
		<a v-bind:href="item.url">
			{{ item.description }}
			<span v-bind:style="item.orginalPrice > 450 ? 'background-color:  #ffccff' : ''" class="price-details">
				{{ Math.floor(item.orginalPrice * 0.0428618) }}ILS -> {{ Math.floor(item.orginalPrice * 0.0428618) }}ILS - {{ item.discount }}%</span
			>
			<span class="discount-change"></span>
			<img v-bind:src="item.imgUrl" />
		</a>
	</div>
</template>

<script>
export default {
	props: {
		item: Object
	},

	methods: {},

	created: function() {}
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
