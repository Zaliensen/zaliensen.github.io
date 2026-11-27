/* Reviewed source-derived helpers plus a new memory-only demo model.
 * The original runtime, media, rosters, goals and persistence are excluded.
 * See PROVENANCE.md for exact retained/adapted functions and limitations. */
(function(root){'use strict';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z']/g,'');
function firstLetter(w){return norm(w).charAt(0)||'a'}
function shuffled(a,seed=0){const x=a.slice();for(let i=x.length-1;i>0;i--){const j=(seed*17+i*13+7)%(i+1);[x[i],x[j]]=[x[j],x[i]]}return x}
function habitatChoices(t,state){
 // Adapted from makeQuestion's support field sizes and shuffled helper.
 const wanted=t.kind==='build'?t.word[state.wordStep]:t.answer;
 const pool=t.kind==='build'?'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''):t.choices;
 const count=state.level===1?2:state.level===2?3:4;
 const options=[wanted,...pool.filter(x=>x!==wanted).slice(0,count-1)];
 return shuffled(options,state.taskIdx+state.wordStep);
}
function validateTask(t){
 if(!t || !['choice','build'].includes(t.kind)) throw Error('Unknown task kind');
 if(t.kind==='build' && !/^[A-Z]{1,12}$/.test(t.word)) throw Error('Invalid demo word');
 if(t.kind==='choice' && (!Array.isArray(t.choices) || !t.choices.includes(t.answer) || new Set(t.choices).size!==t.choices.length)) throw Error('Invalid choices');
}
function choices(t, state){
 validateTask(t);
 if(![1,2,3].includes(state.level)) throw Error('Support level must be 1, 2 or 3');
 if(t.kind==='build' && (!Number.isInteger(state.wordStep)||state.wordStep<0||state.wordStep>=t.word.length)) throw Error('Invalid word position');
 return habitatChoices(t,state);
}
function begin(){return {wordStep:0,attempts:0,helpUsed:false,complete:false};}
function respond(t,progress,value,modeled=false){
 validateTask(t);
 if(progress.complete) return {accepted:false,correct:null};
 if(typeof value!=='string') return {accepted:false,correct:null};
 const wanted=t.kind==='build'?t.word[progress.wordStep]:t.answer;
 progress.attempts++; progress.helpUsed=progress.helpUsed||modeled;
 const correct=value===wanted;
 if(correct && t.kind==='build') progress.wordStep++;
 progress.complete=correct&&(t.kind!=='build'||progress.wordStep===t.word.length);
 return {accepted:true,correct,complete:progress.complete};
}
const api={choices,begin,respond,validateTask,escapeHtml:esc};
if(typeof module==='object'&&module.exports) module.exports=api;
else root.LessonCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
