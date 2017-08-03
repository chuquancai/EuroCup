<template>
	<div class="all-team">
		<div class="euro-box mt-324">
			<h3 class="box-hd hd">选择我的主队</h3>
			<div class="box-bd bd">
				<p class="des">请选择一支队伍作为你的主队（选择后不可更改)，当主
队成功夺取2016欧洲杯冠军你就有机会获得终极大奖。</p>
				<ul v-if="hostTeam">
					<li v-for="n in totals" class="team-item">
						<div class="team-box" v-for="item in allTeam | limitBy 3 n*3">
							<p class="t-logo"><img :src="item.logo" alt="{{item.name}}"></p>
							<p class="t-name">{{item.name}}</p>
							<p class="t-btn">
								<button v-if="item.id === hostTeam.id" class="btn supported current" disabled>已选择</button>
								<button v-else class="btn supported" disabled>选为主队</button>
							</p>
						</div>
					</li>
				</ul>
				<ul v-else>
					<li v-for="n in totals" class="team-item">
						<div class="team-box" v-for="item in allTeam | limitBy 3 n*3">
							<p class="t-logo"><img :src="item.logo" alt="{{item.name}}"></p>
							<p class="t-name">{{item.name}}</p>
							<p class="t-btn">
								<button :class="['btn', supported ? 'supported' : '', curIdx === $index ? 'current': '']" @click.prevent="myHostTeam(item, $event)" :disabled="supported">选为主队</button>
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div >
	</div>
</template>

<script>
	export default {
		ready () {
			this.$http.get('/ecc/getTeamList').then(function(response) {
			// this.$http.get('static/getTeam.json').then(function(response) {
				let rsp = response.data
				if (rsp.code === 'success') {
					this.allTeam = rsp.data
					this.totals = Math.ceil(this.allTeam.length / 3)
					this.hostTeam = rsp.host ? rsp.host : null
					this.supported = rsp.host ? true : false
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
				allTeam   : [],
				totals    : Number,
				supported : false,
				hostTeam  : null,
				curTeam   : {}
			}
		},
		methods: {
			myHostTeam (item, e) {
				if (!this.logged) {
					let url = window.location.host
					window.location.replace('http://'+ url + '/alert?key=0')
				}
				else{
					this.curTeam = item
					this.$http.post('/ecc/chooseHostTeam?uid=' + this.uid + '&teamId=' + this.curTeam.id + '&teamLogo=' + this.curTeam.logo).then(function(response) {
						let rsp = response.data
						if (rsp.code === 'success') {
							this.hostTeam = item
							e.target.innerHTML = '已选择'
							this.supported = true
							setTimeout(() => {
								this.currentView = 'home'
								window.scrollTo(0,0)
							}, 1000)
						}
						else if(rsp.code === 'fail'){
							this.$emit('show-toasts', rsp.result)
						}
						else if(rsp.code === 'system.error'){
							this.$emit('show-toasts', '选队失败,请稍后再试')
						}

					},function(response) {
					    this.$emit('show-toasts', '网络不给力')
					})
				}
				
			}
		}
	}
</script>