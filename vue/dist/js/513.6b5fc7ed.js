"use strict";(self["webpackChunkvue"]=self["webpackChunkvue"]||[]).push([[513],{3289:function(t,e,n){n.d(e,{Z:function(){return m}});var o=n(3396),a=n(7139);const i={class:"menu-header"},s=["src"],u={class:"menu-links"},g={class:"menu-link"};function l(t,e,n,l,r,d){const c=(0,o.up)("router-link");return r.show?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,a.C_)(["menu animate__animated animate__fast",[r.inAnimation,r.outAnimation]])},[(0,o._)("div",i,[(0,o._)("button",{onClick:e[0]||(e[0]=t=>d.closeMenu()),class:"menu-close-button"},[(0,o._)("img",{src:r.icon,class:"button-icon close-icon"},null,8,s)])]),(0,o._)("nav",null,[(0,o._)("div",u,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.$router.getRoutes().filter((t=>!t.aliasOf&&1==t.props.default.addToMenu)).sort(((t,e)=>t.props.default.orderNo-e.props.default.orderNo)),((t,e)=>((0,o.wg)(),(0,o.j4)(c,{key:e,to:{path:t.path}},{default:(0,o.w5)((()=>[(0,o._)("span",g,(0,a.zw)(t.name),1)])),_:2},1032,["to"])))),128))])])],2)):(0,o.kq)("",!0)}var r={name:"NavMenu",props:{toggle:Boolean,parent:String},data(){return{icon:n(420),show:Boolean,inAnimation:String,outAnimation:String}},methods:{closeMenu(){this.toggle?this.$emit("close",!0):alert("Something's wrong...")}},mounted(){this.show=this.toggle},watch:{toggle(){1==this.toggle?(this.show=this.toggle,this.outAnimation=!1,this.inAnimation="animate__slideInRight"):(this.inAnimation=!1,this.outAnimation="animate__slideOutRight",setTimeout((()=>this.show=this.toggle),800))}}},d=n(89);const c=(0,d.Z)(r,[["render",l]]);var m=c},4770:function(t,e,n){n.d(e,{Z:function(){return d}});var o=n(3396);const a=(0,o._)("span",{class:"button-text"},"Menu",-1),i=(0,o._)("div",{class:"button-item-gap"},null,-1),s=["src"];function u(t,e,n,u,g,l){return(0,o.wg)(),(0,o.iD)("button",{onClick:e[0]||(e[0]=t=>l.toggleMenu())},[a,i,(0,o._)("img",{src:g.icon,class:"button-icon navicon"},null,8,s)])}var g={name:"MenuButton",props:{toggleStatus:Boolean},data(){return{icon:n(5777),menuToggled:!1}},methods:{toggleMenu(){this.menuToggled?this.menuToggled=!1:this.menuToggled=!0,this.$emit("toggle",this.menuToggled)}},watch:{toggleStatus(){this.menuToggled=this.toggleStatus}}},l=n(89);const r=(0,l.Z)(g,[["render",u]]);var d=r},6513:function(t,e,n){n.r(e),n.d(e,{default:function(){return c}});var o=n(3396);const a={key:0,id:"router-root"};function i(t,e,n,i,s,u){const g=(0,o.up)("NavMenu"),l=(0,o.up)("MenuButton");return t.$wpPages?((0,o.wg)(),(0,o.iD)("div",a,[(0,o.Wm)(g,{toggle:s.menuToggled,onClose:e[0]||(e[0]=t=>u.toggleMenu(!t))},null,8,["toggle"]),(0,o.Wm)(l,{onToggle:e[1]||(e[1]=t=>u.toggleMenu(t)),toggleStatus:s.menuToggled,parent:t.$options.name,class:"animate__animated animate__fadeInDown"},null,8,["toggleStatus","parent"])])):(0,o.kq)("",!0)}var s=n(1120),u=n(3289),g=n(4770),l={components:{NavMenu:u.Z,MenuButton:g.Z},name:"WorkPage",data(){return{pageId:Number,page:Object,pageNum:Number,pagesCount:Number,menuToggled:!1}},methods:{assignData(){this.pageId=s.Z.currentRoute.value.matched.find((t=>t.path==s.Z.currentRoute.value.path)).props.default.wpPageId,this.page=this.$wpPages.find((t=>t.id==this.pageId)),this.pageNum=this.$route.matched.find((t=>t.path==this.$route.path)).props.default.orderNo,this.pageCount=s.Z.getRoutes().filter((t=>!t.aliasOf&&1==t.props.default.addToMenu)).length},toggleMenu(t){this.menuToggled=t}},created(){this.assignData(),document.title=`${this.page.title.rendered} – ${this.$wpSiteName}`}},r=n(89);const d=(0,r.Z)(l,[["render",i]]);var c=d},420:function(t,e,n){t.exports=n.p+"img/close.5270fbb9.svg"},5777:function(t,e,n){t.exports=n.p+"img/navicon.1b6371a3.svg"}}]);
//# sourceMappingURL=513.6b5fc7ed.js.map