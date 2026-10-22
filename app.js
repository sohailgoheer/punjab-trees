/* Punjab Trees: frontend-only prototype. No API or server/database writes yet. */
const demoTrees = [
  {
    id:1, title:"Canal Road Neem", owner:"Ayesha Rahman", initials:"AR",
    species:"Neem", city:"Lahore", place:"Canal Road Greenbelt, Lahore",
    lat:31.5204,lng:74.3587, planted:"2026-05-14", status:"Growing beautifully",
    description:"A little neem planted beside a busy greenbelt. We visit regularly, take new photos, and watch its story unfold one season at a time.",
    photo:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85",
    likes:126, comments:[
      {name:"Bilal A.",date:"2026-10-08",message:"Beautiful progress! Keep sharing the updates."},
      {name:"Sana M.",date:"2026-10-07",message:"MashAllah, hope this tree gives shade to many people one day."}
    ],
    updates:[
      {date:"2026-10-08",title:"New season, fresh leaves",note:"The tree looks fuller. We watered it and added fresh mulch around its roots.",photo:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1100&q=82"},
      {date:"2026-08-12",title:"Three-month growth check",note:"New branches have appeared and the leaves look healthy.",photo:"https://images.unsplash.com/photo-1458966480358-a0ac42de0a7a?auto=format&fit=crop&w=1100&q=82"},
      {date:"2026-05-14",title:"Day 1 — The beginning",note:"Planted with hope. First photo and location saved.",photo:"https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1100&q=82"}
    ]
  },
  {
    id:2,title:"Our School's Moringa",owner:"Eco Club Hasilpur",initials:"EC",
    species:"Moringa",city:"Bahawalpur",place:"School courtyard, Hasilpur",
    lat:29.6939,lng:72.5540,planted:"2026-06-02",status:"Well cared for",
    description:"School children planted this moringa, then started taking monthly pictures. Now the whole class follows its journey and helps with watering.",
    photo:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=85",
    likes:93,comments:[
      {name:"Hina S.",date:"2026-10-10",message:"What a wonderful idea for the school kids!"},
      {name:"Farhan K.",date:"2026-09-20",message:"Love seeing every stage of its growth."}
    ],
    updates:[
      {date:"2026-10-10",title:"A healthier little tree",note:"Students captured the newest growth after their morning watering round.",photo:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1100&q=82"},
      {date:"2026-08-21",title:"Our first follow-up",note:"The children took their second picture and checked the leaves.",photo:"https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1100&q=82"},
      {date:"2026-06-02",title:"Planting day at school",note:"A small planting activity brought the entire class together.",photo:"https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1100&q=82"}
    ]
  },
  {
    id:3,title:"Amaltas for Our Street",owner:"Hamza Ali",initials:"HA",
    species:"Amaltas",city:"Multan",place:"Bosan Road, Multan",
    lat:30.1575,lng:71.5249,planted:"2026-04-22",status:"New branches",
    description:"Our family adopted a small amaltas beside the street. These dated photos are a reminder that growing something beautiful needs patience.",
    photo:"https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=1400&q=85",
    likes:158,comments:[{name:"Maryam",date:"2026-10-04",message:"Looking forward to seeing it flower one day!"}],
    updates:[
      {date:"2026-10-04",title:"Leaves after the monsoon",note:"Fresh foliage and a stronger stem in the latest photograph.",photo:"https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=1100&q=82"},
      {date:"2026-07-18",title:"Growing in the summer",note:"We placed a small guard to protect it from roadside traffic.",photo:"https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&w=1100&q=82"},
      {date:"2026-04-22",title:"A promise made",note:"First planting photo and GPS location recorded.",photo:"https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1100&q=82"}
    ]
  },
  {
    id:4,title:"Peepal at the Village Well",owner:"Noor Fatima",initials:"NF",
    species:"Peepal",city:"Faisalabad",place:"Near community well, Faisalabad",
    lat:31.4504,lng:73.1350,planted:"2026-02-16",status:"Healthy canopy",
    description:"A community tree planted near the old village well. Neighbors now share pictures from the same spot to record how it grows.",
    photo:"https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=85",
    likes:201,comments:[
      {name:"Usman",date:"2026-09-29",message:"The same-photo-angle updates are such a nice idea."},
      {name:"Areeba",date:"2026-09-28",message:"May this be a beautiful shade tree for generations."}
    ],
    updates:[
      {date:"2026-09-29",title:"A canopy taking shape",note:"A wider crown is now visible in the new picture.",photo:"https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1100&q=82"},
      {date:"2026-06-11",title:"Our summer visit",note:"We cleaned around the base and checked the soil moisture.",photo:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=82"},
      {date:"2026-02-16",title:"First little step",note:"Neighbors gathered together to plant a peepal.",photo:"https://images.unsplash.com/photo-1458966480358-a0ac42de0a7a?auto=format&fit=crop&w=1100&q=82"}
    ]
  }
];
const K={stories:"punjabtrees_demo_stories",comments:"punjabtrees_demo_comments",updates:"punjabtrees_demo_updates"};
const fallbackPhoto="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1100&q=82";
function readLocal(key,otherwise){try{const v=JSON.parse(localStorage.getItem(key));return v??otherwise;}catch(e){return otherwise;}}
function saveLocal(key,v){try{localStorage.setItem(key,JSON.stringify(v));return true;}catch(e){return false;}}
function esc(x){return String(x??"").replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function photoUrl(src){src=String(src||"");return /^https:\/\/images\.unsplash\.com\//.test(src)||/^data:image\/(?:png|jpeg|webp);base64,/.test(src)?src:fallbackPhoto;}
function dateText(s){const d=new Date(s+"T12:00:00");return isNaN(+d)?esc(s):d.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});}
function getStories(){return readLocal(K.stories,[]).concat(demoTrees);}
function getTree(id){return getStories().find(function(t){return String(t.id)===String(id);});}
function commentsFor(tree){return (readLocal(K.comments,{})[String(tree.id)]||[]).concat(tree.comments||[]);}
function updatesFor(tree){return (readLocal(K.updates,{})[String(tree.id)]||[]).concat(tree.updates||[]).sort(function(a,b){return b.date.localeCompare(a.date);});}
function toast(msg){let el=document.getElementById("toast");if(!el){el=document.createElement("div");el.id="toast";el.className="toast";el.setAttribute("role","status");document.body.appendChild(el);}el.textContent=msg;el.classList.add("show");clearTimeout(window._toastTimer);window._toastTimer=setTimeout(function(){el.classList.remove("show");},2800);}
function safeImg(src,alt){return '<img loading="lazy" src="'+esc(photoUrl(src))+'" alt="'+esc(alt)+'" onerror="this.onerror=null;this.src=\''+fallbackPhoto+'\'">';}
function safeCoord(n){return Number.isFinite(Number(n))?Number(n):0;}
function mapHTML(t,big){
  let pins='<span class="pin" style="left:26%;top:34%">📍</span><span class="pin" style="left:68%;top:57%">🌳</span><span class="pin" style="left:52%;top:20%">🌱</span>';
  return '<div class="mini-map'+(big?' right-map':'')+'" role="img" aria-label="Stylized preview of tree locations. Not a real geographic map."><div class="map-road"></div>'+pins+'</div>';
}
function treeCard(t){
  const count=updatesFor(t).length,comments=commentsFor(t).length;
  return '<article class="post">'+
    '<div class="post-head"><div class="initials">'+esc(t.initials)+'</div><div class="post-author"><strong>'+esc(t.owner)+'</strong><small>Planted a '+esc(t.species)+' tree · '+esc(t.city)+'</small></div><span class="subtle-pill">● '+esc(t.status)+'</span></div>'+
    '<a class="post-photo" href="post.html?id='+encodeURIComponent(t.id)+'">'+safeImg(t.photo,t.title)+'<span class="image-badge">📸 '+count+' dated photo updates</span></a>'+
    '<div class="post-content"><div class="post-title-line"><h3>'+esc(t.title)+'</h3></div><p class="post-desc">'+esc(t.description)+'</p>'+
    '<div class="tags"><span class="tag">📅 '+dateText(t.planted)+'</span><span class="tag">📍 '+esc(t.place)+'</span><span class="tag">🌿 '+esc(t.species)+'</span></div>'+
    '<div class="growth-strip"><span class="growth-copy">PLANTED</span><div class="growth-track"><i class="growth-dot"></i><i class="growth-line"></i><i class="growth-dot"></i><i class="growth-line"></i><i class="growth-dot"></i></div><span class="growth-copy">'+count+' UPDATES</span></div>'+
    '<div class="post-footer"><div class="social"><span>♡ '+Number(t.likes||0)+' likes</span><span>💬 '+comments+' comments</span></div><a class="read-link" href="post.html?id='+encodeURIComponent(t.id)+'">View journey →</a></div></div></article>';
}
function refreshStats(){const ts=getStories(),count=ts.reduce(function(s,t){return s+updatesFor(t).length;},0),cs=ts.reduce(function(s,t){return s+commentsFor(t).length;},0);const set=function(id,v){const e=document.getElementById(id);if(e)e.textContent=v;};set("statTrees",ts.length);set("statUpdates",count);set("statPeople",new Set(ts.map(function(t){return t.owner;})).size);set("statComments",cs);}
function renderFeed(filter){
  const root=document.getElementById("feed");if(!root)return;
  let list=getStories().slice();
  if(filter==="newest")list.sort(function(a,b){return b.planted.localeCompare(a.planted);});
  if(filter==="popular")list.sort(function(a,b){return Number(b.likes||0)-Number(a.likes||0);});
  if(filter==="updates")list.sort(function(a,b){return updatesFor(b).length-updatesFor(a).length;});
  root.innerHTML=list.map(treeCard).join("");
}
function readPhoto(file){
  return new Promise(function(resolve,reject){
    if(!file){resolve(fallbackPhoto);return;}
    if(!file.type.startsWith("image/")){reject(new Error("Please select an image."));return;}
    const image=new Image();const u=URL.createObjectURL(file);
    image.onload=function(){try{const ratio=Math.min(1,960/Math.max(image.width,image.height));const c=document.createElement("canvas");c.width=Math.max(1,Math.round(image.width*ratio));c.height=Math.max(1,Math.round(image.height*ratio));c.getContext("2d").drawImage(image,0,0,c.width,c.height);URL.revokeObjectURL(u);resolve(c.toDataURL("image/jpeg",.7));}catch(e){URL.revokeObjectURL(u);reject(e);}};
    image.onerror=function(){URL.revokeObjectURL(u);reject(new Error("Could not load the image."));};image.src=u;
  });
}
function bindNewTree(){
  const modal=document.getElementById("newTreeModal"),open=document.getElementById("newTreeBtn"),form=document.getElementById("newTreeForm");
  if(!modal||!open||!form)return;
  function close(){modal.classList.remove("open");document.body.style.overflow="";}
  open.addEventListener("click",function(){modal.classList.add("open");document.body.style.overflow="hidden";const first=form.querySelector("input");if(first)first.focus();});
  modal.addEventListener("click",function(e){if(e.target===modal||e.target.closest("[data-close-modal]"))close();});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")close();});
  form.addEventListener("submit",async function(e){
    e.preventDefault();const fd=new FormData(form);const submit=form.querySelector('button[type="submit"]');submit.disabled=true;
    try{
      const title=String(fd.get("title")||"").trim(),city=String(fd.get("city")||"").trim(),species=String(fd.get("species")||"").trim();
      const note=String(fd.get("description")||"").trim(),planted=String(fd.get("planted")||"");
      if(!title||!city||!species||!planted){toast("Please complete required fields.");return;}
      const p=await readPhoto(form.querySelector('[name="image"]').files[0]);const id="mine"+Date.now();
      const item={id:id,title:title,city:city,species:species,owner:"You (demo)",initials:"YOU",place:city,lat:0,lng:0,planted:planted,status:"Recently planted",description:note||"A newly planted tree. Follow its story as it grows.",photo:p,likes:0,comments:[],updates:[{date:planted,title:"Day 1 — Planted",note:note||"My first tree photo.",photo:p}]};
      const saved=saveLocal(K.stories,[item].concat(readLocal(K.stories,[])));
      if(!saved){toast("Browser storage is full. Try a smaller image.");return;}
      close();form.reset();renderFeed("newest");refreshStats();document.querySelectorAll("[data-filter]").forEach(function(b){b.classList.toggle("active",b.dataset.filter==="newest");});toast("Demo tree created in this browser 🌱");
      document.getElementById("feedSection").scrollIntoView({behavior:"smooth"});
    }catch(error){toast(error.message||"Could not save the preview tree.");}
    finally{submit.disabled=false;}
  });
}
function renderHome(){
  const root=document.getElementById("feed");if(!root)return;
  refreshStats();renderFeed("all");bindNewTree();
  document.querySelectorAll("[data-filter]").forEach(function(btn){btn.addEventListener("click",function(){document.querySelectorAll("[data-filter]").forEach(function(b){b.classList.remove("active");});btn.classList.add("active");renderFeed(btn.dataset.filter);});});
}
function renderDetail(){
  const root=document.getElementById("detailRoot");if(!root)return;
  const id=new URLSearchParams(location.search).get("id")||"1";const t=getTree(id);
  if(!t){root.innerHTML='<div class="detail-card" style="text-align:center"><h1>Tree story not found</h1><p>Try a story from the community feed.</p><a href="index.html" class="btn">Back to feed</a></div>';return;}
  document.title=t.title+" — Punjab Trees";
  const updates=updatesFor(t),comments=commentsFor(t);
  const related=getStories().filter(function(o){return String(o.id)!==String(t.id);}).slice(0,3);
  let timeHtml=updates.map(function(u,i){return '<div class="time-item"><div class="time-box">'+safeImg(u.photo,u.title)+'<div class="time-content"><div class="time-date">📅 '+dateText(u.date)+(i===0?' · LATEST':'')+'</div><h3>'+esc(u.title)+'</h3><p>'+esc(u.note)+'</p><span class="image-count">📷 Photo update</span></div></div></div>';}).join("");
  let commentsHtml=comments.map(function(c){return '<div class="comment"><div class="initials">'+esc(c.name.trim().substring(0,2).toUpperCase())+'</div><div><strong>'+esc(c.name)+'</strong><small>'+dateText(c.date)+'</small><p>'+esc(c.message)+'</p></div></div>';}).join("");
  root.innerHTML=
    '<div class="breadcrumb"><a href="index.html">Community feed</a> › <span>'+esc(t.title)+'</span></div>'+
    '<div class="detail-grid"><div class="detail-main"><div class="detail-cover">'+safeImg(t.photo,t.title)+'<div class="image-badge">🌿 '+esc(t.status)+'</div></div>'+
    '<div class="detail-card"><div class="eyebrow">A growing story · '+esc(t.species)+'</div><h1 class="serif detail-title">'+esc(t.title)+'</h1><p class="detail-intro">'+esc(t.description)+'</p><div class="owner-row"><div class="initials">'+esc(t.initials)+'</div><div><strong>'+esc(t.owner)+'</strong><small>Tree caretaker · '+esc(t.city)+'</small></div></div>'+
    '<div class="detail-stats"><div class="detail-stat"><small>Planted on</small><strong>'+dateText(t.planted)+'</strong></div><div class="detail-stat"><small>Growth updates</small><strong>'+updates.length+' photos</strong></div><div class="detail-stat"><small>Community</small><strong>'+comments.length+' comments</strong></div><div class="detail-stat"><small>Location</small><strong>'+esc(t.city)+'</strong></div></div></div>'+
    '<section class="detail-card" id="timeline"><div class="block-head"><div><div class="eyebrow">Then & now</div><h2 class="serif">Growth timeline</h2><p>Every new photo becomes a milestone in this tree\'s journey.</p></div><button class="btn btn-soft" id="toggleUpdate" type="button">＋ Add growth photo</button></div>'+
    '<form id="updateForm" class="stack" hidden><div class="form-row"><label>Date<input class="field" name="date" type="date" required max="'+new Date().toISOString().slice(0,10)+'"></label><label>Image<input class="field" name="image" type="file" accept="image/*" required></label></div><label>Growth note<input class="field" name="note" maxlength="220" placeholder="What changed since the last photo?" required></label><div class="hint">Demo upload: only saves in this browser, not to any server.</div><button class="btn" type="submit">Add preview update</button></form>'+
    '<div class="timeline" id="timelineList">'+timeHtml+'</div></section>'+
    '<section class="detail-card" id="comments"><div class="block-head"><div><div class="eyebrow">From the community</div><h2 class="serif">Comments <span style="color:#9cad9d">('+comments.length+')</span></h2></div><span class="subtle-pill">💬 Join the conversation</span></div><div id="commentList">'+commentsHtml+'</div>'+
    '<form class="comment-form" id="commentForm"><div class="form-row"><input class="field" name="name" maxlength="40" placeholder="Your name" required><button type="submit" class="btn">Post comment →</button></div><textarea class="field" name="message" maxlength="500" placeholder="Write something kind about this tree..." required></textarea><span class="hint">Demo comments are only stored in your own browser.</span></form></section></div>'+
    '<aside class="sidebar"><section class="panel"><div class="eyebrow">Planted here</div><h3>Tree location</h3>'+mapHTML(t,true)+'<p class="map-legend">Map artwork is illustrative. Actual GPS map integration comes later.</p>'+
    '<div class="right-meta"><div class="meta-row"><span>Place</span><strong>'+esc(t.place)+'</strong></div><div class="meta-row"><span>Coordinates</span><strong>'+safeCoord(t.lat).toFixed(4)+', '+safeCoord(t.lng).toFixed(4)+'</strong></div><div class="meta-row"><span>Species</span><strong>'+esc(t.species)+'</strong></div><div class="meta-row"><span>Planted</span><strong>'+dateText(t.planted)+'</strong></div></div>'+
    (Number(t.lat)&&Number(t.lng)?'<a class="btn btn-soft" target="_blank" rel="noopener noreferrer" style="width:100%;margin-top:16px" href="https://www.openstreetmap.org/?mlat='+encodeURIComponent(t.lat)+'&mlon='+encodeURIComponent(t.lng)+'#map=15/'+encodeURIComponent(t.lat)+'/'+encodeURIComponent(t.lng)+'">↗ View sample GPS point</a>':'')+
    '</section><section class="panel"><div class="eyebrow">Explore more</div><h3>Other tree stories</h3>'+related.map(function(o){return '<a class="related" href="post.html?id='+encodeURIComponent(o.id)+'">'+safeImg(o.photo,o.title)+'<span><strong>'+esc(o.title)+'</strong><small>'+esc(o.city)+' · '+updatesFor(o).length+' updates</small></span></a>';}).join("")+'</section>'+
    '<div class="side-cta"><div style="font-size:29px">🌱</div><h3 class="serif">Every tree has a story.</h3><p>From the first planting photo to years of growth. Save memories, celebrate progress.</p><a class="btn" href="index.html">Explore all trees →</a></div></aside></div>';
  const toggle=document.getElementById("toggleUpdate"),form=document.getElementById("updateForm");
  toggle.addEventListener("click",function(){form.hidden=!form.hidden;if(!form.hidden)form.querySelector('[name="date"]').value=new Date().toISOString().slice(0,10);});
  form.addEventListener("submit",async function(e){e.preventDefault();const btn=form.querySelector('button[type="submit"]');btn.disabled=true;try{
    const photo=await readPhoto(form.querySelector('[name="image"]').files[0]),note=form.querySelector('[name="note"]').value.trim(),date=form.querySelector('[name="date"]').value;
    if(!note||!date){toast("Add a date and a growth note.");return;}
    const saved=readLocal(K.updates,{});const key=String(t.id);saved[key]=[{date:date,title:"New growth update",note:note,photo:photo}].concat(saved[key]||[]);
    if(!saveLocal(K.updates,saved)){toast("Browser storage full. Try a smaller photo.");return;}toast("Photo update added to this browser 🌱");renderDetail();
  }catch(err){toast(err.message||"Upload failed.");}finally{btn.disabled=false;}});
  document.getElementById("commentForm").addEventListener("submit",function(e){e.preventDefault();const fd=new FormData(e.target),name=String(fd.get("name")||"").trim(),message=String(fd.get("message")||"").trim();if(!name||!message)return;
    const v=readLocal(K.comments,{}),key=String(t.id);v[key]=[{name:name,message:message,date:new Date().toISOString().slice(0,10)}].concat(v[key]||[]);
    if(!saveLocal(K.comments,v)){toast("Could not save demo comment.");return;}toast("Comment added 🌿");renderDetail();document.getElementById("comments").scrollIntoView({behavior:"smooth"});});
}
document.addEventListener("DOMContentLoaded",function(){const page=document.body.dataset.page;if(page==="home")renderHome();if(page==="detail")renderDetail();});