/* 3D walkthrough: a curved, glass-walled ring building you walk around (ES module, three r165).
   Uses globals from index.html: D, ALL, cover, openCase, openDeck, buildGuide, setGuide, loadPct, $, esc, RM, CUR. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {GroundedSkybox} from 'three/addons/objects/GroundedSkybox.js';
import {Reflector} from 'three/addons/objects/Reflector.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
const W3={stations:[],clickables:[],videos:[],ready:false,models:{},trees:[],ferns:[]};window.W3=W3;
const SNAP=/snap/.test(location.search);
const FONT='-apple-system,BlinkMacSystemFont,"SF Pro Display","Inter Tight","Helvetica Neue",Arial,sans-serif';
const cssFont=(w,px)=>`${w} ${px}px ${FONT}`;
const INKC='#1d1d1f',GREY='#6e6e73';
/* ring geometry: R = centreline radius, HW = half width, CH = ceiling height. s = metres walked, o = offset to the right */
const R0=60,HW=8.5,CH=5.2,CX=-R0;
const yaw=s=>s>0?s/R0:0;
const at=(s,o,y)=>{o=o||0;if(s<=0)return new THREE.Vector3(o,y||0,-s);const a=s/R0;return new THREE.Vector3(CX+(R0+o)*Math.cos(a),y||0,-(R0+o)*Math.sin(a));};
const rightV=s=>{const a=yaw(s);return new THREE.Vector3(Math.cos(a),0,-Math.sin(a));};
const backV=s=>{const a=yaw(s);return new THREE.Vector3(Math.sin(a),0,Math.cos(a));};

const std=(c,o)=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85,metalness:0},o||{}));
const flat=(c,o)=>new THREE.MeshBasicMaterial(Object.assign({color:c,toneMapped:false},o||{}));
const glassM=()=>new THREE.MeshPhysicalMaterial({color:'#e9f3f1',transparent:true,opacity:.13,roughness:.02,metalness:0,envMapIntensity:1.2,depthWrite:false,side:THREE.DoubleSide});
function tex(cv){const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=W3.aniso||4;return t;}
function loadImg(src,n){return new Promise(r=>{if(!src)return r(null);const i=new Image();i.onload=()=>r(i);i.onerror=()=>(n||0)<3?setTimeout(()=>loadImg(src,(n||0)+1).then(r),500):r(null);i.src=src;});}
function mesh(geo,mat,x,y,z,sh){const m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);if(sh!==false){m.castShadow=true;m.receiveShadow=true;}return m;}
const bx=(w,h,d,mat,x,y,z,sh)=>mesh(new THREE.BoxGeometry(w,h,d),mat,x,y,z,sh);
const rb=(w,h,d,mat,x,y,z,r)=>mesh(new RoundedBoxGeometry(w,h,d,4,Math.min(r||.02,w/2-.001,h/2-.001,d/2-.001)),mat,x,y,z);
const cyl=(r,h,mat,x,y,z,seg,r2)=>mesh(new THREE.CylinderGeometry(r,r2==null?r:r2,h,seg||48),mat,x,y,z);
function fitFont(c,str,maxW,px,w){let s=px;c.font=cssFont(w,s);while(c.measureText(str).width>maxW&&s>8){s*=.94;c.font=cssFont(w,s);}return s;}
function textPlane(w,h,draw,ppu){ppu=ppu||240;const cv=document.createElement('canvas');cv.width=Math.round(w*ppu);cv.height=Math.round(h*ppu);
  draw(cv.getContext('2d'),ppu,cv);return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex(cv),transparent:true,depthWrite:false,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-4}));}
function screenTex(img,aspect,opt){opt=opt||{};const cw=opt.w||1400,ch=Math.round(cw/aspect),cv=document.createElement('canvas');cv.width=cw;cv.height=ch;const c=cv.getContext('2d');
  c.fillStyle=opt.bg||'#f5f5f7';c.fillRect(0,0,cw,ch);
  if(img){if(opt.contain){const s=Math.min(cw/img.width,ch/img.height);c.drawImage(img,(cw-img.width*s)/2,(ch-img.height*s)/2,img.width*s,img.height*s);}
    else{const s=Math.max(cw/img.width,ch/img.height),sw=cw/s,sh=ch/s;c.drawImage(img,(img.width-sw)/2,0,sw,sh,0,0,cw,ch);}}
  return tex(cv);}
/* screens sit clearly in front of their frame and use polygon offset, so they never fight the frame for depth */
const scr=(w,h,t)=>mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),0,0,0,false);

/* raised metal lettering */
const FT={};const FURL='https://cdn.jsdelivr.net/npm/three@0.165.0/examples/fonts/';
async function loadFonts(){const L=new FontLoader();await Promise.all([['b','helvetiker_bold'],['r','helvetiker_regular']].map(([k,n])=>L.loadAsync(FURL+n+'.typeface.json').then(f=>FT[k]=f).catch(()=>{})));}
const LETTER=()=>std('#232325',{roughness:.38,metalness:.75});const LETTER2=()=>std('#8e8e93',{roughness:.4,metalness:.7});
function text3D(str,size,maxW,mat,k){const f=FT[k||'b'];if(!f)return null;const g=new TextGeometry(str,{font:f,size,depth:size*.09,curveSegments:8,bevelEnabled:true,bevelThickness:size*.012,bevelSize:size*.006,bevelSegments:2});g.computeBoundingBox();const b=g.boundingBox;g.translate(-b.min.x,0,0);
  const m=mesh(g,mat),w=b.max.x-b.min.x,sc=maxW&&w>maxW?maxW/w:1;m.scale.setScalar(sc);return{m,w:w*sc,size:size*sc};}
/* ───────── materials ───────── */
const TX={};
async function loadTex(){const L=new THREE.TextureLoader(),names={oak_d:1,oak_n:0,oak_r:0};await Promise.all(['t1','t4'].map(k=>L.loadAsync(`models/trees/${k}.png`).then(t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;TX[k]=t;}).catch(()=>{})));
  await Promise.all(Object.keys(names).map(k=>L.loadAsync(`models/tex/${k}.jpg`).then(t=>{t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=W3.aniso||4;if(names[k])t.colorSpace=THREE.SRGBColorSpace;TX[k]=t;}).catch(()=>{})));}
function pbr(p,rx,ry,o,rot){const c=k=>{const t=TX[p+k];if(!t)return null;const q=t.clone();q.needsUpdate=true;q.repeat.set(rx||1,ry||1);if(rot){q.center.set(.5,.5);q.rotation=Math.PI/2;}return q;};
  return new THREE.MeshStandardMaterial(Object.assign({map:c('_d'),normalMap:c('_n'),roughnessMap:c('_r'),roughness:1,metalness:0,color:TX[p+'_d']?'#ffffff':(p==='oak'?'#b98d5a':'#dedbd2')},o||{}));}
const OAK=(rx,ry,rot)=>pbr('oak',rx,ry,{roughness:.8},rot);
const STONE=()=>std('#f6f6f4',{roughness:.5,emissive:'#ffffff',emissiveIntensity:.2});
const INK=()=>std('#1d1d1f',{roughness:.4,metalness:.2});
const ALU=()=>std('#d5d6d8',{roughness:.3,metalness:.9});
const WHITE=()=>std('#f4f4f2',{roughness:.45});
const STEEL=()=>std('#b9bbbe',{roughness:.35,metalness:.9});
const POT=()=>std('#8c8e91',{roughness:.9});

/* ───────── models (Poly Haven, CC0), normalised so the base sits on y=0 ───────── */
const MODELS=['shrub_04','fern_02'];
async function loadModels(){const L=new GLTFLoader();await Promise.all(MODELS.map(id=>new Promise(r=>L.load(`models/${id}/${id}.gltf`,g=>{const o=g.scene;o.traverse(m=>{if(m.isMesh){m.castShadow=true;m.receiveShadow=true;if(m.material.map)m.material.map.anisotropy=4;}});
  const b=new THREE.Box3().setFromObject(o),s=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.min.y,-c.z);const w=new THREE.Group();w.add(o);w.userData.size=s;W3.models[id]=w;r();},undefined,()=>r()))));splitModel('shrub_04',W3.trees);splitModel('fern_02',W3.ferns);}
function M(id,o){o=o||{};const src=W3.models[id];if(!src)return new THREE.Group();const g=src.clone(true),s=src.userData.size;let k=o.s||1;if(o.h)k=o.h/s.y;if(o.w)k=o.w/Math.max(s.x,s.z);g.scale.setScalar(k);
  g.position.set(o.x||0,o.y||0,o.z||0);g.rotation.y=o.ry||0;return g;}
/* the shrub file holds a row of small trees in one mesh; cut it into single trees */
function splitModel(id,out){const src=W3.models[id];if(!src)return;src.updateMatrixWorld(true);const ms=[];src.traverse(o=>{if(o.isMesh)ms.push(o);});
  ms.forEach(m=>{const g=m.geometry.clone().applyMatrix4(m.matrixWorld).toNonIndexed(),P=g.attributes.position,N=g.attributes.normal,U=g.attributes.uv,n=P.count/3;g.computeBoundingBox();const bb=g.boundingBox,ax=(bb.max.x-bb.min.x)>(bb.max.z-bb.min.z)?'x':'z';
    const get=i=>ax==='x'?P.getX(i):P.getZ(i),lo=bb.min[ax],span=(bb.max[ax]-lo)||1,B=160,hist=new Uint32Array(B);for(let i=0;i<P.count;i++)hist[Math.min(B-1,Math.floor((get(i)-lo)/span*B))]++;
    const runs=[];let st=-1;for(let b=0;b<=B;b++){const on=b<B&&hist[b]>0;if(on&&st<0)st=b;if(!on&&st>=0){runs.push([st,b]);st=-1;}}
    let parts=ms.length>1?[]:runs.filter(r=>r[1]-r[0]>4).map(r=>[lo+r[0]/B*span,lo+r[1]/B*span]);if(parts.length<2)parts=[[lo-1,lo+span+1]];
    const mat=m.material;mat.side=THREE.DoubleSide;mat.alphaTest=Math.max(mat.alphaTest||0,.4);mat.transparent=false;
    parts.forEach(([a,b])=>{const p=[],nn=[],uu=[];for(let t=0;t<n;t++){const c=(get(t*3)+get(t*3+1)+get(t*3+2))/3;if(c<a||c>=b)continue;for(let k=0;k<3;k++){const i=t*3+k;p.push(P.getX(i),P.getY(i),P.getZ(i));if(N)nn.push(N.getX(i),N.getY(i),N.getZ(i));if(U)uu.push(U.getX(i),U.getY(i));}}
      if(p.length<600)return;const q=new THREE.BufferGeometry();q.setAttribute('position',new THREE.Float32BufferAttribute(p,3));if(nn.length)q.setAttribute('normal',new THREE.Float32BufferAttribute(nn,3));if(uu.length)q.setAttribute('uv',new THREE.Float32BufferAttribute(uu,2));
      q.computeBoundingBox();const qb=q.boundingBox,hh=qb.max.y-qb.min.y;let sx=0,sz=0,cn=0;for(let i=0;i<p.length;i+=3)if(p[i+1]<qb.min.y+hh*.012){sx+=p[i];sz+=p[i+2];cn++;}
      const c=qb.getCenter(new THREE.Vector3());q.translate(-(cn?sx/cn:c.x),-qb.min.y,-(cn?sz/cn:c.z));q.computeBoundingBox();out.push({geo:q,mat,h:q.boundingBox.max.y});});});}
