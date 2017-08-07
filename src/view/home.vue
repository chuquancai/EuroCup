<template>
	<div class="euro-home">
		<div class="mt-324 euro-box my-team selected" v-if="selected && logged">
			<h3 class="box-hd hd">我的主队</h3>
			<div class="box-bd bd">
				<p class="my-team-flag"><img :src="hostTeam.logo" alt="{{hostTeam.name}}"></p>
				<p class="my-team-name">{{hostTeam.name}}</p>
				<p class="my-team-spo">{{hostTeam.supportCount}}人正和你一起支持这支球队</p>
			</div>
		</div>
		<div class="mt-324 euro-box my-team" v-else>
			<h3 class="box-hd hd">我的主队</h3>
			<div class="box-bd bd">
				<p class="selected-team">
					<span class="btn sel-btn" @click="selectTeam" v-if="logged"><i class="icon icon-star"></i><span>选择主队</span></span>
					<a href="/alert?key=0" class="btn sel-btn" v-else><i class="icon icon-star"></i><span>选择主队</span></a>
				</p>
				<p class="my-team-spo">假如你选择的队伍成功夺取2016欧洲杯冠军<br>你就有机会获得冠军大奖</p>
			</div>
		</div>
		<div class="euro-box today-game">
			<h3 class="box-hd hd">今日竞猜</h3>
			<div class="box-bd bd" v-for="game in gameList">
				<p class="game-time">{{game.playTimeMd}} {{game.playTimeStr}} {{game.stageStr}}</p>
				<div class="guess-wrap">
					<div class="game-box">
						<div class="game-team l-team">
							<p class="my-team-flag"><img :src="game.logoA" alt="{{game.nameA}}"></p>
							<p class="my-team-name">{{game.nameA}}</p>
						</div>
						<div class="game-team l-team">
							<p class="my-team-flag"><img :src="game.logoB" alt="{{game.nameB}}"></p>
							<p class="my-team-name">{{game.nameB}}</p>
						</div>
						<div class="vs">VS</div>
					</div>
					<div class="team-support">
						<p class="tips-text">1余额猜胜负，猜中平分本场奖金池</p>
						<ul>
							<li>
								<div class="spo-result">{{game.nameA}}胜</div>
								<div class="spo-percent">
									<p class="per-bar"><span class="barA" :style="{width: (game.countA / (game.countA + game.countB + (game.countDraw || 0))) * 100 + '%'}"></span></p>
									<p class="spo-num"><span>{{game.countA}}人</span></p>
								</div>
								<div class="spo-btn">
									<button :class="['btn', game.bettingStatus !== undefined ? 'supported' : '', game.bettingStatus === -1 ? 'current': '']" @click.prevent="mySupport($index, game.teamA, game, $event)" :disabled="game.bettingStatus !== undefined" v-if="logged">{{ game.bettingStatus === -1? '已支持': '支持' }}</button>
									<a href="/alert?key=0" class="btn" v-else>支持</a>
								</div>
							</li>
							<li v-if="game.draw">
								<div class="spo-result">平局</div>
								<div class="spo-percent">
									<p class="per-bar"><span class="barB" :style="{width: (game.countDraw / (game.countA + game.countB + (game.countDraw || 0))) * 100 + '%'}"></span></p>
									<p class="spo-num"><span>{{game.countDraw}}人</span></p>
								</div>
								<div class="spo-btn">
									<button :class="['btn', game.bettingStatus !== undefined ? 'supported' : '', game.bettingStatus === 0 ? 'current': '']" @click.prevent="mySupport($index, game.draw, game, $event)" :disabled="game.bettingStatus !== undefined" v-if="logged">{{ game.bettingStatus === 0 ? '已支持': '支持' }}</button>
									<a href="/alert?key=0" class="btn" v-else>支持</a>
								</div>
							</li>
							<li>
								<div class="spo-result">{{game.nameB}}胜</div>
								<div class="spo-percent">
									<p class="per-bar"><span class="barC" :style="{width: (game.countB / (game.countA + game.countB + (game.countDraw || 0))) * 100 + '%'}"></span></p>
									<p class="spo-num"><span>{{game.countB}}人</span></p>
								</div>
								<div class="spo-btn">
									<button :class="['btn', game.bettingStatus !== undefined ? 'supported' : '', game.bettingStatus === 1 ? 'current': '']" @click.prevent="mySupport($index, game.teamB, game, $event)" :disabled="game.bettingStatus !== undefined" v-if="logged">{{ game.bettingStatus === 1 ? '已支持': '支持' }}</button>
									<a href="/alert?key=0" class="btn" v-else>支持</a>
								</div>
							</li>
						</ul>
					</div>
					<div class="score-guess">
						<p class="tips-text">免费猜比分，猜中奖励2余额</p>
						<div class="guess-box">
							<form>
								<div class="r submit-score">
									<button class="btn" :class="{'submited' : game.betScore}" @click.prevent="submitScore($index, game, $event)" :disabled="game.betScore "  v-if="logged && game.betScore">已<br>提<br>交</button>
									<button class="btn" :class="{'submited' : game.betScore}" @click.prevent="submitScore($index, game, $event)" :disabled="game.betScore"  v-if="logged && !game.betScore">提<br>交</button>
									<a href="/alert?key=0" class="btn a-btn" v-if="!logged">提<br>交</a>
								</div>
								<div class="score-box">
									<p><input type="text" name="myScoreA" class="r score-ipt" v-model="game.myScoreA" autocomplete="off" maxlength="2" :disabled="game.betScore" ><label>{{game.nameA}}进球</label></p>
									<p><input type="text" name="myScoreB" class="r score-ipt" v-model="game.myScoreB" autocomplete="off" maxlength="2" :disabled="game.betScore" ><label>{{game.nameB}}进球</label></p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="euro-box game-rule">
			<h3 class="box-hd hd">比赛规则</h3>
			<div class="box-bd bd">
				<div class="rule-part">
					<h4>免费玩法:猜冠军</h4>
					<ol>
						<li>1.每位用户可以选择一支队伍作为主队。假如所选择的队伍成功夺取2016欧洲杯冠军，则有机会获得冠军大奖。</li>
						<li>
							<p>2.冠军大奖共2名，会在所有所选主队夺冠的用户中产生。两位被选中的幸运用户分别获得小狗智能扫地机器人V-M612（1台）或小狗家用除螨仪（1台）。具体获奖名单请见活动页面以及并读APP中的公示。</p>
							<div class="gift">
								<div class="gift-box" v-for="gift in gifts">
									<p class="gift-pic"><img :src="gift.src" alt="{{ gift.name }}"></p>
									<p class="gift-name">{{ gift.name }}</p>
								</div>
								<div class="gift-box">
									<p class="gift-pic"><img src="../../static/images/gift1.png" alt="小狗家用除螨仪"></p>
									<p class="gift-name">小狗家用除螨仪</p>
								</div>
								<div class="gift-box">
									<p class="gift-pic"><img src="../../static/images/gift2.jpg" alt="小狗智能扫地机器人V-M612"></p>
									<p class="gift-name">小狗智能扫地机器人V-M612</p>
								</div>
							</div>
						</li>
						<li>3.每位用户只能选择一个主队，选择后不能变更。</li>
						<li>4.用户需在6月24日0点前选择自己的主队，逾期后无法选择主队。</li>
					</ol>
				</div>
				<div class="rule-part">
					<h4>付费玩法：猜胜负</h4>
					<ol>
						<li>1.每位用户可以为每场比赛预测获胜队伍，或预测比赛结果为平局。</li>
						<li>2.每次选择将消耗1元余额，被消耗的余额将放入该场比赛的奖金池。</li>
						<li>3.所有成功预测赛果的用户将平分该场比赛的奖金池中的奖金。</li>
						<li>4.每场比赛的参与截止时间为比赛开始前10分钟。</li>
						<li>5.比赛结果预测不包含加时阶段。</li>
					</ol>
				</div>
				<div class="rule-part">
					<h4>免费玩法：猜比分</h4>
					<ol>
						<li>1.每位用户可以为每场比赛预测最终比分。</li>
						<li>2.成功预测比分的用户每人可以获得2余额奖励。</li>
						<li>3.每场比赛的参与截止时间为比赛开始前10分钟。</li>
						<li>4.比赛比分预测包含加时阶段。</li>
					</ol>
				</div>
				<p class="copy-right"><span>——&nbsp;&nbsp;活动最终解释权归并读所有&nbsp;&nbsp;——</span></p>
				<p class="bt-text" v-if="UA.iPhone || UA.iPad">本次活动及奖品与设备生产商Apple Inc.公司无关</p>
			</div>
		</div>
		<layout v-if="popBox" v-show="showPop" :pop-box="popBox" :uid="uid" :show-pop.sync="showPop" :show-toast="showToast" :support-id.sync="supportId" @show-toasts="toast" :game-list.sync="gameList" :game-idx="gameIdx" :tips="guessTips" :result-id="resultId" transition="fade"></layout> 
	</div>
