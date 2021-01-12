<template>
	<div>
		<NavBar></NavBar>
		<Grid></Grid>
	</div>
</template>

<script>
import NavBar from './components/Navbar/NavBar';
import Grid from './components/Items/Grid';

export default {
	components: { NavBar, Grid }
};
</script>

<style>
body {
	font-size: 15;
	font-weight: 100;
	padding-left: 30px;
	padding-right: 30px;
	margin-bottom: 50px;
}
</style>