function fern(i,h){const t=W3.ferns[i%Math.max(1,W3.ferns.length)];if(!t)return new THREE.Group();const m=mesh(t.geo,t.mat);m.scale.setScalar(h/t.h);m.rotation.y=i*1.7;return m;}
function potFern(i,x,z){const g=new THREE.Group();g.add(cyl(.34,.36,WHITE(),0,.18,0,48,.24));g.add(cyl(.31,.02,std('#3a3028',{roughness:1}),0,.345,0,32));const f=fern(i,.85);f.position.y=.33;g.add(f);g.add(blob(1.3,1.3,.3,.02));g.position.set(x||0,0,z||0);return g;}
function tree(i,h){const t=W3.trees[i%Math.max(1,W3.trees.length)];if(!t)return new THREE.Group();const m=mesh(t.geo,t.mat);m.scale.setScalar(h/t.h);m.rotation.y=i*2.4;return m;}
function potTree(i,h,x,z){const g=new THREE.Group();h=h||1.9;const tr=W3.trees[i%Math.max(1,W3.trees.length)],th=h-.45;let r=.3;
  if(tr){if(tr.br==null){const P=tr.geo.attributes.position;let m=0;for(let k=0;k<P.count;k++)if(P.getY(k)<tr.h*.1)m=Math.max(m,Math.hypot(P.getX(k),P.getZ(k)));tr.br=m;}r=Math.max(.3,tr.br*(th/tr.h)+.12);}
  g.add(blob(r*3.4,r*3.4,.3,.02));g.add(cyl(r,.5,POT(),0,.25,0,56,r*.72));g.add(cyl(r-.03,.03,std('#33281f',{roughness:1}),0,.49,0,40));const t=tree(i,th);t.position.y=.5;g.add(t);g.position.set(x||0,0,z||0);return g;}

/* ───────── built pieces ───────── */
function oakTable(w,d,h){h=h||.9;const g=new THREE.Group();g.add(rb(w,.1,d,OAK(w/1.3,d/1.3,1),0,h-.05,0,.008));[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([a,b])=>g.add(rb(.14,h-.1,.14,OAK(.12,(h-.1)/2.4),a*(w/2-.19),(h-.1)/2,b*(d/2-.19),.006)));g.add(blob(w*1.2,d*1.7,.3,.004));return g;}
function barTable(){const g=new THREE.Group();g.add(cyl(.4,.03,WHITE(),0,1.06,0,56));g.add(cyl(.028,1.04,STEEL(),0,.53,0,20));g.add(cyl(.27,.016,STEEL(),0,.008,0,48));g.add(blob(1.1,1.1,.3,.02));return g;}
function rod(a,b,r,m){const d=new THREE.Vector3().subVectors(b,a),o=mesh(new THREE.CylinderGeometry(r,r,d.length(),10),m);o.position.copy(a).addScaledVector(d,.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());return o;}
function stool(){const g=new THREE.Group(),m=STEEL(),H=.74,t=.115,b=.2;g.add(cyl(.175,.035,std('#2a2a2c',{roughness:.55}),0,H+.0175,0,40));g.add(cyl(.15,.012,m,0,H-.006,0,32));
  [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([x,z])=>{g.add(rod(new THREE.Vector3(x*t,H-.01,z*t),new THREE.Vector3(x*b,0,z*b),.0095,m));g.add(cyl(.016,.012,std('#2a2a2c',{roughness:.7}),x*b,.006,z*b,12));});
  const fy=.27,fr=(t+(b-t)*(1-fy/H))*Math.SQRT2,ring=mesh(new THREE.TorusGeometry(fr,.0085,8,48),m,0,fy,0);ring.rotation.x=Math.PI/2;g.add(ring);g.add(blob(.7,.7,.3,.02));return g;}
function bench(w){const g=new THREE.Group();g.add(rb(w,.4,.62,WHITE(),0,.26,0,.015));g.add(bx(w-.08,.06,.54,std('#2a2a2c',{roughness:.8}),0,.03,0));g.add(blob(w*1.2,1.3,.3,.004));return g;}
function mat2(w,d){const m=bx(w,.03,d,std('#a3a4a7',{roughness:1}),0,.03,0);m.castShadow=false;return m;}
/* soft contact shadow */
let _bl;function blob(w,d,a,y){if(!_bl){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,4,64,64,64);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.55,'rgba(0,0,0,.45)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);_bl=new THREE.CanvasTexture(c);}
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshBasicMaterial({map:_bl,transparent:true,opacity:a||.3,depthWrite:false,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));m.rotation.x=-Math.PI/2;m.position.y=Math.max(y||0,.02);m.renderOrder=2;m.userData.blob=1;return m;}
/* rounded-rectangle solids and faces, for devices with real corner radii */
function rshape(w,h,r){const s=new THREE.Shape(),x=-w/2,y=-h/2;r=Math.min(r,w/2-.0001,h/2-.0001);s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.absarc(x+w-r,y+r,r,-Math.PI/2,0);s.lineTo(x+w,y+h-r);s.absarc(x+w-r,y+h-r,r,0,Math.PI/2);s.lineTo(x+r,y+h);s.absarc(x+r,y+h-r,r,Math.PI/2,Math.PI);s.lineTo(x,y+r);s.absarc(x+r,y+r,r,Math.PI,Math.PI*1.5);return s;}
function rr(w,h,r,d,b){b=b||0;const g=new THREE.ExtrudeGeometry(rshape(w-2*b,h-2*b,Math.max(.0005,r-b)),{depth:d-2*b,bevelEnabled:b>0,bevelThickness:b,bevelSize:b,bevelSegments:3,curveSegments:12});g.translate(0,0,-(d-2*b)/2);return g;}
function rface(w,h,r,mat){const g=new THREE.ShapeGeometry(rshape(w,h,r),12),p=g.attributes.position,u=g.attributes.uv;for(let i=0;i<p.count;i++)u.setXY(i,p.getX(i)/w+.5,p.getY(i)/h+.5);return mesh(g,mat,0,0,0,false);}
const scrM=t=>new THREE.MeshBasicMaterial({map:t,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-4});
const blkM=()=>new THREE.MeshStandardMaterial({color:'#050506',roughness:.12,metalness:.1,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});
const TI=()=>std('#4a4a4d',{roughness:.32,metalness:.95});
let _keys;function keysTex(lt){if(lt)return keysTexL();if(_keys)return _keys;const c=document.createElement('canvas');c.width=900;c.height=360;const x=c.getContext('2d');x.fillStyle='#1b1b1d';x.fillRect(0,0,900,360);x.fillStyle='#2b2b2e';const rows=[14,14,14,13,12];
  const box=(a,b,w,h)=>{x.beginPath();if(x.roundRect)x.roundRect(a,b,w,h,7);else x.rect(a,b,w,h);x.fill();};
  rows.forEach((n,r)=>{const kw=(900-16)/n;for(let i=0;i<n;i++)box(8+i*kw+3,8+r*58+3,kw-6,52);});box(11,301,160,46);box(180,301,420,46);box(609,301,280,46);_keys=tex(c);return _keys;}
let _keysL;function keysTexL(){if(_keysL)return _keysL;const c=document.createElement('canvas');c.width=900;c.height=330;const x=c.getContext('2d');x.fillStyle='#d9dadc';x.fillRect(0,0,900,330);x.fillStyle='#fafafa';[14,14,14,13,12].forEach((n,r)=>{const kw=884/n;for(let i=0;i<n;i++){x.beginPath();x.rect(8+i*kw+3,8+r*63+3,kw-6,56);x.fill();}});_keysL=tex(c);return _keysL;}
/* a desktop display on its stand. W = width in metres (a 27-inch panel is about .62) */
function dDisplay(t,W){const k=W/.62,H=W/1.6,g=new THREE.Group(),head=new THREE.Group(),cy=.135*k+H/2;
  head.add(mesh(rr(W,H,.014*k,.019*k,.003*k),ALU()));const f=rface(W-.005*k,H-.005*k,.012*k,blkM());f.position.z=.0096*k;head.add(f);const s=rface(W-.03*k,H-.03*k,.006*k,scrM(t));s.position.z=.0098*k;head.add(s);
  head.position.y=cy;head.rotation.x=-.07;g.add(head);const neck=mesh(rr(.1*k,.2*k,.006*k,.012*k,.002*k),ALU(),0,.1*k,-.03*k);neck.rotation.x=-.12;g.add(neck);
  const foot=mesh(rr(.2*k,.17*k,.012*k,.008*k,.002*k),ALU(),0,.004*k,-.01*k);foot.rotation.x=-Math.PI/2;g.add(foot);g.add(blob(W*1.25,.42*k,.4,.0012));return{g,w:W,h:cy+H/2,s,cy};}
