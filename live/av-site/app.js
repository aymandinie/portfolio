/* TAC redesign v2 — renderer. All copy comes from content.js (verbatim from tac.com.my / tac.com.my/cn). */
(()=>{
'use strict';
const T=window.TAC, M=T.media||{};
const I='assets/img/';
const WA='https://wa.me/60196373131';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let lang=(()=>{try{return localStorage.getItem('tac-lang')==='zh'?'zh':'en'}catch(e){return 'en'}})();
const C=()=>T[lang];
const U=()=>C().ui||{};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const nl=s=>esc(s).replace(/\n/g,'<br>');
const arr=x=>Array.isArray(x)?x:(x==null||x===''?[]:[x]);
const SVG={
  ar:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
  ne:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>',
  l:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4"/></svg>',
  play:'<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/></svg>'
};
const IC={
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  tel:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>'
};
const WORD='<svg class="tacword" viewBox="40 6 440 166" aria-hidden="true"><g fill="currentColor"><path class="l1" d="M41 9h135v32h-50v129h-35V41H41z"/><path class="l2" d="M228 9h36l59 161h-37l-40.5-115L205 170h-37z"/><path class="l3" d="M475.7 33.5A83 83 0 1 0 475.7 144.5L449.7 121.1A48 48 0 1 1 449.7 56.9Z"/></g></svg>';

/* ---------- ids & media ---------- */
const RES=['41105','41106','41107','41108','41109','41111','41113','41114','41115'];
const COM=['41120','41123','41125','41117'];
const SIMG={41105:'s-smarthome.webp',41106:'s-lighting.webp',41107:'s-av.webp',41108:'s-theatre.webp',41109:'s-karaoke.webp',41111:'s-shades.webp',41113:'s-lightdesign.webp',41114:'s-network.webp',41115:'s-security.webp',41117:'s-retail.webp',41120:'s-offices.webp',41123:'s-hotels.webp',41125:'s-towers.webp'};
const sImg=id=>I+((M.svc&&M.svc[id])||SIMG[id]);
const svcIds=()=>{const s=C().svc||{};return [...RES,...COM].filter(id=>s[id])};
const projIds=()=>{const p=C().projects||{};const o=[...arr(p.resOrder),...arr(p.comOrder)];return (o.length?o:Object.keys(C().proj||{})).filter(id=>C().proj?.[id])};
const pMedia=id=>(M.proj&&M.proj[id])||{};
const pCover=id=>I+(pMedia(id).cover||'');
const newsItems=()=>{const n=C().news||{};let it=arr(n.items);if(!it.length)it=Object.keys(C().articles||{}).map(k=>({nid:k,...C().articles[k]}));return it};
const aCover=nid=>I+((M.articles&&M.articles[nid]&&M.articles[nid].cover)||('n-'+nid+'.webp'));
const pillarImg={light:'p-light.webp',sound:'p-sound.webp',visual:'p-visual.webp',control:'p-control.webp'};
const pillarSvc={light:'41106',sound:'41109',visual:'41107',control:'41105'};

/* ---------- small partials ---------- */
const words=(s,base=0)=>{
  const str=String(s??'');
  // CJK: split per character so it can wrap and stagger; Latin: per word
  if(/[㐀-鿿]/.test(str)) return [...str].map((ch,i)=>`<span class="w" style="--i:${base+i}"><span>${esc(ch)}</span></span>`).join('');
  return str.split(/(\s+)/).map((w,i)=>/^\s+$/.test(w)?' ':`<span class="w" style="--i:${base+i}"><span>${esc(w)}</span></span>`).join('');
};
const para=x=>Array.isArray(x)?x.join('\n\n'):x;
const kick=s=>s?`<span class="kicker">${esc(s)}</span>`:'';
const btn=(href,label,cls='',ext=false)=>`<a class="btn ${cls}" href="${href}"${ext?' target="_blank" rel="noopener"':''}><span>${esc(label)}</span><span class="ci">${ext?SVG.ne:SVG.ar}</span></a>`;
const tl=(href,label)=>`<a class="tlink" href="${href}">${esc(label)} <span class="ar">${SVG.ar}</span></a>`;
const crumbs=list=>list.map((c,i)=>i<list.length-1?`<a href="${c[1]}">${esc(c[0])}</a><span aria-hidden="true">/</span>`:`<span>${esc(c[0])}</span>`).join('');
const card=({href,img,title,sub,small,cls='',ar,d=0,attrs=''})=>`<a class="card rv ${cls}" href="${href}" style="--d:${d}${ar?';--ar:'+ar:''}" ${attrs}><div class="im"><img src="${img}" alt="" loading="lazy"></div><div class="cap"><div>${small?`<small>${esc(small)}</small>`:''}<h3>${esc(title)}</h3>${sub?`<p>${esc(sub)}</p>`:''}</div><span class="circ">${SVG.ne}</span></div></a>`;
const ncard=(n,d=0)=>`<a class="ncard rv" style="--d:${d}" href="#n-${n.nid}"><div class="im"><img src="${aCover(n.nid)}" alt="" loading="lazy"></div><time>${esc(n.date)}</time><h3>${esc(n.t)}</h3>${n.excerpt?`<p>${esc(n.excerpt)}</p>`:''}</a>`;
const shead=(title,desc,kicker,link)=>`<div class="shead"><div class="t">${kick(kicker)}<h2 class="h-1 wl">${title}</h2></div>${desc||link?`<div class="d rv" style="--d:2">${desc?arr(desc).map(d=>`<p>${nl(d)}</p>`).join(''):''}${link||''}</div>`:''}</div>`;
// TAC motif: first line pill-outlined keyword, second line plain
const pillHead=(a,b)=>`<span class="pill">${words(a)}</span>${b?`<br>${words(b,4)}`:''}`;

/* sub-page hero (image) */
const ph=(img,title,cr,sub)=>`
<div class="ph-wrap"><section class="ph${reduce?'':' enter'}" data-par>
  <div class="frame"><img src="${img}" alt=""><div class="shade"></div></div>
  <div class="copy"><div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">${crumbs(cr)}</nav>
    <h1>${words(title)}</h1>${sub?`<p class="sub">${nl(sub)}</p>`:''}
  </div></div>
</section></div>`;
const home=()=>[U().breadcrumbHome||U().nav?.home||'Home','#home'];
const ctaPanel=()=>{const c=C().home?.cta||{};return `
<section class="sec tight"><div class="panel cta-panel rv">
  <h2 class="wl">${words(c.before)} <em>${esc(c.accent)}</em> ${words(c.after,8)}</h2>
  <p>${nl(c.sub)}</p>
  ${btn('#contact',C().home?.buttons?.cta||U().nav?.contact,'')}
</div></section>`};

/* forms */
const fld=(id,label,type='text',req=false,full=false,extra='')=>`<div class="fld${full?' full':''}">${type==='textarea'?`<textarea id="${id}" placeholder=" "${req?' required':''}></textarea>`:`<input id="${id}" type="${type}" placeholder=" "${req?' required':''} ${extra}>`}<label for="${id}">${esc(label)}</label></div>`;
const apptForm=(pre)=>{const a=U().appointment||{};const s=C().svc||{};return `
<form class="tacform" novalidate><div class="fgrid">
  ${fld('a-name',a.name||'Name*','text',true,true)}
  ${fld('a-tel',a.contactNo||'Contact No','tel')}
  ${fld('a-mail',a.email||'Email Address','email')}
  ${fld('a-date',a.date||'Date','date')}
  ${fld('a-time',a.time||'Time','time')}
  <div class="fld full"><select id="a-type">${svcIds().map(id=>`<option value="${id}"${id===pre?' selected':''}>${esc(s[id].t)}</option>`).join('')}</select><label for="a-type">${esc(a.type||'Appointment Type')}</label></div>
</div><div class="form-actions">
  <button class="btn" type="submit"><span>${esc(a.send||'Send')}</span><span class="ci">${SVG.ar}</span></button>
  <a class="btn ghost" href="${WA}" target="_blank" rel="noopener"><span>${esc(U().whatsapp||'WhatsApp Us')}</span><span class="ci">${SVG.ne}</span></a>
</div><p class="fmsg" role="status" aria-live="polite"></p></form>`};
const inqForm=()=>{const q=U().inquiry||{};return `
<form class="tacform" novalidate><div class="fgrid">
  ${fld('q-name',q.name||'Name*','text',true,true)}
  ${fld('q-mail',q.email||'Email*','email',true)}
  ${fld('q-tel',q.contact||'Contact Number*','tel',true)}
  ${fld('q-msg',q.message||'Message (optional)','textarea',false,true)}
</div><div class="form-actions"><button class="btn" type="submit"><span>${esc(q.send||'Send Message')}</span><span class="ci">${SVG.ar}</span></button></div><p class="fmsg" role="status" aria-live="polite"></p></form>`};
const prose=list=>arr(list).map(b=>{
  if(typeof b==='string') return `<p>${nl(b)}</p>`;
  if(b.h) return `<h2>${nl(b.h)}</h2>`;
  if(b.p) return `<p>${nl(b.p)}</p>`;
  if(b.li) return `<ul>${arr(b.li).map(x=>`<li>${nl(x)}</li>`).join('')}</ul>`;
  if(b.img) return `<figure><img src="${I+b.img}" alt="" loading="lazy"></figure>`;
  if(b.q) return `<blockquote><p>${nl(b.q)}</p></blockquote>`;
  return '';
}).join('');

/* =========================================================
   VIEWS
   ========================================================= */
const V={};

V.home=()=>{const h=C().home||{},ab=h.about||{},pa=h.partners||{},nw=h.news||{};
  const hero=arr(h.hero);const l1=hero[0]||'SMART LIVING',l2=hero.slice(1).join(' ')||'& SEAMLESS CONNECTIVITY';
  const paras=arr(ab.paras);
  return `
<div class="hero-wrap"><section class="hero" id="hero">
  <div class="frame">
    <img class="poster" src="${I}hero-poster.jpg" alt="">
    <video id="heroVid" src="assets/video/hero.mp4" poster="${I}hero-poster.jpg" autoplay muted loop playsinline preload="auto"></video>
    <div class="shade"></div>
  </div>
  <div class="copy"><h1><span class="ln"><span class="g">${esc(l1)}</span></span><span class="ln"><span>${esc(l2)}</span></span></h1></div>
  <div class="meta"><button class="vctl" id="vctl" aria-pressed="false" aria-label="Pause / play"><i>❚❚</i></button></div>
  <span class="scue" aria-hidden="true"></span>
</section></div>
<div class="page">
  <section class="sec"><div class="wrap">
    ${shead(pillHead(arr(h.pillarsTitle)[0],arr(h.pillarsTitle)[1]),'', '', '')}
    <div class="grid g4 pillars">${arr(h.pillars).map((p,i)=>card({href:'#svc-'+(pillarSvc[p.key]||'41105'),img:I+(pillarImg[p.key]||'p-light.webp'),title:p.t,sub:p.d,d:i})).join('')}</div>
  </div></section>

  <section class="panel about-panel"><div class="wrap inner">
    <div class="lhs"><span class="kicker rv"><span class="pill">${esc(ab.kicker)}</span></span><h2 class="wl">${words(ab.title)}</h2></div>
    <div class="rhs">
      <p class="lead rv">${nl(paras[0])}</p>
      <div class="cols">${paras.slice(1,-1).map((p,i)=>`<p class="rv" style="--d:${i%3}">${nl(p)}</p>`).join('')}</div>
      ${paras.length>1?`<p class="close-line rv">${nl(paras[paras.length-1])}</p>`:''}
      <div class="rv" style="margin-top:34px">${btn('#about',h.buttons?.about||U().readMore,'ghost')}</div>
    </div>
  </div></section>

  <section class="sec partners"><div class="wrap">
    ${shead(pillHead(pa.kicker,pa.title),pa.sub)}
    <div>${arr(pa.items).map((it,i)=>{const k=(it.name||'').toLowerCase().includes('cres')?'crestron':'lutron';return `
      <div class="row rv">
        <div class="vid ri"><video data-autoplay src="assets/video/${k}.mp4" muted loop playsinline preload="metadata" poster=""></video></div>
        <div class="info"><span class="n">${esc(it.label)}</span><img src="${I+k}.webp" alt="${esc(it.name)}">${h.buttons?.partner?`<div>${btn(k==='lutron'?'https://www.lutron.com':'https://www.crestron.com',h.buttons.partner,'ghost',true)}</div>`:''}</div>
      </div>`}).join('')}</div>
  </div></section>

  <section class="panel tint sec"><div class="wrap">
    ${shead(pillHead(nw.kicker,nw.title),nw.sub,'',`<div class="rail-ctl" style="margin-top:20px"><button data-rail="-1" aria-label="Previous">${SVG.l}</button><button data-rail="1" aria-label="Next">${SVG.ar}</button></div>`)}
    <div class="rail" id="rail">${newsItems().map((n,i)=>ncard(n,Math.min(i,3))).join('')}</div>
    <div class="rail-prog"><i id="railbar"></i></div>
    <div class="rv" style="margin-top:36px">${tl('#news',U().nav?.news||'Blog & Latest News')}</div>
  </div></section>

  ${ctaPanel()}
</div>`};

V.about=()=>{const a=C().about||{},am=M.about||{};const ms=arr(a.milestone?.items),msImg=arr(M.milestones);
  const vimg=arr(am.values).map(v=>v.bg);
  const whyImg=arr(am.why);
  const certs=arr(am.certs).length?arr(am.certs):['award1.webp','award2.webp','award3.webp','award4.webp','award5.webp','award6.webp','award7.webp','award8.webp'];
  const wt=arr(a.who?.title);
  return `
${ph(I+(am.hero||'keypad.jpg'),a.title,[home(),[a.title,'#about']])}
<div class="page">
  <section class="statement"><div class="wrap">
    <h2 class="wl">${words(a.heading)}</h2>
    ${a.subheading?`<p class="rv">${nl(a.subheading)}</p>`:''}
  </div></section>

  <section class="panel tint"><div class="wrap who">
    <div class="l">${kick(a.who?.kicker)}<h2 class="wl">${words(wt[0])}${wt[1]?`<br><span class="pill">${esc(wt[1])}</span>`:''}</h2></div>
    <div class="r"><p class="lead rv">${nl(a.who?.text)}</p>
      <div class="dealers">
        <div class="rv"><small>${esc(a.dealer)}</small><img src="${I}lutron.webp" alt="Lutron"></div>
        <div class="rv" style="--d:1"><small>${esc(a.solutionPartner)}</small><img src="${I}crestron.webp" alt="Crestron"></div>
      </div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap"><div class="grid g3 vmv">
    ${arr(a.values).map((v,i)=>`<div class="card rv" style="--d:${i}"><div class="im"><img src="${I+vimg[i%3]}" alt="" loading="lazy"></div><div class="cap"><h3>${esc(v.t)}</h3><p>${nl(v.d)}</p></div></div>`).join('')}
  </div></div></section>

  <section class="sec" style="padding-top:0"><div class="wrap spec">
    <div class="im ri"><img src="${I+am.specialization}" alt="" loading="lazy"></div>
    <div class="tx"><h2 class="wl">${words(a.specialization?.title)}</h2>${a.specialization?.subtitle?`<h3 class="rv">${esc(a.specialization.subtitle)}</h3>`:''}
      <ol>${arr(a.specialization?.items).map((x,i)=>`<li class="rv" style="--d:${i}">${esc(x)}</li>`).join('')}</ol></div>
  </div></section>

  <section class="panel tint sec"><div class="wrap"><div class="why">
    ${arr(a.why).map((w,i)=>`<article class="rv" style="--d:${i}"><div class="im ri"><img src="${I+whyImg[i%2]}" alt="" loading="lazy"></div><div class="tx">${kick(w.kicker)}<h3>${esc(w.title)}</h3><p>${nl(w.text)}</p></div></article>`).join('')}
  </div></div></section>

  <section class="sec"><div class="wrap">
    ${shead(words(a.certTitle),'','', `<div class="rail-ctl"><button data-rail="-1" data-target="certs" aria-label="Previous">${SVG.l}</button><button data-rail="1" data-target="certs" aria-label="Next">${SVG.ar}</button></div>`)}
    <div class="certs" id="certs">${certs.map((c,i)=>`<button class="rv" style="--d:${Math.min(i,4)}" data-lb="${I+c}"><img src="${I+c}" alt="" loading="lazy"></button>`).join('')}</div>
  </div></section>

  <section class="panel tint sec"><div class="wrap">
    ${shead(words(a.milestone?.title))}
    <ol class="tl" style="list-style:none;margin:0;padding:0">${ms.map((m,i)=>`<li class="rv" style="--d:${Math.min(i,4)}"><b>${esc(m.years)}</b>${msImg[i]?`<div class="im"><img src="${I+msImg[i]}" alt="" loading="lazy"></div>`:''}<p>${nl(m.text)}</p></li>`).join('')}</ol>
  </div></section>

  ${ctaPanel()}
</div>`};

V.services=()=>{const s=C().services||{},n=U().nav||{},sv=C().svc||{};
  const block=(ids,label,href,d)=>`<div class="slist"><div class="h"><h2 class="wl">${words(label)}</h2><div class="rv" style="margin-top:18px">${tl(href,U().viewMore||label)}</div></div><div class="grid g3">${ids.filter(id=>sv[id]).map((id,i)=>card({href:'#svc-'+id,img:sImg(id),title:sv[id].t,d:i%3})).join('')}</div></div>`;
  return `
${ph(I+'s-theatre.webp',s.title||n.services,[home(),[s.title||n.services,'#services']],s.intro)}
<div class="page"><section class="sec"><div class="wrap">
  <div class="cats" style="margin-bottom:clamp(48px,6vw,96px)">
    ${card({href:'#residential',img:sImg('41111'),title:C().residential?.title||n.residential,small:(C().residential?.heading)||'',ar:'16/11'})}
    ${card({href:'#commercial',img:sImg('41120'),title:C().commercial?.title||n.commercial,small:(C().commercial?.heading)||'',ar:'16/11',d:1})}
  </div>
  ${block(RES,C().residential?.title||n.residential,'#residential')}
  ${block(COM,C().commercial?.title||n.commercial,'#commercial')}
</div></section>${ctaPanel()}</div>`};

const catView=(key,ids,img)=>()=>{const c=C()[key]||{},n=U().nav||{},sv=C().svc||{};return `
${ph(img,c.title,[home(),[C().services?.title||n.services,'#services'],[c.title,'#'+key]])}
<div class="page"><section class="sec"><div class="wrap">
  ${shead(words(c.heading),c.intro)}
  <div class="grid g3">${ids.filter(id=>sv[id]).map((id,i)=>card({href:'#svc-'+id,img:sImg(id),title:sv[id].t,small:c.title,d:i%3,ar:'4/5'})).join('')}</div>
</div></section>${ctaPanel()}</div>`};
V.residential=catView('residential',RES,I+'values.webp');
V.commercial=catView('commercial',COM,I+'s-hotels.webp');

const svcView=id=>()=>{const s=C().svc[id],n=U().nav||{},isRes=RES.includes(id);
  const catKey=isRes?'residential':'commercial',cat=C()[catKey]?.title||s.cat;
  const paras=arr(s.paras);const more=(isRes?RES:COM).filter(x=>x!==id&&C().svc[x]);
  const a=U().appointment||{};
  return `
<div class="page" style="border-radius:0 0 var(--r-lg) var(--r-lg)"><div class="wrap sd-top">
  <div class="t"><nav class="crumbs" aria-label="Breadcrumb">${crumbs([home(),[C().services?.title||n.services,'#services'],[cat,'#'+catKey],[s.t,'#svc-'+id]])}</nav>
    <h1 class="wl">${words(s.t)}</h1><span class="tag rv">${esc(cat)}</span></div>
  <div class="im ri"><img src="${sImg(id)}" alt="${esc(s.t)}"></div>
</div>
<div class="wrap sd-body">
  <p class="lead rv">${nl(paras[0])}</p>
  <div class="prose rv" style="--d:1">${prose(paras.slice(1))}</div>
</div>
<section class="panel tint"><div class="form-panel">
  <div class="l"><h2 class="wl">${words(a.title||'Make Appointment')}</h2><p class="rv">${nl(a.note)}</p></div>
  ${apptForm(id)}
</div></section>
<section class="sec"><div class="wrap">
  ${shead(words(U().moreServices||'More Services'),'','',`<div class="rail-ctl"><button data-rail="-1" aria-label="Previous">${SVG.l}</button><button data-rail="1" aria-label="Next">${SVG.ar}</button></div>`)}
  <div class="rail" id="rail">${more.map((x,i)=>card({href:'#svc-'+x,img:sImg(x),title:C().svc[x].t,d:Math.min(i,3),ar:'1/1'})).join('')}</div>
  <div class="rail-prog"><i id="railbar"></i></div>
</div></section>
${ctaPanel()}</div>`};

V.projects=()=>{const p=C().projects||{},n=U().nav||{},pr=C().proj||{};const ids=projIds();
  const resL=p.residential||n.residential,comL=p.commercial||n.commercial;
  const catOf=id=>pMedia(id).cat||(T.en.proj[id]?.cat||'').toLowerCase();
  const cnt=k=>ids.filter(id=>catOf(id)===k).length;
  return `
${ph(pCover('5797359')||I+'pr-stregis.webp',p.title||n.projects,[home(),[p.title||n.projects,'#projects']],p.intro)}
<div class="page"><section class="sec"><div class="wrap">
  <div class="pbar"><div class="chips" role="group">
    <button data-f="residential" aria-pressed="false">${esc(resL)}<sup>${cnt('residential')}</sup></button>
    <button data-f="commercial" aria-pressed="false">${esc(comL)}<sup>${cnt('commercial')}</sup></button>
  </div></div>
  <div class="pintro" data-for="residential" hidden><div class="shead"><div class="t"><h2 class="h-1">${esc(p.resTitle||resL)}</h2></div><div class="d">${arr(p.resIntro).map(x=>`<p>${nl(x)}</p>`).join('')}</div></div></div>
  <div class="pintro" data-for="commercial" hidden><div class="shead"><div class="t"><h2 class="h-1">${esc(p.comTitle||comL)}</h2></div><div class="d">${arr(p.comIntro).map(x=>`<p>${nl(x)}</p>`).join('')}</div></div></div>
  <div class="grid g4 pgrid" id="pgrid">${ids.map((id,i)=>card({href:'#p-'+id,img:pCover(id),title:pr[id].t,small:pr[id].cat,cls:id==='5797564'?'contain':'',d:i%4,attrs:`data-cat="${catOf(id)}"`})).join('')}</div>
</div></section>${ctaPanel()}</div>`};

const projView=id=>()=>{const p=C().proj[id],n=U().nav||{},pm=pMedia(id);const desc=arr(p.desc);
  const gal=[pm.cover,...arr(pm.gallery)].filter(Boolean).filter((x,i,a)=>a.indexOf(x)===i);
  const rel=projIds().filter(x=>x!==id&&(pMedia(x).cat||'')===(pm.cat||'')).slice(0,8);
  const q=U().inquiry||{};
  return `
${ph(pCover(id),p.t,[home(),[C().projects?.title||n.projects,'#projects'],[p.cat,'#projects'],[p.t,'#p-'+id]])}
<div class="page">
  <section><div class="wrap pd-top">
    <p class="lead rv">${nl(desc[0])}</p>
    <div class="prose rv" style="--d:1">${prose(desc.slice(1))}${p.extra?prose(p.extra):''}</div>
  </div></section>
  ${gal.length>1?`<section style="padding-bottom:var(--sec)"><div class="wrap"><div class="gallery">${gal.map((g,i)=>`<button class="rv" style="--d:${i%3}" data-lb="${I+g}" aria-label="${esc(p.t)}"><img src="${I+g}" alt="" loading="lazy"></button>`).join('')}</div></div></section>`:''}
  <section class="panel tint"><div class="form-panel">
    <div class="l"><h2 class="wl">${words((q.titlePrefix||'Inquiry - ')+p.t)}</h2>
      <div class="rv">${btn(WA+'?text='+encodeURIComponent('Hello, I am interested in '+(T.en.proj[id]?.t||p.t)+'.'),U().whatsapp||'WhatsApp Us','lime',true)}</div></div>
    ${inqForm()}
  </div></section>
  ${rel.length?`<section class="sec"><div class="wrap">
    ${shead(words(U().relatedProducts||''),'','',`<div class="rail-ctl"><button data-rail="-1" aria-label="Previous">${SVG.l}</button><button data-rail="1" aria-label="Next">${SVG.ar}</button></div>`)}
    <div class="rail" id="rail">${rel.map((x,i)=>card({href:'#p-'+x,img:pCover(x),title:C().proj[x].t,small:C().proj[x].cat,d:Math.min(i,3),cls:x==='5797564'?'contain':''})).join('')}</div>
    <div class="rail-prog"><i id="railbar"></i></div>
  </div></section>`:''}
  ${ctaPanel()}
</div>`};

V.news=()=>{const nw=C().news||{},n=U().nav||{};const it=newsItems();const f=it[0];
  return `
${ph(aCover(f.nid),nw.title||n.news,[home(),[nw.title||n.news,'#news']],nw.intro)}
<div class="page"><section class="sec"><div class="wrap">
  <a class="feature rv" href="#n-${f.nid}"><div class="im"><img src="${aCover(f.nid)}" alt=""></div>
    <div class="tx"><time>${esc(f.date)}</time><h2>${esc(f.t)}</h2>${f.excerpt?`<p>${esc(f.excerpt)}</p>`:''}<span class="tlink">${esc(U().readMore||'Read More')} <span class="ar">${SVG.ar}</span></span></div></a>
  <div class="jgrid" style="margin-top:clamp(56px,7vw,110px);padding-top:clamp(40px,5vw,72px);border-top:1px solid var(--line-2)">${it.slice(1).map((x,i)=>ncard(x,i%3)).join('')}</div>
</div></section>${ctaPanel()}</div>`};

const artView=nid=>()=>{const a=C().articles[nid],n=U().nav||{};const it=newsItems();const ix=it.findIndex(x=>String(x.nid)===String(nid));
  const prev=it[ix+1],next=it[ix-1];
  return `
<div class="progress" id="sprog"></div>
<div class="page">
  <header class="wrap art-top"><nav class="crumbs" aria-label="Breadcrumb">${crumbs([home(),[C().news?.title||n.news,'#news']])}</nav>
    <h1 class="wl">${words(a.t)}</h1><time class="rv">${esc(a.date||it[ix]?.date||'')}</time></header>
  <div class="wrap"><div class="art-cover ri"><img src="${aCover(nid)}" alt=""></div></div>
  <article class="wrap"><div class="art-body prose">${prose(a.blocks||a.paras)}</div></article>
  <div class="wrap" style="padding-bottom:var(--sec)"><nav class="art-nav">
    ${prev?`<a href="#n-${prev.nid}"><small>← ${esc(prev.date)}</small><span>${esc(prev.t)}</span></a>`:'<span></span>'}
    ${next?`<a class="nx" href="#n-${next.nid}"><small>${esc(next.date)} →</small><span>${esc(next.t)}</span></a>`:''}
  </nav></div>
  ${ctaPanel()}
</div>`};

const filmView=key=>()=>{const f=C()[key]||{},n=U().nav||{};const items=arr(f.items);
  return `
${ph(I+'keypad2.jpg',f.title||n[key],[home(),[f.title||n[key],'#'+key]],f.intro)}
<div class="page"><section class="sec"><div class="wrap">
  <div class="chips" style="margin-bottom:32px"><a href="#videos"><button tabindex="-1" aria-pressed="${key==='videos'}">${esc(C().videos?.title||n.videos)}</button></a><a href="#testimonials"><button tabindex="-1" aria-pressed="${key==='testimonials'}">${esc(C().testimonials?.title||n.testimonials)}</button></a></div>
  <div class="grid ${items.length<=2?'g2':'g3'}">${items.map((v,i)=>`<button class="film rv" style="--d:${i%3}" data-yt="${esc(v.yt)}"><img src="${I}yt-${esc(v.yt)}.jpg" onerror="this.src='https://i.ytimg.com/vi/${esc(v.yt)}/hqdefault.jpg'" alt="" loading="lazy"><span class="play">${SVG.play}</span><span class="t">${esc(v.t)}</span></button>`).join('')}</div>
</div></section>${ctaPanel()}</div>`};
V.videos=filmView('videos');V.testimonials=filmView('testimonials');

V.faq=()=>{const f=C().faq||{},n=U().nav||{};return `
${ph(I+'why2.webp',n.faq,[home(),[f.title||n.faq,'#faq']])}
<div class="page"><div class="wrap faq">
  <div class="l"><div class="stick">${kick(f.category)}<h2 class="wl">${words(f.title||n.faq)}</h2>${f.intro?`<p class="muted rv">${nl(f.intro)}</p>`:''}
    <div class="rv">${btn(WA,U().whatsapp||'WhatsApp Us','lime',true)}</div></div></div>
  <div class="r">${arr(f.items).map((q,i)=>`<details class="qa rv" style="--d:${Math.min(i,3)}"><summary><span class="q">${esc(q.q)}</span><span class="pm" aria-hidden="true"></span></summary><div class="a"><div class="prose">${prose(q.a)}</div></div></details>`).join('')}</div>
</div>${ctaPanel()}</div>`};

V.contact=()=>{const c=C().contact||{},u=U(),n=u.nav||{},fm=c.form||{};
  const tel=p=>p.replace(/[^+\d]/g,'');
  return `
${ph(I+'showroom.jpg',c.title||n.contact,[home(),[c.title||n.contact,'#contact']])}
<div class="page"><div class="wrap ct">
  <div class="cards">
    <a class="cc rv" href="${esc(M.map?.google||'https://www.google.com/maps?q=3.094649,101.598228')}" target="_blank" rel="noopener"><span class="ic">${IC.pin}</span><small>${esc(c.company)}</small><span class="v">${arr(c.address).map(esc).join('<br>')}</span><span class="go">${SVG.ne}</span></a>
    <div class="cc-row">${arr(c.phones).map((p,i)=>`<a class="cc rv" style="--d:${i+1}" href="tel:${tel(p)}"><span class="ic">${IC.tel}</span><small>${esc(c.phoneLabel)}</small><span class="v">${esc(p)}</span><span class="go">${SVG.ne}</span></a>`).join('')}</div>
    <div class="cc-row">
      <a class="cc rv" style="--d:2" href="mailto:${esc(c.email)}"><span class="ic">${IC.mail}</span><small>${esc(c.emailLabel)}</small><span class="v">${esc(c.email)}</span><span class="go">${SVG.ne}</span></a>
      <a class="cc rv" style="--d:3" href="${WA}" target="_blank" rel="noopener"><span class="ic wa-ic">${SVG.wa}</span><small>${esc(c.whatsapp)}</small><span class="v">${esc(c.clickToChat)}</span><span class="go">${SVG.ne}</span></a>
    </div>
  </div>
  <div class="formbox rv" style="--d:1"><img class="fb-logo" src="${I}logo.png" alt="TAC group"><h2>${esc(c.title)}</h2>
    <form class="tacform" novalidate><div class="fgrid">
      ${fld('c-name',fm.name,'text',true,true)}
      ${fld('c-tel',fm.contact,'tel',true)}
      ${fld('c-mail',fm.email,'email',true)}
      ${fld('c-msg',fm.message,'textarea',false,true)}
      <label class="upl full"><input type="file" id="c-file"><span class="pm">+</span><span>${esc(fm.upload)}</span></label>
    </div><div class="form-actions"><button class="btn" type="submit"><span>${esc(fm.send)}</span><span class="ci">${SVG.ar}</span></button></div><p class="fmsg" role="status" aria-live="polite"></p></form>
  </div>
</div>
<div class="wrap" style="padding-bottom:var(--sec)"><div class="map rv">
  <iframe title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=3.094649,101.598228&z=16&output=embed"></iframe>
  <div class="pin"><img src="${I}logo.png" alt="TAC group"><b>${esc(c.company)}</b>${arr(c.address).map(esc).join(' ')}<span class="regno">${esc(c.regNo)}</span></div>
</div></div>
</div>`};

/* =========================================================
   CHROME (header, menu, footer) — rebuilt on language change
   ========================================================= */
const navItems=[['about'],['services',['residential','commercial']],['projects'],['news'],['videos'],['testimonials'],['faq'],['contact']];
function chrome(){
  const u=U(),n=u.nav||{};
  document.getElementById('nav').innerHTML=navItems.map(([k,sub])=>sub
    ?`<div class="dd"><a href="#${k}" data-nav="${k}">${esc(n[k])}<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></a><div class="sub">${sub.map(s=>`<a href="#${s}" data-nav="${s}">${esc(n[s])}</a>`).join('')}</div></div>`
    :`<a href="#${k}" data-nav="${k}">${esc(n[k])}</a>`).join('');
  document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===lang));
  const f=u.footer||{},h=f.headings||{};
  const flinks=['home','about','services','projects','news','videos','testimonials','faq','contact'];
  document.getElementById('ftr').innerHTML=`
  <div class="wrap">
    <div class="top">
      <div class="brand fx" style="--i:0"><img src="${I}logo-light.png" alt="TAC group"><p>${nl(f.about)}</p></div>
      <div class="fx" style="--i:1"><h4>&nbsp;</h4><ul>${flinks.slice(0,5).map(k=>`<li><a href="#${k}">${esc(n[k])}</a></li>`).join('')}</ul></div>
      <div class="fx" style="--i:2"><h4>&nbsp;</h4><ul>${flinks.slice(5).map(k=>`<li><a href="#${k}">${esc(n[k])}</a></li>`).join('')}</ul></div>
      <div class="fx" style="--i:3"><h4>${esc(u.contactLabel)}</h4><address>${arr(u.address).map(esc).join('<br>')}</address>
        <ul style="margin-top:16px">${arr(u.phones).map(p=>`<li><a href="tel:${p.replace(/[^+\d]/g,'')}">${esc(p)}</a></li>`).join('')}<li><a href="mailto:${esc(u.email||'info@tac.com.my')}">${esc(u.email||'info@tac.com.my')}</a></li></ul></div>
    </div>
  </div>
  <div class="wrap"><div class="rule"></div></div>
  <div class="wordwrap">${WORD}</div>
  <div class="wrap"><div class="bot"><span>${esc(f.copyright||'')}</span><span><a href="https://www.tac.com.my/${lang==='zh'?'cn/':''}privacypolicy/" target="_blank" rel="noopener">${esc(f.privacy||'Privacy Policy')}</a></span></div></div>`;
  document.querySelector('.wa span').textContent=u.whatsapp||'WhatsApp Us';
  document.getElementById('skip').textContent=lang==='zh'?'跳至内容':'Skip to content';
  footerMode();
}

