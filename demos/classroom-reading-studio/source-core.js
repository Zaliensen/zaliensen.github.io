/* Reviewed source-derived helpers plus a new memory-only demo model.
 * The original runtime, media, rosters, goals and persistence are excluded.
 * See PROVENANCE.md for exact retained/adapted functions and limitations. */
(function(root){'use strict';
function escapeHtml(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;')}
function getChoiceItems(t,state){if(t.kind==='build'){const needed=t.word[state.wordStep];const pool=['A','B','C','D','E','G','H','I','O','P','S','T','X','R','W'];let bad=pool.filter(x=>x!==needed&& !t.word.slice(0,state.wordStep).includes(x));const count=state.level===1?1:state.level===2?2:3;let items=[needed,...bad.slice((state.taskIdx+state.wordStep)%6,(state.taskIdx+state.wordStep)%6+count)];while(items.length<count+1)items.push(bad[items.length+2]);return items.sort((a,b)=>a.charCodeAt(0)-b.charCodeAt(0))}
 const items=t.choices.slice();if(state.level===1&&items.length>2){const wrong=items.filter(x=>x!==t.answer);return [t.answer,wrong[(state.taskIdx+state.page)%wrong.length]].sort((a,b)=>a.localeCompare(b))}return items.sort((a,b)=>a.localeCompare(b))}
function validateTask(t){
 if(!t || !['choice','build'].includes(t.kind)) throw Error('Unknown task kind');
 if(t.kind==='build' && !/^[A-Z]{1,12}$/.test(t.word)) throw Error('Invalid demo word');
 if(t.kind==='choice' && (!Array.isArray(t.choices) || !t.choices.includes(t.answer) || new Set(t.choices).size!==t.choices.length)) throw Error('Invalid choices');
}
function choices(t, state){
 validateTask(t);
 if(![1,2,3].includes(state.level)) throw Error('Support level must be 1, 2 or 3');
 if(t.kind==='build' && (!Number.isInteger(state.wordStep)||state.wordStep<0||state.wordStep>=t.word.length)) throw Error('Invalid word position');
 return getChoiceItems(t,state);
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
const api={choices,begin,respond,validateTask,escapeHtml:escapeHtml};
if(typeof module==='object'&&module.exports) module.exports=api;
else root.LessonCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