function dLaptop(t,W){const D2=W*.66,th=W*.036,g=new THREE.Group();const base=mesh(rr(W,D2,W*.03,th,W*.004),ALU(),0,th/2,0);base.rotation.x=-Math.PI/2;g.add(base);
  const kb=mesh(new THREE.PlaneGeometry(W*.88,W*.35),new THREE.MeshBasicMaterial({map:keysTex(),polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),0,th+.0004,-D2*.12,false);kb.rotation.x=-Math.PI/2;g.add(kb);
  const tp=mesh(new THREE.PlaneGeometry(W*.38,W*.2),std('#c9cacc',{roughness:.25,metalness:.6,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),0,th+.0004,D2*.3,false);tp.rotation.x=-Math.PI/2;g.add(tp);
  const lid=new THREE.Group(),lt=W*.016;lid.position.set(0,th,-D2/2+lt/2);lid.rotation.x=-.3;lid.add(mesh(rr(W,D2,W*.03,lt,W*.003),ALU(),0,D2/2,0));const f=rface(W-.004,D2-.004,W*.028,blkM());f.position.set(0,D2/2,lt/2+.0002);lid.add(f);
  const sw=W*.955,sh=sw/1.6,s=rface(sw,sh,W*.012,scrM(t));s.position.set(0,D2/2+(D2-sh)*.12,lt/2+.0004);lid.add(s);g.add(lid);g.add(blob(W*1.35,D2*1.5,.4,.0012));return{g,w:W,h:th+D2*.96,s};}
function dPhone(t,Hh){const k=Hh/.16,w=Hh*.486,th=.0085*k,g=new THREE.Group(),p=new THREE.Group();p.add(mesh(rr(w,Hh,w*.17,th,.0018*k),TI(),0,Hh/2,0));const f=rface(w-.002*k,Hh-.002*k,w*.16,blkM());f.position.set(0,Hh/2,th/2+.0001);p.add(f);
  const s=rface(w-.007*k,Hh-.007*k,w*.135,scrM(t));s.position.set(0,Hh/2,th/2+.0003);p.add(s);p.position.set(0,.011*k,.004*k);p.rotation.x=-.22;g.add(p);
  g.add(cyl(.042*k,.012*k,WHITE(),0,.006*k,-.006*k,40));g.add(blob(.2*k,.18*k,.4,.0012));return{g,w,h:Hh+.02,s,p};}
function dWall(t,W,asp){const H=W/asp,g=new THREE.Group();g.add(mesh(rr(W+.03,H+.03,.012,.05,.004),INK()));const s=rface(W,H,.006,scrM(t));s.position.z=.0262;g.add(s);return{g,w:W+.03,h:H+.03,s};}

async function buildStage(x,num,mob,sd){
  const p=x.p,type=p.stage||'wall',g=new THREE.Group(),anim=[];
  const imgs=await Promise.all((p.screens&&p.screens.length?p.screens:[cover(p)]).map(s=>loadImg(s?'images/'+s:null)));
  const TH=.9;let fw=1,fh=1,cy=1.2,main=null,camY=0,minD=1.15,W=3;
  const ph=(img,hh,px,pz,ry)=>{const d=dPhone(screenTex(img,.486,{w:720}),hh);d.g.position.set(px,TH,pz);d.g.rotation.y=ry||0;g.add(d.g);return d;};
  const table=()=>{g.add(oakTable(3,1.25,TH));W=3.2;};
  const desk=()=>{const kbb=mesh(rr(.28,.11,.012,.006,.0015),ALU(),-.02,TH+.004,.34);kbb.rotation.x=-Math.PI/2;g.add(kbb);const kb=mesh(new THREE.PlaneGeometry(.265,.098),new THREE.MeshBasicMaterial({map:keysTex(1),polygonOffset:true,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),-.02,TH+.0075,.34,false);kb.rotation.x=-Math.PI/2;g.add(kb);
    const ms=mesh(new THREE.SphereGeometry(.03,24,16),WHITE(),.24,TH+.012,.34);ms.scale.set(1,.42,1.7);g.add(ms);};
  if(type==='monitor'||type==='monitor+phone'){table();main=dDisplay(screenTex(imgs[0],1.6),.68);main.g.position.set(0,TH,.05);g.add(main.g);desk();
    if(type==='monitor+phone'&&imgs[1]){main.g.position.x=-.16;ph(imgs[1],.2,.37,.1,-.32);fw=1.12;}else fw=.84;fh=main.h+.2;cy=TH+main.h*.4;}
  else if(type==='laptop+phone'||type==='wall+phone'){table();main=dLaptop(screenTex(imgs[0],1.6),.36);main.g.position.set(-.06,TH,.12);main.g.rotation.y=.12;g.add(main.g);if(imgs[1])ph(imgs[1],.19,.29,.1,-.3);fw=.7;fh=.4;cy=TH+.08;minD=.95;}
  else if(type==='phones'){table();const n=Math.min(3,imgs.length);for(let i=0;i<n;i++){const o=i-(n-1)/2,d=ph(imgs[i],.165,o*.17,.25-Math.abs(o)*.02,-o*.22);if(i===Math.floor(n/2))main=d;}fw=.5;fh=.28;cy=TH+.06;minD=.62;}
  else if(type==='layers'){table();const n=Math.min(3,imgs.length);for(let i=0;i<n;i++){const o=i-(n-1)/2,d=dDisplay(screenTex(imgs[i],1.6),.6);d.g.position.set(o*.64,TH,.02+Math.abs(o)*.11);d.g.rotation.y=-o*.34;g.add(d.g);if(o===0||!main)main=d;}fw=2.0;fh=main.h+.2;cy=TH+main.h*.52;}
  else{const big=type==='cinema'||type==='kiosk',Wd=big?4.6:3.8,asp=big?1.78:1.6,wallW=Wd+1.7,wallH=4.1;
    g.add(rb(wallW,wallH,.55,STONE(),0,.1+wallH/2,-.36,.01));g.add(bx(wallW-.1,.1,.45,std('#2a2a2c',{roughness:.8}),0,.05,-.36));
    main=dWall(screenTex(imgs[0],asp,{w:1800}),Wd,asp);main.g.position.set(0,2.2,-.05);g.add(main.g);
    [-1,0,1].forEach(i=>{const c=rb(.46,.46,.46,OAK(.4,.2),i*1.0,.23,3.3+Math.abs(i)*.15,.012);c.rotation.y=i*.2;g.add(c);const b=blob(.9,.9,.3,.004);b.position.set(i*1.0,.004,3.3);g.add(b);});
    fw=wallW+.5;fh=wallH+1.1;cy=2.0;camY=1.62;minD=4;W=wallW;}
  if(W<4){if(num%3===1)g.add(potTree(num,2.3,-sd*2.25,-.75));else if(num%3===2)g.add(potFern(num,sd*2.25,-.8));}
  if(p.stageVideo&&p.video&&main&&main.s){const v=document.createElement('video');v.src=p.video;v.muted=true;v.loop=true;v.playsInline=true;v.preload='none';const vt=new THREE.VideoTexture(v);vt.colorSpace=THREE.SRGBColorSpace;W3.videos.push({v,vt,still:main.s.material.map,mat:main.s.material,num});}
  g.userData={k:`${x.si}-${x.pi}`,anim,fw,fh,cy,camY:camY||cy+.16,minD};g.traverse(o=>{if(o.isMesh&&!o.userData.blob){o.userData.k=g.userData.k;W3.clickables.push(o);}});return g;
}

/* curved building parts */
function sector(r0,r1,a0,a1,y,up,us,vs,n){n=n||Math.max(8,Math.ceil((a1-a0)*40));const p=[],u=[],nm=[],ix=[];for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n,c=Math.cos(a),s=Math.sin(a);
    p.push(CX+r0*c,y,-r0*s,CX+r1*c,y,-r1*s);u.push(a*R0/us,0,a*R0/us,(r1-r0)/vs);nm.push(0,up?1:-1,0,0,up?1:-1,0);if(i<n){const k=i*2;up?ix.push(k,k+1,k+2,k+1,k+3,k+2):ix.push(k,k+2,k+1,k+1,k+2,k+3);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(u,2));g.setAttribute('normal',new THREE.Float32BufferAttribute(nm,3));g.setIndex(ix);return g;}
function arcWall(r,a0,a1,y0,y1,us,vs,n){n=n||Math.max(8,Math.ceil((a1-a0)*40));const p=[],u=[],nm=[],ix=[];for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n,c=Math.cos(a),s=Math.sin(a);
    p.push(CX+r*c,y0,-r*s,CX+r*c,y1,-r*s);u.push(a*r/(us||1),0,a*r/(us||1),(y1-y0)/(vs||1));nm.push(c,0,-s,c,0,-s);if(i<n){const k=i*2;ix.push(k,k+2,k+1,k+1,k+2,k+3);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(u,2));g.setAttribute('normal',new THREE.Float32BufferAttribute(nm,3));g.setIndex(ix);return g;}
function place(o,s,off,ry){o.position.copy(at(s,off));o.rotation.y=yaw(s)+(ry||0);return o;}

function portal(S,s,title,n,sub,narrow){const g=new THREE.Group(),gap=3.3,pw=HW-gap+.6,tw=narrow?3.5:4.7;
  [-1,1].forEach(k=>{g.add(rb(pw,CH-.1,.9,STONE(),k*(gap+pw/2),.1+(CH-.1)/2,0,.01));g.add(bx(pw-.1,.1,.8,std('#2a2a2c',{roughness:.8}),k*(gap+pw/2),.05,0));});g.add(rb(gap*2+.4,CH-3.7,.9,STONE(),0,3.7+(CH-3.7)/2,0,.01));
  const t=new THREE.Group(),words=title.split(' ').reduce((q,w)=>{if(w==='&'&&q.length)q[q.length-1]+=' &';else q.push(w);return q;},[]);
  if(FT.b){const nn=text3D(n,.24,tw,LETTER2(),'r');nn.m.position.set(-tw/2,1.25,0);t.add(nn.m);const L=words.map(w=>text3D(w,.56,tw,LETTER()));const sz=Math.min(...L.map(l=>l.size));let y=.45;L.forEach(l=>{l.m.scale.setScalar(sz/.56);l.m.position.set(-tw/2,y,0);t.add(l.m);y-=sz*1.32;});
    const sp=textPlane(tw,.3,(c,u)=>{c.fillStyle=GREY;fitFont(c,sub||'',tw*u,.17*u,500);c.fillText(sub||'',0,.2*u);},190);sp.position.set(0,y+.28,.001);t.add(sp);}
  else t.add(textPlane(tw,3.2,(c,u)=>{c.fillStyle=INKC;c.font=cssFont(600,.5*u);words.forEach((w,i)=>c.fillText(w,0,(1+i*.6)*u));},190));
  const tx=-(gap+.5+tw/2);t.position.set(tx,2.35,.46);g.add(t);place(g,s,0);S.add(g);
  return{c:at(s,tx,0).add(backV(s).multiplyScalar(.46)),tw};}

async function build3D(){
  const cv=document.createElement('canvas');let R;try{R=new THREE.WebGLRenderer({canvas:cv,antialias:true,powerPreference:'high-performance'});}catch(e){return false;}
  W3.R=R;W3.cv=cv;W3.aniso=R.capabilities.getMaxAnisotropy();const mob=innerWidth<700;W3.mob=mob;R.setPixelRatio(SNAP?1:Math.min(devicePixelRatio,mob?1.75:2));R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
  R.toneMapping=THREE.NeutralToneMapping||THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.0;$('#pin').prepend(cv);
  const S=new THREE.Scene();S.background=new THREE.Color('#cfe3f4');S.environment=new THREE.PMREMGenerator(R).fromScene(new RoomEnvironment(),.03).texture;S.environmentIntensity=.55;W3.S=S;
  const narrow=innerWidth/innerHeight<1.25;W3.narrow=narrow;const cam=new THREE.PerspectiveCamera(mob?62:46,1,.3,1100);W3.cam=cam;
  await Promise.all([loadModels(),loadTex(),
    loadFonts(),
    new THREE.TextureLoader().loadAsync(mob||SNAP||R.capabilities.maxTextureSize<8192?'models/sky_s.jpg':'models/sky.jpg').then(t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=W3.aniso;const sky=new GroundedSkybox(t,30,800,96);sky.position.set(CX,30-.4,0);sky.material.toneMapped=false;sky.rotation.y=-1.1;S.add(sky);}).catch(()=>{})]);loadPct(.4);
  S.add(new THREE.HemisphereLight('#ffffff','#ecebe8',.85));
  const sun=new THREE.DirectionalLight('#fffaf3',1.9);sun.castShadow=true;sun.shadow.mapSize.set(SNAP?1024:mob?2048:4096,SNAP?1024:mob?2048:4096);const sc=sun.shadow.camera;sc.left=-26;sc.right=26;sc.top=26;sc.bottom=-26;sc.near=1;sc.far=120;sun.shadow.bias=-.0004;sun.shadow.normalBias=.04;sun.shadow.radius=3;S.add(sun,sun.target);W3.sun=sun;

  const ST=W3.stations=[];const secs=D.sections.map((s,si)=>({s,si,list:ALL.filter(x=>x.si===si)}));
  const nm=(D.name||'').split(' ').slice(0,2).join(' ');
  ST.push({kind:'door',name:'Entrance',sec:'Arrive',sm:-5});ST.push({kind:'lobby',name:'Reception',sec:'Arrive',sm:14,om:1.8});
  let s=19,num=0,kk=0;const solids=[];const total=secs.reduce((a,b)=>a+b.list.filter(x=>x.p.stage).length,0);let done=0;W3.portals=[];
  for(const sec of secs){
    const n=String(++kk).padStart(2,'0'),title=sec.s.title,short=title.split(' & ')[0];const po=portal(S,s,title,n,sec.s.blurb||sec.s.intro||'',narrow);W3.portals.push(s);
    ST.push({kind:'room',name:title,sec:short,s,sm:s+.5,c:po.c,tw:po.tw,title,n,sub:sec.s.blurb||''});
    const list=sec.list.filter(x=>x.p.stage),wall=sec.s.decks||sec.s.gallery;
    if(list.length){s+=10;
      for(let i=0;i<list.length;i++){const x=list[i],sd=num%2?-1:1,big=!/monitor|laptop|phones|layers|wall\+phone/.test(x.p.stage||'wall'),sp=at(s,sd*(big?6.1:4.9)),fc=new THREE.Vector3(-sd*.94,0,.34).normalize(),cl=big?fc:new THREE.Vector3(-sd*.8,0,.6).normalize(),cdir=cl.clone().applyAxisAngle(new THREE.Vector3(0,1,0),yaw(s));
        const g=await buildStage(x,++num,mob,sd);g.position.copy(sp);g.rotation.y=yaw(s)+Math.atan2(fc.x,fc.z);S.add(g);
        ST.push({kind:'stage',name:x.p.title,sec:short,s,sm:s+2.4,obj:g,sp,cdir,x,k:g.userData.k,num,total,i:i+1,of:list.length});done++;loadPct(.4+.4*done/Math.max(1,total));s+=9;}
    }else if(sec.s.gallery&&sec.s.gallery.length){
      const sd=1,U=narrow?1.12:1.4,gp=.1,L=narrow?[[0,0,2,2],[2,0,1,1],[2,1,1,1],[0,2,1,1],[1,2,2,1],[0,3,2,1],[2,3,1,1]]:[[0,0,2,2],[2,0,1,1],[3,0,2,1],[5,0,1,2],[6,0,2,1],[2,1,1,1],[3,1,1,1],[4,1,1,1],[6,1,1,1],[7,1,1,2],[0,2,1,1],[1,2,2,1],[3,2,2,1],[5,2,1,1],[6,2,1,1]];
      const GC=narrow?3:8,GR=narrow?4:3,dk=sec.s.gallery.slice(0,L.length),ww=GC*U+1.2,wh=GR*U,G=new THREE.Group();s+=ww/2+4;const wc=at(s,sd*(HW-1.5));
      G.add(rb(ww,CH-.16,.5,STONE(),0,.1+(CH-.16)/2,-.27,.01));G.add(bx(ww-.1,.1,.4,std('#2a2a2c',{roughness:.8}),0,.05,-.27));
      const imgs=await Promise.all(dk.map(d=>loadImg('images/'+d.img))),ga=ALL.find(z=>z.p.creativePage),gk=ga?`${ga.si}-${ga.pi}`:null,y0=CH/2+wh/2+.02;
      dk.forEach((d,i)=>{const [cx,cy2,cw,ch]=L[i],w=cw*U-gp,h=ch*U-gp,q=new THREE.Group();const t=rface(w,h,.06,scrM(screenTex(imgs[i],w/h,{w:cw>1||ch>1?1100:640})));q.add(t);
        q.position.set(-GC*U/2+cx*U+cw*U/2,y0-cy2*U-ch*U/2,.012+i*.0004);q.traverse(o=>{if(o.isMesh){o.userData.k=gk;W3.clickables.push(o);}});G.add(q);(W3.deckTiles=W3.deckTiles||[]).push(q);});
      G.position.copy(wc);G.rotation.y=yaw(s)-sd*Math.PI/2;S.add(G);solids.push({s,sd,half:ww/2+1});
      {const b=bench(3);place(b,s,sd*(HW-1.5-Math.min(9,ww*.75)),Math.PI/2);S.add(b);}
      ST.push({kind:'gallery',name:'Gallery wall',sec:short,s,sm:s+ww/2+3,sd,wc,ww,wh,title,n,si:sec.si,k:gk,sub:'Posters, packaging, paintings, photography, film, 3D and games.'});s+=ww/2+5;
    }else if(wall&&wall.length){
      const isDeck=true,sd=-1,dk=wall,cols=narrow?3:Math.max(3,Math.ceil(dk.length/3)),rows=Math.ceil(dk.length/cols),tw=narrow?1.15:1.72,asp=1.78,th2=tw/asp,gx=.42,gy=.62;
      const ww=cols*(tw+gx)+1,wh=rows*(th2+gy)+.5,G=new THREE.Group();s+=ww/2+4;const wc=at(s,sd*(HW-1.5));
      G.add(rb(ww,CH-.16,.5,STONE(),0,.1+(CH-.16)/2,-.27,.01));G.add(bx(ww-.1,.1,.4,std('#2a2a2c',{roughness:.8}),0,.05,-.27));
      const imgs=await Promise.all(dk.map(d=>loadImg('images/'+(d.cover||d.img))));const top=CH/2+wh/2-.25;
      dk.forEach((d,i)=>{const cI=i%cols,rI=Math.floor(i/cols),q=new THREE.Group();const fw=isDeck?tw:tw,fh=th2;
        if(isDeck){q.add(mesh(rr(fw+.024,fh+.024,.012,.04,.004),INK()));const sc2=rface(fw,fh,.006,scrM(screenTex(imgs[i],asp)));sc2.position.z=.0212;q.add(sc2);
          const cp=textPlane(tw,.5,(cx,u)=>{cx.fillStyle=INKC;let fs=.128*u,L;for(;;){cx.font=cssFont(600,fs);L=[''];d.title.split(' ').forEach(w=>{const t=L[L.length-1]?L[L.length-1]+' '+w:w;if(cx.measureText(t).width>tw*u&&L[L.length-1])L.push(w);else L[L.length-1]=t;});if(L.length<=2||fs<.08*u)break;fs*=.93;}L.slice(0,2).forEach((l,k)=>cx.fillText(l,0,(.13+k*.155)*u));cx.fillStyle=GREY;cx.font=cssFont(500,.092*u);cx.fillText((d.format||'').slice(0,40),0,(.13+L.slice(0,2).length*.155+.01)*u);},260);cp.position.set(0,-fh/2-.3,.03);q.add(cp);}
        else{q.add(rb(fw,fh,.05,OAK(1,.6),0,0,0,.008));q.add(bx(fw-.08,fh-.08,.01,std('#fbfbfb',{roughness:.9}),0,0,.024,false));const im=imgs[i],ia=im?im.width/im.height:1,mw=fw-.3,mh=fh-.3,iw=Math.min(mw,mh*ia),ih=iw/ia;const sc2=scr(iw,ih,screenTex(im,ia,{w:900}));sc2.position.z=.036;q.add(sc2);}
        q.position.set((cI-(cols-1)/2)*(tw+gx),top-fh/2-rI*(fh+gy),0);const ga=isDeck?null:ALL.find(z=>z.p.creativePage||z.p.slug===d.slug);
        q.traverse(o=>{if(o.isMesh){if(isDeck){o.userData.deck=i;o.userData.si=sec.si;}else o.userData.k=ga?`${ga.si}-${ga.pi}`:null;W3.clickables.push(o);}});G.add(q);(W3.deckTiles=W3.deckTiles||[]).push(q);});
      G.position.copy(wc);G.rotation.y=yaw(s)-sd*Math.PI/2;S.add(G);solids.push({s,sd,half:ww/2+1});
      {const b=bench(3);place(b,s,sd*(HW-1.5-Math.min(9,ww*.75)),Math.PI/2);S.add(b);}
      ST.push({kind:isDeck?'decks':'gallery',name:isDeck?'Deck wall':'Gallery wall',sec:short,s,sm:s+ww/2+3,sd,wc,ww,wh,title,n,si:sec.si,k:!isDeck&&ALL.find(z=>z.p.creativePage)?(()=>{const z=ALL.find(z=>z.p.creativePage);return`${z.si}-${z.pi}`;})():null,
        sub:isDeck?dk.length+' decks. Click a screen to open it.':'Posters, packaging, paintings, photography, film, 3D and games.'});s+=ww/2+5;
    }
  }
  // the terrace at the end of the ring
  const se=s+8,SE=se+9;W3.SE=SE;ST.push({kind:'end',name:'Say hello',sec:'Contact',s:se,title:D.endline||"Let's talk."});
  [[-3.4,0],[3.4,0],[-4.6,3.6],[4.6,3.6]].forEach(([o,ds],i)=>{const t=barTable();place(t,se+ds,o);S.add(t);[[.66,0],[-.66,0]].forEach(([a,b])=>{const q=stool();q.position.copy(at(se+ds+b,o+a));S.add(q);});});
  [[-6.6,1.8],[6.6,1.8]].forEach(([o,ds],i)=>S.add(place(potTree(i+4,2.6),se+ds,o)));[[-1.4,6.4],[1.4,6.4],[-7,5.4],[7,5.4]].forEach(([o,ds],i)=>S.add(place(potFern(i),se+ds,o)));
  [-1,1].forEach(k=>{const m=mat2(5.4,8);place(m,se+2.6,k*4.3);S.add(m);});

  /* the ring itself */
  const A0=0,A1=SE/R0,AE=Math.PI*2-.62,SF=AE*R0,ri=R0-HW,ro=R0+HW,OV=3.2;
  const fc=document.createElement('canvas');fc.width=fc.height=512;const fx=fc.getContext('2d');fx.fillStyle='#ecebe6';fx.fillRect(0,0,512,512);let sd0=11;const rnd=()=>(sd0=(sd0*16807)%2147483647)/2147483647;
  for(let i=0;i<2600;i++){const g=150+rnd()*90|0;fx.fillStyle=`rgba(${g},${g-4},${g-12},${.1+rnd()*.3})`;fx.beginPath();fx.ellipse(rnd()*512,rnd()*512,.6+rnd()*2.2,.6+rnd()*1.6,rnd()*3,0,7);fx.fill();}
  fx.strokeStyle='rgba(120,118,110,.35)';fx.lineWidth=1.5;fx.strokeRect(0,0,512,512);const ft=tex(fc);ft.wrapS=ft.wrapT=THREE.RepeatWrapping;
  const floor=mesh(sector(ri,ro,A0,AE,0,true,2.8,2.8),std('#ffffff',{map:ft,roughness:.34,metalness:0,envMapIntensity:.75}));floor.castShadow=false;S.add(floor);
  {const pc=document.createElement('canvas');pc.width=pc.height=256;const px=pc.getContext('2d');for(let i=0;i<2;i++)for(let j=0;j<4;j++){const v=198+rnd()*14|0;px.fillStyle=`rgb(${v},${v-1},${v-5})`;px.fillRect(i*128,j*64,128,64);}px.strokeStyle='rgba(90,90,88,.55)';px.lineWidth=2;for(let j=0;j<=4;j++){px.beginPath();px.moveTo(0,j*64);px.lineTo(256,j*64);px.stroke();}for(let j=0;j<4;j++)for(let i=0;i<=2;i++){const xx=(i*128+(j%2)*64)%256;px.beginPath();px.moveTo(xx,j*64);px.lineTo(xx,j*64+64);px.stroke();}
    const pt=tex(pc);pt.wrapS=pt.wrapT=THREE.RepeatWrapping;const pav=(rx,ry)=>{const t=pt.clone();t.needsUpdate=true;t.repeat.set(rx,ry);return std('#ffffff',{map:t,roughness:.85});},kerb=std('#8f9092',{roughness:.8}),PW=3.4;W3.PW=PW;
    const pm=std('#ffffff',{map:pt,roughness:.85});[[ri-PW,ri],[ro,ro+PW]].forEach(([r0,r1])=>{const m=mesh(sector(r0,r1,A0,AE,-.012,true,2.4,2.4),pm);m.castShadow=false;S.add(m);});
    [ri-PW-.22,ro+PW].forEach(r=>{const m=mesh(sector(r,r+.22,A0,AE,.07,true,1,1),kerb);S.add(m);[r,r+.22].forEach(q=>S.add(mesh(arcWall(q,A0,AE,-.05,.07,1,1),std('#8f9092',{roughness:.8,side:THREE.DoubleSide}),0,0,0,false)));});
    // forecourt in front of the doors, with a walk leading up to it
    const fw=HW+PW,fd=15;const fcp=mesh(new THREE.PlaneGeometry(fw*2,fd),pav(fw*2/2.4,fd/2.4),0,-.012,fd/2);fcp.rotation.x=-Math.PI/2;fcp.castShadow=false;S.add(fcp);
    const wk=mesh(new THREE.PlaneGeometry(7,30),pav(7/2.4,30/2.4),0,-.012,fd+15);wk.rotation.x=-Math.PI/2;wk.castShadow=false;S.add(wk);
    [[-fw-.11,fd/2,.22,fd+.22],[fw+.11,fd/2,.22,fd+.22],[-(fw+3.5)/2-.05,fd+.11,fw-3.5+.3,.22],[(fw+3.5)/2+.05,fd+.11,fw-3.5+.3,.22],[-3.61,fd+15,.22,30],[3.61,fd+15,.22,30]].forEach(([x,z,w,d])=>S.add(bx(w,.13,d,kerb,x,.005,z)));
    // planting beds cut into the forecourt, edged in steel, each with one tree
    [[-8.4,11.4],[8.4,11.4]].forEach(([x,z],i)=>{const bed=cyl(1.25,.06,std('#4a3b2c',{roughness:1}),x,.02,z,40);bed.castShadow=false;S.add(bed);const rg=mesh(new THREE.TorusGeometry(1.27,.035,8,48),STEEL(),x,.05,z);rg.rotation.x=Math.PI/2;S.add(rg);(W3.bedTrees=W3.bedTrees||[]).push([x,z,7+i*.8]);[0,2.1,4.2].forEach((fa,j)=>{const f=fern(i+j,.55);f.position.set(x+Math.cos(fa)*.75,.05,z+Math.sin(fa)*.75);S.add(f);});});}
  {const gc=document.createElement('canvas');gc.width=gc.height=512;const g=gc.getContext('2d');g.fillStyle='#83904c';g.fillRect(0,0,512,512);for(let i=0;i<60;i++){const v=rnd();g.fillStyle=`rgba(${150+v*40|0},${150+v*25|0},${70+v*20|0},.10)`;g.beginPath();g.ellipse(rnd()*512,rnd()*512,30+rnd()*70,20+rnd()*50,rnd()*3,0,7);g.fill();}
    for(let i=0;i<16000;i++){const v=rnd();g.fillStyle=`rgba(${95+v*70|0},${115+v*60|0},${45+v*40|0},.4)`;g.fillRect(rnd()*512,rnd()*512,1+rnd()*2,1+rnd()*3);}
    const gt=tex(gc);gt.wrapS=gt.wrapT=THREE.RepeatWrapping;gt.repeat.set(110,110);const lg=new THREE.RingGeometry(.5,640,96,16),lp=lg.attributes.position,col=[];for(let i=0;i<lp.count;i++){const r=Math.hypot(lp.getX(i),lp.getY(i));col.push(1,1,1,r<430?1:Math.max(0,1-(r-430)/200));}
    lg.setAttribute('color',new THREE.Float32BufferAttribute(col,4));const lawn=mesh(lg,std('#ffffff',{map:gt,roughness:1,envMapIntensity:.25,vertexColors:true,transparent:true}),CX,-.06,0);lawn.rotation.x=-Math.PI/2;lawn.castShadow=false;lawn.renderOrder=-1;S.add(lawn);}
  if(!mob){const rg=sector(ri,ro,A0,A1,0,true,1,1),P=rg.attributes.position;for(let i=0;i<P.count;i++)P.setXYZ(i,P.getX(i),-P.getZ(i),0);rg.deleteAttribute('normal');rg.computeVertexNormals();
    const rf=new Reflector(rg,{textureWidth:SNAP?512:1024,textureHeight:SNAP?512:1024,clipBias:.003,color:0xffffff});rf.material.fragmentShader=rf.material.fragmentShader.replace('gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );','gl_FragColor = vec4( base.rgb, 0.2 );');
    rf.material.transparent=true;rf.material.depthWrite=false;rf.rotation.x=-Math.PI/2;rf.position.y=.014;rf.renderOrder=1;rf.material.polygonOffset=true;rf.material.polygonOffsetFactor=-2;rf.material.polygonOffsetUnits=-2;S.add(rf);W3.rf=rf;}
  // slatted oak ceiling: oak with dark shadow gaps drawn across it
  let cm;{const im=TX.oak_d&&TX.oak_d.image,cc=document.createElement('canvas');cc.width=cc.height=1024;const c=cc.getContext('2d');if(im){c.save();c.translate(512,512);c.rotate(Math.PI/2);c.drawImage(im,-512,-512,1024,1024);c.restore();}else{c.fillStyle='#b98d5a';c.fillRect(0,0,1024,1024);}
    for(let i=0;i<8;i++){const y=i*128;const g=c.createLinearGradient(0,y,0,y+128);g.addColorStop(0,'rgba(0,0,0,.85)');g.addColorStop(.07,'rgba(0,0,0,.85)');g.addColorStop(.1,'rgba(0,0,0,.18)');g.addColorStop(.2,'rgba(0,0,0,0)');g.addColorStop(.92,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.25)');c.fillStyle=g;c.fillRect(0,y,1024,128);}
    const t=tex(cc);t.wrapS=t.wrapT=THREE.RepeatWrapping;cm=std('#ffffff',{map:t,roughness:.7,side:THREE.DoubleSide,emissive:'#ffffff',emissiveMap:t,emissiveIntensity:.42});}
  const ceil=mesh(sector(ri-OV,ro+OV,A0-.09,AE+.05,CH,false,2.6,1.6),cm);ceil.receiveShadow=false;S.add(ceil);
  const fas=std('#f7f7f5',{roughness:.5,side:THREE.DoubleSide});[ri-OV,ro+OV].forEach(r=>S.add(mesh(arcWall(r,A0-.09,AE+.05,CH-.02,CH+.42,1,1),fas,0,0,0,false)));
  S.add(mesh(sector(ri-OV,ro+OV,A0-.09,AE+.05,CH+.42,true,3,3),fas));
  [A0-.09,AE+.05].forEach(a=>{const c=Math.cos(a),sn=Math.sin(a),e=bx(HW*2+OV*2,.44,.06,fas,CX+R0*c,CH+.2,-R0*sn,false);e.rotation.y=a;S.add(e);});
  // roof seen from the air: a band of dark solar panels between white edges
  {const sc2=document.createElement('canvas');sc2.width=sc2.height=128;const q=sc2.getContext('2d');q.fillStyle='#232b36';q.fillRect(0,0,128,128);q.strokeStyle='rgba(150,170,190,.5)';q.lineWidth=2;q.strokeRect(1,1,126,126);q.strokeStyle='rgba(150,170,190,.2)';q.lineWidth=1;q.beginPath();q.moveTo(64,0);q.lineTo(64,128);q.moveTo(0,64);q.lineTo(128,64);q.stroke();
    const st2=tex(sc2);st2.wrapS=st2.wrapT=THREE.RepeatWrapping;S.add(mesh(sector(ri-.6,ro+.6,A0+.02,AE-.06,CH+.46,true,3.2,3.2),std('#ffffff',{map:st2,roughness:.25,metalness:.5}),0,0,0,false));}
  // courtyard: a round pond with paths running out to the building
  {const water=std('#7f9fb0',{roughness:.06,metalness:.7,envMapIntensity:1.4}),pd=cyl(15,.04,water,CX,-.02,0,96);pd.castShadow=false;S.add(pd);const rim=mesh(new THREE.TorusGeometry(15.2,.18,8,96),std('#8f9092',{roughness:.8}),CX,.02,0);rim.rotation.x=Math.PI/2;S.add(rim);
    const pth=std('#d3d2cc',{roughness:.9});[.55,1.7,2.85,4.0,5.1].forEach(a=>{const len=ri-3.6-15.4,m=mesh(new THREE.PlaneGeometry(len,3.2),pth,CX+(15.4+len/2)*Math.cos(a),-.03,-(15.4+len/2)*Math.sin(a),false);m.rotation.set(-Math.PI/2,0,a);m.receiveShadow=true;S.add(m);});W3.paths=[.55,1.7,2.85,4.0,5.1];}
  // glass skins, mullions, columns, downlights
  [ri,ro].forEach(r=>S.add(mesh(arcWall(r,A0,AE,0,CH,1,1),glassM(),0,0,0,false)));
  const I=(geo,mat,list,sh)=>{const m=new THREE.InstancedMesh(geo,mat,list.length),o=new THREE.Object3D();list.forEach((f,i)=>{f(o);o.updateMatrix();m.setMatrixAt(i,o.matrix);});m.castShadow=sh!==false;m.receiveShadow=sh!==false;S.add(m);return m;};
  const mul=[],cols=[],dl=[];for(let q=3;q<SF;q+=3)[-1,1].forEach(k=>mul.push(o=>{o.position.copy(at(q,k*HW,CH/2));o.rotation.set(0,yaw(q),0);}));
  for(let q=4.5;q<SF-2;q+=6)[-1,1].forEach(k=>{if(solids.some(w=>w.sd===k&&Math.abs(w.s-q)<w.half+.5)||W3.portals.some(ps=>q>ps-11&&q<ps+1.5))return;cols.push(o=>{o.position.copy(at(q,k*(HW-.9),CH/2));o.rotation.set(0,0,0);});});
  for(let q=2;q<SE+6;q+=3.2)[-4.6,0,4.6].forEach(of=>dl.push(o=>{o.position.copy(at(q,of,CH-.012));o.rotation.set(Math.PI/2,0,0);}));
  I(new THREE.BoxGeometry(.05,CH,.14),STEEL(),mul);I(new THREE.CylinderGeometry(.15,.15,CH,36),WHITE(),cols);I(new THREE.CircleGeometry(.07,20),flat('#fffaf0'),dl,false);
  [[ri,-1],[ro,1]].forEach(([r])=>S.add(mesh(arcWall(r,A0,AE,0,.06,1,1),STEEL(),0,0,0,false)));
  {const g=new THREE.Group();g.add(mesh(new THREE.PlaneGeometry(HW*2,CH),glassM(),0,CH/2,0,false));for(let i=-2;i<=2;i++)g.add(bx(.05,CH,.14,STEEL(),i*HW/2.5,CH/2,0));place(g,SF,0);S.add(g);}
  // end glass
  {const g=new THREE.Group();g.add(mesh(new THREE.PlaneGeometry(HW*2,CH),glassM(),0,CH/2,0,false));for(let i=-2;i<=2;i++)g.add(bx(.05,CH,.14,STEEL(),i*HW/2.5,CH/2,0));place(g,SE,0);S.add(g);}
  // the front: glass, sliding doors, a stone sign outside
  const F=new THREE.Group(),DW=3.2;[[-HW,-DW/2],[DW/2,HW]].forEach(([a,b])=>{F.add(mesh(new THREE.PlaneGeometry(b-a,CH),glassM(),(a+b)/2,CH/2,0,false));});
  [-HW,-HW/2-.4,-DW/2,DW/2,HW/2+.4,HW].forEach(xx=>F.add(bx(.05,CH,.14,STEEL(),xx,CH/2,0)));F.add(bx(DW,.07,.14,STEEL(),0,2.95,0));F.add(mesh(new THREE.PlaneGeometry(DW,CH-2.98),glassM(),0,2.98+(CH-2.98)/2,0,false));
  W3.doors=[-1,1].map(k=>{const lf=new THREE.Group();lf.add(mesh(new THREE.PlaneGeometry(DW/2-.02,2.9),glassM(),0,1.46,0,false));lf.add(bx(DW/2,.05,.04,STEEL(),0,2.9,0));lf.add(bx(.03,2.9,.04,STEEL(),-k*(DW/4-.015),1.45,0));lf.position.set(k*DW/4,0,.06);F.add(lf);return{lf,k,x0:k*DW/4};});
  S.add(F);
  const sw=narrow?3.4:5.6,sign=new THREE.Group();sign.add(rb(sw,1.25,.6,STONE(),0,.625,0,.02));
  const sg=textPlane(sw-.5,.9,(c,u)=>{c.fillStyle=INKC;c.textAlign='center';c.font=cssFont(700,.5*u);c.fillText('Portfolio',(sw-.5)*u/2,.62*u);},220);sg.position.set(0,.66,.305);sign.add(sg);sign.position.set(narrow?-3.2:4.6,0,narrow?7.5:9.2);sign.rotation.y=narrow?0:.42;S.add(sign);
  // reception
  const rw=narrow?4.4:6.4,Rc=new THREE.Group(),role=(D.role||'').split(' · '),lx=-rw/2+.55;Rc.add(rb(rw,4.2,.6,STONE(),0,.1+2.1,0,.01));Rc.add(bx(rw-.1,.1,.5,std('#2a2a2c',{roughness:.8}),0,.05,0));
  if(FT.b){const ws=narrow?nm.split(' '):[nm],L=ws.map(w=>text3D(w,.66,rw-1.1,LETTER())),sz=Math.min(...L.map(l=>l.size));let y=narrow?3.05:2.75;L.forEach(l=>{l.m.scale.setScalar(sz/.66);l.m.position.set(lx,y,.33);Rc.add(l.m);y-=sz*1.3;});y+=sz*.42;
    role.forEach(r=>{const q=text3D(r,.21,rw-1.1,LETTER2(),'r');q.m.position.set(lx+.02,y,.33);Rc.add(q.m);y-=.36;});
    const lp=textPlane(3,.24,(c,u)=>{c.fillStyle='#8e8e93';c.font=cssFont(500,.15*u);c.fillText(D.location||'Kuala Lumpur',0,.17*u);},190);lp.position.set(lx+1.52,y-.1,.31);Rc.add(lp);}
  else{const lw=textPlane(rw-.8,2.9,(c,u)=>{c.fillStyle=INKC;fitFont(c,nm,(rw-.8)*u,.9*u,700);c.fillText(nm,0,.9*u);c.fillStyle=GREY;c.font=cssFont(600,.3*u);role.forEach((r,i)=>c.fillText(r,0,(1.5+i*.4)*u));},170);lw.position.set(0,2.3,.31);Rc.add(lw);}
  const rs=10,ro2=narrow?-2.4:-3.6;place(Rc,rs,ro2);S.add(Rc);{const LBY=ST.find(q=>q.kind==='lobby');LBY.c=at(rs,ro2,0).add(backV(rs).multiplyScalar(.3));LBY.s=rs;LBY.tw=rw;}
  if(!narrow)S.add(place(potTree(2,2.6),rs+.4,ro2-rw/2-.9));S.add(place(potTree(3,2.2),5,5.6));S.add(place(potFern(1),7.6,3.9));S.add(place(potFern(2),8.4,5.6));{const b=bench(2.6);place(b,6.5,5.2,Math.PI/2);S.add(b);}
  // garden: trees inside the ring and outside it
  {const TT=[['t1',.93,.43],['t4',.68,.52]].filter(q=>TX[q[0]]);if(TT.length){let sd1=5;const r2=()=>(sd1=(sd1*16807)%2147483647)/2147483647,N=SNAP?150:mob?140:360,PWG=3.4,lists=TT.map(()=>[]),sh=[],fl=W3.ferns.map(()=>[]);
    const add=(x,z,h,k)=>{lists[k].push(o=>{o.position.set(x,-h*.035,z);o.rotation.set(0,0,0);o.scale.set(h*TT[k][1],h,1);});sh.push(o=>{o.position.set(x,-.03,z);o.rotation.set(-Math.PI/2,0,0);o.scale.set(h*1.5,h*1.5,1);});};
    (W3.bedTrees||[]).forEach(([x,z,h],i)=>add(x,z,h,i%TT.length));
    for(let i=0;i<N;i++){const inner=i%5<2,a=r2()*Math.PI*2,r=inner?20+r2()*(ri-PWG-20-13):ro+PWG+13+r2()*r2()*140,x=CX+r*Math.cos(a),z=-r*Math.sin(a);
      if(x>-18&&z>-5&&z<56)continue;if(inner&&(W3.paths||[]).some(pa=>{let d=Math.abs(a-pa);d=Math.min(d,Math.PI*2-d);return d*r<4.5;}))continue;
      const k=i%TT.length,h=(inner?7:8.5)+r2()*r2()*8;add(x,z,h,k);
      if(fl.length&&i%3===0){const k2=i%fl.length,fa=r2()*6,fr=1.2+r2()*2,fh=.6+r2()*.5;fl[k2].push(o=>{o.position.set(x+Math.cos(fa)*fr,-.05,z+Math.sin(fa)*fr);o.rotation.set(0,r2()*6,0);o.scale.setScalar(fh/W3.ferns[k2].h);});}}
    blob(1,1);const bm=new THREE.MeshBasicMaterial({map:_bl,transparent:true,opacity:.2,depthWrite:false,toneMapped:false});I(new THREE.PlaneGeometry(1,1),bm,sh,false);
    TT.forEach((q,k)=>{if(!lists[k].length)return;const g=new THREE.PlaneGeometry(1,1);g.translate(.5-q[2],.5,0);const m=new THREE.MeshBasicMaterial({map:TX[q[0]],alphaTest:.5,toneMapped:false,side:THREE.DoubleSide});
      m.onBeforeCompile=sh2=>{sh2.vertexShader=sh2.vertexShader.replace('#include <project_vertex>',`vec4 mvPosition=modelViewMatrix*instanceMatrix*vec4(0.,0.,0.,1.);vec3 bup=normalize((viewMatrix*vec4(0.,1.,0.,0.)).xyz);float bsx=length(instanceMatrix[0].xyz),bsy=length(instanceMatrix[1].xyz);mvPosition.xyz+=vec3(1.,0.,0.)*position.x*bsx+bup*position.y*bsy;gl_Position=projectionMatrix*mvPosition;`);};
      const im=I(g,m,lists[k],false);im.frustumCulled=false;});
    fl.forEach((l,i)=>{if(l.length)I(W3.ferns[i].geo,W3.ferns[i].mat,l,false);});}}
  // low hedges along the outside of the glass
  W3.total=total;setupGlass(R);W3.ready=true;layout3D();R.compile(S,cam);return true;
}

function setupGlass(R){if(/noglass/.test(location.search)||!R.capabilities.isWebGL2||!R.extensions.has('EXT_color_buffer_float'))return;
  const rt=new THREE.WebGLRenderTarget(4,4,{samples:SNAP?0:4,type:THREE.HalfFloatType}),U={tD:{value:rt.texture},uRes:{value:new THREE.Vector2(4,4)},uR:{value:Array.from({length:6},()=>new THREE.Vector4())},uP:{value:Array.from({length:6},()=>new THREE.Vector2())},uN:{value:0},uPr:{value:1}};
  const mat=new THREE.ShaderMaterial({uniforms:U,depthTest:false,depthWrite:false,toneMapped:false,vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`
    uniform sampler2D tD;uniform vec2 uRes;uniform vec4 uR[6];uniform vec2 uP[6];uniform float uN;uniform float uPr;varying vec2 vUv;
    float sdRR(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
    vec3 shoulder(vec3 c){vec3 x=max(c-.82,0.);return min(c,vec3(.82))+.18*(1.-exp(-x/.18));}
    void main(){vec2 px=vec2(vUv.x,1.-vUv.y)*uRes;vec2 off=vec2(0.);float amt=0.,rim=0.,sheen=0.;
      for(int i=0;i<6;i++){if(float(i)>=uN)break;vec4 R=uR[i];vec2 hb=R.zw*.5,p=px-(R.xy+hb);float rad=uP[i].x,d=sdRR(p,hb,rad);
        if(d<0.){float bz=min(20.*uPr,min(R.z,R.w)*.45),e=clamp(1.+d/bz,0.,1.);e=e*e*e;vec2 g=normalize(vec2(sdRR(p+vec2(1.,0.),hb,rad)-d,sdRR(p+vec2(0.,1.),hb,rad)-d)+1e-5);
          off=-g*e*34.*uPr*uP[i].y;amt=uP[i].y;rim=smoothstep(-1.8*uPr,-.3*uPr,d)*(.3+.7*max(0.,dot(g,normalize(vec2(-.6,-1.)))))*uP[i].y;sheen=(1.-clamp((p.y+hb.y)/(R.w),0.,1.))*.08*uP[i].y;}}
      vec2 o=vec2(off.x,-off.y)/uRes,uv=vUv+o;vec3 col=texture2D(tD,uv).rgb;
      if(amt>0.){vec2 b=3.2*uPr/uRes;vec3 a=col;a+=texture2D(tD,uv+b*vec2(1.,.4)).rgb+texture2D(tD,uv+b*vec2(-1.,-.4)).rgb+texture2D(tD,uv+b*vec2(.4,-1.)).rgb+texture2D(tD,uv+b*vec2(-.4,1.)).rgb+texture2D(tD,uv+b*vec2(2.,-1.4)).rgb+texture2D(tD,uv+b*vec2(-2.,1.4)).rgb+texture2D(tD,uv+b*vec2(1.4,2.)).rgb+texture2D(tD,uv+b*vec2(-1.4,-2.)).rgb;a/=9.;
        a.r=mix(a.r,texture2D(tD,uv+o*.12).r,.6);a.b=mix(a.b,texture2D(tD,uv-o*.12).b,.6);
        float l=dot(a,vec3(.3,.59,.11));a=mix(vec3(l),a,1.25);col=mix(col,mix(a,vec3(1.),.5)+sheen+rim*.6,amt);}
      gl_FragColor=vec4(shoulder(col),1.);
      #include <colorspace_fragment>
    }`});
  const sc=new THREE.Scene();sc.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),mat));const els=[['#bar',e=>e.classList.contains('hide')?0:1],['#guide',()=>1],['#cap',e=>e.classList.contains('on')?1:0],['#hcard',()=>W3.heroA==null?1:W3.heroA],['#endc',e=>e.classList.contains('on')?1:0]].map(([q,f])=>({el:$(q),f,a:0}));
  W3.post={rt,mat,sc,cam:new THREE.Camera(),U,els};}
