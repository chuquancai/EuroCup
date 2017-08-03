<template>
	<div class="tab-bar">
		<ul>
			<li class="tab-item" :class="{'cur-tab': currentView === tab.view}" @click="changeCurView(tab.view)" v-for="tab in tabList">
				<i :class="['icon','icon-' + tab.view ]"></i>
				<span class="text">{{ tab.text }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: ['currentView'],
		data () {
			return {
				tabList: [
					{
						view: 'home',
						text: '有奖竞猜'
					},
					{
						view: 'schedule',
						text: '精彩赛程'
					},
					{
						view: 'result',
						text: '获奖结果'
					}
				]
			}
		},
		methods: {
			changeCurView (view) {
				this.currentView = view;
				window.scrollTo(0, 0)
			}
		}
	}
</script>