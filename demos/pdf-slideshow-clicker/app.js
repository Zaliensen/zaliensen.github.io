"use strict";
const $=id=>document.getElementById(id);
const slides=[
 {symbol:"◒",title:"A moment to notice",text:"Look around. What is one thing you can see?"},
 {symbol:"≈",title:"A moment to choose",text:"Would you like to build, explore, or take a break?"},
 {symbol:"◇",title:"A moment to respond",text:"Point, speak, use AAC, or ask a partner to select."},
 {symbol:"✿",title:"A moment to finish",text:"Thank you for taking part. Stay here as long as you need."}
];
let pdf=null,mode='demo',page=1,total=slides.length,busy=false,generation=0,advances=0;
let audio=null,audioURL=null,videoURL=null,pdfjs=null;
const LIMIT=100*1024*1024;
function tell(text){$('status').textContent=text;}
function buttons(){for(const id of ['next','previous','stage'])$(id).setAttribute('aria-busy',String(busy));$('next').disabled=busy||page>=total;$('previous').disabled=busy||page<=1;$('pdf-start').disabled=busy||!$('pdf-file').files.length;$('demo-start').disabled=busy;}
function cleanMedia(){if(audio){audio.pause();audio=null;}if(audioURL)URL.revokeObjectURL(audioURL);audioURL=null;$('video').pause();$('video').removeAttribute('src');$('video').load();if(videoURL)URL.revokeObjectURL(videoURL);videoURL=null;}
function prepareMedia(){cleanMedia();const sound=$('audio-file').files[0],video=$('video-file').files[0];if(sound){if(sound.size>LIMIT)throw new Error('The sound file exceeds the 100 MB demo limit.');audioURL=URL.createObjectURL(sound);audio=new Audio(audioURL);}if(video){if(video.size>LIMIT)throw new Error('The video exceeds the 100 MB demo limit.');videoURL=URL.createObjectURL(video);$('video').src=videoURL;}}
async function draw(token){
 if(mode==='demo'){$('pdf-canvas').hidden=true;$('transcript').hidden=true;$('synthetic').hidden=false;const item=slides[page-1];const icon=document.createElement('div');icon.className='slide-symbol';icon.textContent=item.symbol;icon.setAttribute('aria-hidden','true');const title=document.createElement('h2');title.textContent=item.title;const text=document.createElement('p');text.textContent=item.text;$('synthetic').replaceChildren(icon,title,text);}
 else {const sourcePage=await pdf.getPage(page);if(token!==generation)return;const width=Math.max(250,Math.min(1000,$('stage').clientWidth-60));const basic=sourcePage.getViewport({scale:1});const scale=Math.min(2,width/basic.width);const viewport=sourcePage.getViewport({scale});const canvas=$('pdf-canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);$('synthetic').hidden=true;canvas.hidden=false;await sourcePage.render({canvasContext:canvas.getContext('2d'),viewport}).promise;if(token!==generation)return;const content=await sourcePage.getTextContent();if(token!==generation)return;$('page-text').textContent=content.items.map(item=>item.str||'').join(' ')||'No extractable text on this page. An image-only PDF needs an accessible alternative.';$('transcript').hidden=false;sourcePage.cleanup();}
 if(token!==generation)return;$('page-label').textContent=`Page ${page} of ${total}`;$('stage').setAttribute('aria-label',`Page ${page} of ${total}. Space or Right for next; Left for previous.`);tell(page===total?'Last page. Stay here, go back, or return to setup.':`Page ${page} of ${total}. Continue when ready.`);
}
async function start(requested){
 if(busy)return;busy=true;buttons();const token=++generation;
 try {prepareMedia();mode=requested;page=1;advances=0;
 if(mode==='pdf'){const file=$('pdf-file').files[0];if(!file)throw new Error('Choose a PDF first.');if(file.size>LIMIT)throw new Error('The PDF exceeds the 100 MB demo limit.');if(location.protocol==='file:')throw new Error('Local PDF mode needs the localhost server described above. Synthetic slides work directly.');tell('Opening the local PDF…');pdfjs=pdfjs||await import('./vendor/pdf.min.js');pdfjs.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdf.worker.min.js',location.href).href;pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false}).promise;total=pdf.numPages;}else total=slides.length;
 document.body.classList.add('presenting');$('setup').hidden=true;$('reader').hidden=false;$('media').hidden=true;await draw(token);if(token===generation)$('stage').focus();
 }catch(error){tell(`Could not start: ${error.message}`);document.body.classList.remove('presenting');$('setup').hidden=false;$('reader').hidden=true;cleanMedia();if(pdf){await pdf.destroy();pdf=null;}}
 finally{busy=false;buttons();}
}
async function move(delta){
 if(busy||$('reader').hidden||!$('media').hidden)return;const target=page+delta;if(target<1||target>total)return;busy=true;buttons();const token=generation,old=page;page=target;
 try{await draw(token);if(token!==generation)return;
 if(delta>0){advances++;$('acknowledgement').textContent=$('reward').checked?'Response acknowledged.':'';if(audio){audio.currentTime=0;audio.play().catch(()=>tell('Sound could not play. Slide navigation remains available.'));}const every=Math.max(1,Math.min(100,Number($('every').value)||3));if(videoURL&&advances%every===0){$('reader').hidden=true;$('media').hidden=false;$('media-title').focus();$('video').play().catch(()=>tell('Press Play to start the video, or skip to return to slides.'));}}
 }catch(error){page=old;tell(`Could not render this page: ${error.message}. Try another page or return to setup.`);}
 finally{busy=false;buttons();}
}
function resume(){if($('media').hidden)return;$('video').pause();$('media').hidden=true;$('reader').hidden=false;$('stage').focus();tell(`Returned to page ${page} of ${total}.`);}
async function exit(){if(busy)return;++generation;cleanMedia();if(pdf){await pdf.destroy();pdf=null;}document.body.classList.remove('presenting');$('reader').hidden=true;$('media').hidden=true;$('setup').hidden=false;$('acknowledgement').textContent='';if(document.fullscreenElement)await document.exitFullscreen();$('demo-start').focus();tell('Back to setup. No learner responses were saved.');}
$('pdf-file').onchange=buttons;$('demo-start').onclick=()=>start('demo');$('pdf-start').onclick=()=>start('pdf');$('next').onclick=()=>move(1);$('previous').onclick=()=>move(-1);$('exit').onclick=exit;
$('stage').onclick=()=>move(1);$('stage').onkeydown=e=>{if(e.target!==$('stage'))return;if(['ArrowRight','Enter',' '].includes(e.key)){e.preventDefault();move(1);}else if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}};
$('skip').onclick=resume;$('video').onended=resume;$('video').onerror=()=>tell('The video format could not be played. Use Skip to continue.');
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('reader').requestFullscreen();}catch{tell('Full screen is unavailable. The slideshow still works in this window.');}};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('setup').hidden)return;if(e.key==='Escape'){e.preventDefault();exit();}});
window.addEventListener('beforeunload',cleanMedia);buttons();
