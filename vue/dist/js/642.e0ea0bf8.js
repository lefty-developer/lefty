"use strict";(self["webpackChunkvue"]=self["webpackChunkvue"]||[]).push([[642],{1642:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var a=n(3396);const u={key:0,id:"router-root"};function o(e,t,n,o,g,s){const p=(0,a.up)("NavMenu"),r=(0,a.up)("MenuButton");return e.$wpPages?((0,a.wg)(),(0,a.iD)("div",u,[(0,a.Wm)(p,{toggle:g.menuToggled,onClose:t[0]||(t[0]=e=>s.toggleMenu(!e))},null,8,["toggle"]),(0,a.Wm)(r,{onToggle:t[1]||(t[1]=e=>s.toggleMenu(e)),toggleStatus:g.menuToggled,parent:e.$options.name},null,8,["toggleStatus","parent"])])):(0,a.kq)("",!0)}var g=n(1120),s=n(4554),p=n(3710),r={components:{NavMenu:s.Z,MenuButton:p.Z},name:"ExperiencePage",data(){return{page:{},pageId:0,pageNum:0,pagesCount:0,menuToggled:!1}},methods:{assignData(){this.pageId=g.Z.currentRoute.value.matched.find((e=>e.path==g.Z.currentRoute.value.path)).props.default.wpPageId,this.page=this.$wpPages.find((e=>e.id==this.pageId)),this.pageNum=this.$route.matched.find((e=>e.path==this.$route.path)).props.default.orderNo,this.pageCount=g.Z.getRoutes().filter((e=>!e.aliasOf&&1==e.props.default.addToMenu)).length},toggleMenu(e){this.menuToggled=e}},created(){this.assignData(),document.title=`${this.page.title.rendered} – ${this.$wpSiteName}`}},i=n(89);const d=(0,i.Z)(r,[["render",o]]);var l=d}}]);
//# sourceMappingURL=642.e0ea0bf8.js.map