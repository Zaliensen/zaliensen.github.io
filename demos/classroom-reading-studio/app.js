/* New neutral interface around the reviewed source-derived lesson model. */
'use strict';
const core=window.LessonCore, pages=window.LESSON_DATA.pages;
const $=id=>document.getElementById(id);
let state={page:0,taskIdx:0,level:2,progress:core.begin(),scan:-1,done:[],finished:false};
// Let a changed choice field settle before accepting another board tap.
let answerReadyAt=0;
function task(){return pages[state.page].tasks[state.taskIdx];}
function note(text){$('feedback').textContent=text;}
function recordCompletion(){if(state.progress.complete&&!state.progress.counted){state.done.push({helpUsed:state.progress.helpUsed,attempts:state.progress.attempts});state.progress.counted=true;}}
function word(word){const clean=word.replace(/[^a-z]/gi,'');$('wordInfo').textContent=clean?clean+' — letters: '+[...clean].join(' · '):'Select a printed word.';state.progress.helpUsed=true;}
function render(){
 const page=pages[state.page],t=task(),p=state.progress;
 $('pageTitle').textContent=page.title;$('context').textContent=page.context;
 $('sentence').replaceChildren();
 page.text.split(/(\s+)/).forEach(token=>{if(/^\s+$/.test(token)){$('sentence').append(document.createTextNode(token));return;}const b=document.createElement('button');b.className='word';b.textContent=token;b.onclick=()=>word(token);b.setAttribute('aria-label','Inspect word '+token);$('sentence').append(b);});
 $('skill').textContent=t.skill;$('prompt').textContent=t.prompt;
 $('progress').textContent=$('learner').value+' · Page '+(state.page+1)+' of '+pages.length+' · Activity '+(state.taskIdx+1)+' of '+page.tasks.length;
 $('slots').textContent=t.kind==='build'?[...t.word].map((c,i)=>i<p.wordStep?c:'_').join(' '):'';
 $('choices').replaceChildren();state.scan=-1;
 if(!p.complete){core.choices(t,{...state,wordStep:p.wordStep}).forEach(value=>{const b=document.createElement('button');b.type='button';b.textContent=value;b.dataset.value=value;b.onclick=()=>answer(value);b.onkeydown=e=>{if(e.key==='ArrowRight'){e.preventDefault();scan();}};$('choices').append(b);});}
 $('next').disabled=!p.complete||state.finished;$('model').disabled=p.complete;$('confirm').disabled=p.complete;$('scan').disabled=p.complete;$('select').disabled=p.complete;
 const total=state.done.length,supported=state.done.filter(x=>x.helpUsed).length;
 $('summary').textContent=total+' '+(total===1?'activity':'activities')+' completed in this practice session; '+supported+' with word inspection or model support.';
}
function answer(value,modeled=false){
 const now=performance.now();if(now<answerReadyAt)return;
 const result=core.respond(task(),state.progress,value,modeled);if(!result.accepted)return;
 answerReadyAt=now+300;
 recordCompletion();
 render();
 note(result.correct?(result.complete?'Activity complete. Continue when ready.':'That letter fits. Choose the next letter.'):'Try another choice. You can inspect the reading or ask for a model.');
 if(result.complete)$('next').focus({preventScroll:true});
 else {const buttons=[...$('choices').querySelectorAll('button')];(result.correct?buttons[0]:buttons.find(b=>b.dataset.value===value)||buttons[0])?.focus({preventScroll:true});}
}
function scan(){const bs=[...$('choices').querySelectorAll('button')];if(!bs.length)return;bs.forEach(b=>b.classList.remove('scanning'));state.scan=(state.scan+1)%bs.length;bs[state.scan].classList.add('scanning');bs[state.scan].focus();}
$('scan').onclick=scan;
$('select').onclick=()=>{const bs=[...$('choices').querySelectorAll('button')];if(bs.length){if(state.scan<0){scan();return;}answer(bs[state.scan].dataset.value);}};
$('model').onclick=()=>{state.progress.helpUsed=true;note(task().model+' Model support is recorded for this demo activity.');};
$('confirm').onclick=()=>{if(state.progress.complete)return;state.progress.helpUsed=true;const t=task();while(!state.progress.complete){core.respond(t,state.progress,t.kind==='build'?t.word[state.progress.wordStep]:t.answer,true);}recordCompletion();render();note('Completed with teacher support. This is not an independent response.');$('next').focus();};
$('next').onclick=()=>{
 if(!state.progress.complete||state.finished)return;
 if(state.taskIdx+1<pages[state.page].tasks.length)state.taskIdx++;
 else if(state.page+1<pages.length){state.page++;state.taskIdx=0;}
 else{state.finished=true;render();note('Demo complete. Reset clears every interaction in this tab.');return;}
 answerReadyAt=0;state.progress=core.begin();render();note('Choose an answer. You can ask for a model.');$('wordInfo').textContent='Select a word to inspect its letters.';$('prompt').focus();
};
$('level').onchange=()=>{state.level=Number($('level').value);render();note('Choice field changed; current activity progress was kept.');};
$('learner').onchange=()=>{answerReadyAt=0;state.progress=core.begin();state.finished=false;render();note('New fictional turn. Activity response state reset.');};
$('size').onclick=()=>{const large=document.body.classList.toggle('large');$('size').setAttribute('aria-pressed',String(large));};
$('reset').onclick=()=>{answerReadyAt=0;state={page:0,taskIdx:0,level:Number($('level').value),progress:core.begin(),scan:-1,done:[],finished:false};render();note('Demo reset. Nothing was stored.');$('wordInfo').textContent='Select a word to inspect its letters.';};
render();note('Choose an answer. Support controls are available.');
