<template>
	<div class="euro-schedule">
		<!-- 每一天  -->
		<div v-for="item in gameList" class="euro-box game-list" :class="{'mt-324' : $index === 0 }">
			<h3 class="box-hd hd">{{ $key }}</h3>
			<div class="box-bd bd">
				<!-- 每一组 -->
				<div v-for="group in item" class="group">
					<p class="game-date">{{ $key }}</p>
					<!-- 每一场 -->
					<div class="game-info" v-for="game in group">
						<p class="game-time">{{ game.playTimeStr}}</p>
						<div class="tow-team">
							<div class="team teamA">
								<span class="team-name">{{ game.nameA }}</span>
								<img class="r ml-20" :src="game.logoA" alt="{{ game.nameA }}">
							</div>
							<div class="vs score" v-if="game.scoreA !== undefined && game.scoreB !== undefined">
								<span>{{ game.scoreA }} : {{ game.scoreB }}</span>
							</div>
							<div class="vs no-score" v-else><span>VS</span></div>
							<div class="team teamB">
								<img class="l mr-20" :src="game.logoB" alt="{{ game.nameB }}">
								<span class="team-name">{{ game.nameB }}</span>
							</div>
						</div>
					</div>
				</div >
			</div>
		</div >
	</div>
</template>

<script>
	export default {
		ready () {
			// this.$http.get('/ecc/getAllGame').then(function(response) {
			// this.$http.get('static/schedule.json').then(function(response) {
				// let rsp = response.data
				let rsp = require('../../static/schedule.json')
				if (rsp.code === 'success') {
					this.gameList = rsp.data
				}
			// },function(response) {
			//     this.$emit('show-toasts', '网络不给力')
			// })
		},
		props: {
			currentView : {
				type  : String
			},
			logged      : {
				type  : Boolean
			},
			tips        : {
				type  : String
			},
			showToast   : {
				type  : Boolean
			},
			UA 			: {
				type  : Object
			},
			uid       	: null
		},
		data () {
			return {
				gameList: {}
			}
		}
	}
</script>