function drawFrame(){const R=W3.R,P=W3.post;if(!P){R.render(W3.S,W3.cam);return;}
  const cv=W3.cv,pr=cv.width/Math.max(1,cv.clientWidth),cr=cv.getBoundingClientRect();if(P.rt.width!==cv.width||P.rt.height!==cv.height){P.rt.setSize(cv.width,cv.height);P.U.uRes.value.set(cv.width,cv.height);}
  let n=0;P.els.forEach(o=>{if(!o.el)return;const t=o.f(o.el);o.a+=(t-o.a)*(SNAP?1:.22);if(o.a<.02||n>5)return;const r=o.el.getBoundingClientRect();if(r.width<4||r.bottom<cr.top||r.top>cr.bottom)return;
    if(o.rad==null)o.rad=parseFloat(getComputedStyle(o.el).borderRadius)||0;P.U.uR.value[n].set((r.left-cr.left)*pr,(r.top-cr.top)*pr,r.width*pr,r.height*pr);P.U.uP.value[n].set(Math.min(o.rad,r.height/2,r.width/2)*pr,Math.min(1,o.a));n++;});
  P.U.uN.value=n;P.U.uPr.value=pr;R.setRenderTarget(P.rt);R.render(W3.S,W3.cam);R.setRenderTarget(null);R.render(P.sc,P.cam);}
