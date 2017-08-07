<template>
	<div class="guess-layout">
		<form id="J_uer_form">
			<div class="form-wrap">
				<h4 class="title">参与竞猜</h4>
				<div class="input-box">
					<p class="pop-cont">{{tips}}</p>
					<p class="pop-code">
						<input type="text" autocomplete="off" name="code" placeholder="请输入右侧验证码" v-model="code" maxlength="4">
						<img :src="codeImgUrl" @click="changeCodeImg">
					</p>
				</div>
				<div class="footer-btn">
					<a href="javascript:void(0);" id="J_cancel_btn" class="cancel-btn" @click="cancelGuess">取消</a>
					<a href="javascript:void(0);" id="J_submit_btn" class="submit-btn" @click="confirmGuess">确定</a>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		ready () {
			this.originUrl = this.codeImgUrl
			this.codeImgUrl = this.codeImgUrl + '?key=' + this.uid
		},
		props: {
			showPop   : {
				type  : Boolean
			},
			tips      : {
				type  : String
			},
			supportId :{
				type  : String
			},
			showToast : {
				type  : Boolean
			},
			popBox    : {
				type  : Boolean
			},
			gameList  : {
				type  : Array
			},
			gameIdx   : {
				type  : Number
			},
			uid       : null
		},
		data () {
			return {
				codeImgUrl: '/ecc/captcha',
				originUrl : '',
				code      : ''
			}
		},
		methods: {  
			confirmGuess () {
				let result
				let team = this.supportId
				let idx = this.gameIdx
				if (!this.code || this.code.length < 4) {
					this.$emit('show-toasts', '请填入正确验证码');
					return
				}
				if (team === this.gameList[idx].teamA) {
					result = -1
				}else if (team === this.gameList[idx].draw) {
					result = 0
				}
				else if (team === this.gameList[idx].teamB) {
					result = 1
				}
				// this.$http.post('/ecc/guessGameResultVerify?uid='+ this.uid + "&gameId=" + this.gameList[idx].id+ '&result=' + result + "&input=" + this.code).then(function (response) {
				// 	let rsp = response.data
					let rsp = {code: 'success'}
					if (rsp.code === 'success') {
						this.code = ''
						if (team === this.gameList[idx].teamA) {
							let count = +this.gameList[idx].countA
							count++
							this.gameList[idx] = Object.assign({}, this.gameList[idx], {countA   : count})
							this.gameList[idx] = Object.assign({}, this.gameList[idx], {bettingStatus   : -1})
						}else if (team === this.gameList[idx].draw) {
							let count = +this.gameList[idx].countDraw
							count++
							this.gameList[idx] = Object.assign({}, this.gameList[idx], {countDraw   : count})
							this.gameList[idx] = Object.assign({}, this.gameList[idx], {bettingStatus   : 0})
						}
						else if (team === this.gameList[idx].teamB) {
							let count = +this.gameList[idx].countB
							count++
							this.gameList[idx] = Object.assign({}, this.gameList[idx], { countB   : count })
							this.gameList[idx] = Object.assign({}, this.gameList[idx], {bettingStatus   : 1})
						}
						
						this.gameList.$set(idx, this.gameList[idx])
						this.showPop = false
						this.popBox = false
						this.$emit('show-toasts', '成功参与竞猜')
						this.supportId = ''

					}
					else if(rsp.code === 'fail') {
						if (rsp.result === 'captcha.expired') {
							this.$emit('show-toasts', '验证码过期,请重新输入')
						}
						else if (rsp.result === 'captcha.failt') {
							this.$emit('show-toasts', '验证码错误,请重新输入')
						}
						else{
							this.$emit('show-toasts', rsp.result)
						}
					}
					else{
						this.$emit('show-toasts', '竞猜失败，请稍后再试')
					}
				// },(response) => {
				//     this.$emit('show-toasts', '网络不给力')
				// })
			},
			cancelGuess () {
				this.showPop = false
				this.code = ''
				this.supportId = ''
			},
			changeCodeImg () {
				let url = this.originUrl
				this.codeImgUrl = url + '?rnd=' + Math.random() + '&key=' + this.uid
			}
		},
		events: {
			'change-code' : function () {
				this.changeCodeImg()
			}
		}
	}
</script>