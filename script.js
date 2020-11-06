const inputContainer=document.getElementById('input-container');
const countdownForm=document.getElementById('countdown-form');
const dateEL=document.getElementById('date-picker');

const countdownEl=document.getElementById('countdown');
const countdownElTitle=document.getElementById('countdown-title');
const countdownBtn=document.getElementById('countdown-button');
const timeElements=document.querySelectorAll('span');

const completeEl=document.getElementById('complete');
const completeElInfo=document.getElementById('complete-info');
const completeBtn=document.getElementById('complete-button');

let countdownTitle='';
let countdownDate='';
let countdownValue=Date;
let countdownActive;
let savedCountdown;

const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;
// set date min to input
const  today=new Date().toISOString().split('T')[0];
dateEL.setAttribute('min',today);

// updaateDom functiom

function updateDOM() {
  countdownActive=setInterval(()=>{
    const now=new Date().getTime();
    const distance=countdownValue-now;
    const days=Math.floor(distance/day);
    const hours=Math.floor((distance%day)/hour);
    const minutes=Math.floor((distance%hour)/minute);
    const seconds=Math.floor((distance%minute)/second);
    // hide inpout
    inputContainer.hidden=true;

    // if the countdown had ended, show complete
    if(distance<0){
      countdownEl.hidden=true;
      clearInterval(countdownActive);
      completeElInfo.textContent=`${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden=false;
    }else {
      // show the countdown
      // populate countdown
      countdownElTitle.textContent=`${countdownTitle}`;
      timeElements[0].textContent=`${days}`;
      timeElements[1].textContent=`${hours}`;
      timeElements[2].textContent=`${minutes}`;
      timeElements[3].textContent=`${seconds}`;
      completeEl.hidden=true;
      countdownEl.hidden=false;
    }



  },second);
}
// updateCountdown
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle=e.srcElement[0].value;
  countdownDate=e.srcElement[1].value;
  savedCountdown={
    title:countdownTitle,
    date:countdownDate,
  };
  localStorage.setItem('countdown',JSON.stringify(savedCountdown));

  // check for valid date
  if(countdownDate==='') alert('please Select a valid date ');
  else{
    // get number version of curent date update DOM
    countdownValue=new Date(countdownDate).getTime();
    updateDOM();
  }
}

// reset values
function reset() {
  // hide countdowns , show input
  countdownEl.hidden=true;
  completeEl.hidden=true;
  inputContainer.hidden=false;
  // stop the countdown
  clearInterval(countdownActive);
  // reset values
  countdownTitle='';
  countdownDate='';
  localStorage.removeItem('countdown');
}
// restore old data
function restorePerviousCountdown() {
  // get data
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden=true;
    savedCountdown=JSON.parse(localStorage.getItem('countdown'));
    countdownTitle=savedCountdown.title;
    countdownDate=savedCountdown.date;
    countdownValue= new Date(countdownDate).getTime();
    updateDOM();
  }
}
// event listener
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);
restorePerviousCountdown();