const g3=on=>{if(W3._g3!==on){W3._g3=on;document.documentElement.classList.toggle('g3',on);}};
function layout3D(){
  if(!W3.ready)return;const w=innerWidth,h=innerHeight;W3.R.setSize(w,h,false);W3.cam.aspect=w/h;W3.cam.updateProjectionMatrix();
  const vf=Math.tan(W3.cam.fov*Math.PI/360),a=W3.cam.aspect,ST=W3.stations,nr=a<1.25;
  const fit=(ww,hh,min,max)=>Math.min(max||99,Math.max(min||0,hh*1.14/2/vf,ww*1.08/2/(vf*a)));
  ST.forEach(st=>{
    if(st.kind==='air'){st.pos=nr?[60,70,185]:[78,30,122];st.look=nr?[CX+14,6,-10]:[CX+26,9,-14];}
    if(st.kind==='door'){st.pos=nr?[2.4,1.6,38]:[13.5,1.5,31];st.look=nr?[-1.5,11.5,0]:[-17,4.9,-9];}
    if(st.kind==='lobby'){const d=fit(st.tw+1.2,4.6,7.6,9.4),c=st.c.clone().add(backV(st.s).multiplyScalar(d)).add(rightV(st.s).multiplyScalar(nr?0:.25));st.pos=[c.x,1.7,c.z];st.look=[st.c.x,2.25,st.c.z];}
    if(st.kind==='stage'){const u=st.obj.userData,tb=u.minD<3,k=tb?(nr?1.2:1.06):1,d=Math.min(9,Math.max(u.fh*1.2/2/vf,u.fw*1.1/2/(vf*a),u.minD)*k),c=st.sp.clone().add(st.cdir.clone().multiplyScalar(d));st.pos=[c.x,u.camY,c.z];
      /* devices sit up and to the right, clear of the caption card and the guide bar */
      const rt=new THREE.Vector3(st.cdir.z,0,-st.cdir.x),sx=tb&&!nr?u.fw*.13:0,sy=tb?u.fh*(nr?.3:.0):(a<1?.06:.02)*d;st.look=[st.sp.x-rt.x*sx,u.cy-sy,st.sp.z-rt.z*sx];}
    if(st.kind==='room'){const d=fit(st.tw+.6,nr?5.6:3.5,6,nr?11:9.5),c=st.c.clone().add(backV(st.s).multiplyScalar(d)).add(rightV(st.s).multiplyScalar(nr?0:1.6));st.pos=[c.x,1.7,c.z];st.look=[st.c.x,nr?1.5:2.3,st.c.z];}
    if(st.kind==='decks'||st.kind==='gallery'){const d=fit(st.ww,st.wh+(nr?3.2:1.9),5,HW*2-3.4),c=st.wc.clone().add(rightV(st.s).multiplyScalar(-st.sd*d));st.pos=[c.x,1.75,c.z];st.look=[st.wc.x,CH/2-(nr?1.25:.85),st.wc.z];}
    if(st.kind==='end'){const c=at(st.s-(nr?5:6),0),l=at(st.s+9,0);st.pos=[c.x,1.7,c.z];st.look=[l.x,1.75,l.z];}
  });
  /* between two stops the camera first steps back into the aisle, so it never cuts through a table or a wall */
  const pp=[],ll=[];ST.forEach((st,i)=>{const p=new THREE.Vector3(...st.pos),l=new THREE.Vector3(...st.look);pp.push(p);ll.push(l);const nx=ST[i+1];if(!nx)return;
    const nl=new THREE.Vector3(...nx.look);if(st.mid){pp.push(new THREE.Vector3(...st.mid));ll.push(l.clone().lerp(nl,.6));return;}const m=at(st.sm!=null?st.sm:st.s,st.om||0,1.68),fw=at((st.sm!=null?st.sm:st.s)+7,0,1.6);pp.push(m);ll.push(fw.lerp(nl,.45));});
  W3.cp=new THREE.CatmullRomCurve3(pp,false,'centripetal');W3.cl=new THREE.CatmullRomCurve3(ll,false,'centripetal');
  W3.step=Math.round(h*(w<700?.9:.85));$('#walk').style.height=((ST.length-1)*W3.step+h+h*.5)+'px';if(window.buildGuide)buildGuide(ST);
}
const ease=t=>t*t*t*(t*(t*6-15)+10);
let camPos=null,camLook=null,mxx=0,myy=0,smx=0,smy=0,hovK=null,hovDeck=-1,curSt=-1;
function goStop(i){scrollTo({top:$('#walk').offsetTop+Math.max(0,Math.min(W3.stations.length-1,i))*W3.step,behavior:RM?'auto':'smooth'});}
function walkTarget(){const ST=W3.stations,y=scrollY-$('#walk').offsetTop,s=Math.max(0,Math.min(ST.length-1,y/W3.step));const i=Math.min(ST.length-2,Math.floor(s)),f=s-i,t=ease(Math.max(0,Math.min(1,(f-.08)/.84))),u=(i+t)/(ST.length-1);
  return{pos:W3.cp.getPoint(u),look:W3.cl.getPoint(u),s,i,f,t,near:Math.round(s)};}
