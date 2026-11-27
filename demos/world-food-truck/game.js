// Original-code-derived public demo; targeted preparation changes documented in README.

(() => {
  const DATA = {
    japan: {
      name: "Japan", flag: "🇯🇵", badge: "🗾", colors: ["#ef233c", "#ffffff"], soft: "#ffe5e8", accent: "#d90429",
      names: ["Tokyo Tasty Truck", "Koi Kitchen", "Sakura Street Eats", "Rising Sun Bites"],
      slogans: ["Big flavor in every bite!", "Fresh food, happy friends!", "Roll up for a tasty treat!"],
      colorChoices: [["Cherry Red", "Cream", "#ef233c", "#fff5e6"], ["Ocean Blue", "White", "#2b6cb0", "#ffffff"], ["Sakura Pink", "Green", "#ff7aa2", "#63b36d"]],
      foods: [
        {name:"Sushi", emoji:"🍣", fact:"Sushi can be made with rice, seaweed, vegetables, or fish."},
        {name:"Ramen", emoji:"🍜", fact:"Ramen is a warm noodle soup with broth and tasty toppings."},
        {name:"Onigiri", emoji:"🍙", fact:"Onigiri is a rice snack that is often shaped like a triangle."}
      ],
      stickers: ["🌸","🐟","🍣","🍜","🍙","🗻","🪭","🏮","⭐","🎏","🌊","🥢"],
      music: [523,659,784,659,587,659,523,392]
    },
    egypt: {
      name: "Egypt", flag: "🇪🇬", badge: "𓂀", colors: ["#f4a261", "#264653"], soft: "#fff0d4", accent: "#c65d0e",
      names: ["Nile Bites", "Taste of Egypt", "Cairo Crunch", "Golden Pyramid Grill"],
      slogans: ["A tasty trip in every bite!", "Fresh food for family and friends!", "Golden flavor is rolling your way!"],
      colorChoices: [["Gold", "Red", "#f4b942", "#d62828"], ["Nile Blue", "Sand", "#2a6f97", "#e9d8a6"], ["Emerald", "Gold", "#2a9d8f", "#f4b942"]],
      foods: [
        {name:"Koshari", emoji:"🍲", fact:"Koshari mixes rice, lentils, pasta, chickpeas, and tomato sauce."},
        {name:"Falafel", emoji:"🧆", fact:"Falafel is made with chickpeas, herbs, garlic, and oil."},
        {name:"Basbousa", emoji:"🍰", fact:"Basbousa is a sweet semolina dessert with coconut and butter."}
      ],
      stickers: ["🇪🇬","𓂀","🏺","🌴","🔺","☀️","🧆","🍲","🍰","⭐","🐈","🪲"],
      music: [440,523,554,659,554,523,440,392]
    },
    spain: {
      name: "Spain", flag: "🇪🇸", badge: "💃", colors: ["#e63946", "#fcbf49"], soft: "#fff0c7", accent: "#d62828",
      names: ["Olé Eats", "Madrid Munchies", "Sunny Spain Snacks", "La Fiesta Food Truck"],
      slogans: ["Taste the fiesta!", "Good food brings friends together!", "Big Spanish flavor on the go!"],
      colorChoices: [["Red", "Yellow", "#e63946", "#fcbf49"], ["Orange", "Cream", "#f77f00", "#fff3d0"], ["Blue", "Red", "#457b9d", "#e63946"]],
      foods: [
        {name:"Paella", emoji:"🥘", fact:"Paella is a rice dish with chicken, shrimp, peas, and lemon."},
        {name:"Tortilla Española", emoji:"🍳", fact:"Tortilla Española is a soft egg and potato dish."},
        {name:"Churros", emoji:"🥨", fact:"Churros are sweet treats with sugar, cinnamon, and chocolate."}
      ],
      stickers: ["🇪🇸","🪭","🎸","🥘","🍳","🥨","🫒","☀️","🌹","⭐","🎉","⚽"],
      music: [392,440,523,587,523,440,392,349]
    }
  };
  const state = { country:null, selections:{}, stickers:[], step:0, voice:false, music:false, audio:null, musicTimer:null, selectedFood:null, served:0, stars:0, roundCustomers:[], hintTimer:null, transitionTimer:null, attempts:0 };
  const steps = ["Choose","Learn","Plan","Decorate","Deliver","Finish"];
  const screens = ["startScreen","lessonScreen","planScreen","decorateScreen","reviewScreen","deliveryScreen","finishScreen"];
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  function renderProgress(index=0) {
    const map = [0,1,2,3,3,4,5];
    const current = map[index] ?? 0;
    $("#progress").innerHTML = steps.map((s,i)=>`<div class="step-pill ${i<current?'done':i===current?'active':''}">${i+1}. ${s}</div>`).join("");
  }

  function setTheme(d) {
    document.documentElement.style.setProperty("--accent", d.accent);
    document.documentElement.style.setProperty("--accent2", d.colors[1]);
    document.documentElement.style.setProperty("--soft", d.soft);
  }

  function showScreen(id, speakText="") {
    screens.forEach(x => $("#"+x).classList.toggle("active", x===id));
    const index = screens.indexOf(id);
    renderProgress(index);
    const heading=$("#"+id+" h2") || $("#"+id+" h1");
    if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
    window.scrollTo({top:0, behavior:"smooth"});
    if (state.voice && speakText) setTimeout(()=>speak(speakText), 250);
  }

  function speak(text) { /* Public demo uses visible text; no device/network narration. */ }

  function toast(msg) {
    const t=$("#toast"); t.textContent=msg; t.classList.add("show");
    clearTimeout(t._timer); t._timer=setTimeout(()=>t.classList.remove("show"),1800);
  }

  function beep(type="good") {
    try {
      const ctx = state.audio || (state.audio = new (window.AudioContext||window.webkitAudioContext)());
      const now = ctx.currentTime;
      const notes = type==="good" ? [523,659,784] : type==="bad" ? [220,185] : [440];
      notes.forEach((freq,i)=>{
        const o=ctx.createOscillator(), g=ctx.createGain();
        o.type = type==="bad" ? "sawtooth" : "sine"; o.frequency.value=freq;
        g.gain.setValueAtTime(.0001, now+i*.1); g.gain.exponentialRampToValueAtTime(.16, now+i*.1+.02); g.gain.exponentialRampToValueAtTime(.0001, now+i*.1+.15);
        o.connect(g).connect(ctx.destination); o.start(now+i*.1); o.stop(now+i*.1+.18);
      });
    } catch(e) {}
  }

  function startMusic() {
    if (!state.country) { toast("Choose a country first."); return; }
    state.music = true; $("#musicBtn").textContent="⏸️";
    const ctx = state.audio || (state.audio = new (window.AudioContext||window.webkitAudioContext)());
    if (ctx.state==="suspended") ctx.resume();
    let i=0; const seq=DATA[state.country].music;
    stopMusic(false);
    state.music=true; $("#musicBtn").textContent="⏸️";
    state.musicTimer=setInterval(()=>{
      const o=ctx.createOscillator(), g=ctx.createGain(); o.type="triangle"; o.frequency.value=seq[i%seq.length];
      const now=ctx.currentTime; g.gain.setValueAtTime(.0001,now); g.gain.exponentialRampToValueAtTime(.055,now+.02); g.gain.exponentialRampToValueAtTime(.0001,now+.22);
      o.connect(g).connect(ctx.destination); o.start(); o.stop(now+.24); i++;
    },280);
  }
  function stopMusic(setFlag=true){ clearInterval(state.musicTimer); state.musicTimer=null; if(setFlag) state.music=false; $("#musicBtn").textContent="🎵"; }

  function renderCountries() {
    $("#countryGrid").innerHTML = Object.entries(DATA).map(([key,d])=>`<button class="country-card" data-country="${key}"><span class="country-emoji">${d.flag}</span><strong>${d.name}</strong><span>Learn, design, and deliver</span></button>`).join("");
    $$("[data-country]").forEach(btn=>btn.addEventListener("click",()=>chooseCountry(btn.dataset.country)));
  }

  function chooseCountry(key) {
    state.country=key; state.selections={}; state.stickers=[]; setTheme(DATA[key]);
    // Demo selections remain in this tab only.
    // Generated music is opt-in through the Music button.
    renderLesson(); showScreen("lessonScreen", `You chose ${DATA[key].name}. First, let us learn three foods.`); beep("good");
  }

  function renderLesson() {
    const d=DATA[state.country];
    $("#lessonTitle").textContent=`Foods from ${d.name}`;
    $("#lessonGrid").innerHTML=d.foods.map((f,i)=>`<article class="food-card"><div class="food-art">${f.emoji}</div><h3>${f.name}</h3><p>${f.fact}</p><button class="speak-food" data-food-index="${i}">Review food</button></article>`).join("");
    $$("[data-food-index]").forEach(b=>b.addEventListener("click",()=>{const f=d.foods[+b.dataset.foodIndex];toast(`${f.name}. ${f.fact}`);beep();}));
  }

  function renderPlan() {
    const d=DATA[state.country];
    const group=(title,key,items,format)=>`<div class="question-block"><h3>${title}</h3><div class="choice-grid">${items.map((item,i)=>`<button class="choice-btn ${state.selections[key]===i?'selected':''}" data-choice="${key}" data-index="${i}" aria-pressed="${state.selections[key]===i}">${format(item,i)}</button>`).join("")}</div></div>`;
    $("#questionArea").innerHTML =
      group("1. Choose a truck name","name",d.names,x=>x) +
      group("2. Choose a slogan","slogan",d.slogans,x=>x) +
      group("3. Choose your truck colors","colors",d.colorChoices,x=>`<span class="color-swatch" style="background:${x[2]}"></span><span class="color-swatch" style="background:${x[3]}"></span>${x[0]} and ${x[1]}`) +
      group("4. Choose the main food your truck serves","food",d.foods,x=>`${x.emoji} ${x.name}<small>${x.fact}</small>`);
    $$('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>{
      state.selections[btn.dataset.choice]=+btn.dataset.index; renderPlan();
      $(`[data-choice="${btn.dataset.choice}"][data-index="${btn.dataset.index}"]`)?.focus({preventScroll:true}); beep("good");
      const label=btn.textContent.trim(); speak(`You chose ${label}.`); updatePlanNext();
    }));
    updatePlanNext();
  }
  function updatePlanNext(){ $("#planNext").disabled=!(["name","slogan","colors","food"].every(k=>Number.isInteger(state.selections[k]))); }

  function applyTruckStyle() {
    const d=DATA[state.country], colors=d.colorChoices[state.selections.colors] || d.colorChoices[0];
    $("#truck").style.setProperty("--truck1", colors[2]); $("#truck").style.setProperty("--truck2", colors[3]);
    $("#truckNameSign").textContent=d.names[state.selections.name] || "Food Truck";
  }

  function renderStickerPalette() {
    const d=DATA[state.country];
    $("#stickerGrid").innerHTML=d.stickers.map((s,i)=>`<button class="sticker-btn" data-sticker="${i}" aria-label="Add decoration ${s}">${s}</button>`).join("");
    $$("[data-sticker]").forEach(b=>b.addEventListener("click",()=>addSticker(d.stickers[+b.dataset.sticker])));
    renderStickers();
  }

  function addSticker(symbol) {
    const area=$("#truckStage").getBoundingClientRect();
    state.stickers.push({symbol,x:45+Math.random()*35,y:35+Math.random()*25,size:48});
    renderStickers(); beep("good"); toast("Decoration added. Drag it, or focus it and use arrow keys.");
  }
  function renderStickers() {
    $$("#truckStage .truck-sticker").forEach(x=>x.remove());
    state.stickers.forEach((s,i)=>{
      const el=document.createElement("div"); el.className="truck-sticker"; el.textContent=s.symbol; el.tabIndex=0; el.dataset.i=i; el.setAttribute("role","button");el.setAttribute("aria-label",`Decoration ${i+1}. Arrow keys move; Delete removes.`);
      el.style.left=s.x+"%"; el.style.top=s.y+"%"; el.style.fontSize=s.size+"px"; $("#truckStage").appendChild(el); makeDraggable(el,i);
    });
    $("#stickerCount").textContent=`${state.stickers.length} decoration${state.stickers.length===1?'':'s'} added`;
    $("#decorateNext").disabled=state.stickers.length<3;
  }
  function makeDraggable(el,index){
    let activePointer=null;
    const item=state.stickers[index];
    el.addEventListener("keydown",e=>{
      if(!state.stickers.includes(item))return;
      const directions={ArrowLeft:[-3,0],ArrowRight:[3,0],ArrowUp:[0,-3],ArrowDown:[0,3]};
      if(directions[e.key]){e.preventDefault();const [dx,dy]=directions[e.key];item.x=Math.max(2,Math.min(94,item.x+dx));item.y=Math.max(10,Math.min(82,item.y+dy));el.style.left=item.x+"%";el.style.top=item.y+"%";}
      if(e.key==="Delete"||e.key==="Backspace"){e.preventDefault();state.stickers.splice(state.stickers.indexOf(item),1);renderStickers();$("#undoSticker").focus();}
    });
    const stopDrag=e=>{
      if(activePointer!==e.pointerId)return;
      activePointer=null;el.style.cursor="grab";
      if(el.hasPointerCapture?.(e.pointerId))el.releasePointerCapture(e.pointerId);
    };
    const move=e=>{
      if(activePointer!==e.pointerId||!state.stickers.includes(item))return;
      e.preventDefault();const r=$("#truckStage").getBoundingClientRect();
      if(!r.width||!r.height)return;
      item.x=Math.max(2,Math.min(94,(e.clientX-r.left)/r.width*100));
      item.y=Math.max(10,Math.min(82,(e.clientY-r.top)/r.height*100));
      el.style.left=item.x+"%";el.style.top=item.y+"%";
    };
    el.addEventListener("pointerdown",e=>{
      if(activePointer!==null||e.isPrimary===false||(e.button!==undefined&&e.button!==0)||!state.stickers.includes(item))return;
      e.preventDefault();activePointer=e.pointerId;el.setPointerCapture(e.pointerId);el.style.cursor="grabbing";
    });
    el.addEventListener("pointermove",move);
    for(const event of ["pointerup","pointercancel","lostpointercapture"])el.addEventListener(event,stopDrag);
  }

  function renderReview() {
    const d=DATA[state.country], c=d.colorChoices[state.selections.colors], food=d.foods[state.selections.food];
    $("#summaryList").innerHTML=`<p><strong>Country:</strong> ${d.flag} ${d.name}</p><p><strong>Truck name:</strong> ${d.names[state.selections.name]}</p><p><strong>Slogan:</strong> ${d.slogans[state.selections.slogan]}</p><p><strong>Colors:</strong> ${c[0]} and ${c[1]}</p><p><strong>Main food:</strong> ${food.emoji} ${food.name}</p>`;
    const clone=$("#truckStage").cloneNode(true); clone.id="previewClone"; clone.style.border="0"; clone.style.borderRadius="18px"; clone.style.minHeight="300px"; clone.querySelectorAll(".truck-sticker").forEach(x=>x.style.fontSize="34px");
    $("#previewStage").innerHTML=""; $("#previewStage").appendChild(clone);
  }

  function buildRound() {
    if(!state.country) return;
    clearTimeout(state.hintTimer); state.attempts=0; state.selectedFood=null;
    const d=DATA[state.country];
    const foodPool=[...d.foods].sort(()=>Math.random()-.5);
    state.roundCustomers=foodPool.map((f,i)=>({food:f,served:false,person:["🧒","👧","👦"][i],table:["🪑","🍽️","🪑"][i]}));
    renderDelivery();
    state.hintTimer=setTimeout(showHint,6500);
  }
  function renderDelivery() {
    const d=DATA[state.country];
    $("#customerRow").innerHTML=state.roundCustomers.map((c,i)=>`<button class="customer ${c.served?'served':''}" data-customer="${i}" ${c.served?'disabled':''}><div class="person">${c.person}</div><div class="bubble">${c.served?'Thank you! ✅':`I would like ${c.food.emoji}<br>${c.food.name}, please.`}</div><div class="table-art">${c.table}</div></button>`).join("");
    $("#foodChoices").innerHTML=d.foods.map((f,i)=>`<button class="food-choice ${state.selectedFood===i?'selected':''}" data-food="${i}"><span class="emoji">${f.emoji}</span>${f.name}</button>`).join("");
    $$("[data-food]").forEach(b=>b.addEventListener("click",()=>{state.selectedFood=+b.dataset.food;renderDelivery();$(`[data-food="${state.selectedFood}"]`)?.focus({preventScroll:true});$("#feedback").textContent=`You picked ${d.foods[state.selectedFood].name}. Now tap the matching customer.`;speak($("#feedback").textContent);beep();clearTimeout(state.hintTimer);state.hintTimer=setTimeout(showCustomerHint,5000);}));
    $$("[data-customer]").forEach(b=>b.addEventListener("click",()=>serveCustomer(+b.dataset.customer)));
    $("#scoreBox").textContent=`Orders: ${state.served} of 6 ⭐ ${state.stars}`;
  }
  function showHint(){ const first=$("[data-food]"); if(first){ $$("[data-food]").forEach(x=>x.classList.add("hint")); $("#feedback").textContent="Hint: Start by tapping any food on the tray."; speak($("#feedback").textContent);} }
  function showCustomerHint(){ if(state.selectedFood===null)return; const name=DATA[state.country].foods[state.selectedFood].name; const idx=state.roundCustomers.findIndex(c=>!c.served&&c.food.name===name); const el=$(`[data-customer="${idx}"]`); if(el){el.classList.add("hint");$("#feedback").textContent=`Hint: Find the customer asking for ${name}.`;speak($("#feedback").textContent);} }
  function serveCustomer(index) {
    clearTimeout(state.hintTimer); const c=state.roundCustomers[index], d=DATA[state.country];
    if(!c || c.served || !d) return;
    if(state.selectedFood===null){ $("#feedback").textContent="First, tap a food on the tray."; speak($("#feedback").textContent); beep("bad"); return; }
    const picked=d.foods[state.selectedFood];
    if(picked.name===c.food.name){ c.served=true;state.served++;state.stars++;state.selectedFood=null;$("#feedback").textContent=`Great job! You delivered ${picked.name}.`;speak($("#feedback").textContent);beep("good");animateTruckTo(index);renderDelivery();$("[data-food]")?.focus({preventScroll:true});
      if(state.served>=6){state.transitionTimer=setTimeout(finishGame,1100);return;}
      if(state.roundCustomers.every(x=>x.served)){state.transitionTimer=setTimeout(buildRound,1000);} else state.hintTimer=setTimeout(showHint,6500);
    } else {
      state.attempts++; $("#feedback").textContent=`That customer asked for ${c.food.name}. Try again.`;speak($("#feedback").textContent);beep("bad");
      if(state.attempts>=2){ const correctIdx=d.foods.findIndex(f=>f.name===c.food.name); const el=$(`[data-food="${correctIdx}"]`); if(el)el.classList.add("hint"); }
    }
  }
  function animateTruckTo(index){ const tr=$("#truckRun"); tr.style.transition="none"; tr.style.left="-130px"; tr.style.top=(35+index*8)+"%"; requestAnimationFrame(()=>{requestAnimationFrame(()=>{tr.style.transition="left 1s ease, top .5s";tr.style.left="110vw";});}); }
  function finishGame(){
    if(!state.country) return;
    stopMusic(); confetti(); const d=DATA[state.country];
    $("#finishMessage").textContent=`You served six correct ${d.name} food orders and earned ${state.stars} stars.`;
    $("#certificateText").textContent=`This demo explored ${d.foods.map(f=>f.name).join(", ")}, used the ${d.names[state.selections.name]} design choices, and completed six matching deliveries.`;
    showScreen("finishScreen",`Mission complete. You served six correct orders. Great job, chef!`);beep("good");setTimeout(()=>beep("good"),450);
  }
  function confetti(){ const box=$("#confetti");box.innerHTML="";for(let i=0;i<70;i++){const p=document.createElement("i");p.style.left=Math.random()*100+"vw";p.style.setProperty("--c",["#e63946","#ffd166","#2a9d8f","#457b9d"][i%4]);p.style.setProperty("--r",Math.random()*180+"deg");p.style.animationDelay=Math.random()*.7+"s";box.appendChild(p);}setTimeout(()=>box.innerHTML="",3500);}

  $("#lessonNext").addEventListener("click",()=>{renderPlan();showScreen("planScreen","Choose one answer in each group. You do not need to type.");});
  $("#planNext").addEventListener("click",()=>{applyTruckStyle();renderStickerPalette();showScreen("decorateScreen","Tap a decoration to add it. Add at least three decorations.");});
  $("#decorateNext").addEventListener("click",()=>{renderReview();showScreen("reviewScreen","Your food truck is ready. Review your choices, then start the delivery game.");});
  $("#startDelivery").addEventListener("click",()=>{state.served=0;state.stars=0;buildRound();showScreen("deliveryScreen","Tap a food, then tap the customer who ordered it.");});
  $("#undoSticker").addEventListener("click",()=>{state.stickers.pop();renderStickers();beep();});
  $("#clearStickers").addEventListener("click",()=>{state.stickers=[];renderStickers();});
  $("#musicBtn").addEventListener("click",()=>{state.music?stopMusic():startMusic();});
  $("#resetBtn").addEventListener("click",()=>{if(confirm("Reset the whole game?"))resetGame();});
  $("#playAgain").addEventListener("click",resetGame);
  $$('[data-back]').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.back)));
  document.addEventListener("keydown",e=>{ if($("#deliveryScreen").classList.contains("active") && ["1","2","3"].includes(e.key)){ const b=$(`[data-food="${+e.key-1}"]`); if(b)b.click(); } });

  function resetGame(){ clearTimeout(state.transitionTimer);state.transitionTimer=null;clearTimeout(state.hintTimer);stopMusic();Object.assign(state,{country:null,selections:{},stickers:[],step:0,selectedFood:null,served:0,stars:0,roundCustomers:[],attempts:0});setTheme({accent:"#d62828",colors:["#d62828","#f7b801"],soft:"#fff2c9"});showScreen("startScreen","Choose Japan, Egypt, or Spain to begin."); }

  renderCountries(); renderProgress(0);
})();
