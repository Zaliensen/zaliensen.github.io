'use strict';
const L=window.ChickenLearning;
const byId=id=>document.getElementById(id);
let state=L.create();
let finished=false;
const artParts={
 egg:'<ellipse cx="50" cy="43" rx="22" ry="29" fill="#fff1c6" stroke="#705330" stroke-width="3"/>',
 hen:'<ellipse cx="45" cy="48" rx="29" ry="22" fill="#e9ba72"/><circle cx="67" cy="27" r="17" fill="#e9ba72"/><path d="M76 24l17 5-15 8" fill="#c57815"/><path d="M56 13q0-15 9-5q7-13 11 5" fill="#b14427"/><circle cx="71" cy="25" r="3" fill="#213b35"/><path d="M34 66v10m20-10v10" stroke="#80552c" stroke-width="4"/>',
 chick:'<ellipse cx="44" cy="49" rx="25" ry="20" fill="#f2d15f"/><circle cx="64" cy="32" r="16" fill="#f2d15f"/><path d="M77 32l13 5-14 6" fill="#c57815"/><circle cx="69" cy="29" r="3" fill="#213b35"/><path d="M36 66v9m18-10v10" stroke="#80552c" stroke-width="3"/>',
 nest:'<path d="M12 47q38 43 76 0q-38 15-76 0" fill="#bd854e" stroke="#705330" stroke-width="3"/><path d="M17 44l60 20M26 59l52-18M20 50l67 5" stroke="#725033" stroke-width="3"/>',
 warmth:'<circle cx="50" cy="42" r="20" fill="#efbe4b" stroke="#896118" stroke-width="3"/><path d="M50 8v9m0 50v9M15 42h9m52 0h9M25 17l6 7m38 37 6 7m0-51-6 7M31 61l-6 7" stroke="#99631c" stroke-width="4"/>',
 water:'<path d="M50 9q-29 35-24 48q7 27 25 21q30-4 25-25q-3-17-26-44" fill="#8bb9c8" stroke="#365f6e" stroke-width="3"/>',
 food:'<ellipse cx="30" cy="49" rx="10" ry="6" fill="#b18b43"/><ellipse cx="55" cy="40" rx="11" ry="6" fill="#d2a64a"/><ellipse cx="70" cy="58" rx="10" ry="7" fill="#a9833b"/><path d="M15 64h72" stroke="#745c35" stroke-width="3"/>',
 hatch:'<path d="M27 38q-3-30 23-30t23 30l-13-7-10 10-12-9z" fill="#fff1c6" stroke="#705330" stroke-width="3"/><path d="M27 53l11 6 12-10 12 10 11-6q2 26-23 26T27 53" fill="#fff1c6" stroke="#705330" stroke-width="3"/>',
 rest:'<path d="M15 61h70" stroke="#5c7454" stroke-width="4"/><path d="M24 56q26-36 52 0" fill="#edce67"/><text x="62" y="28" font-size="22" fill="#4e6650">z</text>',
 walk:'<path d="M28 17l17 22-13 27m13-27 18 24 17 0" fill="none" stroke="#5a7452" stroke-width="8" stroke-linecap="round"/><circle cx="28" cy="11" r="8" fill="#d6aa57"/>',
 grow:'<path d="M25 72V46h13v26m9 0V29h13v43m9 0V12h13v60" fill="#77925b"/><path d="M18 32l54-25m-14-2 16 1-2 15" fill="none" stroke="#5c7346" stroke-width="3"/>'
};
function art(word){const k=word==='sit'?'hen':word==='eat'?'food':word;return '<svg viewBox="0 0 100 85" aria-hidden="true" focusable="false">'+(artParts[k]||'<circle cx="50" cy="42" r="25" fill="#dce5d0"/><path d="M38 42h24" stroke="#5a7452" stroke-width="3"/>')+'</svg>';}
function makeButton(text,onClick,cls){const b=document.createElement('button');b.type='button';b.textContent=text;if(cls)b.className=cls;b.addEventListener('click',onClick);return b;}
function change(stage,family=state.family,level=state.level){state=L.create(stage,family,level);finished=false;byId('clueText').hidden=true;byId('clue').setAttribute('aria-expanded','false');render();}
function focusTitle(){byId('activityTitle').focus();}
function renderStory(){
 const p=L.stages[state.stage];byId('stageCount').textContent='Stage '+(state.stage+1)+' of 8';byId('stageTitle').textContent=p.title;byId('storyText').textContent=p.text;byId('stageArt').innerHTML=art(p.pieces[p.pieces.length-1]);
 byId('stages').replaceChildren(...L.stages.map((s,i)=>{const b=makeButton((i+1)+'. '+s.title,()=>{change(i);byId('stageTitle').focus();});if(i===state.stage)b.setAttribute('aria-current','step');return b;}));
 byId('vocabulary').replaceChildren(...[...new Set([p.word,...p.pairs])].map(w=>makeButton(w,()=>{byId('definition').textContent=w+': '+(L.definitions[w]||'Find this word in the lesson.');})));
 byId('definition').textContent='Choose a word to see its meaning.';
}
function renderFeedback(){
 let message=state.level===1?'Explore the activity with one tap at a time. This is participation, not an accuracy score.':'Choose an answer. You can use a clue and try again.';
 if(state.last==='selected')message='Choice selected. Use the highlighted place to confirm it.';
 else if(state.last==='retry')message=state.family==='word'?'Look at the word model and try the next letter.':'Look again. The clue can help you try another choice.';
 else if(state.last==='correct')message='That fits. Continue with the next part.';
 else if(state.complete)message=state.level===1?'Participation complete. Choose Next activity when ready.':'Activity complete. Choose Next activity when ready.';
 if(finished)message='You reached the end of this learning path. You can revisit a stage or restart.';
 byId('feedback').textContent=message;byId('feedback').classList.toggle('retry',state.last==='retry');
}
function respond(value){const result=L.choose(state,value);renderActivity();restoreInteractionFocus(result);}
function restoreInteractionFocus(result){
 if(state.complete){byId('next').focus();return;}
 if(result.needsPlacement){byId('placements').querySelector('button')?.focus();return;}
 byId('choices').querySelector('button')?.focus();
}
function renderActivity(){
 const p=L.stages[state.stage],target=L.target(state);byId('family').value=state.family;byId('level').value=String(state.level);
 byId('participation').textContent=state.level===1?'One tap · participation only':state.level+' response choices · practice with retries';
 const titles={find:p.question,match:'Match the word: '+(target||'complete'),build:'Build the scene, one part at a time',word:'Build the word: '+p.word,sequence:'Put the stages in order',checkpoint:p.sentence};
 byId('activityTitle').textContent=titles[state.family];
 const instructions={find:'Choose the answer to the question.',match:'Choose the card with the matching word.',build:'Choose the requested card, then confirm it in the highlighted place.',word:'Choose each letter in order. Use the model when you need it.',sequence:'Choose what comes next, then confirm it in the highlighted place.',checkpoint:'Choose the word that completes the sentence.'};
 byId('direction').textContent=instructions[state.family];
 byId('model').replaceChildren();byId('placements').replaceChildren();
 if(state.family==='word'){
   const model=document.createElement('p');model.className='model';model.textContent=state.level<3||state.showModel?'Word model: '+p.word:'Three choices: use Show a clue to reveal the word model.';
   // The prompt names the word; the optional model additionally separates its letters.
   if(state.showModel)model.textContent='Word model: '+[...p.word].join(' · ');
   const slots=document.createElement('div');slots.className='word-slots';slots.setAttribute('aria-label','Letters placed: '+(state.placed.join(' ')||'none'));slots.textContent=[...p.word].map((c,i)=>i<state.index?c:'_').join(' ');byId('model').append(model,slots);
 }
 if(['build','sequence'].includes(state.family)){
   L.targets(state).forEach((word,i)=>{
     const active=i===state.index&&!state.complete;
     const slot=active?makeButton('',()=>{const r=L.place(state);renderActivity();restoreInteractionFocus(r);},'slot active'):document.createElement('div');
     if(!active)slot.className='slot'+(i<state.index?' filled':'');
     const pos=document.createElement('small');pos.textContent='Place '+(i+1);const label=document.createElement('strong');label.textContent=i<state.index?state.placed[i]:active?(state.family==='build'?'Add '+word:'Confirm next'):'Waiting';
     slot.append(pos,label);if(active)slot.disabled=state.selected===null;byId('placements').append(slot);
   });
 }
 const choices=L.options(state);byId('choices').className='choices count-'+state.level;
 byId('choices').replaceChildren(...choices.map(value=>{
   const b=makeButton('',()=>respond(value),'choice'+(state.selected===value?' selected':''));
   b.setAttribute('aria-label',state.family==='word'?'Letter '+value:value);
   b.setAttribute('aria-pressed',String(state.selected===value));
   if(state.family==='word'){const span=document.createElement('span');span.className='letter';span.textContent=value;b.append(span);}else{b.innerHTML=art(value);const label=document.createElement('span');label.textContent=value;b.append(label);}return b;
 }));
 byId('next').disabled=!state.complete||finished;
 byId('next').textContent=state.family==='checkpoint'?(state.stage===7?'Finish learning path':'Next stage'):'Next activity';
 byId('clueText').textContent=state.family==='word'?'Build '+[...p.word].join(' · ')+'.':p.text+(state.family==='sequence'?' Order: '+p.order.join(' → ')+'.':'');
 renderFeedback();
}
function render(){renderStory();renderActivity();}
byId('family').replaceChildren(...L.families.map(f=>{const o=document.createElement('option');o.value=f.id;o.textContent=f.label;return o;}));
byId('family').addEventListener('change',e=>{change(state.stage,e.target.value);focusTitle();});
byId('level').addEventListener('change',e=>{change(state.stage,state.family,Number(e.target.value));focusTitle();});
byId('restart').addEventListener('click',()=>{change(0,'find',2);byId('stageTitle').focus();});
byId('clue').addEventListener('click',()=>{const show=byId('clueText').hidden;byId('clueText').hidden=!show;byId('clue').setAttribute('aria-expanded',String(show));state.showModel=show;renderActivity();});
byId('next').addEventListener('click',()=>{if(!state.complete)return;const i=L.families.findIndex(f=>f.id===state.family);if(i<5)change(state.stage,L.families[i+1].id);else if(state.stage<7)change(state.stage+1,'find');else{finished=true;renderActivity();}focusTitle();});
render();
