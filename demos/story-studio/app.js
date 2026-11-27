"use strict";
const $ = id => document.getElementById(id);
const steps = [
 {prompt:"Who is in your story?", options:[["A curious fox","◆"],["A gentle robot","▣"],["A brave explorer","▲"],["A little bird","◒"]], fallback:"Someone curious"},
 {prompt:"Where does the story happen?", options:[["in a quiet garden","✿"],["beside a blue lake","≈"],["on a distant moon","☾"],["in a busy town","▥"]], fallback:"somewhere new"},
 {prompt:"What happens next?", options:[["finds a new friend","♡"],["builds a small shelter","⌂"],["shares a special gift","◇"],["solves a little mystery","?"]], fallback:"has an adventure"}
];
let step=0, selected=null, answers=[], scanIndex=0;
function tell(message){$('status').textContent=message;}
function render(focus=false){
 selected=null;scanIndex=0;$('continue').disabled=true;
 const done=step===steps.length;
 $('step').textContent=done?'Your story':`Choice ${step+1} of ${steps.length}`;
 $('prompt').textContent=done?'You made a story.':steps[step].prompt;
 $('choices').replaceChildren();$('result').hidden=!done;
 $('continue').hidden=done;$('help').hidden=done;$('pass').hidden=done;$('instruction').hidden=done;
 if(done){$('result').textContent=`${answers[0]} ${answers[1]} ${answers[2]}.`;tell('Your choices are ready to share. Nothing has been saved.');}
 else {steps[step].options.slice(0,Number($('choiceCount').value)).forEach(([text,symbol],i)=>{
 const button=document.createElement('button');button.type='button';button.className='choice';button.setAttribute('aria-pressed','false');button.dataset.index=i;
 const icon=document.createElement('span');icon.className='symbol';icon.setAttribute('aria-hidden','true');icon.textContent=symbol;
 const label=document.createElement('span');label.textContent=text;button.append(icon,label);button.addEventListener('click',()=>choose(i));$('choices').append(button);
 });tell('Take your time. Choose when you are ready.');updateScan();}
 if(focus)$('prompt').focus();
}
function choose(i){selected=steps[step].options[i][0];document.querySelectorAll('.choice').forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));$('continue').disabled=false;tell(`Selected: ${selected}. Confirm when ready, or choose again.`);}
function next(answer){answers.push(answer);step++;render(true);}
function updateScan(){const enabled=$('scanMode').checked;$('choices').tabIndex=enabled?0:-1;$('choices').setAttribute('aria-label',enabled?'Choices. Space moves; Enter selects.':'Story choices');document.querySelectorAll('.choice').forEach((b,i)=>b.classList.toggle('scan',enabled&&i===scanIndex));}
$('continue').addEventListener('click',()=>{if(selected)next(selected);});
$('pass').addEventListener('click',()=>next(steps[step].fallback));
$('help').addEventListener('click',()=>tell('Ask a partner to read the choices or select for you. You can also pass.'));
$('restart').addEventListener('click',()=>{step=0;answers=[];render(true);});
$('choiceCount').addEventListener('change',()=>render());
$('scanMode').addEventListener('change',updateScan);
$('choices').addEventListener('keydown',e=>{if(!$('scanMode').checked||e.target!==$('choices'))return;if(e.code==='Space'){e.preventDefault();scanIndex=(scanIndex+1)%$('choices').children.length;updateScan();}if(e.key==='Enter'){e.preventDefault();choose(scanIndex);}});
for(const id of ['large','contrast'])$(id).addEventListener('change',()=>document.documentElement.classList.toggle(id,$(id).checked));
render();
