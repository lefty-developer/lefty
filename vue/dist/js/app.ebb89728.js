(function(){var n={4281:function(n,t,e){"use strict";e(7658);var o=e(9242),r=e(3396);function i(n,t,e,i,a,u){const s=(0,r.up)("LoadingAnimation"),c=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(s,{onReady:t[0]||(t[0]=n=>u.finishedLoading(n))}),a.show?((0,r.wg)(),(0,r.j4)(c,{key:0},{default:(0,r.w5)((({Component:t})=>[(0,r.Wm)(o.uT,{name:"fade",mode:"out-in"},{default:(0,r.w5)((()=>[((0,r.wg)(),(0,r.j4)((0,r.LL)(t),{key:n.$route.path}))])),_:2},1024)])),_:1})):(0,r.kq)("",!0)],64)}var a=e(7139);const u={key:0,class:"content-box"},s=["src"];function c(n,t,e,o,i,c){return i.show?((0,r.wg)(),(0,r.iD)("div",u,[(0,r._)("img",{src:i.logo,class:(0,a.C_)(["loading-logo animate__animated",[i.inAnimation,i.outAnimation,i.repeatAnimation]])},null,10,s)])):(0,r.kq)("",!0)}var l={name:"LoadingAnimation",props:{wpData:Object,connectionError:Boolean},data(){return{logo:e(3959),show:!0,inAnimation:"",outAnimation:"",repeatAnimation:""}},methods:{showParent(){setTimeout((()=>{this.outAnimation="animate__fadeOutDown"}),400),setTimeout((()=>{this.show=!1,this.$emit("ready",!this.show)}),1200)}},created(){document.title=this.$wpSiteName?this.$wpSiteName:"Resolving issues..."},mounted(){this.inAnimation="animate__zoomInDown",setTimeout((()=>{this.inAnimation=!1,this.showParent()}),1e3)}},d=e(89);const p=(0,d.Z)(l,[["render",c]]);var g=p,f={components:{LoadingAnimation:g},name:"App",data(){return{show:!1}},methods:{finishedLoading(n){n||this.$router.push({name:"NotFound"}),this.show=!0}}};const m=(0,d.Z)(f,[["render",i]]);var h=m,v=e(1120);const w={key:0,id:"router-root",class:"not-found-wrap"},b=(0,r._)("h1",null,"Page Not Found",-1),_=(0,r._)("p",null,"Sorry, it seems the page you are looking for does not exist.",-1),y={key:1,id:"router-root",class:"not-found-wrap connection-error"},k=(0,r._)("h1",null,"Connection Error",-1),P=(0,r._)("p",null,"We encountered an issue with the server, please try again later.",-1),A=[k,P],T={key:2,id:"router-root",class:"not-found-wrap unauthorized"},j=(0,r._)("h1",null,"Unauthorized Credentials",-1),O=(0,r._)("p",null,"You have not given the proper credentials to access this page.",-1),N=[j,O];function $(n,t,e,o,i,a){const u=(0,r.up)("NavMenu"),s=(0,r.up)("MenuButton");return i.errorType?"Connection Error"==i.errorType?((0,r.wg)(),(0,r.iD)("div",y,A)):"Unauthorized"==i.errorType?((0,r.wg)(),(0,r.iD)("div",T,N)):(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",w,[b,_,(0,r.Wm)(u,{toggle:i.menuToggled,onClose:t[0]||(t[0]=n=>a.toggleMenu(!n))},null,8,["toggle"]),(0,r.Wm)(s,{onToggle:t[1]||(t[1]=n=>a.toggleMenu(n)),toggleStatus:i.menuToggled,parent:n.$options.name},null,8,["toggleStatus","parent"])]))}var C=e(2498),M=e(6153),x={components:{NavMenu:C.Z,MenuButton:M.Z},name:"NotFound",data(){return{errorType:"",menuToggled:!1}},methods:{toggleMenu(n){this.menuToggled=n}},created(){const n=v.Z.currentRoute.value.params.catchAll;this.errorType="connection-error"==n?"Connection Error":"unauthorized"==n&&"Unauthorized",document.title=this.errorType?this.errorType:"Page Not Found",document.title+="Connection Error"==this.errorType?"":` – ${this.$wpSiteName}`}};const Z=(0,d.Z)(x,[["render",$]]);var E=Z;const S=(0,o.ri)(h);async function D(){const n="http://leftyvuewp.local";S.config.globalProperties.$wpSitePath=n;try{const[t,o,r]=await Promise.all([fetch(`${n}/wp-json`).then((n=>n.json())),fetch(`${n}/wp-json/wp/v2/frontpage`).then((n=>n.json())),fetch(`${n}/wp-json/wp/v2/pages`).then((n=>n.json()))]);S.config.globalProperties.$wpSiteName=t.name,S.config.globalProperties.$wpSiteTagline=t.description,S.config.globalProperties.$frontPage=o,S.config.globalProperties.$wpPages=r.reverse(),r.forEach((n=>{const t=n.title.rendered.replace(/[^a-zA-Z0-9]+(.)/g,((n,t)=>t.toUpperCase())),r=()=>e(7002)(`./${t}Page.vue`),i=!!n.acf["add-to-menu"]&&n.acf["add-to-menu"].value,a={path:n.id==o.id?"/":`/${n.slug}`,alias:n.id==o.id?["/home","/home/"]:`/${n.slug}/`,strict:!0,name:n.id==o.id?o.title.rendered:n.title.rendered,component:r,props:{wpPageId:n.id,addToMenu:i,orderNo:n.menu_order}};v.Z.addRoute(a)})),S.use(v.Z).mount("#app")}catch(t){S.use(v.Z).mount("#app"),v.Z.push({name:"NotFound",params:{catchAll:"connection-error"}})}}v.Z.addRoute({path:"/:catchAll(.*)*",component:E,name:"NotFound"}),D()},1120:function(n,t,e){"use strict";var o=e(2483);const r=[],i=(0,o.p7)({history:(0,o.PO)(),routes:r});t["Z"]=i},2498:function(n,t,e){"use strict";e.d(t,{Z:function(){return b}});var o=e(3396),r=e(7139);const i={class:"menu-header"},a=(0,o._)("p",{class:"menu-header-text"},"Menu",-1),u=(0,o._)("span",{class:"button-text"},"Exit",-1),s=(0,o._)("div",{class:"button-item-gap"},null,-1),c=["src"],l={class:"menu-links"},d={class:"menu-link"},p={class:"menu-socials"},g=(0,o._)("span",null,"Socials  1 / 4",-1),f=["src"];function m(n,t,e,m,h,v){const w=(0,o.up)("router-link");return h.show?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,r.C_)(["menu animate__animated animate__fast",[h.inAnimation,h.outAnimation]])},[(0,o._)("div",i,[a,(0,o._)("button",{onClick:t[0]||(t[0]=n=>v.closeMenu()),class:"menu-close-button"},[u,s,(0,o._)("img",{src:h.icon,class:"button-icon close-icon"},null,8,c)])]),(0,o._)("nav",null,[(0,o._)("div",l,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.$router.getRoutes().filter((n=>!n.aliasOf&&1==n.props.default.addToMenu)).sort(((n,t)=>n.props.default.orderNo-t.props.default.orderNo)),((n,t)=>((0,o.wg)(),(0,o.j4)(w,{key:t,to:{path:n.path}},{default:(0,o.w5)((()=>[(0,o._)("span",d,(0,r.zw)(n.name),1)])),_:2},1032,["to"])))),128))])]),(0,o._)("div",p,[g,(0,o._)("img",{src:h.arrowIcon,class:"button-icon arrow-icon"},null,8,f)])],2)):(0,o.kq)("",!0)}e(7658);var h={name:"NavMenu",props:{toggle:Boolean,parent:String},data(){return{icon:e(420),arrowIcon:e(1481),show:!1,inAnimation:"",outAnimation:""}},methods:{assignData(){},closeMenu(){this.toggle?this.$emit("close",!0):this.$router.push({name:"NotFound"})}},created(){this.assignData()},mounted(){this.show=this.toggle,console.log("Page: ",this.parent)},watch:{toggle(){1==this.toggle?(this.show=this.toggle,this.outAnimation=!1,this.inAnimation="animate__slideInRight"):(this.inAnimation=!1,this.outAnimation="animate__slideOutRight",setTimeout((()=>this.show=this.toggle),800))}}},v=e(89);const w=(0,v.Z)(h,[["render",m]]);var b=w},6153:function(n,t,e){"use strict";e.d(t,{Z:function(){return p}});var o=e(3396);const r={class:"menu-button"},i=(0,o._)("span",{class:"button-text"},"Menu",-1),a=(0,o._)("div",{class:"button-item-gap"},null,-1),u=["src"];function s(n,t,e,s,c,l){return(0,o.wg)(),(0,o.iD)("button",r,[i,a,(0,o._)("img",{src:c.icon,class:"button-icon navicon"},null,8,u)])}var c={name:"MenuButton",data(){return{icon:e(5777)}}},l=e(89);const d=(0,l.Z)(c,[["render",s]]);var p=d},7002:function(n,t,e){var o={"./ContactPage.vue":[9540,540],"./ExperiencePage.vue":[1642,642],"./HomePage.vue":[9229,229],"./PageBlueprintPage.vue":[6889,889],"./WorkPage.vue":[6948,948]};function r(n){if(!e.o(o,n))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[n],r=t[0];return e.e(t[1]).then((function(){return e(r)}))}r.keys=function(){return Object.keys(o)},r.id=7002,n.exports=r},420:function(n,t,e){"use strict";n.exports=e.p+"img/close.5270fbb9.svg"},1481:function(n,t,e){"use strict";n.exports=e.p+"img/down-arrow.8d55da8d.svg"},5777:function(n,t,e){"use strict";n.exports=e.p+"img/navicon.1b6371a3.svg"},3959:function(n,t,e){"use strict";n.exports=e.p+"img/logo@4x.e8d060c8.png"}},t={};function e(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return n[o](i,i.exports,e),i.exports}e.m=n,function(){var n=[];e.O=function(t,o,r,i){if(!o){var a=1/0;for(l=0;l<n.length;l++){o=n[l][0],r=n[l][1],i=n[l][2];for(var u=!0,s=0;s<o.length;s++)(!1&i||a>=i)&&Object.keys(e.O).every((function(n){return e.O[n](o[s])}))?o.splice(s--,1):(u=!1,i<a&&(a=i));if(u){n.splice(l--,1);var c=r();void 0!==c&&(t=c)}}return t}i=i||0;for(var l=n.length;l>0&&n[l-1][2]>i;l--)n[l]=n[l-1];n[l]=[o,r,i]}}(),function(){e.n=function(n){var t=n&&n.__esModule?function(){return n["default"]}:function(){return n};return e.d(t,{a:t}),t}}(),function(){e.d=function(n,t){for(var o in t)e.o(t,o)&&!e.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:t[o]})}}(),function(){e.f={},e.e=function(n){return Promise.all(Object.keys(e.f).reduce((function(t,o){return e.f[o](n,t),t}),[]))}}(),function(){e.u=function(n){return"js/"+n+"."+{229:"d774b7ef",540:"b66b566d",642:"05f760c7",889:"253b67cf",948:"2d77237d"}[n]+".js"}}(),function(){e.miniCssF=function(n){}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)}}(),function(){var n={},t="vue:";e.l=function(o,r,i,a){if(n[o])n[o].push(r);else{var u,s;if(void 0!==i)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var d=c[l];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+i){u=d;break}}u||(s=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,e.nc&&u.setAttribute("nonce",e.nc),u.setAttribute("data-webpack",t+i),u.src=o),n[o]=[r];var p=function(t,e){u.onerror=u.onload=null,clearTimeout(g);var r=n[o];if(delete n[o],u.parentNode&&u.parentNode.removeChild(u),r&&r.forEach((function(n){return n(e)})),t)return t(e)},g=setTimeout(p.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=p.bind(null,u.onerror),u.onload=p.bind(null,u.onload),s&&document.head.appendChild(u)}}}(),function(){e.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}}(),function(){e.p="/"}(),function(){var n={143:0};e.f.j=function(t,o){var r=e.o(n,t)?n[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(e,o){r=n[t]=[e,o]}));o.push(r[2]=i);var a=e.p+e.u(t),u=new Error,s=function(o){if(e.o(n,t)&&(r=n[t],0!==r&&(n[t]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,r[1](u)}};e.l(a,s,"chunk-"+t,t)}},e.O.j=function(t){return 0===n[t]};var t=function(t,o){var r,i,a=o[0],u=o[1],s=o[2],c=0;if(a.some((function(t){return 0!==n[t]}))){for(r in u)e.o(u,r)&&(e.m[r]=u[r]);if(s)var l=s(e)}for(t&&t(o);c<a.length;c++)i=a[c],e.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return e.O(l)},o=self["webpackChunkvue"]=self["webpackChunkvue"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=e.O(void 0,[998],(function(){return e(4281)}));o=e.O(o)})();
//# sourceMappingURL=app.ebb89728.js.map