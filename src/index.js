import _ from 'lodash';
import  { createApp } from 'vue/dist/vue.esm-bundler.js';
import img from './assets/img/sometimes_800.jpg';
import logo from './assets/img/just-sailboat.svg';
import tw_logo from './assets/img/tw-logo-white.svg';
//const { compile } = require('@vue/compiler-sfc');

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
  //console.log(trigger.getAttribute('aria-controls'));
  // must be sure we're targetting the button 
  let whichId = trigger.getAttribute('aria-controls');
  let classes = trigger.querySelector('svg').classList;
  let which = document.getElementById(whichId);
  classes.toggle("rotate-0");
  classes.toggle('-rotate-180');
  //console.log(which);
  which.classList.toggle('h-0');
  // open the hidden content

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
// MENU
var topNavigation = createApp({
  data() {
    return {
     locations: [],
     showModal: false,

      menu: {
        'title':null,
        'name':null,
        'header':null,
        'left':null,
        'right':null, 
        'footer':null,
        'width':0
      },
      display:{
        process: 'none',
        work: 'none',
        blog: 'none',
        about: 'none',
        contact: 'none',
      },
      hovering: false,
      showing: false,
      m_showing:  false,
      // 
      menu_tpo: 0,
      menu_lpos: 0,
      menu_cpos: 0,
      menudisplay:'none', //CSS switch from none to block for menu container
      mobile: window.innerWidth >767 ? false: true,
      
    }
  },
  methods: {
    hovermenu: function (event) { //hovering buttons - open or move the menu
      console.log('hover triggered');
      if (!this.mobile){
      this.hovering = true;
     // console.log("Hovering on "+ event.target.getAttribute('data-menu'));
     if (!this.mobile){
      if (this.showing ===false){
       //Show menu here
       this.openmenu(event); 
      } else {
        //Menu is open, just move it.
       this.movemenu(event);
      }
      }
      }
  },
  hoverboard: function(event ){
    this.hovering = true;
    this.showing = true;
  },
  resetmenu: function(){
    this.display.process= 'none';
    this.display.work='none';
    this.display.blog= 'none';
    this.display.about= 'none';
    this.display.contact= 'none';
  },
  openmenu: function (event) { //grabs which menu and opens it from closed
   //console.log('open menu');
    this.mobile = window.innerWidth >767 ? false: true;
    let targetmenu = event.target.getAttribute('data-menu');
    
    this.showing = true;
    if (this.mobile){
      //console.log('mobile' + this.mobile);
      this.menu.name = event.target.getAttribute('data-menu');
      
      if (this.menu.name ==='process'){this.display.process= 'block';console.log(this.menu.name);}
      if (this.menu.name ==='work'){this.display.work= 'block';}
      if (this.menu.name ==='blog'){this.display.blog= 'block';}
      if (this.menu.name ==='about'){this.display.about= 'block';}
      if (this.menu.name ==='contact'){this.display.contact= 'block';}
    } else {
      //console.log('desktop'+ window.innerWidth);
      
      this.propogatemenu(event);
     // console.log('propogated');
      this.menudisplay = 'block'; 
      this.menu_lpos = this.getposition(event.target);
     // console.log("open menu width:" + document.getElementById("menubox").offsetWidth);
      //console.log(this.showing);
    }

    //this.menu_lpos = this.getposition(event.target); //for some reason, correct event target comes back with wrong value
    
    
    //console.log(this.showing + '<--showing via openmenu');
  },
  getposition: function(elem){
    //console.log('position calc');
    //console.log(elem);
    let newmenu = elem.getAttribute('data-menu');
    //determine the center point of the menu
    let newmenu_cpos= 200 + elem.offsetLeft ; // center of the button half the width of the button plus its distance from the left side
    //console.log(newmenu_cpos);
   
    let width = document.getElementById("menubox").offsetWidth > 0 ? document.getElementById("menubox").offsetWidth : 500; //width of the menu itself
    //console.log('width var: '+ width);
    //console.log('ofsl: '+document.getElementById("menuroot").offsetLeft);
    let newmenu_lpos=  newmenu_cpos - (document.getElementById("menuroot").offsetLeft) - (width /2); //- (document.getElementById("menuroot").offsetWidth)
    newmenu_lpos= Math.sign(newmenu_lpos) < 0 ? 0 : newmenu_lpos;
    //console.log(document.getElementById("menubox").offsetWidth /2);
    //console.log(newmenu_lpos);
    //console.log('menu width: '+document.getElementById("menubox").offsetWidth);
    return newmenu_lpos;
  },
  movemenu: function(event)  { //grabs which menu and opens it from open on another menu
    // menu has to be open for this to work
    //console.log('moving');
    if (!this.mobile){
    if (this.showing === false){
      return;
    }
    this.resetmenu();
    let newmenu = event.target.getAttribute('data-menu');
      let rootelem = document.getElementById("menuroot");
      this.propogatemenu(event);
      
      this.menu_lpos = this.getposition(event.target);
      
      //console.log(this.showing+ '<--- showing via movemenu');
      }
   
  },
  togglemenu: function(event) { // Should exclusively fire for buttons.
    console.log('now toggling');
    //
    if(this.showing && this.menu.name !== event.target.getAttribute('data-menu')){ //menu should switch which is open
    //	this.resetmenu();
      //this.openmenu(event);
      window.console.log('first - do not match');
      this.resetmenu();

    } else {
     console.log('second');
    //window.console.log(this.showing);	
      this.showing = !this.showing;
     // console.log('showing:' + this.showing);
    }
    if (this.showing === true){
      //open menu
      this.openmenu(event);
    } else {
    console.log('closing');
        
      let delay = false;
      this.hidemenu(event, delay);
        
    }

  },

  propogatemenu: function(event){ // Let' put the menu together:
    console.log("Propogate menu" );
    this.resetmenu();
    this.menu.title = event.target.getAttribute('data-menutitle'); //title
    //this.menutitle= this.menu.title;
    this.menu.name = event.target.getAttribute('data-menu'); //namespace
    //console.log(this.menu.name);
    this.menu.left = document.querySelector('[data-nav="'+this.menu.name+'"][data-menu-place="left"]') ? document.querySelector('[data-nav="'+this.menu.name+'"][data-menu-place="left"]').innerHTML : null; // get left side of menu via namespace
    this.menu.right = document.querySelector('[data-nav="'+this.menu.name+'"][data-menu-place="right"]') ? document.querySelector('[data-nav="'+this.menu.name+'"][data-menu-place="right"]').innerHTML : null; // get right side of menu via namespace 
    //console.log(this.menuright);
    this.menu.header = document.querySelector('[data-nav="'+this.menu.name+'"][data-menu-place="header"]') ? document.querySelector('[data-nav="'+this.menu.name+'"][data-menu-place="header"]').innerHTML : null; // we may have a header - null if not
    this.menu.footer = document.querySelector('[data-nav="'+this.menu.name+'"][data-menu-place="footer"]') ? document.querySelector('[data-nav="'+this.menu.name+'"][data-menu-place="footer"]').innerHTML : null; // we may have a header - null if not
    this.menu.width = document.getElementById("menubox").innerHTML.offsetWidth;
    console.log("Propogate menu end" );
  },
  // FORMERLY USED FOR MOUSEOUT
  hideboard: function( event) {
    console.log('this one');
    if (!this.mobile){
      this.hidemenu(event);
    }
  },
  hidemenu: function (event, delay= false) { // when the hovering stops
    //console.log('delay -->' + delay);
   console.log('hide function');
    this.hovering= false;
    //console.log("out: "+ this.hovering); 
    if (delay===true){
      setTimeout(() => {  
        if (this.hovering === true){ 
          return;
        }
        if(this.showing && this.menu.name !== event.target.getAttribute('data-menu')){
          return;
        }
        //hide menu here.
        console.log('hiding in hide function');
        this.showing= false;
        this.menudisplay= 'none';
        this.resetmenu();
        //console.log('Delay: '+ delay+ 'now hidden')
      }, 1000);
    } else {
    //console.log('Delay: '+ delay+ 'without delay');
    this.showing= false;
    console.log('hiding in hide function 2');
    this.menudisplay= 'none';
    this.resetmenu();
    }
  },
  openMobileMenuContainer: function(x) {
    this.m_showing = this.m_showing === true ? false : true; //change the class
    }
    }
  }).mount('header#top');
  
  
  var modal = createApp({

    data(){
      return {
        showModal:false,
        fun:false
      }
    }
 
}).mount('#calloutModal');
  //Lazyload Images