/* =========================================================
   ROUTER
   ========================================================= */
const app=document.getElementById('app'),hdr=document.getElementById('hdr');
function resolve(){
  const k=(location.hash||'#home').slice(1);
  if(V[k]) return [k,V[k]];
  let m;
  if((m=k.match(/^svc-(\d+)$/))&&C().svc?.[m[1]]) return ['services',svcView(m[1])];
  if((m=k.match(/^p-(\d+)$/))&&C().proj?.[m[1]]) return ['projects',projView(m[1])];
  if((m=k.match(/^n-(\d+)$/))&&C().articles?.[m[1]]) return ['news',artView(m[1])];
  return ['home',V.home];
}
let firstRender=true;
function render(opts={}){
  const [navKey,view]=resolve();
  const go=()=>{
    const y=scrollY;
    app.innerHTML=view();
    const h1=app.querySelector('h1');
    document.title=(location.hash||'#home')==='#home'?'TECH AV CONCEPTS SDN. BHD. (TAC)':(h1?h1.textContent.trim().replace(/\s+/g,' ')+' · TAC':'TAC');
    const hk=(location.hash||'#home').slice(1);document.querySelectorAll('[data-nav]').forEach(a=>(a.dataset.nav===navKey||a.dataset.nav===hk||(a.dataset.nav==='services'&&['residential','commercial'].includes(hk)))?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
    document.body.classList.toggle('lighthead',!app.querySelector('.hero,.ph'));
    if(opts.keepScroll) scrollTo(0,y); else scrollTo(0,0);
    app.classList.remove('leaving');
    if(opts.lang){app.classList.remove('lang-swap');void app.offsetWidth;app.classList.add('lang-swap')}
    wire(opts);
    onScroll();
    if(!firstRender&&!opts.keepScroll) app.focus({preventScroll:true});
    firstRender=false;
  };
  if(firstRender||opts.lang){go();return}
  if(reduce){go();return}
  // soft dark crossfade between pages: no bright canvas flashing through
  const veil=document.getElementById('veil');
  veil.classList.add('on');
  setTimeout(()=>{go();requestAnimationFrame(()=>setTimeout(()=>veil.classList.remove('on'),60))},280);
}
addEventListener('hashchange',()=>{closeMenu();render()});

/* =========================================================
   MOTION
   ========================================================= */
let io;
function reveal(skip){
  io?.disconnect();
  const els=app.querySelectorAll('.rv,.ri,.wl');
  if(reduce||skip){els.forEach(e=>e.classList.remove('pre'));return}
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}}),{rootMargin:'0px 0px -10% 0px'});
  els.forEach(el=>{const r=el.getBoundingClientRect();if(r.top>innerHeight*.9||el.closest('.page')){el.classList.add('pre');io.observe(el)}});
  // pills inside headings draw with their heading
}