</template>
<script>
	import Layout from './../components/layout'
	var pg1 = require('../../static/images/gift1.png'),
			pg2 = require('../../static/images/gift2.jpg')
	export default {
		ready () {
			// const uid = this.uid === '0' ?  '' : this.uid
			// this.$http.get('/ecc/getTodayGame?uid=' + uid).then(function(response) {
				// let rsp = response.data
				let rsp = require('../../static/today.json')
				if (rsp.code === 'success') {
					this.hostTeam = rsp.data.host ? rsp.data.host : null
					this.selected = rsp.data.host ? true : false
					this.gameList = rsp.data.gameList
				}
			// },function(response) {
			//     this.$emit('show-toasts', '网络不给力')

			// });
		},
		components : { Layout },
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
			uid       	: {
				type  : String
			}
		},
		data () {
			return {
				hostTeam  : null,
				selected  : false,
				gameList  : [],
				curGame   : {},
				supportId : '',
				gameIdx   : '',
				supported : false,
				guessTips : '',
				showPop   : false,
				popBox    : false,
				gifts     : [{
						name:'小狗家用除螨仪',
						src : pg1
					}, 
					{
						name:'小狗智能扫地机器人V-M612',
						src : pg2
					}
				]
			}
		},
		methods: {
			//选择主队
			selectTeam () {
				if (!this.logged) {
					let url = window.location.host
					window.location.replace('http://'+ url + '/alert?key=0')
				}
				else{
					this.currentView = 'team'
				}
			},

			//弹窗显示内容
			changeText ( id, game ) {
				switch( id ) {
					case 0 :
						this.guessTips = '是否使用1余额竞猜' + game.nameA + '队获胜？猜中结果即可获得现金奖励！';
						break;
					case 1 :
						this.guessTips = '是否使用1余额竞猜双方平局？猜中结果即可获得现金奖励！';
						break;
					case 2 :
						this.guessTips = '是否使用1余额竞猜' + game.nameB + '队获胜？猜中结果即可获得现金奖励！';
					break;
					default:
						this.guessTips = '是否使用1余额竞猜双方平局？猜中结果即可获得现金奖励！';
					break;
				}
				this.$broadcast('change-code')
			},

			//猜胜负
			mySupport (idx, team, game, e) {
				if (!this.logged) {
					let url = window.location.host
					window.location.replace('http://'+ url + '/alert?key=0')
				}
				else{
					let id
					this.gameIdx = idx
					if ( team === this.gameList[idx].teamA) {
						id = 0;
					}
					else if ( team === this.gameList[idx].draw) {
						id = 1;
					}
					if ( team === this.gameList[idx].teamB) {
						id = 2; 
					}
					this.supportId = team;
					this.showPop = true
					this.popBox = true
					this.changeText(id, game)
				}
			},
			//检查登录
			checkLogged () {
				if (!this.logged) {
					let url = window.location.host
					window.location.replace('http://'+ url + '/alert?key=0')
					return
				}
			},
			//提交比分
			submitScore (idx, game, e) {
				this.checkLogged()
				let scoreA = +game.myScoreA
				let scoreB = +game.myScoreB
				if (!game.myScoreA || !game.myScoreB) {
					this.$emit('show-toasts', '你还没输入比分')
					return
				}
				if(scoreA >= 0 && scoreB >= 0){
					let quiz = require('../../static/quiz.json')
					// this.$http.post('/ecc/guessGamePoint?uid='+ this.uid + "&gameId=" + game.id + '&point=' + scoreA + ':' + scoreB).then(function(response) {
					// this.$http.get('static/quiz.json').then(function(response) {
						// let rsp = response.data
						let rsp = quiz
						if (rsp.code === 'success') {
							
							this.gameList[idx] = Object.assign({}, this.gameList[idx], { betScore: true })
							this.gameList.$set(idx, this.gameList[idx])
							this.$emit('show-toasts', '成功提交比分')
						}
						else if(rsp.code === 'fail'){
							this.$emit('show-toasts', rsp.result)
						}
					// },function(response) {
					//     this.$emit('show-toasts', '网络不给力')
					// })
				}
				else{
					this.$emit('show-toasts', '请输入正确的比分')
				}
			},
			toast (str) {
				this.$emit('show-toasts', str)
			}
		}
	}
</script>