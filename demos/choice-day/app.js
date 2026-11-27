"use strict";
const $=id=>document.getElementById(id);
let page=0,response=null,confirmed=false,counted=new Set();
function tell(text){$('status').textContent=text;}
function respond(value){response=value;confirmed=false;$('confirm').disabled=false;$('next').hidden=true;tell(`Response: ${value}. The teacher can confirm or offer another try.`);}
function render(focus=false){
 response=null;confirmed=false;counted=new Set();$('confirm').disabled=true;$('next').hidden=true;$('activity').replaceChildren();
 const done=page===2;for(const id of ['confirm','model','help','pass'])$(id).hidden=done;
 $('step').textContent=done?'Activity complete':`Activity ${page+1} of 2`;
 $('prompt').textContent=page===0?'What would you like to do?':page===1?'How many garden markers can you count?':'Thanks for taking part.';
 $('instruction').textContent=page===0?'Any choice is welcome. Choose, tell a partner, or pass.':page===1?'Select each marker once. A second press does not add another.':'Responses existed only on this page and were not saved.';
 if(page===0){const wrap=document.createElement('div');wrap.className='choices';const choices=$('support').value==='more'?['Make something','Explore outside']:['Make something','Explore outside','Something else'];choices.forEach(text=>{const b=document.createElement('button');b.className='choice';b.textContent=text;b.setAttribute('aria-pressed','false');b.onclick=()=>{wrap.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));respond(text);};wrap.append(b);});$('activity').append(wrap);}
 if(page===1){const row=document.createElement('div');row.className='count-row';for(let i=0;i<3;i++){const b=document.createElement('button');b.className='count-object';b.textContent='✿';b.setAttribute('aria-label',`Garden marker ${i+1}`);b.setAttribute('aria-pressed','false');b.onclick=()=>{if(counted.has(i)){tell(`That marker was already counted. Total: ${counted.size}.`);return;}counted.add(i);b.setAttribute('aria-pressed','true');$('count').textContent=`Counted: ${counted.size} of 3`;
 if($('support').value!=='challenge'&&counted.size===3)respond('3 markers');else tell(`Counted ${counted.size}. Keep going when ready.`);};row.append(b);}$('activity').append(row);const count=document.createElement('p');count.id='count';count.textContent='Counted: 0 of 3';$('activity').append(count);
 if($('support').value==='more'){const cue=document.createElement('p');cue.className='helper';cue.textContent='Point and count together: one, two, three.';$('activity').append(cue);}
 if($('support').value==='challenge'){const label=document.createElement('label');label.textContent='Your total ';const input=document.createElement('input');input.id='total';input.type='number';input.min='0';input.max='99';input.inputMode='numeric';label.append(input);$('activity').append(label);input.addEventListener('input',()=>{if(input.value===''){response=null;$('confirm').disabled=true;$('next').hidden=true;tell('Enter a total when ready.');}else respond(`${input.value} markers`);});}}
 tell(done?'You can restart with a different level of support.':'Take your time. No response is recorded.');if(focus)$('prompt').focus();
}
$('confirm').onclick=()=>{if(response===null)return;confirmed=true;$('confirm').disabled=true;$('next').hidden=false;$('next').textContent=page===0?'Next activity':'Finish activity';tell('Response acknowledged. Stay here until the teacher chooses to continue.');};
$('next').onclick=()=>{if(!confirmed)return;page++;render(true);};
$('model').onclick=()=>{tell(page===0?'Model only: an adult might point to “Make something.” This is not a learner response.':'Model only: point once to each marker and say “one, two, three.” This is not a learner response.');};
$('help').onclick=()=>tell('A partner can read, model, reduce the choices or select for you. You can pass.');
$('pass').onclick=()=>respond('Pass');
$('restart').onclick=()=>{page=0;render(true);};
$('support').onchange=()=>render();
for(const id of ['large','contrast'])$(id).onchange=()=>document.documentElement.classList.toggle(id,$(id).checked);
render();