document.addEventListener("DOMContentLoaded", function() {
	let lazyloadImages = document.querySelectorAll("img.lazyload");
	let lazyloadThrottleTimeout;

	function lazyload() {
	  if(lazyloadThrottleTimeout) {
		clearTimeout(lazyloadThrottleTimeout);
	  }
	  lazyloadThrottleTimeout = setTimeout(function() {
		let scrollTop = window.pageYOffset;
		lazyloadImages.forEach(function(img) {
		  if(img.offsetTop < (window.innerHeight + scrollTop)) {
			img.src = img.dataset.src;
			img.srcset = img.dataset.srcset;
      console.log(img.srcset);
			img.classList.remove('lazyload');
		  }
		});
		if(lazyloadImages.length == 0) {
		  document.removeEventListener("scroll", lazyload);
		  window.removeEventListener("resize", lazyload);
		  window.removeEventListener("orientationChange", lazyload);
		}
	  }, 5);
	}
	document.addEventListener("scroll", lazyload);
	window.addEventListener("resize", lazyload);
	window.addEventListener("orientationChange", lazyload);
	lazyload();
  });

  function removeHide(){
    var thisViewPort = window.innerWidth;;
    if(thisViewPort < 768) {
      document.querySelector('#swapOne').classList.remove('hideIt');
      document.querySelector('#swapOne').classList.add('block');
      document.querySelector('#swapTwo').classList.remove('hideIt');
      document.querySelector('#swapTwo').classList.add('block');
      document.querySelector('#swapThree').classList.remove('hideIt');
      document.querySelector('#swapThree').classList.add('block');
      document.querySelector('#swapFour').classList.remove('hideIt');
      document.querySelector('#swapFour').classList.add('block');
      document.querySelector('#swapFive').classList.remove('hideIt');
      document.querySelector('#swapFive').classList.add('block');
      document.querySelector('#swapSix').classList.remove('hideIt');
      document.querySelector('#swapSix').classList.add('block');
      document.querySelector('#swapSeven').classList.remove('hideIt');
      document.querySelector('#swapSeven').classList.add('block');
    }
  }
  removeHide();