function setCap(st){const cap=$('#cap'),ec=$('#endc');if(!st||st.kind==='air'||st.kind==='door'||st.kind==='lobby'){cap.classList.remove('on');ec.classList.remove('on');return;}
  ec.classList.toggle('on',st.kind==='end');if(st.kind==='end'){cap.classList.remove('on');return;}
  if(st.kind==='stage'){const p=st.x.p;$('#cn').textContent=String(st.num).padStart(2,'0')+' of '+String(st.total).padStart(2,'0');$('#cs').textContent=(p.kind||st.x.s.title);$('#ct').textContent=p.title;$('#cm').textContent=p.line||p.meta||'';
    $('#cb').hidden=false;$('#cb').dataset.k=st.k;$('#cb').firstChild.textContent=p.live?'Open the live prototype ':'View project ';}
  else{$('#cn').textContent=st.n;$('#cs').textContent=st.kind==='room'?'Next':'';$('#ct').textContent=st.title;$('#cm').textContent=st.sub||'';$('#cb').hidden=st.kind==='room';
    if(st.kind==='decks'){$('#cb').dataset.k='decks:'+st.si;$('#cb').firstChild.textContent='See all decks ';}if(st.kind==='gallery'){$('#cb').hidden=!st.k;$('#cb').dataset.k=st.k||'';$('#cb').firstChild.textContent='See all the work ';}}
  cap.classList.add('on');}
