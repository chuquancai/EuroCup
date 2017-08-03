<template>
	<div class="euro-result">
		<div class="mt-324 euro-box" v-if="finalResult">
			<h3 class="box-hd hd">冠军大奖</h3>
			<div class="box-bd bd final-winner">
				<div class="final-team">
					<div class="icon"></div>
					<div class="f-team-name">{{finalWinner[1].teamName}}</div>
					<div class="f-logo"><img :src="finalWinner[1].teamLogo" alt="{{finalWinner[1].teamName}}"></div>
				</div>
				<div class="f-winner" v-for="winner in finalWinner">
					<div class="user-avatar"><img :src="winner.userUrl" alt="{{ winner.userName}}"></div>
					<div class="winner-info">
						<p class="user-name">{{ winner.userName}}</p>
						<p class="user-prize">{{ winner.prizeType === 1 ? prize.num1 : prize.num2}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-324 euro-box" v-else>
			<h3 class="box-hd hd">冠军大奖</h3>
			<div class="box-bd waiting">
				<p class="wait-cup"><i class="icon"></i></p>
				<p class="wait-text">虚位以待</p>
				<p class="wait-date">*最终结果将在7月14日公布</p>
			</div>
		</div>
		<div class="euro-box my-all-guess" v-if="myGuess">
			<h3 class="box-hd hd">我的竞猜</h3>
			<div class="box-bd bd" v-for="item in quizList">
				<!-- 每一天 -->
				<div class="group">
					<p class="game-date">{{ $key }}</p>
					<!-- 每一场 -->
					<div class="game-info" v-for="game in item">
						<div class="tow-team">
							<div class="team teamA">
								<span class="team-name">{{ game.nameA }}</span>
								<img class="r ml-10" :src="game.logoA">
							</div>
							<div class="vs score" v-if="game.scoreA !== undefined && game.scoreB !== undefined">
								<span>{{ game.scoreA }} : {{ game.scoreB }}</span>
							</div>
							<div class="vs no-score" v-else><span>VS</span></div>
							<div class="team teamB">
								<img class="l mr-10" :src="game.logoB">
								<span class="team-name">{{ game.nameB }}</span>
							</div>
						</div>
						<div class="g-result">
							<div class="win-lose">
								<span class="txt">胜负</span>
								<span class="res gray" v-if="game.quizResult === undefined">您没参与</span>
								<span class="res gray" v-if="game.quizResult === 0">胜负未定</span>
								<span class="res green" v-if="game.quizResult === 1">赢得了{{ game.quizWinMoney }}元</span>
								<span class="res red" v-if="game.quizResult === -1">猜错了</span>
							</div>
							<div class="g-score">
								<span class="txt">比分</span>
								<span class="res gray" v-if="game.scoreResult === undefined">您没参与</span>
								<span class="res gray" v-if="game.scoreResult === 0">比分未定</span>
								<span class="res green" v-if="game.scoreResult === 1">赢得了{{ game.scoreWinMoney }}元</span>
								<span class="res red" v-if="game.scoreResult === -1">猜错了</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="euro-box winner-box">
			<h3 class="box-hd hd">竞猜获奖名单</h3>
			<div class="box-bd winner-list">
				<ul>
					<li v-for="item in winnerList">
						<span class="winner-date">{{ item.createTime }}</span>
						<span class="winner-name">{{ item.nickname || '用户' + $index}}</span>
						<span class="winner-money">获得{{ item.winMoney }}元</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		ready () {
			this.$http.get('/ecc/getMyQuiz?uid='+ this.uid).then(function(response) {
			// this.$http.get('static/quiz.json').then(function(response) {
				let rsp = response.data
				if (rsp.code === 'success') {
					if (this.logged){
						this.quizList = rsp.data.quiz.records
						for (let key in this.quizList){
							if (this.quizList.hasOwnProperty(key)) {
								this.myGuess = true
								break
							}
						}
					}
					this.winnerList = rsp.data.winners
					this.finalWinner = rsp.data.finalWinner || []
					this.finalWinner.reverse()
					this.finalResult = this.finalWinner.length ? true : false
				}
			},function(response) {
			    this.$emit('show-toasts', '网络不给力')
			});

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
				quizList   : {},	  
				winnerList : {},	  
				finalWinner: [],	  
				finalResult: false,    //是否公布冠军大奖
				myGuess    : false,
				prize      : {
					num1   : '获得小狗智能扫地机器人V-M612(1台)',
					num2   : '获得小狗家用除螨仪(1台)'
				}
			}
		}
	}
</script>