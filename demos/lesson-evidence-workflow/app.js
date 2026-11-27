"use strict";
const $=id=>document.getElementById(id),E=globalThis.LessonEvidence;
const base={phase:'initial_check',status:'completed',initial:'correct',eventual:'correct',support:'none',timing:'before_initial',verified:false,automatic:false,printed:false,peer:false,'choice-count':'2'};
const presets=[
 ['Missing confirmation',{}],
 ['AAC access only',{verified:true,support:'aac'}],
 ['Prompted success',{verified:true,support:'answer_model'}],
 ['Correct after retry',{verified:true,initial:'incorrect',support:'answer_model',timing:'after_initial'}],
 ['Interrupted',{verified:true,status:'interrupted',initial:'unknown',eventual:'unfinished'}],
 ['Teaching practice',{verified:true,phase:'teaching'}]
];
function trial(){return {measurementVersion:E.MEASURE,measureRole:$('phase').value==='teaching'?'practice':'probe',phase:$('phase').value,status:$('status').value,initialOutcome:$('initial').value,eventualOutcome:$('eventual').value,promptVerified:$('verified').checked,adultPrompts:$('support').value==='none'?[]:[{code:$('support').value,when:$('timing').value}],automaticHelp:$('automatic').checked?[{code:'answer_highlight',when:'before_initial'}]:[],taskConditions:{printedModel:$('printed').checked},peerExposed:$('peer').checked};}
function conditions(count){return {level:1,wording:'Which symbol is a circle?',choiceCount:count,responseMethod:'tap_choice',permittedSupports:['aac'],modelProvided:false,pictureSupport:false,spokenChoices:false,wordBankProvided:false,responseWindowSeconds:15,accessMode:'touch_or_aac',supportMode:'standard'};}
function render(){const t=trial(),result=E.classifyScenario(t);$('result-title').textContent=result.label;$('reason').textContent=result.reason;document.querySelector('.result').dataset.code=result.code;const labels={correct:'Correct',incorrect:'Incorrect',no_response:'No response',unknown:'Not recorded',unfinished:'Not completed'};$('first-output').textContent=labels[t.initialOutcome];$('eventual-output').textContent=labels[t.eventualOutcome];$('condition-result').textContent=E.compareConditions(conditions(2),conditions(Number($('choice-count').value)))?'Recorded conditions match.':'Recorded conditions changed. Keep the comparison separate.';}
function choosePreset(index){const values={...base,...presets[index][1]};for(const [id,value] of Object.entries(values)){if(typeof value==='boolean')$(id).checked=value;else $(id).value=value;}document.querySelectorAll('#presets button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));render();}
presets.forEach(([label],i)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>choosePreset(i));$('presets').append(b);});
document.querySelectorAll('select,input').forEach(el=>el.addEventListener('change',()=>{document.querySelectorAll('#presets button').forEach(b=>b.setAttribute('aria-pressed','false'));render();}));
choosePreset(0);
