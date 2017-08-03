<template>
	<div class="share-view">
		<div class="support-pepole">我在并读和<span class="clr-yel">{{ supportNum }}</span>人一起观战</div>
		<div class="euro-box">
			<p class="box-hd hd-line"></p>
			<div class="box-bd play-rule">
				<h2 class="title">一边观看精彩赛事，一边参与赛果竞猜，还能赢得丰富奖品！</h2>
				<ul>
					<li>
						<h3>玩法一：猜冠军</h3>
						<p>选择一支队伍作为主队，假如所选择的队伍成功夺取2016欧洲杯冠军，则有机会获得冠军大奖。</p>
					</li>
					<li>
						<h3>玩法二：猜比分</h3>
						<p>预测每场赛事最终比分，每次成功预测比分的即可获得2元现金奖励！</p>
					</li>
					<li>
						<h3>玩法三：猜胜负</h3>
						<p>为每场比赛预测获胜队伍，猜中胜负即可平分奖金池！</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="share-text">立即下载并读，竞猜赛果赢大奖！</div>
		<div class="download-banner">
            <div class="app">
                <i class="app-icon"><img src="http://bingodu.oeeee.com/css/app_icon.png" alt="并读app"></i>
                <p class="l app-info">
                    <span class="chinese">我的精致生活</span>
                    <span class="english">My fancy life</span>
                </p>
            </div>
            <div class="download">
                <a href="{{UA.weiXin ? appUrl.ios.weiXin : appUrl.ios.other}}" class="download-btn" target="_blank" v-if="UA.iPhone || UA.iPad">立即下载</a>
                <a href="{{UA.weiXin ? appUrl.android.weiXin : appUrl.android.other}}" class="download-btn" target="_blank" v-if="UA.android">立即下载</a>
                <a href="http://m.bingodu.com/" class="download-btn" target="_blank" v-if="!UA.android && !UA.iPhone && !UA.iPad">立即下载</a>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
		ready () {
			this.$http.post('/ecc/watchCount').then(function(response) {
				let rsp = response.data
				if (rsp.code === 'success') {
					this.supportNum = rsp.data
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
				supportNum: 10000,
				appUrl    : {
					ios: {
						weiXin : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.nhzw.bingdu&g_f=991653',
						other  : 'https://itunes.apple.com/app/id960145317'
					},
					android: {
						weiXin : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.nhzw.bingdu',
						other  : 'http://api.bingodu.com/api/common/getApp?clientType=1'
					}
				}
			}
		}
	}
</script>