let ticking=false;
function onScroll(){
  if(ticking) return; ticking=true;
  requestAnimationFrame(()=>{ticking=false;
    const y=scrollY,vh=innerHeight;
    const hero=app.querySelector('.hero');
    if(hero&&!reduce) hero.style.setProperty('--p',Math.min(1,Math.max(0,y/vh)).toFixed(4));
    const phe=app.querySelector('.ph');
    if(phe&&!reduce) phe.style.setProperty('--p',Math.min(1,Math.max(0,y/phe.offsetHeight)).toFixed(4));
    const dark=!!(hero||phe);
    const overMedia=dark&&y<(hero?vh:(phe.offsetHeight-90))-60;
    hdr.classList.toggle('solid',!overMedia);
    lastY=y;
    const sp=document.getElementById('sprog');
    if(sp){const h=document.documentElement.scrollHeight-vh;sp.style.setProperty('--sp',(y/h).toFixed(4))}
  });
}
let lastY=0;
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',()=>{onScroll();footerMode()});
addEventListener('load',()=>footerMode());document.fonts?.ready.then(()=>footerMode());

/* footer: fixed + revealed (curtain) when it fits the viewport */
const ftr=document.getElementById('ftr'),fsp=document.getElementById('ftrSpace');
function footerMode(){
  ftr.classList.remove('fixed');fsp.style.height='0px';
  const h=ftr.offsetHeight;
  if(!reduce&&innerWidth>820&&h<innerHeight-40){ftr.classList.add('fixed');fsp.style.height=h+'px'}
}
const fio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)ftr.classList.add('in')}),{rootMargin:'0px 0px -20% 0px'});
fio.observe(fsp);fio.observe(ftr);