const shown=o=>{for(let q=o;q;q=q.parent)if(!q.visible)return false;return true;};
function pick(m){W3.ray=W3.ray||new THREE.Raycaster();W3.ray.setFromCamera(m,W3.cam);return W3.ray.intersectObjects(W3.clickables,false).find(h=>shown(h.object));}
const SUN=new THREE.Vector3(.55,.62,.5).normalize();
function loop3D(now){
  requestAnimationFrame(loop3D);if(!W3.ready||CUR){g3(false);return;}if($('#walk').getBoundingClientRect().bottom<60){g3(false);return;}g3(!!W3.post);
  const T=walkTarget(),tt=now/1000;if(!camPos){camPos=T.pos.clone();camLook=T.look.clone();}
  const k=RM||SNAP?1:.075;camPos.lerp(T.pos,k);camLook.lerp(T.look,k);smx+=(mxx-smx)*.04;smy+=(myy-smy)*.04;
  W3.cam.position.set(camPos.x,camPos.y,camPos.z);W3.cam.lookAt(camLook.x,camLook.y,camLook.z);if(!RM){W3.cam.rotateY(-smx*.035);W3.cam.rotateX(-smy*.02);}
  const op=T.i===0?ease(Math.min(1,T.f*1.4)):1;W3.doors.forEach(d=>d.lf.position.x=d.x0+d.k*op*1.5);
  const fx=Math.round((camPos.x+camLook.x)/8)*4,fz=Math.round((camPos.z+camLook.z)/8)*4;W3.sun.position.set(fx+SUN.x*60,SUN.y*60,fz+SUN.z*60);W3.sun.target.position.set(fx,0,fz);
  const ns=W3.stations[T.near];
  if(!RM)W3.stations.forEach(st=>{if(st.kind==='stage'&&Math.abs(st.num-(ns&&ns.num||-9))<2)st.obj.userData.anim.forEach(f=>f(tt));});
  (W3.deckTiles||[]).forEach(q=>{const u=q.children[0].userData,hov=(u.deck!=null&&u.deck===hovDeck&&u.si===W3.hovSi)||(u.deck==null&&u.k&&W3.hovObj&&(W3.hovObj===q.children[0]));q.userData.sc=(q.userData.sc||1)+((hov?1.04:1)-(q.userData.sc||1))*.16;q.scale.setScalar(q.userData.sc);if(q.userData.z0==null)q.userData.z0=q.position.z;q.position.z=q.userData.z0+(hov?.08:0);});
  W3.videos.forEach(o=>{const near=ns&&ns.kind==='stage'&&ns.num===o.num;if(near&&o.v.paused)o.v.play().catch(()=>{});if(!near&&!o.v.paused)o.v.pause();const want=near&&o.v.readyState>=2?o.vt:o.still;if(o.mat.map!==want){o.mat.map=want;o.mat.needsUpdate=true;}});
  if(W3.mouse&&matchMedia('(hover:hover)').matches){const hit=pick(W3.mouse),nk=hit&&hit.object.userData.k||null,nd=hit&&hit.object.userData.deck!=null?hit.object.userData.deck:-1;W3.hovSi=hit?hit.object.userData.si:-1;W3.hovObj=hit?hit.object:null;if(nk!==hovK||nd!==hovDeck){hovK=nk;hovDeck=nd;W3.cv.classList.toggle('hov',!!nk||nd>=0);}}
  $('#hero').style.opacity=W3.heroA=Math.max(0,1-T.s*2.4);$('#hero').style.transform=`translateY(${-T.s*50}px)`;$('#cue').style.opacity=Math.max(0,1-T.s*4);
  const near=T.f<.3||T.f>.7?T.near:-1;if(near!==curSt){curSt=near;setCap(near>=0?W3.stations[near]:null);}
  if(window.setGuide)setGuide(T.near,T.s/(W3.stations.length-1));drawFrame();
}
function wire3D(){const cv=W3.cv;let dx=0,dy=0;
  cv.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();W3.mouse=W3.mouse||new THREE.Vector2();W3.mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);if(e.pointerType==='mouse'){mxx=W3.mouse.x;myy=-W3.mouse.y;}},{passive:true});
  cv.addEventListener('pointerleave',()=>{mxx=myy=0;});cv.addEventListener('pointerdown',e=>{dx=e.clientX;dy=e.clientY;});
  cv.addEventListener('click',e=>{if(Math.abs(e.clientX-dx)+Math.abs(e.clientY-dy)>8)return;const r=cv.getBoundingClientRect(),hit=pick(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1));if(!hit)return;const u=hit.object.userData;if(u.deck!=null)openDeck(u.si,u.deck);else if(u.k)openCase(u.k);});
  addEventListener('resize',()=>{clearTimeout(W3._rz);W3._rz=setTimeout(()=>{/* the scene is built for wide or tall screens; if the window crosses over, build it again */if((innerWidth/innerHeight<1.25)!==W3.narrow||(innerWidth<700)!==W3.mob){location.reload();return;}layout3D();},250);});
  addEventListener('keydown',e=>{if(CUR||$('#walk').getBoundingClientRect().bottom<innerHeight*.5)return;const i=Math.round((scrollY-$('#walk').offsetTop)/W3.step);if(e.key==='ArrowRight'){e.preventDefault();goStop(i+1);}if(e.key==='ArrowLeft'){e.preventDefault();goStop(i-1);}});
  $('#cb').onclick=e=>{const k=e.currentTarget.dataset.k;if(!k)return;if(k.startsWith('decks:'))openDeck(+k.split(':')[1],0);else openCase(k);};
}
Object.assign(window,{build3D,layout3D,loop3D,wire3D,goStop});window.__walk=true;if(window.start)window.start();
