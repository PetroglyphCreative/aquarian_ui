import _ from 'lodash';
import img from './assets/img/sometimes_800.jpg';
import tw_logo from './assets/img/tw-logo-white.svg';
import Vue from 'vue/dist/vue.js';


function component() {
  //const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  //element.innerHTML = _.join(['I am a JS ', 'insertion'], ' ');

  //return element;
}
//document.getElementsByTagName('footer')[0].appendChild(component());
function menuToggle(x) {
  x.classList.toggle("change");
  var y=document.getElementById('siteMenu');
 if(! y.style.display){y.style.display = "block";}
 else if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none"; console.log(y.style.display);
  }
}

document.getElementById("mobileMenuToggle").addEventListener("click", function(){
  menuToggle(this)
});
function toggleCollapsing(e){
  
  const trigger = e.target.tagName == 'button' ? e.target : e.target.closest('button');
  console.log(trigger.getAttribute('aria-controls'));
  // must be sure we're targetting the button 
  let whichId = trigger.getAttribute('aria-controls');
  let classes = trigger.querySelector('svg').classList;
  let which = document.getElementById(whichId);
  classes.toggle("rotate-0");
  classes.toggle('-rotate-180');
  console.log(which);
  which.classList.toggle('h-0');
  // open the hidden content
  console.log(typeof trigger.getAttribute('aria-expanded'));
  console.log(trigger.getAttribute('aria-expanded'));
  if (trigger.getAttribute('aria-expanded')==='true'){
    trigger.setAttribute("aria-expanded", 'false');
  } else {
    trigger.setAttribute("aria-expanded", 'true');
  }
 
  //change the aria-expanded

}
let collapsing = document.getElementsByClassName("collapsing");	

 if (collapsing.length > 0){
  let elements1 = document.querySelectorAll(`[id^="faq"]`);
 
  for (let elem of elements1) {
    elem.classList.add('h-0');
  }
  
  var collapseBtns = document.querySelectorAll('button[aria-expanded="false"]')
  for(var i = 0; i < collapseBtns.length; i++) {

    collapseBtns[i].addEventListener("click", toggleCollapsing);
}
 }