/* =========================================================
   WIRING per page
   ========================================================= */
function wire(opts){
  // word-split headings get the pre state before first paint
  reveal(opts.lang);
  // sub-hero entrance
  const phe=app.querySelector('.ph.enter');
  if(phe){phe.offsetWidth;setTimeout(()=>phe.classList.remove('enter'),30)}
  // hero film
  const v=document.getElementById('heroVid'),vc=document.getElementById('vctl');
  if(v){
    if(reduce) v.removeAttribute('autoplay'); else v.play?.().catch(()=>{});
    v.addEventListener('playing',()=>app.querySelector('.hero .poster')?.remove(),{once:true});
    vc.onclick=()=>{const p=!v.paused;p?v.pause():v.play();vc.setAttribute('aria-pressed',p);vc.querySelector('i').textContent=p?'▶':'❚❚'};
  }
  const pv=app.querySelectorAll('video[data-autoplay]');
  if(pv.length&&!reduce){const vio=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?e.target.play().catch(()=>{}):e.target.pause()),{threshold:.3});pv.forEach(x=>vio.observe(x))}
  // rails
  app.querySelectorAll('[data-rail]').forEach(b=>{
    const r=document.getElementById(b.dataset.target||'rail');if(!r)return;
    b.onclick=()=>{const c=r.firstElementChild;const w=c?c.getBoundingClientRect().width+18:300;r.scrollBy({left:w*+b.dataset.rail,behavior:reduce?'auto':'smooth'})};
  });
  const rail=document.getElementById('rail'),bar=document.getElementById('railbar');
  if(rail&&bar){const upd=()=>{const max=rail.scrollWidth-rail.clientWidth;const vis=rail.clientWidth/rail.scrollWidth;bar.style.width=(vis*100)+'%';bar.style.left=(max>0?rail.scrollLeft/max*(1-vis)*100:0)+'%'};rail.addEventListener('scroll',upd,{passive:true});upd()}
  // project filter
  const pg=document.getElementById('pgrid');
  if(pg) app.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{
    const was=b.getAttribute('aria-pressed')==='true';
    app.querySelectorAll('[data-f]').forEach(x=>x.setAttribute('aria-pressed',!was&&x===b));
    const f=was?'all':b.dataset.f;
    app.querySelectorAll('.pintro').forEach(x=>{x.hidden=x.dataset.for!==f;if(!x.hidden)x.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:600,easing:'cubic-bezier(.16,1,.3,1)'})});const cards=[...pg.children];
    cards.forEach(c=>c.classList.add('fade'));
    setTimeout(()=>{cards.forEach(c=>{c.classList.toggle('out',!(f==='all'||c.dataset.cat===f));c.classList.remove('pre')});
      requestAnimationFrame(()=>cards.forEach((c,i)=>setTimeout(()=>c.classList.remove('fade'),i*25)))},reduce?0:220);
  });
  // forms (front-end only; no backend in this build)
  app.querySelectorAll('.tacform').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();
    const miss=[...f.querySelectorAll('[required]')].filter(x=>!x.value.trim()||!x.checkValidity());
    if(miss.length){miss[0].focus();miss.forEach(x=>x.parentElement.animate([{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:300}));return}
    const b=f.querySelector('[type=submit] .ci');b.innerHTML='✓';f.reset();setTimeout(()=>b.innerHTML=SVG.ar,2400);
  }));
  // accordion with height animation
  app.querySelectorAll('.qa').forEach(d=>{const s=d.querySelector('summary'),a=d.querySelector('.a');
    s.addEventListener('click',e=>{if(reduce)return;e.preventDefault();
      if(d.open){const h=a.offsetHeight;a.animate([{height:h+'px',opacity:1},{height:'0px',opacity:0}],{duration:380,easing:'cubic-bezier(.2,0,0,1)'}).onfinish=()=>d.open=false;d.classList.remove('is-open')}
      else{d.open=true;const h=a.offsetHeight;a.animate([{height:'0px',opacity:0},{height:h+'px',opacity:1}],{duration:480,easing:'cubic-bezier(.16,1,.3,1)'})}
    })});
}

