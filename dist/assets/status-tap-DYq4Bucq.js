import{r as a,a as i,w as c}from"./index-CdICfZiF.js";import{f as d,s as l}from"./index8-DtuKusXP.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const p=()=>{const e=window;e.addEventListener("statusTap",()=>{a(()=>{const n=e.innerWidth,s=e.innerHeight,o=document.elementFromPoint(n/2,s/2);if(!o)return;const t=d(o);t&&new Promise(r=>i(t,r)).then(()=>{c(async()=>{t.style.setProperty("--overflow","hidden"),await l(t,300),t.style.removeProperty("--overflow")})})})})};export{p as startStatusTap};
