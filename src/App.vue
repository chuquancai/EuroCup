<template>
  <div id="app" :class="['euro-cup', UA.Bingdu ? 'pb-120' : 'euro-share']">
    <components :is="currentView" :current-view.sync="currentView" :logged="logged" :tips.sync="tips" :uid="uid" :UA="UA" @show-toasts="showToasts" :show-toast.sync="showToast" transition="slideUp" transition-mode="out-in"></components>
    <tab-bar :current-view.sync="currentView" v-if="UA.Bingdu"></tab-bar>
    <toast v-show="showToast" :tips="tips" transition="fade"></toast>
  </div>
</template>

<script>
import tabBar from './components/tabBar'
import Toast from './components/toast'
import Home from './view/home'
import Schedule from './view/schedule'
import Result from './view/result'
import Team from './view/team'
import Share from './view/share'

export default {
  created () {
    let uid = this.getQueryString('uid');
    this.uid = uid || '';
    this.logged = (uid && uid !== '' && uid !== '0') ? true : false
    this.platform()
    this.currentView = this.UA.Bingdu ? 'home' : 'share'
  },
  data () {
    return {
      currentView : 'home',
      logged      : false,
      tips        : '',
      showToast   : false,
      uid         : '',
      UA          : {}
    }
  },
  components: {
    tabBar,
    Toast,
    Home,
    Schedule,
    Result,
    Team,
    Share
  },
  methods: {
    getQueryString (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return "";
    },
    //终端系统平台或浏览器
    platform () {
        let u = navigator.userAgent
        return this.UA = {
            // android终端或者uc浏览器
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            // 是否为iPhone或者QQHD浏览器
            iPhone: u.indexOf('iPhone') > -1,
            // 是否iPad
            iPad: u.indexOf('iPad') > -1,
            // 是否在app中打开
            Bingdu: u.indexOf('Bingdu') > -1,
            //是否在小米
            XiaoMi: u.indexOf('XiaoMi') > -1,
            //是否在微信打开
            weiXin: u.match(/MicroMessenger/i)
                // weiXin: true
        }
    },
    //show提示
    showToasts (str) {
      if (this.showToast) return
      this.tips = str
      this.showToast = true
      setTimeout(() => this.showToast = false, 2000)
    }
  }
}
</script>
