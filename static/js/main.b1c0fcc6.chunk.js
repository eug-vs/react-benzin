(this["webpackJsonpreact-benzin"]=this["webpackJsonpreact-benzin"]||[]).push([[0],{99:function(e,t,n){"use strict";n.r(t);var r=n(22),a=n(2),c=n(0),i=n(10),o=n.n(i),l=n(130),s=n(142),u=n(141),d=n(137),j=n(100),h=n(134),b=Object(l.a)((function(e){return{content:{padding:e.spacing(2,2,1,3),marginBottom:e.spacing(1)}}})),p=function(e){var t=e.sectionName,n=e.children,r=e.level,c=void 0===r?0:r,i=b(),o=c+2;o>6&&(o=6);var l="h".concat(o);return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(j.a,{variant:l,children:t}),Object(a.jsx)(h.a,{variant:"middle"}),Object(a.jsx)(j.a,{component:"div",className:i.content,children:n})]})},m=n(60),f=n.n(m),v=n(61),O=n.n(v),g=n(63),x=n(135),w=n(136),y=(n(79),Object(g.a)({palette:{type:"dark",primary:{main:f.a[400]},secondary:{main:O.a[500]},background:{default:"#121212",paper:"#1e1e1e",elevation1:"#1e1e1e",elevation2:"#232323",elevation3:"#252525"},text:{primary:"#f4f4f4",secondary:"rgba(255, 255, 255, 0.6)"}}})),k=function(e){var t=e.children;return Object(a.jsxs)(x.a,{theme:y,children:[Object(a.jsx)(w.a,{}),t]})},M=n(62),N=n.n(M),L=n(101),E=Object(l.a)((function(e){return{root:{background:e.palette.background.default,padding:e.spacing(1),overflowX:"auto",fontFamily:"Monospace",scrollbarColor:"auto"}}})),R=function(e){var t=e.rawLines,n=E();return Object(a.jsx)(L.a,{variant:"outlined",className:n.root,children:t.map((function(e){return Object(a.jsx)("pre",{children:e})}))})},I=n(41),F=function(e){return{local:new RegExp("".concat(e,"([^").concat(e,"]+)").concat(e)),global:new RegExp("(".concat(e,"[^").concat(e,"]+").concat(e,")"))}},S={conceal:{global:/(!?\[.+?\]\(.+?\))(?!])/g,local:/!?\[(.*\]?.*)\]\((.+?)\)/},rawLink:{global:/((?:(?:[A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)(?:(?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/,local:/&^/},emoji:F(":"),bold:F("\\*\\*"),italic:F("\\*"),code:F("`"),strikeThrough:F("~~")},z=new RegExp(Object.values(S).map((function(e){return e.global.source})).join("|")),C=[];Object.keys(I.lib).forEach((function(e){return C.push({name:e,char:I.lib[e].char})}));var D=Object(l.a)((function(e){return{code:{background:e.palette.background.default,borderRadius:e.spacing(.5),padding:e.spacing(.5),fontFamily:"Monospace"},image:{maxWidth:"100%",maxHeight:"100%"}}})),T=function e(t){var n=t.span,r=D();if(!n)return null;var c=S.conceal.local.exec(n);if(c)return"!"===n[0]?Object(a.jsx)("img",{src:c[2],alt:c[1],className:r.image}):Object(a.jsx)(d.a,{href:c[2],children:Object(a.jsx)(e,{span:c[1]})});var i=n.match(S.emoji.local);if(i){var o=C.find((function(e){return e.name===i[1]}));return Object(a.jsx)("span",{children:o?o.char:n})}var l=n.match(S.code.local);if(l)return Object(a.jsx)("span",{className:r.code,children:l[1]});var s=n.match(S.bold.local);if(s)return Object(a.jsx)("b",{children:s[1]});var u=n.match(S.italic.local);if(u)return Object(a.jsx)("i",{children:u[1]});var j=n.match(S.strikeThrough.local);return j?Object(a.jsx)("span",{style:{textDecoration:"line-through"},children:j[1]}):n.match(S.rawLink.global)?Object(a.jsx)(d.a,{href:n,children:n}):Object(a.jsx)(a.Fragment,{children:n})},H=function(e){var t=e.line;return Object(a.jsx)(a.Fragment,{children:t.split(z).map((function(e){return Object(a.jsx)(T,{span:e})}))})},B=function(e){return null!==e.match(/^\s*```.*$/)},A=function(e){return null!==e.match(/^ ?[-*] .*$/)},$=function(e,t){var n=new RegExp("</".concat(t,"[^<]*>"));return null!==e.match(n)},_=function(e){return null!==e.match(/\\\|$/)},Z=function e(t){var n=t.rawLines;if(!n.length)return null;var c,i=n.splice(0,1)[0];if(B(i)){var o=n.findIndex((function(e){return B(e)})),l=n.splice(0,o+1).slice(0,o);c=Object(a.jsx)(R,{rawLines:l})}else if(A(i)){var s=n.findIndex((function(e){return!A(e)})),u=n.splice(0,s).slice(0,s);u.unshift(i),c=Object(a.jsx)("ul",{children:u.map((function(e){return Object(a.jsx)("li",{children:Object(a.jsx)(H,{line:e.slice(2)})})}))})}else if(c=function(e){var t=/<([^/\s]*)[^<]*[^/]>/g.exec(e);return t?t[1]:""}(i)){var d=c,j=$(i,d)?-1:n.findIndex((function(e){return $(e,d)})),h=n.splice(0,j+1);h.unshift(i),c=Object(a.jsx)("div",{dangerouslySetInnerHTML:{__html:h.join("\n")}})}else if(null!==(c=function(e){return e.match(/(<[^/\s]*[^<]*\/>)/g)}(i))){var b=c[0],p=i.split(b),m=Object(r.a)(p,2),f=m[0],v=m[1];c=Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(H,{line:f}),Object(a.jsx)("div",{dangerouslySetInnerHTML:{__html:b}}),Object(a.jsx)(H,{line:v})]})}else if(_(i)){var O=n.findIndex((function(e){return!_(e)})),g=n.splice(0,O).map((function(e){return e.slice(0,-2)}));g.unshift(i.slice(0,-2)),g.push(n.splice(0,1)[0]),c=Object(a.jsx)("p",{children:g.map((function(e){return Object(a.jsx)(H,{line:e})}))})}else c=$(i,"")?null:Object(a.jsx)("p",{children:Object(a.jsx)(H,{line:i})});return Object(a.jsxs)(a.Fragment,{children:[c,Object(a.jsx)(e,{rawLines:n})]})},P=function(e){if(!e)return 0;for(var t=0;"#"===e[t];)t+=1;return t},W=function(e){var t=e.rawLines,n=e.level,r=void 0===n?0:n,c=e.SectionComponent,i=t.reduce((function(e,t){return t&&(P(t)===r&&e.push([]),e.length&&e[e.length-1].push(t)),e}),[]).map((function(e){return Object(a.jsx)(c,{rawLines:e,level:r})}));return Object(a.jsx)(a.Fragment,{children:i})},G=function e(t){var n=t.rawLines,r=t.level,c=void 0===r?0:r,i=n.findIndex((function(e){return e.match("^#{".concat(c+1,",} .*$"))})),o=n.splice(0,i<0?n.length:i);if(!c)return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(j.a,{children:Object(a.jsx)(Z,{rawLines:o})}),Object(a.jsx)(W,{rawLines:n,level:P(n[0]),SectionComponent:e})]});var l=o.splice(0,1)[0].slice(c).trim(),s=P(n[0]);return Object(a.jsxs)(p,{sectionName:l,level:c,children:[Object(a.jsx)(Z,{rawLines:o}),Object(a.jsx)(W,{rawLines:n,level:s,SectionComponent:e})]})},J=function(e){var t=e.data,n=e.url,i=Object(c.useState)(t||""),o=Object(r.a)(i,2),l=o[0],s=o[1];n&&N.a.get(n).then((function(e){return s(e.data)})),Object(c.useEffect)((function(){n||s(t||"")}),[t,n]);var u=(null===n||void 0===n?void 0:n.slice(0,n.lastIndexOf("/")))||"",d=l.split(/\r?\n/).map((function(e){return function(e,t){return e.replace(/src="(?!http)(.*)"[\s>]/,(function(e,n){return'src="'.concat(t,"/").concat(n,'?sanitize=true"')})).replace(/\[(.*\]?.*)\]\((?!http)(.+?)\)/,(function(e,n,r){return"[".concat(n,"](").concat(t,"/").concat(r,")")}))}(e,u)}));return Object(a.jsx)(G,{rawLines:d})},Y=n(138),X=n(139),q=n(143),K=n(140),Q=Object(l.a)((function(e){return{root:{background:e.palette.background.elevation2,color:e.palette.text.primary,paddingLeft:e.spacing(3)},logo:{margin:e.spacing(0,3,0,1)},tab:{"& .MuiTab-wrapper":{padding:e.spacing(2),flexDirection:"row",fontSize:"0.8125rem","& svg":{marginRight:e.spacing(1),marginBottom:"0 !important"}}}}})),U=function(e){var t=e.logo,n=e.contents,r=e.page,c=e.setPage,i=Q();return Object(a.jsx)(Y.a,{position:"sticky",className:i.root,children:Object(a.jsxs)(X.a,{children:[t.icon,Object(a.jsx)(j.a,{variant:"h5",className:i.logo,color:"primary",children:t.title}),Object(a.jsx)(q.a,{onChange:function(e,t){c(t)},value:r,children:n&&Object.keys(n).map((function(e){return Object(a.jsx)(K.a,{label:e,icon:n[e],value:e,className:i.tab},e)}))})]})})},V=n(42),ee=Object(l.a)((function(e){return{surface:{position:"absolute",display:"flex",flexDirection:"column",overflowY:"auto",scrollbarColor:"".concat(e.palette.secondary.dark," ").concat(e.palette.secondary.light),"& a.MuiTypography-root":{color:e.palette.primary.light}}}})),te=function(e){var t=e.size,n=e.position,r=e.children,c=ee();return Object(a.jsx)(L.a,{variant:"outlined",style:Object(V.a)(Object(V.a)({},t),n),className:c.surface,children:r})},ne=Object(l.a)((function(e){return{header:{padding:e.spacing(1,0,1,2),background:e.palette.background.elevation2}}})),re=function(e){var t=e.type,n=e.name,r=e.children,c=ne(),i={height:"85vh"},o={bottom:"3vh"};return"primary"===t?(i.width="63vw",o.left="2vw"):"secondary"===t?(i.width="31vw",o.right="2vw"):"mono"===t&&(o.left="2vw",o.right="2vw"),Object(a.jsxs)(te,{size:i,position:o,children:[n&&Object(a.jsxs)("div",{children:[Object(a.jsx)(j.a,{variant:"h5",className:c.header,children:n}),Object(a.jsx)(h.a,{})]}),r]})},ae=n.p+"static/media/icon.50d2b01a.svg",ce=Object(l.a)((function(e){return{window:{padding:e.spacing(4)},promoButton:{display:"flex",justifyContent:"center",marginTop:e.spacing(4)}}})),ie=Object(a.jsx)("img",{src:ae,width:"32px",height:"37px",alt:"logo"}),oe={home:null,spacevim:null,"material-ui":null,custom:null,"live preview":null},le={home:"https://raw.githubusercontent.com/eug-vs/react-benzin/develop/README.md",spacevim:"https://raw.githubusercontent.com/spacevim/spacevim/master/README.md","material-ui":"https://raw.githubusercontent.com/mui-org/material-ui/master/README.md"},se=function(){var e=Object(c.useState)(""),t=Object(r.a)(e,2),n=t[0],i=t[1],o=Object(c.useRef)(null);return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)(p,{sectionName:"Render custom markdown document",level:2,children:[Object(a.jsx)("p",{children:"This should be a link to a valid markdown file. Response should give the file contents. If you copy README file from GitHub, make sure you provide link to raw view."}),Object(a.jsx)("p",{children:Object(a.jsx)(s.a,{fullWidth:!0,inputRef:o,variant:"outlined",color:"secondary",label:"Markdown url"})}),Object(a.jsx)(u.a,{variant:"contained",color:"secondary",onClick:function(){var e;i((null===(e=o.current)||void 0===e?void 0:e.value)||"")},children:"Render!"})]}),Object(a.jsx)(J,{url:n})]})},ue=function(e){var t=e.setLivePreviewData,n=Object(c.useRef)(null);return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)(p,{sectionName:"Markdown live preview",level:2,children:[Object(a.jsxs)("p",{children:["Start typing and see your text rendered on the left window! You can find the list of all Markdown features"," ",Object(a.jsx)(d.a,{href:"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet",children:"here"}),". (some of them are yet in progress). We recommend starting with # Header."]}),Object(a.jsx)("p",{children:Object(a.jsx)(s.a,{fullWidth:!0,multiline:!0,inputRef:n,variant:"outlined",color:"primary",label:"Markdown",onChange:function(){var e;t((null===(e=n.current)||void 0===e?void 0:e.value)||"")}})})]})})},de=function(){var e=ce(),t=Object(c.useState)("home"),n=Object(r.a)(t,2),i=n[0],o=n[1],l=Object(c.useState)(""),s=Object(r.a)(l,2),d=s[0],j=s[1],h=le[i],b=null===h||void 0===h?void 0:h.slice(h.lastIndexOf("/")+1),p=["## Markdown\n [Markdown file](".concat(h,") *(...").concat(b,")* that you can see on the left was parsed and rendered by **BENZIN**! :rocket:"),"Switch between tabs on the header to explore other markdown templates. :recycle: ","Templates on the left are being loaded from the [GitHub](https://github.com), though this pane is generated from plaintext. :pen:","## How do I use this feature?","```","import Markdown from 'react-benzin';","const data = '# Header\\nHello, *world!*';","ReactDOM.render(<Markdown data={data}/>, document.getElementById('root'));","```"].join("\n"),m=Object(a.jsx)(J,{url:h});return"custom"===i?m=Object(a.jsx)(se,{}):"live preview"===i&&(m=Object(a.jsx)(J,{data:d||"# Start typing in the right window!"})),Object(a.jsxs)(k,{children:[Object(a.jsx)(U,{logo:{icon:ie,title:"BENZIN"},contents:oe,page:i,setPage:o}),Object(a.jsx)(re,{type:"primary",children:Object(a.jsx)("div",{className:e.window,children:m})}),Object(a.jsx)(re,{type:"secondary",name:"Feature preview",children:Object(a.jsx)("div",{className:e.window,children:"live preview"===i?Object(a.jsx)(ue,{setLivePreviewData:j}):Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(J,{data:p}),Object(a.jsx)("p",{className:e.promoButton,children:Object(a.jsx)(u.a,{variant:"contained",color:"primary",size:"large",onClick:function(){o("live preview")},children:"Try it yourself!"})})]})})})]})};o.a.render(Object(a.jsx)(de,{}),document.getElementById("root"))}},[[99,1,2]]]);
//# sourceMappingURL=main.b1c0fcc6.chunk.js.map