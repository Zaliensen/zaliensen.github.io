// Original-code-derived game, sanitized for portfolio review; see README for changes.

const DATA = {
  egypt: {
    label: 'Egypt Mode', icon: '𓂀', wallArt: '🏺', playerBorder: '#b66a18',
    cities: [
      {name:'Cairo', cost:0, rating:0, bonus:1, icon:'🏙️', desc:'A busy capital with many hungry customers.'},
      {name:'Alexandria', cost:1500, rating:2.2, bonus:1.15, icon:'🌊', desc:'A Mediterranean city with strong seafood demand.'},
      {name:'Luxor', cost:4500, rating:3.2, bonus:1.35, icon:'🛕', desc:'Visitors arrive to see temples and ancient history.'},
      {name:'Aswan', cost:9000, rating:4.1, bonus:1.6, icon:'⛵', desc:'A beautiful Nile location for a luxury restaurant.'}
    ],
    foods: [
      {id:'koshari', name:'Koshari', emoji:'🍲', cost:6, base:18, fact:'Koshari is a filling Egyptian dish made with rice, lentils, pasta, and tomato sauce.', ingredients:['rice','lentils','pasta','tomato sauce']},
      {id:'ful', name:'Ful Medames', emoji:'🫘', cost:4, base:14, fact:'Ful medames is a warm fava bean dish served with lemon, herbs, and bread.', ingredients:['fava beans','lemon','herbs','bread']},
      {id:'taameya', name:'Taameya', emoji:'🧆', cost:5, base:16, fact:'Egyptian taameya is a crispy fava bean fritter made with herbs and sesame.', ingredients:['fava beans','herbs','sesame','bread']},
      {id:'basbousa', name:'Basbousa', emoji:'🍰', cost:4, base:13, fact:'Basbousa is a sweet semolina cake with syrup, butter, and almond.', ingredients:['semolina','syrup','butter','almond']}
    ],
    homes:[
      {name:'Tiny Cairo Room', cost:0, icon:'🛏️', desc:'A small room above your first restaurant.'},
      {name:'Nile Apartment', cost:2500, icon:'🏢', desc:'A bright apartment with a river view.'},
      {name:'Courtyard House', cost:7000, icon:'🏡', desc:'A comfortable home with a shaded courtyard.'},
      {name:'Desert Villa', cost:12000, icon:'🏛️', desc:'A luxurious villa with space for every treasure.'}
    ],
    decor:[
      {name:'Papyrus Art', cost:220, icon:'📜'}, {name:'Golden Cat', cost:450, icon:'🐈'}, {name:'Blue Vase', cost:320, icon:'🏺'},
      {name:'Palm Plant', cost:180, icon:'🌴'}, {name:'Nile Aquarium', cost:900, icon:'🐟'}, {name:'Mini Pyramid', cost:1200, icon:'🔺'}
    ]
  },
  spain: {
    label: 'Spain Mode', icon: '☀️', wallArt: '🪭', playerBorder: '#a9232e',
    cities: [
      {name:'Madrid', cost:0, rating:0, bonus:1, icon:'🏙️', desc:'A lively capital full of locals and visitors.'},
      {name:'Barcelona', cost:1600, rating:2.2, bonus:1.15, icon:'🏖️', desc:'A busy coastal city with colorful architecture.'},
      {name:'Seville', cost:3600, rating:3.2, bonus:1.35, icon:'💃', desc:'A warm southern city known for music and plazas.'},
      {name:'Valencia', cost:7600, rating:4.1, bonus:1.6, icon:'🥘', desc:'A coastal food destination and the home of paella.'}
    ],
    foods: [
      {id:'paella', name:'Paella', emoji:'🥘', cost:7, base:20, fact:'Paella is a Spanish rice dish with pepper, peas, and seafood.', ingredients:['rice','pepper','peas','seafood']},
      {id:'tortilla', name:'Tortilla Española', emoji:'🍳', cost:5, base:16, fact:'Tortilla española is a thick omelet made with eggs, potatoes, onion, and olive oil.', ingredients:['eggs','potatoes','onion','olive oil']},
      {id:'gazpacho', name:'Gazpacho', emoji:'🥣', cost:4, base:14, fact:'Gazpacho is a cold soup made with tomatoes, cucumber, pepper, and olive oil.', ingredients:['tomatoes','cucumber','pepper','olive oil']},
      {id:'churros', name:'Churros', emoji:'🥨', cost:4, base:13, fact:'Churros are a sweet dough treat made with flour, water, sugar, and chocolate.', ingredients:['flour','water','sugar','chocolate']}
    ],
    homes:[
      {name:'Tiny Madrid Studio', cost:0, icon:'🛏️', desc:'A simple studio close to your first restaurant.'},
      {name:'City Balcony Flat', cost:2600, icon:'🏢', desc:'A cheerful apartment with a sunny balcony.'},
      {name:'Andalusian Patio Home', cost:7200, icon:'🏡', desc:'A tiled home built around a peaceful patio.'},
      {name:'Mediterranean Villa', cost:16500, icon:'🏛️', desc:'A luxury villa with sea views and room for art.'}
    ],
    decor:[
      {name:'Tile Mural', cost:220, icon:'🔷'}, {name:'Flamenco Fan', cost:300, icon:'🪭'}, {name:'Olive Tree', cost:260, icon:'🫒'},
      {name:'Guitar', cost:500, icon:'🎸'}, {name:'Football Display', cost:700, icon:'⚽'}, {name:'Balcony Flowers', cost:380, icon:'🌺'}
    ]
  }
};


const INGREDIENT_ICONS = {
  'rice':'🍚','lentils':'🫘','pasta':'🍝','tomato sauce':'🍅','crispy onions':'🧅','fava beans':'🫘','lemon':'🍋','herbs':'🌿','olive oil':'🫒','bread':'🍞',
  'parsley':'🌿','coriander':'🌿','sesame':'⚪','semolina':'🌾','yogurt':'🥛','syrup':'🍯','butter':'🧈','almond':'🌰',
  'saffron':'✨','peas':'🟢','pepper':'🫑','seafood':'🦐','eggs':'🥚','potatoes':'🥔','onion':'🧅','tomatoes':'🍅','cucumber':'🥒','flour':'🌾','water':'💧','oil':'🫒','sugar':'🍬','chocolate':'🍫',
  'cheese':'🧀','apples':'🍎','mint':'🌿','carrots':'🥕','cream':'🥛','corn':'🌽','beans':'🫘','honey':'🍯'
};
const SYMBOL_ASSETS = {
  'butter':'assets/symbols/butter.svg', 'fava beans':'assets/symbols/fava_beans.svg', 'lettuce':'assets/symbols/lettuce.svg',
  'waiter':'assets/symbols/waiter.svg', 'tables':'assets/symbols/tables.svg', 'churros':'assets/symbols/churros.svg', 'gazpacho':'assets/symbols/gazpacho.svg'
};
const DISH_SYMBOL_ASSETS = {koshari:'assets/food/koshari_icon.jpg',ful:'assets/ful_medames_icon.jpg',taameya:'assets/taameya_icon.jpg',basbousa:'assets/food/basbousa_icon.jpg',churros:'assets/symbols/churros.svg',gazpacho:'assets/symbols/gazpacho.svg'};

const CHARACTER_ASSETS = {
  coach:'assets/portraits/marco.png',
  egyptGuide:'assets/portraits/naila.png',
  spainGuide:'assets/portraits/sofia.png'
};
const AVATAR_CARD_ASSETS = {
  classic:'assets/portraits/classic.png',
  bright:'assets/portraits/bright.png',
  bold:'assets/portraits/bold.png',
  royal:'assets/portraits/royal.png'
};

const SPAIN_AVATAR_IDS = ['diego','lucia','martin','sofia','alvaro','nerea'];
const EGYPT_AVATAR_IDS = ['nefertari','imhotep','hakim','amina','yousef','kemet','maya','tariq'];
const SPAIN_CHARACTER_ASSETS = {
  playerBase:'assets/spain_sprites/player_idle.png',
  chef:{idle:'assets/spain_sprites/chef_idle.png',carry:'assets/spain_sprites/chef_carry.png',work:'assets/spain_sprites/chef_work.png'},
  waiter:{idle:'assets/spain_sprites/waiter_idle.png',walk:'assets/spain_sprites/waiter_walk.png',carry:'assets/spain_sprites/waiter_carry.png'},
  cashier:{idle:'assets/spain_sprites/cashier_idle.png',happy:'assets/spain_sprites/cashier_happy.png'},
  customers:[
    'assets/spain_sprites/customer_tourist_f.png',
    'assets/spain_sprites/customer_tourist_m.png',
    'assets/spain_sprites/customer_local_f.png',
    'assets/spain_sprites/customer_local_m.png'
  ]
};

const EGYPT_CHARACTER_ASSETS = {
  chef:{idle:'assets/egypt_sprites/chef_idle.png',walk:'assets/egypt_sprites/chef_walk.png',carry:'assets/egypt_sprites/chef_work.png',work:'assets/egypt_sprites/chef_work.png',happy:'assets/egypt_sprites/chef_happy.png'},
  waiter:{idle:'assets/egypt_sprites/waiter_idle.png',walk:'assets/egypt_sprites/waiter_walk.png',carry:'assets/egypt_sprites/waiter_work.png',work:'assets/egypt_sprites/waiter_work.png',happy:'assets/egypt_sprites/waiter_happy.png'},
  cashier:{idle:'assets/egypt_sprites/cashier_idle.png',walk:'assets/egypt_sprites/cashier_walk.png',work:'assets/egypt_sprites/cashier_work.png',happy:'assets/egypt_sprites/cashier_happy.png'},
  cleaner:{idle:'assets/egypt_sprites/cleaner_idle.png',walk:'assets/egypt_sprites/cleaner_walk.png',work:'assets/egypt_sprites/cleaner_work.png',happy:'assets/egypt_sprites/cleaner_happy.png'},
  customers:['customer_1','customer_2','customer_3','customer_4','customer_5','customer_6']
};
const DIALOGUE_BACKGROUNDS = {
  egypt:'assets/egypt_concept.png',
  spain:'assets/spain_concept.png',
  egyptRestaurant:'assets/egypt_restaurant_bg.png',
  spainRestaurant:'assets/spain_restaurant_bg.png'
};

const STAFF_ECONOMY = {
  chef:{baseCost:260,costStep:130,dailyWage:42,unlockDays:2,max:2,label:'Chef'},
  waiter:{baseCost:220,costStep:90,dailyWage:28,unlockDays:2,max:3,label:'Waiter'}
};
const LOCATION_BACKGROUNDS = {
  egypt:['assets/locations/egypt_cairo.jpg','assets/locations/egypt_alexandria.jpg','assets/locations/egypt_luxor.jpg','assets/locations/egypt_aswan.jpg'],
  spain:['assets/locations/spain_madrid.jpg','assets/locations/spain_barcelona.jpg','assets/locations/spain_seville.jpg','assets/locations/spain_valencia.jpg']
};
const HOME_BACKGROUNDS = {
  egypt:['assets/homes/egypt_home_1.jpg','assets/homes/egypt_home_2.jpg','assets/homes/egypt_home_3.jpg'],
  spain:['assets/homes/spain_home_1.jpg','assets/homes/spain_home_2.jpg','assets/homes/spain_home_3.jpg']
};


const SCENE_SYMBOLS = {
  egypt:['🏺','🌴','🪔','🔺'],
  spain:['🪭','🌺','🎸','🫒']
};

