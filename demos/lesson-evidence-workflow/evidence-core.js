/* Selected recovered logic plus a documented new adapter. See PROVENANCE.json. */
(function(global){
"use strict";
const MEASURE='literacy_common_v2';

const valid=new Set(['completed','no_response','interrupted','technical_failure']);

const firstOutcome=t=>t.initialOutcome|| (t.firstCorrect===true?'correct':t.firstCorrect===false?(t.status==='no_response'?'no_response':'incorrect'):'unknown');

function promptEvents(t){return Array.isArray(t.adultPrompts)?t.adultPrompts:[];}

function assistanceBeforeInitial(t){return promptEvents(t).some(x=>(x.when==='before_initial'||x.when==='during_initial')&&!['aac','activation_assist','neutral_repeat','general_access'].includes(x.code));}

function answerHelpBeforeInitial(t){return (t.automaticHelp||[]).some(x=>(x.when==='before_initial'||x.when==='during_initial')&&['answer_highlight','remove_distractor','answer_model','guided_answer'].includes(x.code));}

function independence(t){
 // Old records have no verified confirmation. Never infer independence from old teacherPrompt I.
 if(t.measurementVersion!==MEASURE||t.promptVerified!==true||t.measureRole==='practice'||t.phase==='teaching')return null;
 if(firstOutcome(t)!=='correct')return false;
 if(t.taskConditions?.printedModel)return false;
 if(assistanceBeforeInitial(t)||answerHelpBeforeInitial(t)||t.peerExposed)return false;
 return true;
}

function eligible(t){return t.measurementVersion===MEASURE && t.measureRole!=='practice' && t.phase!=='teaching' && t.status==='completed' && !t.exclusionReason && ['correct','incorrect','no_response'].includes(firstOutcome(t)) && valid.has(t.status);}

const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;return h.toString(36);};

function conditionSignature(c){return hash(JSON.stringify({level:c.level,wording:c.wording,choiceCount:c.choiceCount,responseMethod:c.responseMethod,permittedSupports:c.permittedSupports,modelProvided:c.modelProvided,pictureSupport:c.pictureSupport,spokenChoices:c.spokenChoices,wordBankProvided:c.wordBankProvided,responseWindowSeconds:c.responseWindowSeconds,accessMode:c.accessMode,supportMode:c.supportMode}));}

// NEW portfolio adapter: reject incomplete/unknown synthetic scenarios before
// calling the recovered classifiers. No storage, input file or external client.
function classifyScenario(t){
 if(t.measureRole==='practice'||t.phase==='teaching')return {code:'excluded',label:'Practice only',reason:'Teaching and practice are separate from a fresh initial check.'};
 if(t.status!=='completed'||t.exclusionReason)return {code:'excluded',label:'Excluded from comparison',reason:'An interrupted or excluded trial does not become an incorrect answer.'};
 if(t.measurementVersion!==MEASURE)return {code:'unknown',label:'Not established',reason:'A legacy record does not establish the current evidence requirements.'};
 if(!['correct','incorrect','no_response'].includes(firstOutcome(t)))return {code:'unknown',label:'Not established',reason:'The initial outcome is missing. A later success cannot fill that gap.'};
 if(t.promptVerified!==true)return {code:'unknown',label:'Not established',reason:'Explicit adult confirmation of the support record is still missing.'};
 const known=new Set(['aac','activation_assist','neutral_repeat','general_access','verbal_general','gesture_answer','answer_model','physical_answer']);
 if(promptEvents(t).some(p=>['before_initial','during_initial'].includes(p.when)&&!known.has(p.code)))return {code:'unknown',label:'Not established',reason:'An unrecognized support code needs review.'};
 if(!eligible(t))return {code:'excluded',label:'Excluded from comparison',reason:'The record does not meet the recovered eligibility rule.'};
 const result=independence(t);
 if(result===true)return {code:'verified',label:'Independent initial response supported',reason:'The first response was correct, the support record was confirmed, and no answer-supplying help or prior answer exposure was recorded.'};
 if(result===false)return {code:'supported',label:'Independent initial response not supported',reason:firstOutcome(t)!=='correct'?'The initial response was not correct. A successful retry remains a separate outcome.':'Answer-supplying help, a printed model or peer exposure preceded the initial response.'};
 return {code:'unknown',label:'Not established',reason:'The recovered classifier could not establish independence.'};
}
function compareConditions(first,current){return conditionSignature(first)===conditionSignature(current);}
const api={MEASURE,promptEvents,assistanceBeforeInitial,answerHelpBeforeInitial,independence,eligible,conditionSignature,classifyScenario,compareConditions};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
else global.LessonEvidence=api;

})(globalThis);
