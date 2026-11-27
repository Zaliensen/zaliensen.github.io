/* Public reconstruction: new lesson text and state logic; no recovered learner data or media. */
(function (root) {
  'use strict';
  const stages = [
    {title:'A nest for eggs', text:'A hen prepares a nest. A nest is a sheltered place for eggs.', question:'Where does the hen lay her eggs?', answer:'nest', distractors:['pond','tree'], pairs:['hen','nest'], pieces:['hen','nest'], word:'hen', sentence:'The hen prepares a ___.', sentenceAnswer:'nest', order:['hen','nest']},
    {title:'Eggs in the nest', text:'The hen lays eggs in the nest. A chick can develop inside a fertilized egg.', question:'What is in the nest?', answer:'egg', distractors:['leaf','stone'], pairs:['egg','nest'], pieces:['nest','egg'], word:'egg', sentence:'The hen lays an ___.', sentenceAnswer:'egg', order:['nest','egg']},
    {title:'Keeping eggs warm', text:'An incubating hen sits on her eggs to keep them warm while the chicks develop.', question:'What do developing chicks need?', answer:'warmth', distractors:['ice','snow'], pairs:['hen','egg'], pieces:['hen','egg','warmth'], word:'sit', sentence:'The eggs need ___.', sentenceAnswer:'warmth', order:['egg','warmth','hatch']},
    {title:'Hatching', text:'When it is ready, a chick breaks through the shell. This is called hatching.', question:'What comes out of the egg?', answer:'chick', distractors:['hen','nest'], pairs:['egg','chick'], pieces:['egg','hatch','chick'], word:'chick', sentence:'The egg hatches into a ___.', sentenceAnswer:'chick', order:['egg','hatch','chick']},
    {title:'Rest, then move', text:'A newly hatched chick rests and dries. It then begins to stand and walk.', question:'What can the chick do after resting?', answer:'walk', distractors:['fly','swim'], pairs:['rest','walk'], pieces:['chick','rest','walk'], word:'rest', sentence:'After resting, a chick can ___.', sentenceAnswer:'walk', order:['hatch','rest','walk']},
    {title:'Food and water', text:'Chicks need food and clean water. A hen can help chicks find food.', question:'What do chicks need to drink?', answer:'water', distractors:['sand','soil'], pairs:['food','water'], pieces:['chick','food','water'], word:'eat', sentence:'Chicks need food and ___.', sentenceAnswer:'water', order:['chick','food','grow']},
    {title:'Growing', text:'With care, food and water, chicks grow. Their feathers develop as they become adult chickens.', question:'What happens as chicks get older?', answer:'grow', distractors:['shrink','freeze'], pairs:['chick','hen'], pieces:['chick','grow','hen'], word:'grow', sentence:'Chicks get bigger as they ___.', sentenceAnswer:'grow', order:['chick','grow','hen']},
    {title:'The cycle continues', text:'An adult hen can lay eggs. The stages of the chicken life cycle begin again.', question:'What can an adult hen lay?', answer:'egg', distractors:['stone','leaf'], pairs:['egg','chick','hen'], pieces:['egg','chick','hen'], word:'hen', sentence:'A hen can lay an ___.', sentenceAnswer:'egg', order:['egg','chick','hen']}
  ];
  const families = [
    {id:'find',label:'Find the answer'}, {id:'match',label:'Match a word'},
    {id:'build',label:'Build a scene'}, {id:'word',label:'Build a word'},
    {id:'sequence',label:'Put it in order'}, {id:'checkpoint',label:'Finish a sentence'}
  ];
  const definitions = {hen:'An adult female chicken.',nest:'A sheltered place where eggs are laid.',egg:'A shell protects the developing chick inside a fertilized egg.',chick:'A young chicken.',warmth:'Heat that helps a developing chick stay warm.',hatch:'To come out of an egg.',rest:'To stop moving and recover energy.',walk:'To move using feet.',food:'Something an animal eats for energy.',water:'A liquid that living things need.',grow:'To become bigger and develop.',sit:'To rest with the body supported.',eat:'To take in food.'};
  const pool=['egg','chick','hen','nest','rest','walk','food','water','warmth','hatch','grow'];
  function rotate(values, seed) { const n=seed%values.length; return values.slice(n).concat(values.slice(0,n)); }
  function create(stage=0, family='find', level=2) {
    if(!Number.isInteger(stage)||stage<0||stage>=stages.length)throw new RangeError('Unknown stage');
    if(!families.some(f=>f.id===family))throw new RangeError('Unknown activity');
    if(![1,2,3].includes(level))throw new RangeError('Unknown choice count');
    return {stage,family,level,index:0,selected:null,complete:false,misses:0,placed:[],last:'',showModel:false};
  }
  function targets(s) {const p=stages[s.stage];return s.family==='match'?p.pairs:s.family==='build'?p.pieces:s.family==='word'?[...p.word]:s.family==='sequence'?p.order:[s.family==='checkpoint'?p.sentenceAnswer:p.answer];}
  function target(s){return targets(s)[s.index];}
  function options(s) {
    if(s.complete)return [];
    const p=stages[s.stage],t=target(s);
    const distractors=s.family==='word'?[...'aeihnstrcgkow']:s.family==='find'?p.distractors:pool;
    const candidates=[t,...new Set(distractors.filter(x=>x!==t))].slice(0,s.level);
    return rotate(candidates,s.stage+s.index+families.findIndex(f=>f.id===s.family)+1);
  }
  function choose(s,value) {
    if(s.complete)return {accepted:false,reason:'complete'};
    if(!options(s).includes(value))return {accepted:false,reason:'invalid-choice'};
    if(s.family==='build'||s.family==='sequence') {s.selected=value;s.last='selected';return {accepted:true,needsPlacement:true};}
    return submit(s,value);
  }
  function place(s) {
    if(s.complete||!['build','sequence'].includes(s.family)||s.selected===null)return {accepted:false,reason:'choose-first'};
    const v=s.selected;s.selected=null;return submit(s,v);
  }
  function submit(s,value) {
    if(value!==target(s)){s.misses++;s.last='retry';return {accepted:true,correct:false};}
    s.placed.push(value);s.index++;s.complete=s.index===targets(s).length;s.last=s.complete?'complete':'correct';
    return {accepted:true,correct:true,complete:s.complete,participation:s.level===1};
  }
  const api={stages,families,definitions,create,targets,target,options,choose,place};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.ChickenLearning=api;
})(typeof globalThis!=='undefined'?globalThis:this);