/* lightbox + film modal */
const lb=document.getElementById('lb'),vm=document.getElementById('vm');
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-lb]');
  if(t){lb.querySelector('img').src=t.dataset.lb;lb.showModal?.();return}
  const y=e.target.closest('[data-yt]');
  if(y){vm.querySelector('.box').innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(y.dataset.yt)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Video"></iframe>`;vm.showModal?.();return}
  const l=e.target.closest('[data-lang]');
  if(l&&l.dataset.lang!==lang){setLang(l.dataset.lang)}
});
lb.addEventListener('click',e=>{if(e.target===lb||e.target.closest('.x'))lb.close()});
vm.addEventListener('click',e=>{if(e.target===vm||e.target.closest('.x'))vm.close()});
vm.addEventListener('close',()=>vm.querySelector('.box').innerHTML='');

function closeMenu(){}

/* language: switch in place, same page, same scroll */
function setLang(l){
  lang=l;try{localStorage.setItem('tac-lang',l)}catch(e){}
  document.documentElement.lang=l==='zh'?'zh-Hans':'en';
  chrome();render({lang:true,keepScroll:true});
}

/* =========================================================
   BOOT — cinematic intro (once per session)
   ========================================================= */
if('scrollRestoration' in history)history.scrollRestoration='manual';
document.documentElement.lang=lang==='zh'?'zh-Hans':'en';
chrome();
const intro=document.getElementById('intro');
let seen=false;try{seen=sessionStorage.getItem('tac-intro')==='1';sessionStorage.setItem('tac-intro','1')}catch(e){}
const isHome=!location.hash||location.hash==='#home';
render();
if(reduce){intro.classList.add('done');document.body.classList.remove('boot')}
else if(!seen&&isHome){
  document.body.classList.add('intro-run');
  setTimeout(()=>intro.classList.add('go'),900);
  setTimeout(()=>{intro.classList.add('open');document.body.classList.remove('boot')},1350);
  setTimeout(()=>intro.classList.add('done'),2700);
}else{
  intro.classList.add('done');
  document.body.offsetWidth;setTimeout(()=>document.body.classList.remove('boot'),30);
}
})();