const Game = {
  mode: null,
  state: null,
  data: null,
  activeScreen: 'lesson',
  quizIndex: 0,
  quizScore: 0,
  dayRunning: false,
  dayTimer: null,
  orderTimer: null,
  secondTimer: null,
  daySeconds: 120,
  currentOrders: [],
  nextOrderId: 1,
  selectedOrderId: null,
  carryingOrderId: null,
  player: {x: 8, y: 45},
  keys: {},
  moveFrame: null,
  assembly: {orderId:null, selected:[], time:20, timer:null},
  staffRuntime: {chefAssignments:0, waiterAssignments:0},
  voiceOn: false,

  freshState(mode){
    const foods = DATA[mode].foods;
    return {
      version: 3, mode, lessonDone:false, setupDone:false, tutorialSeen:{},
      owner:'Demo Chef', avatar:'🧑‍🍳', avatarProfile: mode==='spain'?{preset:'diego',id:'diego',name:'Diego',spriteId:'diego',skin:'#d69b78',hair:'#2d2016',outfit:'#a9232e',accent:'#f4b942'}:{preset:'amal',id:'amal',name:'Amal',skin:'#b97757',hair:'#1e1712',outfit:'#2b7d79',accent:'#f4b942'}, restaurantName: mode==='egypt'?'Nile Bites':'Sunny Plaza',
      money: mode==='spain'?450:350, day:1, rating: mode==='spain'?1.15:1, totalServed:0, totalRevenue:0,
      tableCount:4, equipment:{stove:1, fridge:1, decor: mode==='spain'?2:1, advertising:0},
      staff:{chef:0, waiter:0}, cityIndex:0, unlockedCities:[0],
      menu:Object.fromEntries(foods.map(f=>[f.id,{custom:f.name, price:f.base}])),
      homeIndex:0, unlockedHomes:[0], ownedDecor:[], decorPositions:{}, homePlayer:{x:44,y:70},
      bestDay:0, completedDays:0
    };
  },
  save(){ try{ if(this.mode && this.state) localStorage.setItem('portfolioDemo_worldPlate_v1_'+this.mode, JSON.stringify(this.state)); }catch(e){} },
  load(mode){
    let raw=null; try{ raw=localStorage.getItem('portfolioDemo_worldPlate_v1_'+mode); }catch(e){}
    try { this.state=raw?Object.assign(this.freshState(mode),JSON.parse(raw)):this.freshState(mode); }
    catch(e){ this.state=this.freshState(mode); }
    if(!this.state.avatarProfile) this.state.avatarProfile=this.freshState(mode).avatarProfile;
    if(mode==='spain' && !this.state.avatarProfile.spriteId){ this.state.avatarProfile={...this.freshState('spain').avatarProfile}; }
    if(mode==='egypt' && this.state.avatarProfile && this.state.avatarProfile.spriteId){ const old=this.state.avatarProfile; this.state.avatarProfile={preset:'amal',id:'amal',name:'Amal',skin:old.skin||'#b97757',hair:old.hair||'#1e1712',outfit:old.outfit||'#2b7d79',accent:old.accent||'#f4b942'}; this.save(); }
    if(!this.state.homePlayer) this.state.homePlayer={x:44,y:70};
    if(!this.state.tutorialSeen) this.state.tutorialSeen={};
    if(!this.state.decorPositions) this.state.decorPositions={};
    if(!this.state.staff) this.state.staff={chef:0,waiter:0};
    this.state.staff.chef=Math.max(0,Number(this.state.staff.chef)||0);
    this.state.staff.waiter=Math.max(0,Number(this.state.staff.waiter)||0);
    // Older builds could leave a waiter in a brand-new restaurant save.
    // New restaurants must purchase staff after the Day 3 unlock.
    if((this.state.completedDays||0)<STAFF_ECONOMY.waiter.unlockDays){
      this.state.staff.waiter=0;
    }
    this.state.version=3;
    this.state.owner='Demo Chef'; this.state.restaurantName='World Plate Demo';
    DATA[mode].foods.forEach(f=>{ if(this.state.menu[f.id])this.state.menu[f.id].custom=f.name; });
    this.save();
  },
  chooseMode(mode){
    this.mode=mode; this.data=DATA[mode]; this.load(mode);
    document.body.className=mode+'-mode';
    document.getElementById('titleScreen').classList.add('hidden');
    document.getElementById('gameShell').classList.remove('hidden');
    this.updateTopbar();
    if(!this.state.lessonDone) this.showLesson();
    else if(!this.state.setupDone) this.showScreen('setup');
    else this.showScreen('restaurant');
    this.speak('Welcome to '+this.data.label+'. Build your restaurant and serve the world.');
  },
  returnToModes(){
    if(this.dayRunning) this.endDay(false);
    this.save(); this.mode=null; this.state=null;
    document.body.className='';
    document.getElementById('gameShell').classList.add('hidden');
    document.getElementById('titleScreen').classList.remove('hidden');
    this.refreshTitleScreen();
  },
  refreshTitleScreen(){
    ['egypt','spain'].forEach(mode=>{
      const status=document.getElementById(mode+'SaveStatus');
      const play=document.getElementById(mode+'PlayBtn');
      if(!status||!play) return;
      let save=null;
      try { const raw=localStorage.getItem('portfolioDemo_worldPlate_v1_'+mode); save=raw?JSON.parse(raw):null; } catch(e){}
      if(save){
        status.textContent=`Saved Game • Day ${save.day||1} • $${Math.floor(save.money||0)} • ⭐ ${(save.rating||1).toFixed(1)}`;
        status.classList.add('has-save');
        play.textContent='Continue '+(mode==='egypt'?'Egypt':'Spain');
      } else {
        status.textContent='New Game • No save yet';
        status.classList.remove('has-save');
        play.textContent='Start '+(mode==='egypt'?'Egypt':'Spain');
      }
    });
  },
  resetMode(mode){
    const label=mode==='egypt'?'Egypt':'Spain';
    if(!confirm(`Reset all ${label} progress? This cannot be undone.`)) return;
    try { localStorage.removeItem('portfolioDemo_worldPlate_v1_'+mode); } catch(e){}
    if(this.mode===mode){ this.dayRunning=false; clearInterval(this.secondTimer); clearInterval(this.orderTimer); clearInterval(this.assembly?.timer); this.mode=null; this.state=null; document.body.className=''; document.getElementById('gameShell').classList.add('hidden'); document.getElementById('titleScreen').classList.remove('hidden'); }
    this.refreshTitleScreen();
    this.toast(label+' progress reset');
  },
  resetAllProgress(){
    if(!confirm('Reset Egypt and Spain progress? This cannot be undone.')) return;
    try { localStorage.removeItem('portfolioDemo_worldPlate_v1_egypt'); localStorage.removeItem('portfolioDemo_worldPlate_v1_spain'); } catch(e){}
    this.mode=null; this.state=null; this.dayRunning=false; clearInterval(this.secondTimer); clearInterval(this.orderTimer); clearInterval(this.assembly?.timer);
    document.body.className=''; document.getElementById('gameShell').classList.add('hidden'); document.getElementById('titleScreen').classList.remove('hidden');
    this.refreshTitleScreen(); this.toast('All progress reset');
  },
  toggleVoice(){ this.toast('Text-only public demo. Original narration is excluded.'); },
  speak(text){ /* Text feedback remains; no device or network voice is requested. */ },
  toast(text,ms=1900){
    const t=document.getElementById('toast'); t.textContent=text; t.classList.remove('hidden');
    clearTimeout(t._timer); t._timer=setTimeout(()=>t.classList.add('hidden'),ms);
  },
  showScreen(name){
    if(!this.state) return;
    if(this.dayRunning && name!=='restaurant'){ this.toast('Close the restaurant before leaving the floor.'); return; }
    document.querySelectorAll('.app-screen').forEach(s=>s.classList.add('hidden'));
    const map={lesson:'lessonScreen',setup:'setupScreen',restaurant:'restaurantScreen',menu:'menuScreen',manage:'manageScreen',cities:'citiesScreen',home:'homeScreen'};
    document.getElementById(map[name]).classList.remove('hidden'); this.activeScreen=name;
    if(name==='setup') this.renderAvatarBuilder();
    if(name==='restaurant') this.renderRestaurant();
    if(name==='menu') this.renderMenu();
    if(name==='manage') this.renderManage();
    if(name==='cities') this.renderCities();
    if(name==='home') this.renderHome();
    window.scrollTo(0,0);
    this.renderGuide();
    setTimeout(()=>{ this.launchTutorial(name,false); this.renderGuide(); },150);
  },
  updateTopbar(){
    if(!this.state) return;
    document.getElementById('modePill').textContent=this.data.label;
    document.getElementById('dayStat').textContent=this.state.day;
    document.getElementById('moneyStat').textContent=Math.floor(this.state.money);
    document.getElementById('ratingStat').textContent=this.state.rating.toFixed(1);
    this.renderGuide();
  },
  showLesson(){
    this.quizIndex=0; this.quizScore=0;
    this.showScreen('lesson');
    document.getElementById('lessonTitle').textContent=this.data.label+' Food Academy';
    document.getElementById('lessonCards').innerHTML=this.data.foods.map(f=>this.lessonCardMarkup(f)).join('');
    this.renderQuiz();
    this.renderGuide();
  },
  quizQuestions(){
    const fs=this.data.foods;
    return fs.map((f,i)=>({
      q:'Which food matches this fact: '+f.fact,
      choices:[f.name,fs[(i+1)%fs.length].name,fs[(i+2)%fs.length].name],
      answer:f.name
    })).concat([{q:'What is one job of a restaurant owner?',choices:['Manage money and serve customers','Ignore every customer','Throw away all the food'],answer:'Manage money and serve customers'}]);
  },
  renderQuiz(){
    const qs=this.quizQuestions();
    document.getElementById('quizProgress').style.width=(this.quizIndex/qs.length*100)+'%';
    if(this.quizIndex>=qs.length){
      document.getElementById('quizArea').innerHTML=`<div class="center"><h2>Food Academy Complete</h2><p>You scored ${this.quizScore} out of ${qs.length}.</p><button class="good" onclick="Game.completeLesson()">Start My Restaurant</button></div>`;
      return;
    }
    const q=qs[this.quizIndex];
    document.getElementById('quizArea').innerHTML=`<h2>${q.q}</h2><div class="grid3">${q.choices.sort(()=>Math.random()-.5).map(c=>`<button class="secondary" onclick="Game.answerQuiz('${c.replace(/'/g,"\\'")}')">${c}</button>`).join('')}</div>`;
  },
  answerQuiz(choice){
    const q=this.quizQuestions()[this.quizIndex];
    if(choice===q.answer){ this.quizScore++; this.toast('Correct'); this.speak('Correct. Nice food knowledge.'); }
    else { this.toast('Good try. The answer is '+q.answer,2600); this.speak('Good try. The answer is '+q.answer); }
    this.quizIndex++; setTimeout(()=>this.renderQuiz(),450);
  },
  completeLesson(){ this.state.lessonDone=true; this.save(); this.showScreen('setup'); },
  finishSetup(){
    this.state.restaurantName='World Plate Demo';
    this.state.owner='Demo Chef';
    this.state.setupDone=true; this.save(); this.updateTopbar(); this.showScreen('menu');
    this.toast('Restaurant opened');
  },

  starTier(){ return Math.max(1, Math.min(5, Math.floor(this.state.rating||1))); },
  priceCapForStars(stars){ return ({1:14,2:20,3:28,4:38,5:50})[stars] || 14; },
  currentPriceCap(){ return this.priceCapForStars(this.starTier()); },
  avatarCardAsset(id){ if(this.mode==='spain' && SPAIN_AVATAR_IDS.includes(id)) return assetPath(`assets/spain_sprites/avatar_${id}_portrait.png`); if(this.mode==='egypt' && EGYPT_AVATAR_IDS.includes(id)) return assetPath(`assets/egypt_sprites/avatar_${id}_portrait.png`); return assetPath(AVATAR_CARD_ASSETS[id] || ''); },
  openTutorialForCurrent(){ if(!this.state || !this.activeScreen) return; this.launchTutorial(this.activeScreen, true); },
  launchTutorial(screen, force=false){
    if(!this.state) return;
    const key=(this.mode||'world')+'_'+screen;
    if(!force && this.state.tutorialSeen && this.state.tutorialSeen[key]) return;
    const scenes=this.tutorialScenes(screen); if(!scenes || !scenes.length) return;
    if(!force){ this.state.tutorialSeen[key]=true; this.save(); }
    this.openVN(scenes);
  },
  tutorialScenes(screen){
    const isEgypt=this.mode==='egypt';
    const guideName=isEgypt?'Naila':'Sofia';
    const guidePortrait=isEgypt?CHARACTER_ASSETS.egyptGuide:CHARACTER_ASSETS.spainGuide;
    const bgBase=isEgypt?DIALOGUE_BACKGROUNDS.egypt:DIALOGUE_BACKGROUNDS.spain;
    const bgRestaurant=isEgypt?DIALOGUE_BACKGROUNDS.egyptRestaurant:DIALOGUE_BACKGROUNDS.spainRestaurant;
    const stars=this.starTier(); const cap=this.currentPriceCap();
    const scripts={
      lesson:[
        {speaker:guideName, portrait:guidePortrait, bg:bgBase, text:`Welcome to ${this.data.label}. First, learn the foods and their picture symbols. This will help you cook much faster when customers arrive.`},
        {speaker:'Marco', portrait:CHARACTER_ASSETS.coach, bg:bgBase, text:'Each dish uses a simple recipe. Watch the ingredient pictures, then answer the quiz to unlock your restaurant.'}
      ],
      setup:[
        {speaker:'Marco', portrait:CHARACTER_ASSETS.coach, bg:bgBase, text:'Time to build your restaurant identity. Pick a placeholder avatar and get ready to open your first simulated location. Demo names stay fixed.'},
        {speaker:guideName, portrait:guidePortrait, bg:bgBase, text:'Your avatar appears in the restaurant and in story scenes, so choose a look you love.'}
      ],
      menu:[
        {speaker:'Marco', portrait:CHARACTER_ASSETS.coach, bg:bgRestaurant, text:`Menu prices are limited by your restaurant stars. Right now you are a ${stars} star restaurant, so your maximum charge is $${cap} per dish.`},
        {speaker:'Marco', portrait:CHARACTER_ASSETS.coach, bg:bgRestaurant, text:'Higher ratings let you charge more. Keep guests happy, serve quickly, and your menu power will grow with your stars.'}
      ],
      restaurant:[
        {speaker:guideName, portrait:guidePortrait, bg:bgRestaurant, text:'Customers place orders at the tables. Build the dish with picture symbols, then pick it up at the counter and deliver it fast.'},
        {speaker:'Marco', portrait:CHARACTER_ASSETS.coach, bg:bgRestaurant, text:'Fast service earns speed bonus money. Hired chefs and waiters help you, but they can still be overwhelmed if too many orders pile up.'},
        {speaker:'Marco', portrait:CHARACTER_ASSETS.coach, bg:bgRestaurant, text:'Watch the timer, keep the line moving, and grow from a tiny starter restaurant into a flagship location.'}
      ],
      manage:[
        {speaker:'Marco', portrait:CHARACTER_ASSETS.coach, bg:bgRestaurant, text:'Use your profits to buy more tables, better equipment, and staff. Chefs and waiters become affordable on Day 3, but every hired worker earns a daily wage, so keep the restaurant profitable.'}
      ],
      cities:[
        {speaker:guideName, portrait:guidePortrait, bg:bgBase, text:'As your rating rises, you can open restaurants in new cities. Each location gives you a new look and stronger profit bonuses.'}
      ],
      home:[
        {speaker:'Marco', portrait:CHARACTER_ASSETS.coach, bg:bgBase, text:'Your apartment grows with your restaurant life. Buy decorations, walk around, and enjoy the rewards of your business success.'}
      ]
    };
    return scripts[screen] || [];
  },
  openVN(scenes){
    this.vnScenes=scenes; this.vnIndex=0;
    const modal=document.getElementById('vnModal'); if(!modal) return;
    modal.classList.remove('hidden'); this.renderVNScene();
  },
  renderVNScene(){
    const scene=this.vnScenes?.[this.vnIndex]; if(!scene) return;
    document.getElementById('vnBackdrop').style.backgroundImage=`url(${assetPath(scene.bg)})`;
    document.getElementById('vnPortrait').src=assetPath(scene.portrait);
    document.getElementById('vnSpeaker').textContent=scene.speaker;
    document.getElementById('vnText').textContent=scene.text;
    document.getElementById('vnStep').textContent=`${this.vnIndex+1} / ${this.vnScenes.length}`;
    document.getElementById('vnNextBtn').textContent=this.vnIndex===this.vnScenes.length-1?'Done':'Next';
    this.speak(scene.speaker+'. '+scene.text);
  },
  advanceVN(){ if(!this.vnScenes) return; this.vnIndex++; if(this.vnIndex>=this.vnScenes.length) this.closeVN(); else this.renderVNScene(); },
  closeVN(){ const modal=document.getElementById('vnModal'); if(modal) modal.classList.add('hidden'); this.vnScenes=null; this.vnIndex=0; },

  renderMenu(){
    const stars=this.starTier(); const cap=this.currentPriceCap();
    document.getElementById('menuEditor').innerHTML=`<div class="menu-cap-note"><strong>${stars} Star Restaurant</strong> • Maximum menu price right now is <strong>$${cap}</strong>. Earn more stars to raise your price limit.</div>` + this.data.foods.map(f=>{
      const m=this.state.menu[f.id]||{custom:f.name,price:Math.min(f.base,cap)};
      const safePrice=Math.max(f.cost+1,Math.min(cap,m.price));
      return `<div class="panel"><div class="dish-badge">${this.dishIconMarkup(f)}</div><h2>${f.name}</h2>
      <label>Dish name</label><input id="name_${f.id}" value="${this.escapeHtml(m.custom)}" maxlength="30" readonly aria-label="Fixed dish name">
      <p class="tiny">Food labels stay fixed in this public demonstration.</p>
      <label>Price</label><input id="price_${f.id}" type="number" min="${f.cost+1}" max="${cap}" value="${safePrice}">
      <div class="report-row"><span>Ingredient cost</span><strong>$${f.cost}</strong></div><div class="report-row"><span>Price cap</span><strong>$${cap}</strong></div></div>`;
    }).join('');
    this.renderGuide();
  },
  saveMenu(){
    this.data.foods.forEach(f=>{
      const custom=f.name;
      const cap=this.currentPriceCap();
      const price=Math.max(f.cost+1,Math.min(cap,Number(document.getElementById('price_'+f.id).value)||f.base));
      this.state.menu[f.id]={custom,price};
    }); this.save(); this.toast('Menu saved'); this.showScreen('restaurant');
  },

  ingredientIcon(name){ const src=SYMBOL_ASSETS[name]; return src?`<img class="symbol-img" src="${assetPath(src)}" alt="${name}">`:(INGREDIENT_ICONS[name] || '🍽️'); },
  dishIconMarkup(food){ const src=DISH_SYMBOL_ASSETS[food.id]; return src?`<img class="dish-symbol-img" src="${assetPath(src)}" alt="${food.name}">`:food.emoji; },
  ingredientChip(name, cls='picture-pill'){
    return `<span class="${cls}"><span class="icon">${this.ingredientIcon(name)}</span><span>${name}</span></span>`;
  },
  foodSceneSymbols(food){ return food.ingredients.slice(0,4).map(i=>`<span class="food-symbol" title="${i}">${this.ingredientIcon(i)}</span>`).join(''); },

  foodPhotoMarkup(f){
    const realAssets={koshari:'assets/food/koshari_hero.jpg',ful:'assets/ful_medames_asset.png',taameya:'assets/taameya_asset.png',basbousa:'assets/food/basbousa_hero.jpg'};
    if(realAssets[f.id]) return `<div class="food-photo-card"><img src="${assetPath(realAssets[f.id])}" alt="${f.name}"></div>`;
    const extras = {
      koshari:['🍚','🫘','🍝'],
      ful:['🫘','🍋','🌿'],
      taameya:['🧆','🌿','🍞'],
      basbousa:['🍰','🍯','🌰'],
      paella:['🥘','🫑','🦐'],
      tortilla:['🍳','🥔','🧅'],
      gazpacho:['🥣','🍅','🥒'],
      churros:['🥨','🍫','🍬']
    }[f.id] || [f.emoji,'🍽️','✨'];
    return `<div class="food-photo-card"><div class="plate">${extras[0]}</div><div class="garnish g1">${extras[1]}</div><div class="garnish g2">${extras[2]}</div><div class="garnish g3">✨</div></div>`;
  },
  lessonCardMarkup(f){
    return `<article class="lesson-card">
      <div class="lesson-visual">${this.foodPhotoMarkup(f)}<div><h2>${f.name}</h2><div class="dish-sub">Ingredient cost $${f.cost} • Base price $${f.base}</div><p>${f.fact}</p></div></div>
      <div class="recipe-board">${f.ingredients.map(i=>this.ingredientChip(i,'recipe-chip')).join('')}</div>
      <div class="food-symbols">${this.foodSceneSymbols(f)}</div>
      <div class="floating-coin">💰</div>
    </article>`;
  },
  shopIcon(name){
    if(name.includes('Expansion')) return `<img class="symbol-img" src="${assetPath(SYMBOL_ASSETS.tables)}" alt="tables">`;
    if(name.includes('Stove')) return '🔥';
    if(name.includes('Fridge')) return '🧊';
    if(name.includes('Decor')) return '✨';
    if(name.includes('Advertising')) return '📣';
    if(name.includes('Chef')) return '👨‍🍳';
    if(name.includes('Waiter')) return `<img class="symbol-img" src="${assetPath(SYMBOL_ASSETS.waiter)}" alt="waiter">`;
    if(name.includes('Home')) return '🏡';
    return '⭐';
  },
  cityScene(city,i){
    const src=LOCATION_BACKGROUNDS[this.mode][i]||LOCATION_BACKGROUNDS[this.mode][0];
    return `<div class="scene-mini location-scene"><img src="${assetPath(src)}" alt="${city.name} restaurant interior"><span class="location-chip">${city.icon} ${city.name}</span></div>`;
  },
  homeScene(home){
    const idx=this.data.homes.indexOf(home); const src=HOME_BACKGROUNDS[this.mode][Math.min(2,Math.max(0,idx))]||HOME_BACKGROUNDS[this.mode][0];
    return `<img class="home-card-preview" src="${assetPath(src)}" alt="${home.name}">`;
  },
  spritePreview(){
    const poses=this.mode==='spain'?[
      this.avatarMarkup(this.state.avatarProfile,{size:'tiny'}),
      this.avatarMarkup(this.state.avatarProfile,{size:'tiny',walk:true}),
      this.avatarMarkup(this.state.avatarProfile,{size:'tiny',carry:true}),
      this.avatarMarkup(this.state.avatarProfile,{size:'tiny',happy:true})
    ]:[
      this.avatarMarkup(this.state.avatarProfile,{size:'tiny'}),
      this.avatarMarkup(this.state.avatarProfile,{size:'tiny',carry:true}),
      this.avatarMarkup(this.state.avatarProfile,{size:'tiny',chefHat:true}),
      this.avatarMarkup(this.state.avatarProfile,{size:'tiny',carry:true,chefHat:true})
    ];
    return `<div class="sprite-row">${poses.map(s=>`<div class="sprite-frame">${s}</div>`).join('')}</div>`;
  },

  avatarChoices(){
    if(this.mode==='spain'){
      return {
        skins:['#f7d6bc','#efc39f','#d69b78','#b97757','#8c583a'], hairs:['#1e1712','#5a3b22','#7b4b2a'], outfits:['#a9232e'],
        presets:[
          {id:'diego',name:'Diego',spriteId:'diego',preset:'diego',skin:'#d69b78',hair:'#2d2016',outfit:'#a9232e',accent:'#f4b942'},
          {id:'lucia',name:'Lucía',spriteId:'lucia',preset:'lucia',skin:'#d69b78',hair:'#4b2b1d',outfit:'#a9232e',accent:'#f4b942'},
          {id:'martin',name:'Martín',spriteId:'martin',preset:'martin',skin:'#efc39f',hair:'#6b3f23',outfit:'#a9232e',accent:'#f4b942'},
          {id:'sofia',name:'Sofía',spriteId:'sofia',preset:'sofia',skin:'#efc39f',hair:'#1e1712',outfit:'#a9232e',accent:'#f4b942'},
          {id:'alvaro',name:'Álvaro',spriteId:'alvaro',preset:'alvaro',skin:'#8c583a',hair:'#1e1712',outfit:'#a9232e',accent:'#f4b942'},
          {id:'nerea',name:'Nerea',spriteId:'nerea',preset:'nerea',skin:'#8c583a',hair:'#2d2016',outfit:'#a9232e',accent:'#f4b942'}
        ]
      };
    }
    return {
      skins:['#f7d6bc','#efc39f','#d69b78','#b97757','#8c583a','#6f442c'],
      hairs:['#1e1712','#5a3b22','#7b4b2a','#3d3131','#a56a43'],
      outfits:['#2b7d79','#3f60b5','#c66a18','#a43a2f'],
      presets:[
        {id:'amal',name:'Amal',preset:'amal',skin:'#b97757',hair:'#1e1712',outfit:'#2b7d79',accent:'#f4b942'},
        {id:'omar',name:'Omar',preset:'omar',skin:'#d69b78',hair:'#3d3131',outfit:'#3f60b5',accent:'#f4b942'},
        {id:'zuri',name:'Zuri',preset:'zuri',skin:'#6f442c',hair:'#1e1712',outfit:'#a43a2f',accent:'#ffe17a'},
        {id:'malik',name:'Malik',preset:'malik',skin:'#8c583a',hair:'#1e1712',outfit:'#2b7d79',accent:'#f4b942'},
        {id:'layla',name:'Layla',preset:'layla',skin:'#f7d6bc',hair:'#7b4b2a',outfit:'#c66a18',accent:'#ffe17a'},
        {id:'youssef',name:'Youssef',preset:'youssef',skin:'#efc39f',hair:'#5a3b22',outfit:'#3f60b5',accent:'#f4b942'}
      ]
    };
  },
  renderAvatarBuilder(){
    const wrap=document.getElementById('avatarBuilder'); if(!wrap) return;
    const options=this.avatarChoices(); const profile=this.state.avatarProfile || options.presets[0];
    const presetCards=this.mode==='spain'
      ? options.presets.map(p=>`<button class="avatar-preset generated-choice ${profile.preset===p.id?'active':''}" onclick="Game.useAvatarPreset('${p.id}')"><img class="avatar-card" src="${this.avatarCardAsset(p.id)}" alt="${p.name}"><div class="avatar-title">${p.name}</div></button>`).join('')
      : options.presets.map(p=>`<button class="avatar-preset ${profile.preset===p.id?'active':''}" onclick="Game.useAvatarPreset('${p.id}')"><div class="css-avatar-choice">${this.avatarMarkup(p,{size:'small'})}</div><div class="avatar-title">${p.name}</div></button>`).join('');
    const customization=this.mode==='spain'
      ? `<div class="spain-avatar-note">Choose a placeholder avatar. Original portrait and sprite artwork has been removed.</div>`
      : `<div class="spain-avatar-note">Choose a geometric avatar drawn by the game. Skin, hair and outfit colors can be changed below.</div>
         <h3 style="margin-top:14px">Skin tone</h3><div class="swatch-row">${options.skins.map(s=>`<div class="swatch ${profile.skin===s?'active':''}" style="background:${s}" onclick="Game.updateAvatarPart('skin','${s}')"></div>`).join('')}</div>
         <h3 style="margin-top:14px">Hair</h3><div class="swatch-row">${options.hairs.map(s=>`<div class="swatch ${profile.hair===s?'active':''}" style="background:${s}" onclick="Game.updateAvatarPart('hair','${s}')"></div>`).join('')}</div>
         <h3 style="margin-top:14px">Outfit</h3><div class="swatch-row">${options.outfits.map(s=>`<div class="swatch outfit ${profile.outfit===s?'active':''}" style="background:${s}" onclick="Game.updateAvatarPart('outfit','${s}')"></div>`).join('')}</div>`;
    wrap.innerHTML=`
      <div class="avatar-part-card">
        <h3>Choose a look</h3>
        <div class="preset-grid">${presetCards}</div>
        ${customization}
      </div>
      <div class="avatar-preview-card">
        <h3>Live preview</h3>
        <div class="live-preview-wrap"><div class="figure-large avatar-bob">${this.avatarMarkup(profile,{size:'large'})}</div></div>
        <div class="avatar-label">${this.mode==='egypt'?'Egypt Restaurant Hero':'Spain Restaurant Hero'}</div>${this.spritePreview()}
        <p class="tiny center">This avatar appears walking in your restaurant, carrying trays, and serving food.</p>
      </div>`;
    this.renderGuide();
  },
  useAvatarPreset(id){
    const preset=this.avatarChoices().presets.find(p=>p.id===id); if(!preset) return;
    this.state.avatarProfile={...preset,preset:id}; this.save(); this.renderAvatarBuilder();
  },
  updateAvatarPart(part,val){
    this.state.avatarProfile={...(this.state.avatarProfile||{}), [part]:val}; this.save(); this.renderAvatarBuilder();
  },
  avatarMarkup(profile, opts={}){
    profile = profile || this.freshState(this.mode||'egypt').avatarProfile;
    const sizeClass = opts.size==='tiny' ? 'tiny' : opts.size==='small' ? 'small' : '';
    if(this.mode==='spain'){
      const modeAssets=SPAIN_CHARACTER_ASSETS;
      let src='';
      if(opts.role==='chef') src=opts.carry?modeAssets.chef.carry:opts.work?modeAssets.chef.work:modeAssets.chef.idle;
      else if(opts.role==='waiter') src=opts.carry?modeAssets.waiter.carry:opts.walk?modeAssets.waiter.walk:modeAssets.waiter.idle;
      else if(opts.role==='cashier' || opts.role==='cleaner') src=opts.happy?modeAssets.cashier.happy:modeAssets.cashier.idle;
      else if(profile.spriteId && profile.spriteId.startsWith('customer_')) src=`assets/spain_sprites/${profile.spriteId}.png`;
      else {
        const id=SPAIN_AVATAR_IDS.includes(profile.spriteId)?profile.spriteId:'diego';
        const pose=opts.carry?'carry':opts.walk?'walk':opts.happy?'happy':'idle';
        src=`assets/spain_sprites/avatar_${id}_${pose}.png`;
      }
      src=assetPath(src);
      return `<div class="art-sprite ${sizeClass} ${opts.animate?'avatar-bob':''}"><img src="${src}" alt="character"></div>`;
    }
    return `<div class="avatar-figure ${sizeClass} ${opts.animate?'avatar-bob':''}" style="--skin:${profile.skin};--hair:${profile.hair};--outfit:${profile.outfit};--accent:${profile.accent||'#f4b942'}">
      <div class="shadow"></div>${opts.chefHat?'<div class="hat"></div>':''}<div class="hair"></div><div class="head"></div><div class="eyes"></div><div class="body"></div><div class="accent"></div><div class="badge"></div>${opts.apron===false?'':'<div class="apron"></div>'}<div class="legs"></div>${opts.carry?'<div class="tray"></div>':''}
    </div>`;
  },
  displayDish(f){ const m=this.state.menu[f.id]; return `${m.custom} (${f.name})`; },
  renderRestaurant(){
    const city=this.data.cities[this.state.cityIndex];
    document.getElementById('restaurantHeading').textContent=this.state.restaurantName;
    document.getElementById('locationText').textContent=city.icon+' '+city.name+' • '+this.state.tableCount+' tables';
    document.getElementById('floorLabel').textContent=(this.state.tableCount>=18?'Flagship':this.state.tableCount>=12?'Busy Restaurant':this.state.tableCount>=8?'Growing Restaurant':'Starter Restaurant')+' • '+this.state.tableCount+' tables';
    document.getElementById('wallArt').innerHTML=this.mode==='egypt'?'<span class="wall-emblem">EGYPT</span>':'<span class="wall-emblem">SPAIN</span>';
    const floor=document.getElementById('floor'); const stage=this.state.tableCount>=18?'flagship':this.state.tableCount>=12?'busy':this.state.tableCount>=8?'medium':'starter'; floor.className='floor '+this.mode+'-theme stage-'+stage;
    const stageNum=this.state.tableCount>=18?4:this.state.tableCount>=12?3:this.state.tableCount>=8?2:1;
    let locationBg=LOCATION_BACKGROUNDS[this.mode][this.state.cityIndex]||LOCATION_BACKGROUNDS[this.mode][0];
    if(this.mode==='egypt'){ const slug=['cairo','alexandria','luxor','aswan'][this.state.cityIndex]||'cairo'; locationBg=`assets/locations/egypt_${slug}_stage${stageNum}.jpg`; }
    locationBg=assetPath(locationBg); floor.style.setProperty('--location-bg',`url("${locationBg}")`);
    floor.dataset.location=city.name;
    const p=document.getElementById('player'); p.innerHTML=this.avatarMarkup(this.state.avatarProfile,{carry:!!this.carryingOrderId});
    this.renderDecor();
    this.renderTables(); this.renderStaffLayer(); this.renderGrowthPanel(); this.renderOrders(); this.updatePlayer(); this.updateDayPanel(); this.updateCounterStation(); this.renderGuide();
  },

  customerProfile(i){
    if(this.mode==='spain') return {spriteId:['customer_tourist_f','customer_tourist_m','customer_local_f','customer_local_m'][i%4]};
    const options=this.avatarChoices();
    const skins=options.skins, hairs=options.hairs, outfits=options.outfits;
    return {preset:'customer'+i,skin:skins[i%skins.length],hair:hairs[(i+2)%hairs.length],outfit:outfits[(i+1)%outfits.length],accent:'#f4b942'};
  },
  renderDecor(){
    const layer=document.getElementById('decorLayer'); if(!layer) return;
    const isEgypt=this.mode==='egypt'; const stage=this.state.tableCount>=18?4:this.state.tableCount>=12?3:this.state.tableCount>=8?2:1;
    if(isEgypt){
      let html=`<div class="egypt-rug" style="left:42%;top:43%;width:${stage>=3?'27':'19'}%;height:${stage>=3?'21':'17'}%"></div>
        <div class="egypt-palm" style="right:5%;top:12%"><i></i></div>
        <div class="egypt-palm" style="right:8%;bottom:12%"><i></i></div>
        <div class="egypt-lantern" style="left:31%;top:5%"></div>
        <div class="egypt-lantern" style="right:28%;top:4%"></div>`;
      if(stage>=2) html+=`<div class="egypt-banner" style="left:46%;top:4%"><span></span><span></span><span></span></div><div class="egypt-vase" style="right:35%;bottom:8%"></div>`;
      if(stage>=3) html+=`<div class="egypt-palm" style="left:32%;bottom:6%"><i></i></div><div class="egypt-scroll" style="right:4%;top:42%"></div>`;
      if(stage>=4) html+=`<div class="ambient fountain" style="left:54%;top:46%"></div>`;
      layer.innerHTML=html; return;
    }
    let html=`<div class="decor-card rug" style="left:41%;top:42%;width:${stage>=3?'26':'17'}%;height:${stage>=3?'20':'16'}%">◆</div>
      <div class="ambient plant" style="right:5%;top:12%">🌿</div>
      <div class="ambient plant" style="right:8%;bottom:12%;animation-delay:-1.2s">🌺</div>
      <div class="ambient lantern" style="left:31%;top:5%">◆</div>
      <div class="ambient lantern" style="right:28%;top:4%;animation-delay:-.8s">◆</div>`;
    if(stage>=2) html+=`<div class="ambient banner" style="left:45%;top:3%">◆ ◆ ◆</div><div class="decor-card" style="right:35%;bottom:8%;width:8%;height:12%">♪</div>`;
    if(stage>=3) html+=`<div class="ambient plant" style="left:32%;bottom:6%">🌿</div><div class="decor-card" style="right:4%;top:42%;width:8%;height:15%">◆</div>`;
    if(stage>=4) html+=`<div class="ambient fountain" style="left:54%;top:46%"></div>`;
    layer.innerHTML=html;
  },
  renderGrowthPanel(){
    const gp=document.getElementById('growthPanel'); if(!gp) return;
    const stage=this.state.tableCount>=18?4:this.state.tableCount>=12?3:this.state.tableCount>=8?2:1;
    const theme=this.mode==='spain'?'spain':'egypt';
    const card=(n,title,sub,extra='')=>`<div class="growth-card compact ${stage===n?'active':''}"><div class="growth-stage-art ${theme}"><div class="mini-counter"></div><div class="mini-light">✨</div><div class="mini-table t1"></div>${n>1?'<div class="mini-table t2"></div>':''}${n>2?'<div class="mini-table t3"></div>':''}${n>3?'<div class="mini-fountain"></div>':''}</div><div><strong>${title}</strong><div class="tiny">${sub}</div>${stage===n?'<div class="tiny good-text">Current stage</div>':''}</div></div>`;
    gp.innerHTML=`<div class="growth-strip compact">${card(1,'Starter','4 tables')}${card(2,'Growing','8 to 10 tables')}${card(3, stage===4?'Upgraded':'Busy','12 to 16 tables')}${card(4,'Flagship','18 to 20 tables')}</div>`;
  },
  renderStaffLayer(){
    const layer=document.getElementById('staffLayer'); if(!layer) return;
    const chefProfile={skin:'#d69b78',hair:'#3d3131',outfit:'#ffffff',accent:'#f4b942'};
    const cashierProfile={skin:'#efc39f',hair:'#2d2016',outfit:this.mode==='egypt'?'#3f60b5':'#2b7d79',accent:'#ffe17a'};
    const waiterProfile={skin:'#b97757',hair:'#1e1712',outfit:this.mode==='egypt'?'#2b7d79':'#a9232e',accent:'#f4b942'};
    const cleanerProfile={skin:'#8c583a',hair:'#5a3b22',outfit:'#7aa0b3',accent:'#d7f2ff'};
    let html='';
    html += `<div class="staff-npc" style="left:19%;top:28%">${this.avatarMarkup(cashierProfile,{size:'small',animate:true,role:'cashier'})}<div class="npc-label">Cashier</div></div>`;
    for(let i=0;i<Math.min(2,this.state.staff.chef);i++) html += `<div class="staff-npc chef-working" style="left:${9+i*8}%;top:${6+i*12}%">${this.avatarMarkup(chefProfile,{size:'small',chefHat:true,role:'chef',work:true})}<div class="npc-label">Chef ${i+1}</div></div>`;
    for(let i=0;i<Math.min(3,this.state.staff.waiter);i++) html += `<div class="staff-npc waiter-moving" style="left:${39+i*5}%;top:${16+i*11}%;--route-time:${8+i*1.5}s;animation-delay:${-i*2}s">${this.avatarMarkup(waiterProfile,{size:'small',carry:true,role:'waiter'})}<div class="npc-label">Waiter ${i+1}</div></div>`;
    if(this.state.completedDays>=2) html += `<div class="staff-npc" style="left:31%;top:80%">${this.avatarMarkup(cleanerProfile,{size:'small',animate:true,role:'cleaner'})}<div class="npc-label">Cleaner</div></div>`;
    layer.innerHTML=html;
  },
  tablePositions(){
    const all=[
      [36,16],[55,16],[75,16],[88,31],[39,40],[59,40],[78,48],[91,62],[38,67],[56,67],
      [72,72],[86,82],[48,84],[64,88],[31,84],[90,15],[70,30],[84,45],[50,55],[67,57]
    ]; return all.slice(0,this.state.tableCount);
  },
  renderTables(){
    const layer=document.getElementById('tablesLayer'); const positions=this.tablePositions();
    layer.innerHTML=positions.map((pos,i)=>{
      const ord=this.currentOrders.find(o=>o.table===i && o.status!=='served');
      const cls=ord?(this.carryingOrderId===ord.id?'ready':'waiting'):'';
      const mood=ord?(ord.patience/ord.maxPatience<.33?'😟':ord.patience/ord.maxPatience<.66?'🙂':'😄'):'';
      return `<div class="table ${cls}" id="table_${i}" style="left:${pos[0]}%;top:${pos[1]}%">${ord?`<div class="bubble">${this.dishIconMarkup(ord.food)}</div>`:''}<div class="customer-card">${ord?this.avatarMarkup(this.customerProfile(i),{size:'tiny'}):'<div class="empty-seat" aria-label="Empty table"><span></span></div>'}<div class="num">Table ${i+1}</div>${ord?`<div class="mood">${mood}</div>`:''}</div></div>`;
    }).join('');
  },
  updateCounterStation(){
    const counter=document.getElementById('counterStation'); if(!counter) return;
    const ready=this.currentOrders.filter(o=>o.status==='ready');
    const staffCooking=this.currentOrders.filter(o=>o.status==='staffCooking').length;
    counter.classList.toggle('ready-pickup',ready.length>0);
    counter.classList.toggle('staff-working',ready.length===0&&staffCooking>0);
    if(this.carryingOrderId) counter.innerHTML='TRAY PICKED UP<br>DELIVER TO THE TABLE';
    else if(ready.length) counter.innerHTML=`🍽️ PICK UP DISH<br>${ready[0].food.name} • TABLE ${ready[0].table+1}`;
    else if(staffCooking) counter.innerHTML=`👨‍🍳 CHEFS COOKING<br>${staffCooking} ORDER${staffCooking===1?'':'S'}`;
    else counter.innerHTML='CLICK AN ORDER<br>THEN BUILD THE DISH'; this.renderGuide();
  },
  counterAction(){
    if(!this.dayRunning){ this.toast('Start the day first'); return; }
    if(this.carryingOrderId){ this.toast('Deliver the tray you are carrying'); return; }
    const ready=this.currentOrders.find(o=>o.status==='ready');
    if(!ready){ this.toast('No dish is ready at the counter yet'); return; }
    this.pickupReady(ready.id);
  },
  updatePlayer(){ const p=document.getElementById('player'); p.style.left=this.player.x+'%'; p.style.top=this.player.y+'%'; p.classList.toggle('carrying',!!this.carryingOrderId); const walking=Object.values(this.keys||{}).some(Boolean); p.innerHTML=this.avatarMarkup(this.state.avatarProfile,{carry:!!this.carryingOrderId,walk:walking}); },
  movePlayer(dx,dy){
    if(!this.state || this.activeScreen!=='restaurant') return;
    this.player.x=Math.max(1,Math.min(94,this.player.x+dx)); this.player.y=Math.max(2,Math.min(90,this.player.y+dy)); this.updatePlayer();
  },
  actionKey(){
    if(!this.dayRunning){ this.toast('Start the day first'); return; }
    if(!this.carryingOrderId){
      if(this.player.x<29){ this.counterAction(); return; }
      this.toast('A ready dish must be picked up at the counter'); return;
    }
    const order=this.currentOrders.find(o=>o.id===this.carryingOrderId); if(!order) return;
    const pos=this.tablePositions()[order.table];
    const dist=Math.hypot(this.player.x-pos[0],this.player.y-pos[1]);
    if(dist<11){ this.deliverOrder(order); }
    else this.toast('Walk closer to Table '+(order.table+1));
  },
  startDay(){
    if(this.dayRunning) return;
    this.dayRunning=true; const dayBase=this.mode==='spain'?155:120; const dayMin=this.mode==='spain'?135:100; this.daySeconds=Math.max(dayMin,dayBase-this.state.equipment.advertising*3); this.currentOrders=[]; this.nextOrderId=1; this.carryingOrderId=null;
    this.dayStats={revenue:0,cost:0,served:0,missed:0,tips:0,speedBonus:0};
    this.staffRuntime={chefAssignments:0,waiterAssignments:0};
    document.getElementById('startDayBtn').disabled=true; document.getElementById('endDayBtn').disabled=false;
    this.secondTimer=setInterval(()=>this.tickSecond(),1000);
    const spawnBase=this.mode==='spain'?8500:7000; const spawnMin=this.mode==='spain'?5200:3900; this.orderTimer=setInterval(()=>this.spawnOrder(),Math.max(spawnMin,spawnBase-this.state.equipment.advertising*350));
    this.spawnOrder(); this.renderRestaurant(); this.speak('Restaurant open. Customers are arriving.');
  },
  tickSecond(){
    if(!this.dayRunning) return;
    this.daySeconds--;
    this.currentOrders.forEach(o=>{ if(o.status!=='served') o.patience--; if(o.status==='ready') o.readySeconds=(o.readySeconds||0)+1; });
    const expired=this.currentOrders.filter(o=>o.patience<=0 && o.status!=='served');
    if(expired.some(o=>o.id===this.assembly.orderId)) this.forceCloseAssembly('The customer left before the dish was finished');
    expired.forEach(o=>{ this.dayStats.missed++; this.state.rating=Math.max(1,this.state.rating-.08); if(this.carryingOrderId===o.id)this.carryingOrderId=null; });
    this.currentOrders=this.currentOrders.filter(o=>o.patience>0 && o.status!=='served');

    const chefLimit=Math.min(2,this.state.staff.chef);
    let cooking=this.currentOrders.filter(o=>o.status==='staffCooking');
    let openChefSlots=Math.max(0,chefLimit-cooking.length);
    const waiting=this.currentOrders.filter(o=>o.status==='waiting'&&o.id!==this.selectedOrderId).slice(0,openChefSlots);
    waiting.forEach((o,idx)=>{ o.status='staffCooking'; o.staffCookRemaining=Math.max(5,9-this.state.equipment.stove); o.chefIndex=idx; this.rewardAnimation('Chef started '+o.food.name,'👨‍🍳',0,true); });
    cooking=this.currentOrders.filter(o=>o.status==='staffCooking');
    cooking.forEach(o=>{ o.staffCookRemaining--; if(o.staffCookRemaining<=0){ o.status='ready'; o.readySeconds=0; o.readyAt=Date.now(); const foodCost=Math.max(1,o.food.cost-this.state.equipment.fridge*.45); this.dayStats.cost+=foodCost; this.state.money-=foodCost; this.rewardAnimation(o.food.name+' is ready',this.dishIconMarkup(o.food),0,true,true); } });

    const waiterLimit=Math.min(3,this.state.staff.waiter);
    let delivering=this.currentOrders.filter(o=>o.status==='staffDelivering');
    let openWaiterSlots=Math.max(0,waiterLimit-delivering.length);
    const readyForWaiter=this.currentOrders.filter(o=>o.status==='ready'&&(o.readySeconds||0)>=2&&o.id!==this.carryingOrderId).slice(0,openWaiterSlots);
    readyForWaiter.forEach((o,idx)=>{ o.status='staffDelivering'; o.staffDeliverRemaining=Math.max(3,6-waiterLimit); o.waiterIndex=idx; });
    delivering=this.currentOrders.filter(o=>o.status==='staffDelivering');
    delivering.forEach(o=>{ o.staffDeliverRemaining--; if(o.staffDeliverRemaining<=0) this.deliverOrder(o,true); });

    this.renderOrders(); this.renderTables(); this.updateDayPanel(); this.updatePlayer(); this.updateTopbar(); this.updateCounterStation();
    if(this.daySeconds<=0) this.endDay(true);
  },
  spawnOrder(){
    if(!this.dayRunning) return;
    if(this.mode==='spain' && this.currentOrders.filter(o=>o.status!=='served').length>=Math.min(this.state.tableCount,5)) return;
    const occupied=new Set(this.currentOrders.map(o=>o.table)); const free=[];
    for(let i=0;i<this.state.tableCount;i++) if(!occupied.has(i)) free.push(i);
    if(!free.length) return;
    const food=this.data.foods[Math.floor(Math.random()*this.data.foods.length)];
    const table=free[Math.floor(Math.random()*free.length)];
    const patience=(this.mode==='spain'?56:42)+this.state.equipment.decor*3+Math.floor(this.state.rating*2);
    this.currentOrders.push({id:this.nextOrderId++,food,table,patience,maxPatience:patience,status:'waiting',createdAt:Date.now(),readySeconds:0});
    this.renderOrders(); this.renderTables();
  },
  renderOrders(){
    const list=document.getElementById('orderList'); if(!list) return;
    this.renderOrderActionBar();
    if(!this.currentOrders.length){ list.innerHTML=`<p class="tiny">${this.dayRunning?'Waiting for customers...':'Open the restaurant to receive orders.'}</p>`; return; }
    list.innerHTML=this.currentOrders.map(o=>{
      const pct=Math.max(0,o.patience/o.maxPatience*100);
      const statusMap={ready:'Ready at pickup counter',cooking:'You are cooking',staffCooking:`Chef cooking • ${Math.max(0,o.staffCookRemaining||0)} sec`,staffDelivering:`Waiter delivering • ${Math.max(0,o.staffDeliverRemaining||0)} sec`,carrying:'You are carrying this dish',waiting:'Needs cooking'};
      const cardClass=o.status==='staffCooking'?'staff-cooking':o.status==='staffDelivering'?'staff-delivering':'';
      const selectable=o.status==='waiting';
      return `<div class="order-card ${cardClass} ${selectable?'selectable':''} ${this.selectedOrderId===o.id?'active':''}" ${selectable?`onclick="Game.selectOrder(${o.id})"`:''}>
        <div class="dish-hero"><div class="dish-badge">${this.dishIconMarkup(o.food)}</div><div><strong>Table ${o.table+1}</strong><div>${this.displayDish(o.food)}</div><div class="tiny">${statusMap[o.status]||o.status}</div></div></div>
        <div class="picture-row">${o.food.ingredients.map(i=>`<span class="picture-pill"><span class="icon">${this.ingredientIcon(i)}</span></span>`).join('')}</div>
        <div class="timer"><span style="width:${pct}%;background:${pct<30?'var(--bad)':pct<60?'var(--gold)':'var(--good)'}"></span></div>
        ${o.status==='waiting'?`<button class="build-order-btn" onclick="event.stopPropagation();Game.openAssembly(${o.id})">Build Order</button>`:''}
        ${o.status==='ready'?`<div class="good-text center" style="margin-top:7px">Pick up at the kitchen counter</div>`:''}
        <div class="floating-coin">${pct>60?'😊':pct>30?'🙂':'😟'}</div>
      </div>`;
    }).join('');
  },
  renderOrderActionBar(){
    const textEl=document.getElementById('orderActionText');
    const btn=document.getElementById('buildSelectedBtn');
    if(!textEl||!btn) return;
    const waiting=this.currentOrders.filter(o=>o.status==='waiting');
    let selected=waiting.find(o=>o.id===this.selectedOrderId);
    if(!selected && waiting.length===1){ selected=waiting[0]; this.selectedOrderId=selected.id; }
    if(selected){
      textEl.textContent=`Selected: Table ${selected.table+1} • ${this.displayDish(selected.food)}`;
      btn.disabled=false;
      btn.textContent='Build Selected';
    } else if(waiting.length){
      textEl.textContent=`${waiting.length} order${waiting.length===1?'':'s'} waiting. Tap a card or build the oldest.`;
      btn.disabled=false;
      btn.textContent='Build Oldest';
    } else {
      textEl.textContent=this.dayRunning?'No dishes need building right now.':'Open the restaurant to receive orders.';
      btn.disabled=true;
      btn.textContent='Build Selected';
    }
  },
  selectOrder(orderId){
    const order=this.currentOrders.find(o=>o.id===orderId && o.status==='waiting');
    if(!order) return;
    this.selectedOrderId=orderId;
    this.renderOrders();
  },
  buildSelectedOrder(){
    const waiting=this.currentOrders.filter(o=>o.status==='waiting');
    const order=waiting.find(o=>o.id===this.selectedOrderId) || waiting[0];
    if(!order){ this.toast('No order is waiting to be built'); return; }
    this.selectedOrderId=order.id;
    this.openAssembly(order.id);
  },
  openAssembly(orderId){
    if(this.carryingOrderId){ this.toast('Deliver the dish you are carrying first'); return; }
    const o=this.currentOrders.find(x=>x.id===orderId); if(!o||o.status!=='waiting')return;
    const buildBase=this.mode==='spain'?48:40;
    o.status='cooking'; this.selectedOrderId=orderId; this.assembly={orderId,selected:[],time:Math.max(this.mode==='spain'?34:28,buildBase-this.state.equipment.stove*2),timer:null};
    document.getElementById('assemblyTitle').textContent='Build '+this.displayDish(o.food);
    document.getElementById('assemblyHint').textContent='Tap the 4 picture symbols in order.';
    const cv=document.getElementById('cookVisual'); if(cv) cv.classList.remove('cook-success');
    this.renderAssembly(); document.getElementById('assemblyModal').classList.remove('hidden');
    this.assembly.timer=setInterval(()=>{ this.assembly.time--; document.getElementById('assemblyTime').textContent=this.assembly.time; if(this.assembly.time<=0)this.failAssembly('Time ran out'); },1000);
  },
  ingredientPool(food){
    return [...food.ingredients].sort(()=>Math.random()-.5);
  },
  renderAssembly(){
    const o=this.currentOrders.find(x=>x.id===this.assembly.orderId); if(!o)return;
    document.getElementById('assemblyTime').textContent=this.assembly.time;
    document.getElementById('assemblyTitle').textContent='Build '+this.displayDish(o.food);
    const nextStep=this.assembly.selected.length+1; const expected=o.food.ingredients[this.assembly.selected.length];
    document.getElementById('assemblyHint').innerHTML='Step <strong>'+nextStep+'</strong> of <strong>'+o.food.ingredients.length+'</strong>. Click <strong>'+expected+'</strong>.'; const cv=document.getElementById('cookVisual'); if(cv) cv.querySelector('.cook-food').innerHTML=this.assembly.selected.length?this.ingredientIcon(this.assembly.selected[this.assembly.selected.length-1]):this.dishIconMarkup(o.food);
    const targetHtml = `<div class="assembly-target"><div class="dish-badge">${this.dishIconMarkup(o.food)}</div><div><strong>${o.food.name}</strong><div class="tiny">Recipe order</div><div class="assembly-strip">${o.food.ingredients.map((i,idx)=>`<span class="picture-pill" style="${idx<this.assembly.selected.length?'background:#d9f6df;border-color:var(--good)':idx===this.assembly.selected.length?'background:#fff0b8;border-color:var(--gold)':''}"><span class="icon">${this.ingredientIcon(i)}</span><span>${i}</span></span>`).join('')}</div></div></div><div class="guide-banner">Now click: <span class="icon">${this.ingredientIcon(expected)}</span> ${expected}</div>`;
    document.getElementById('assemblySlots').innerHTML = targetHtml + (this.assembly.selected.length?this.assembly.selected.map((x,i)=>`<button class="slot" onclick="Game.removeIngredient(${i})"><span class="icon">${this.ingredientIcon(x)}</span><span>${i+1}. ${x}</span></button>`).join(''):'<span class="slot empty"><span class="icon">🧺</span><span>Your ingredient order appears here. Tap a slot to remove it.</span></span>');
    if(!this.assembly.pool) this.assembly.pool=this.ingredientPool(o.food);
    document.getElementById('ingredientGrid').innerHTML=this.assembly.pool.map((i,idx)=>{ const done=this.assembly.selected.includes(i); const current=i===expected; return `<button class="ingredient-btn ${done?'done':current?'current':'dim'}" onclick="Game.selectIngredient('${i}')"><span class="step-badge">${done?'✓':current?'!':''}</span><span class="icon">${this.ingredientIcon(i)}</span><span class="name">${i}</span></button>`; }).join('');
  },
  selectIngredient(i){
    const o=this.currentOrders.find(x=>x.id===this.assembly.orderId); if(!o) return;
    const expected=o.food.ingredients[this.assembly.selected.length];
    if(i!==expected){ this.assembly.time=Math.max(1,this.assembly.time-1); this.toast('Try the next picture in the recipe'); this.speak('Try the next picture in the recipe.'); const grid=document.getElementById('ingredientGrid'); if(grid) grid.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:260}); return; }
    if(this.assembly.selected.includes(i)) return;
    this.assembly.selected.push(i); this.animateIngredient(i); this.rewardAnimation('Correct ingredient','✅',0,true); this.playTone('correct'); this.renderAssembly();
    if(this.assembly.selected.length===o.food.ingredients.length) setTimeout(()=>this.submitAssembly(),550);
  },
  animateIngredient(i){ const v=document.getElementById('cookVisual'); if(!v) return; const fly=document.createElement('div'); fly.className='ingredient-fly'; fly.innerHTML=this.ingredientIcon(i); v.appendChild(fly); setTimeout(()=>fly.remove(),800); v.querySelector('.cook-food').innerHTML=this.ingredientIcon(i); },
  removeIngredient(i){ this.assembly.selected.splice(i,1); this.renderAssembly(); },
  clearAssembly(){ this.assembly.selected=[]; this.renderAssembly(); },
  submitAssembly(){
    const o=this.currentOrders.find(x=>x.id===this.assembly.orderId); if(!o)return;
    const correct=o.food.ingredients.join('|')===this.assembly.selected.join('|');
    if(correct){
      clearInterval(this.assembly.timer); const cv=document.getElementById('cookVisual'); if(cv){cv.classList.add('cook-success');cv.querySelector('.cook-food').innerHTML=this.dishIconMarkup(o.food);} setTimeout(()=>document.getElementById('assemblyModal').classList.add('hidden'),500);
      o.status='ready'; o.readySeconds=0; o.readyAt=Date.now(); this.selectedOrderId=null; this.assembly.pool=null; this.assembly.orderId=null;
      const foodCost=Math.max(1,o.food.cost-this.state.equipment.fridge*.45); this.dayStats.cost+=foodCost; this.state.money-=foodCost;
      this.rewardAnimation('Dish ready at pickup!',this.dishIconMarkup(o.food),0,false,true); this.playTone('success');
      this.toast('Dish ready. Press PICK UP at the kitchen counter.'); this.speak('Dish ready. Pick it up at the kitchen counter.');
      this.renderOrders(); this.renderTables(); this.updatePlayer(); this.updateTopbar(); this.updateCounterStation();
    } else this.failAssembly('The ingredients were not in the correct order');
  },
  failAssembly(msg){
    clearInterval(this.assembly.timer); const o=this.currentOrders.find(x=>x.id===this.assembly.orderId); if(o&&o.patience>0)o.status='waiting';
    const modal=document.getElementById('assemblyModal'); if(modal) modal.classList.add('hidden'); const cv=document.getElementById('cookVisual'); if(cv) cv.classList.remove('cook-success');
    this.selectedOrderId=null; this.assembly={orderId:null,selected:[],time:0,timer:null,pool:null}; this.toast(msg,2400); this.speak(msg+'. Try again.'); this.renderOrders(); this.updateCounterStation();
  },
  forceCloseAssembly(msg){
    clearInterval(this.assembly.timer); const modal=document.getElementById('assemblyModal'); if(modal) modal.classList.add('hidden'); const cv=document.getElementById('cookVisual'); if(cv) cv.classList.remove('cook-success');
    this.selectedOrderId=null; this.assembly={orderId:null,selected:[],time:0,timer:null,pool:null}; this.toast(msg,2500); this.renderOrders(); this.updateCounterStation();
  },
  cancelAssembly(){ this.failAssembly('Cooking canceled'); },
  pickupReady(id){ const o=this.currentOrders.find(x=>x.id===id); if(!o||o.status!=='ready')return; if(this.carryingOrderId&&this.carryingOrderId!==id){this.toast('Your hands are full');return;} this.carryingOrderId=id; o.status='carrying'; this.rewardAnimation('Tray picked up!','🙌',0,true); this.playTone('pickup'); this.toast('Deliver to Table '+(o.table+1)); this.updatePlayer(); this.renderOrders(); this.renderTables(); this.updateCounterStation(); },
  deliverOrder(order,auto=false){
    if(!order||!this.currentOrders.some(o=>o.id===order.id)) return;
    const menu=this.state.menu[order.food.id]; const cityBonus=this.data.cities[this.state.cityIndex].bonus;
    const qualityBonus=1+(this.state.equipment.stove-1)*.04+(this.state.equipment.decor-1)*.03;
    const patienceRatio=Math.max(0,order.patience/order.maxPatience);
    const revenue=Math.round(menu.price*cityBonus*qualityBonus);
    const tip=Math.max(0,Math.round(patienceRatio*menu.price*.35));
    const speedBonus=Math.max(0,Math.round(patienceRatio*menu.price*.8));
    const total=revenue+tip+speedBonus;
    this.state.money+=total; this.dayStats.revenue+=revenue; this.dayStats.tips+=tip; this.dayStats.speedBonus=(this.dayStats.speedBonus||0)+speedBonus; this.dayStats.served++; this.state.totalServed++; this.state.totalRevenue+=total;
    this.state.rating=Math.min(5,this.state.rating+.03+patienceRatio*.04);
    this.tableReward(order,total); this.rewardAnimation((auto?'Waiter served it!':'Perfect delivery!'),this.dishIconMarkup(order.food),total,false,true); this.playTone('success');
    order.status='served'; if(this.carryingOrderId===order.id)this.carryingOrderId=null; this.currentOrders=this.currentOrders.filter(o=>o.id!==order.id);
    this.toast(`${auto?'Waiter served':'Served'} ${order.food.name}: $${revenue} + $${speedBonus} speed bonus` ,2800);
    this.speak((auto?'Waiter served the dish. ':'Great delivery. ')+'You earned '+total+' dollars.');
    this.renderOrders(); this.renderTables(); this.updatePlayer(); this.updateDayPanel(); this.updateTopbar(); this.updateCounterStation();
  },
  updateDayPanel(){
    if(!document.getElementById('dayClock')) return;
    document.getElementById('dayClock').textContent=this.dayRunning?this.daySeconds+' sec':'Not open';
    const s=this.dayStats||{revenue:0,served:0,missed:0};
    document.getElementById('dayRevenue').textContent=Math.floor((s.revenue||0)+(s.tips||0)+(s.speedBonus||0));
    document.getElementById('servedCount').textContent=s.served||0; document.getElementById('missedCount').textContent=s.missed||0;
    const o=this.currentOrders.find(x=>x.id===this.carryingOrderId); document.getElementById('carryText').textContent=o?o.food.name:'Nothing';
  },
  endDay(auto){
    if(!this.dayRunning) return;
    this.dayRunning=false; clearInterval(this.secondTimer); clearInterval(this.orderTimer); clearInterval(this.assembly.timer);
    document.getElementById('assemblyModal').classList.add('hidden');
    const missedLeft=this.currentOrders.filter(o=>o.status!=='served').length; this.dayStats.missed+=missedLeft;
    const rent=24+this.state.tableCount*2;
    const payroll=this.staffDailyWages();
    const operatingCost=rent+payroll;
    const profit=this.dayStats.revenue+this.dayStats.tips+(this.dayStats.speedBonus||0)-this.dayStats.cost-operatingCost;
    this.state.money-=operatingCost; this.state.bestDay=Math.max(this.state.bestDay,profit); this.state.completedDays++; this.state.day++;
    if(this.dayStats.missed>this.dayStats.served && this.dayStats.missed>0) this.state.rating=Math.max(1,this.state.rating-.12);
    this.currentOrders=[]; this.carryingOrderId=null; this.selectedOrderId=null;
    document.getElementById('startDayBtn').disabled=false; document.getElementById('endDayBtn').disabled=true;
    document.getElementById('dailyReport').innerHTML=`
      <div class="report-row"><span>Meals served</span><strong>${this.dayStats.served}</strong></div>
      <div class="report-row"><span>Customers missed</span><strong>${this.dayStats.missed}</strong></div>
      <div class="report-row"><span>Food sales</span><strong>$${this.dayStats.revenue}</strong></div>
      <div class="report-row"><span>Tips</span><strong>$${this.dayStats.tips}</strong></div>
      <div class="report-row"><span>Speed bonuses</span><strong>$${this.dayStats.speedBonus||0}</strong></div>
      <div class="report-row"><span>Ingredient cost</span><strong>−$${Math.round(this.dayStats.cost)}</strong></div>
      <div class="report-row"><span>Restaurant rent</span><strong>−$${rent}</strong></div>
      <div class="report-row"><span>Staff wages</span><strong>−$${payroll}</strong></div>
      <div class="report-row"><span>Daily profit</span><strong class="${profit>=0?'good-text':'bad-text'}">${profit>=0?'+':''}$${Math.round(profit)}</strong></div>
      <div class="report-row"><span>New balance</span><strong>$${Math.floor(this.state.money)}</strong></div>`;
    document.getElementById('reportModal').classList.remove('hidden'); this.save(); this.updateTopbar(); this.renderRestaurant();
    this.speak('The day is complete. You earned '+Math.round(profit)+' dollars in profit.');
  },
  closeReport(){ document.getElementById('reportModal').classList.add('hidden'); },

  staffHireCost(key){ const e=STAFF_ECONOMY[key]; return e.baseCost+e.costStep*(this.state.staff[key]||0); },
  staffDailyWages(){ return (this.state.staff.chef||0)*STAFF_ECONOMY.chef.dailyWage+(this.state.staff.waiter||0)*STAFF_ECONOMY.waiter.dailyWage; },
  staffUnlocked(key){ return this.state.completedDays>=STAFF_ECONOMY[key].unlockDays; },

  renderManage(){
    const s=this.state;
    document.getElementById('businessSnapshot').innerHTML=[['Tables',s.tableCount,'🪑'],['Total Served',s.totalServed,'🍽️'],['Daily Payroll','$'+this.staffDailyWages(),'💵'],['Completed Days',s.completedDays,'📅']].map(x=>`<div class="lesson-card center"><div class="big-icon">${x[2]}</div><h3>${x[0]}</h3><div style="font-size:30px;font-weight:900">${x[1]}</div></div>`).join('');
    const expansions=[{tables:8,cost:900},{tables:12,cost:2300},{tables:16,cost:5200},{tables:20,cost:9800}];
    document.getElementById('expansionShop').innerHTML=expansions.map(e=>this.shopCard(`${e.tables} Table Expansion`,`Serve more customers at one time.`,e.cost,s.tableCount>=e.tables,`Game.buyExpansion(${e.tables},${e.cost})`)).join('');
    const upgrades=[
      {key:'stove',name:'Faster Stove',desc:'Adds more cooking time and improves quality.',base:450},
      {key:'fridge',name:'Better Fridge',desc:'Reduces ingredient costs.',base:420},
      {key:'decor',name:'Dining Room Decor',desc:'Customers wait longer and tip more.',base:380},
      {key:'advertising',name:'Advertising',desc:'Brings customers more often.',base:500}
    ];
    document.getElementById('upgradeShop').innerHTML=upgrades.map(u=>{
      const level=s.equipment[u.key]; const max=5; const cost=u.base*(level+1);
      return this.shopCard(`${u.name} Level ${level}`,u.desc,cost,level>=max,`Game.buyUpgrade('${u.key}',${cost})`,level>=max?'MAX':'BUY');
    }).join('');
    const staff=['chef','waiter'];
    document.getElementById('staffShop').innerHTML=staff.map(key=>{
      const e=STAFF_ECONOMY[key]; const count=s.staff[key]||0; const full=count>=e.max; const unlocked=this.staffUnlocked(key); const cost=this.staffHireCost(key);
      const desc=key==='chef'?'Cooks one order at a time. Two chefs can keep a busy kitchen moving.':'Carries one dish at a time. Three waiters can cover a full restaurant.';
      return `<div class="shop-card ${full?'lock':''}"><div class="shop-visual">${this.shopIcon('Hire '+e.label)}</div><h3>Hire ${e.label} ${count}/${e.max}</h3><p>${desc}</p>
        <div class="staff-cost-line"><span>Hiring cost</span><strong>$${cost}</strong></div>
        <div class="staff-cost-line"><span>Daily wage</span><strong>$${e.dailyWage}</strong></div>
        ${!unlocked?`<div class="staff-locked-note">Available on Day ${e.unlockDays+1}</div>`:`<span class="staff-wage-badge">Balanced by daily wages</span>`}
        <button ${full||!unlocked?'disabled':''} onclick="Game.hireStaff('${key}')">${full?'FULL':unlocked?'HIRE':'LOCKED'}</button>
      </div>`;
    }).join('');
  },
  shopCard(name,desc,cost,owned,action,label='BUY'){
    return `<div class="shop-card ${owned?'lock':''}"><div class="shop-visual">${this.shopIcon(name)}</div><h3>${name}</h3><p>${desc}</p><p class="money">$${cost}</p><button ${owned?'disabled':''} onclick="${action}">${owned?'OWNED':label}</button><div class="floating-coin">✨</div></div>`;
  },
  spend(cost){ if(this.state.money<cost){this.toast('You need $'+(cost-this.state.money)+' more');return false;} this.state.money-=cost; return true; },
  buyExpansion(tables,cost){ if(this.state.tableCount>=tables)return; if(!this.spend(cost))return; this.state.tableCount=tables; this.save(); this.updateTopbar(); this.renderManage(); this.toast('Expanded to '+tables+' tables'); },
  buyUpgrade(key,cost){ if(this.state.equipment[key]>=5)return; if(!this.spend(cost))return; this.state.equipment[key]++; this.save(); this.updateTopbar(); this.renderManage(); this.toast('Upgrade purchased'); },
  hireStaff(key){
    const e=STAFF_ECONOMY[key]; if(!e) return;
    if(!this.staffUnlocked(key)){ this.toast(`${e.label}s unlock on Day ${e.unlockDays+1}`); return; }
    if((this.state.staff[key]||0)>=e.max) return;
    const cost=this.staffHireCost(key); if(!this.spend(cost)) return;
    this.state.staff[key]++; this.save(); this.updateTopbar(); this.renderManage();
    this.rewardAnimation(`${e.label} hired!`,key==='chef'?'👨‍🍳':'🧑‍💼',0,true); this.toast(`${e.label} hired. Daily wage $${e.dailyWage}.`);
  },
  renderCities(){
    document.getElementById('cityGrid').innerHTML=this.data.cities.map((c,i)=>{
      const unlocked=this.state.unlockedCities.includes(i), active=this.state.cityIndex===i, can=this.state.money>=c.cost&&this.state.rating>=c.rating;
      return `<div class="city-card ${!unlocked?'lock':''}">
      <div class="city-banner"><h2>${c.icon} ${c.name}</h2><span class="city-bonus">Profit x${c.bonus}</span></div>
      ${this.cityScene(c,i)}
      <p>${c.desc}</p>
      <div class="report-row"><span>Unlock cost</span><strong>$${c.cost}</strong></div><div class="report-row"><span>Rating needed</span><strong>${c.rating.toFixed(1)}</strong></div>
      ${active?'<button disabled>ACTIVE</button>':unlocked?`<button class="good" onclick="Game.moveCity(${i})">MOVE HERE</button>`:`<button ${can?'':'disabled'} onclick="Game.unlockCity(${i})">UNLOCK</button>`}</div>`;
    }).join('');
  },
  unlockCity(i){ const c=this.data.cities[i]; if(this.state.rating<c.rating){this.toast('Raise your rating first');return;} if(!this.spend(c.cost))return; this.state.unlockedCities.push(i); this.state.cityIndex=i; this.save(); this.updateTopbar(); this.renderCities(); this.toast(c.name+' restaurant opened'); },
  moveCity(i){ this.state.cityIndex=i; this.save(); this.renderCities(); this.toast('Moved to '+this.data.cities[i].name); },
  renderHome(){
    const h=this.data.homes[this.state.homeIndex]; document.getElementById('homeName').textContent=h.name; document.getElementById('homeDescription').textContent=h.desc;
    const stage=this.state.homeIndex; const defaultPos=[[8,58],[25,16],[67,18],[78,58],[43,68],[55,20],[15,32],[72,36]];
    const items=this.state.ownedDecor.map((i,n)=>{ const pos=this.state.decorPositions[i]||defaultPos[n%defaultPos.length]; return `<button class="room-item shine" title="Tap to move ${this.data.decor[i].name}" style="left:${pos[0]}%;top:${pos[1]}%" onclick="Game.moveDecor(${i})">${this.data.decor[i].icon}</button>`; }).join('');
    const avatar=`<div id="homeAvatar" class="home-avatar" style="left:${this.state.homePlayer.x}%;top:${this.state.homePlayer.y}%">${this.avatarMarkup(this.state.avatarProfile,{animate:true})}<div class="home-bubble">Home sweet home</div></div>`;
    const homePreview=document.getElementById('homePreview');
    homePreview.className='home-room-scene '+(this.mode==='spain'?'spain':'');
    const homeBg=HOME_BACKGROUNDS[this.mode][Math.min(2,stage)]||HOME_BACKGROUNDS[this.mode][0];
    homePreview.style.setProperty('--home-bg',`url("${assetPath(homeBg)}")`);
    homePreview.innerHTML=`<div class="room-window"></div>${stage>=1?'<div class="room-kitchen"></div>':''}<div class="room-bed"></div>${stage>=1?'<div class="room-couch"></div>':''}${stage>=2?'<div class="room-table">🪑</div>':''}${stage>=2?'<div class="room-rug"></div>':''}${stage>=3?'<div class="room-chandelier">✨</div><div class="room-aquarium">🐠</div>':''}<div class="life-coin" style="left:10%;top:12%">✨</div><div class="life-coin" style="right:12%;top:14%;animation-delay:-.8s">💖</div><div class="life-coin" style="left:58%;bottom:14%;animation-delay:-1.4s">⭐</div>${items}${avatar}<div class="home-help">Tap a decoration to move it around the room</div>`;
    document.getElementById('homeShop').innerHTML=this.data.homes.map((home,i)=>{
      const unlocked=this.state.unlockedHomes.includes(i), active=this.state.homeIndex===i;
      return `<div class="home-card ${!unlocked?'lock':''}"><div class="big-icon">${home.icon}</div><h3>${home.name}</h3>${this.homeScene(home)}<p>${home.desc}</p><p class="money">$${home.cost}</p>
      ${active?'<button disabled>YOU LIVE HERE</button>':unlocked?`<button class="good" onclick="Game.moveHome(${i})">MOVE IN</button>`:`<button onclick="Game.buyHome(${i})">BUY HOME</button>`}</div>`;
    }).join('');
    document.getElementById('decorShop').innerHTML=this.data.decor.map((d,i)=>`<div class="shop-card ${this.state.ownedDecor.includes(i)?'lock':''}"><div class="shop-visual">${d.icon}</div><h3>${d.name}</h3><p>Place this item inside your graphical home.</p><p class="money">$${d.cost}</p><button ${this.state.ownedDecor.includes(i)?'disabled':''} onclick="Game.buyDecor(${i})">${this.state.ownedDecor.includes(i)?'OWNED':'BUY'}</button></div>`).join('');
  },
  moveDecor(i){ const spots=[[8,58],[25,16],[67,18],[78,58],[43,68],[55,20],[15,32],[72,36]]; const current=this.state.decorPositions[i]||spots[0]; let idx=spots.findIndex(p=>p[0]===current[0]&&p[1]===current[1]); idx=(idx+1)%spots.length; this.state.decorPositions[i]=spots[idx]; this.save(); this.renderHome(); this.toast(this.data.decor[i].name+' moved'); },
  moveHomeAvatar(dx,dy){ if(this.activeScreen!=='home') return; this.state.homePlayer.x=Math.max(4,Math.min(86,(this.state.homePlayer.x||44)+dx)); this.state.homePlayer.y=Math.max(18,Math.min(78,(this.state.homePlayer.y||70)+dy)); const el=document.getElementById('homeAvatar'); if(el){ el.style.left=this.state.homePlayer.x+'%'; el.style.top=this.state.homePlayer.y+'%'; } this.save(); },
  homeCelebrate(){ if(this.activeScreen!=='home') return; const el=document.getElementById('homeAvatar'); if(el){ el.animate([{transform:'scale(1)'},{transform:'scale(1.08) translateY(-5px)'},{transform:'scale(1)'}],{duration:500}); const b=el.querySelector('.home-bubble'); if(b) b.textContent='Looking great!'; } },
  buyHome(i){ const h=this.data.homes[i]; if(!this.spend(h.cost))return; this.state.unlockedHomes.push(i); this.state.homeIndex=i; this.save(); this.updateTopbar(); this.renderHome(); this.toast('New home purchased'); },
  moveHome(i){ this.state.homeIndex=i; this.save(); this.renderHome(); },
  buyDecor(i){ const d=this.data.decor[i]; if(this.state.ownedDecor.includes(i))return; if(!this.spend(d.cost))return; this.state.ownedDecor.push(i); if(!this.state.decorPositions[i]) this.state.decorPositions[i]=[[8,58],[25,16],[67,18],[78,58],[43,68],[55,20]][this.state.ownedDecor.length%6]; this.save(); this.updateTopbar(); this.renderHome(); this.toast(d.name+' added to your home'); const item=document.querySelector('.room-item:last-of-type'); if(item) item.classList.add('pop'); },

  nextObjective(){
    if(!this.state) return {title:'Choose a mode', sub:'Pick Egypt or Spain to begin.', target:null, checks:[]};
    const checks=[];
    if(!this.state.lessonDone) return {title:'Learn the food facts', sub:'Read the food cards and answer the quiz questions to unlock your restaurant.', target:'quizWrap', checks:[{done:this.quizScore>0, text:'Answer the food quiz'}]};
    if(!this.state.setupDone) return {title:'Create your restaurant hero', sub:'Pick your avatar, name your restaurant, then press Open Restaurant.', target:'openRestaurantBtn', checks:[{done:!!(this.state.avatarProfile&&this.state.avatarProfile.spriteId), text:'Choose an avatar'},{done:!!(this.state.restaurantName&&this.state.restaurantName.trim()), text:'Type a restaurant name'},{done:false, text:'Press Open Restaurant'}]};
    if(this.activeScreen==='menu') return {title:'Save your menu', sub:'You can keep the suggested prices. When you are ready, press Save Menu.', target:'saveMenuBtn', checks:this.data.foods.map(f=>({done:true,text:f.name+' ready'}))};
    if(this.activeScreen==='restaurant'){
      const ready=this.currentOrders.filter(o=>o.status==='ready');
      const waiting=this.currentOrders.filter(o=>['waiting','selected','cooking'].includes(o.status));
      if(!this.dayRunning) return {title:'Open for business', sub:'Press Start Day to welcome your first customers.', target:'startDayBtn', checks:[{done:false,text:'Press Start Day'}]};
      if(this.carryingOrderId){ const o=this.currentOrders.find(x=>x.id===this.carryingOrderId); return {title:'Deliver the tray', sub:`Walk to Table ${o?o.table+1:'?'} and press Serve.`, target:'player', checks:[{done:false,text:'Carry the dish to the matching table'}]}; }
      if(ready.length) return {title:'Pick up the ready dish', sub:'Press the kitchen counter button, then carry the tray to the correct table.', target:'counterStation', checks:[{done:false,text:'Press Pick Up at the counter'},{done:false,text:'Deliver it to the table'}]};
      if(this.assembly && this.assembly.orderId){ const o=this.currentOrders.find(x=>x.id===this.assembly.orderId); const idx=this.assembly.selected.length; const next=o&&o.food.ingredients[idx]; return {title:'Build the dish in order', sub:`Click ${next||'the next ingredient'} on the shelf. The game highlights the correct picture.`, target:'ingredientGrid', checks:o?o.food.ingredients.map((ing,i)=>({done:i<idx,text:ing})):[]}; }
      if(waiting.length) return {title:'Cook the next order', sub:'Tap a customer order or press Build Selected to start the recipe.', target:'buildSelectedBtn', checks:[{done:false,text:'Select an order'},{done:false,text:'Build the dish with the picture shelf'}]};
      return {title:'Stay ready', sub:'Customers will appear soon. Watch the order queue on the left.', target:'orderList', checks:[{done:false,text:'Wait for the first customer'}]};
    }
    if(this.activeScreen==='manage') return {title:'Grow your restaurant', sub:'Buy tables, equipment, or staff when you have enough money.', target:null, checks:[{done:this.state.tableCount>4,text:'Expand tables'},{done:(this.state.staff.chef+this.state.staff.waiter)>0,text:'Hire staff'}]};
    if(this.activeScreen==='cities') return {title:'Open new locations', sub:'Improve your rating and save money to unlock more cities.', target:null, checks:this.data.cities.map((c,i)=>({done:this.state.unlockedCities.includes(i),text:c.name}))};
    if(this.activeScreen==='home') return {title:'Upgrade your home', sub:'Buy decorations and new homes to show your success.', target:null, checks:[{done:this.state.ownedDecor.length>0,text:'Buy a decoration'},{done:(this.state.homeIndex||0)>0,text:'Purchase a better home'}]};
    return {title:'Keep going', sub:'Follow the next screen prompt.', target:null, checks:[]};
  },
  renderGuide(){
    if(!this.state) return;
    const info=this.nextObjective();
    const top=document.getElementById('objectiveTextTop'); if(top) top.textContent=info.title;
    const panel=document.getElementById('objectivePanel');
    if(panel){ panel.innerHTML=`<div class="objective-step">${info.title}</div><div class="objective-sub">${info.sub}</div>${info.target?'<div class="goal-chip">👉 Follow the glowing button or area</div>':''}<div class="objective-checks">${(info.checks||[]).slice(0,5).map(c=>`<div class="objective-check ${c.done?'done':''}"><span class="bullet">${c.done?'✓':'•'}</span><span>${c.text}</span></div>`).join('')}</div>`; }
    const hint=document.getElementById('coachHint'); const hintText=document.getElementById('coachHintText');
    if(hint && hintText){ hint.classList.toggle('hidden', !info); hintText.textContent=info.sub; }
    document.querySelectorAll('.guide-pulse').forEach(el=>el.classList.remove('guide-pulse'));
    if(info.target){ const el=document.getElementById(info.target); if(el) el.classList.add('guide-pulse'); }
  },

  rewardAnimation(text,icon,amount=0,mini=false,iconIsHtml=false){
    const layer=document.getElementById('rewardLayer'); if(!layer) return;
    const burst=document.createElement('div'); burst.className='reward-burst'+(mini?' mini':'');
    burst.innerHTML=`<span class="reward-icon">${icon}</span>${text}${amount?`<div>+$${amount}</div>`:''}`; layer.appendChild(burst);
    const bits=['⭐','✨','🪙','🎉','💛','✅'];
    for(let i=0;i<10;i++){ const b=document.createElement('div'); b.className='confetti-bit'; b.textContent=bits[i%bits.length]; b.style.setProperty('--dx',`${(Math.random()-.5)*430}px`); b.style.setProperty('--dy',`${-80-Math.random()*300}px`); b.style.left=(45+Math.random()*10)+'%'; b.style.top=(45+Math.random()*10)+'%'; layer.appendChild(b); setTimeout(()=>b.remove(),1300); }
    setTimeout(()=>burst.remove(),1350);
  },
  tableReward(order,amount){
    const floor=document.getElementById('floor'); const pos=this.tablePositions()[order.table]; if(!floor||!pos)return;
    const el=document.createElement('div'); el.className='table-reward'; el.style.left=pos[0]+'%'; el.style.top=pos[1]+'%'; el.textContent='⭐ +$'+amount; floor.appendChild(el); setTimeout(()=>el.remove(),1300);
  },
  playTone(type){
    try{ const C=window.AudioContext||window.webkitAudioContext; if(!C)return; const ctx=new C(); const osc=ctx.createOscillator(); const gain=ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.value=type==='correct'?720:type==='pickup'?520:880; osc.type='sine'; gain.gain.setValueAtTime(.08,ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.18); osc.start(); osc.stop(ctx.currentTime+.2); }catch(e){}
  },
  escapeHtml(s){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
};

window.addEventListener('keydown',e=>{
  const tag=document.activeElement&&document.activeElement.tagName; if(['INPUT','SELECT','TEXTAREA','BUTTON'].includes(tag))return;
  if(!Game.state || !['restaurant','home'].includes(Game.activeScreen))return;
  const k=e.key.toLowerCase();
  if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d',' '].includes(k)) e.preventDefault();
  if(Game.activeScreen==='home'){
    if(k==='arrowup'||k==='w')Game.moveHomeAvatar(0,-5);
    if(k==='arrowdown'||k==='s')Game.moveHomeAvatar(0,5);
    if(k==='arrowleft'||k==='a')Game.moveHomeAvatar(-5,0);
    if(k==='arrowright'||k==='d')Game.moveHomeAvatar(5,0);
    if(k===' ')Game.homeCelebrate();
    return;
  }
  if(k===' '){Game.actionKey();return;}
  if(k==='arrowup'||k==='w')Game.movePlayer(0,-3);
  if(k==='arrowdown'||k==='s')Game.movePlayer(0,3);
  if(k==='arrowleft'||k==='a')Game.movePlayer(-3,0);
  if(k==='arrowright'||k==='d')Game.movePlayer(3,0);
});

document.querySelectorAll('[data-move]').forEach(b=>{
  const dir=b.dataset.move; const act=()=>{ if(dir==='up')Game.movePlayer(0,-3); if(dir==='left')Game.movePlayer(-3,0); if(dir==='right')Game.movePlayer(3,0); if(dir==='down')Game.movePlayer(0,3); };
  b.addEventListener('click',act); b.addEventListener('touchstart',e=>{e.preventDefault();act();});
});

window.addEventListener('DOMContentLoaded',()=>Game.refreshTitleScreen());
