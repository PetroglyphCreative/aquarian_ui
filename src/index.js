import _ from 'lodash';
import img from './assets/img/sometimes_800.jpg';
import tw_logo from './assets/img/tw-logo-white.svg';
import Vue from 'vue/dist/vue.js';
import axios from "axios";
//import VueAxios from 'vue-axios'

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

const apiUrl = '/';

const contactForm = new Vue({
  el: '#contactForm',
  data: {
    errors: [],
    fromName:  '',
    fromEmail:  '',
    message: '',
    sordid_squirrel_preferences:document.querySelector("input[name=sordid_squirrel_preferences]").value,
    CRAFT_CSRF_TOKEN: document.querySelector("input[name=CRAFT_CSRF_TOKEN]").value,
    action:'contact-form/send',
    responseMessage:null,
    responseIsError: false,
    hasResponse: false,
    errorclass : 'text-red-600',
    successclass: 'text-blue-600',
    successMessage: 'We appreciate your contact and will be with you shortly.'
    
  },
  methods:{
    checkForm: function (e) {
      e.preventDefault();
      let currentObj = this;
      this.errors = [];
	  //time to do the error checks
      if (this.fromName === '') {
        this.errors.push('Name is required.');
      } else if (this.fromEmail ===''){
	    this.errors.push('Please include your email');
	  } else if (!this.validEmail(this.fromEmail)) {
        this.errors.push('Valid email required.');
      } else if (this.message ==='') {
        this.errors.push('What? No message??');
      } else {
	  // Whew! We made it.
	  var formData = new FormData(document.getElementById('contactForm'));
	  axios.post(apiUrl, formData)
	  .then(function (response) {
	    currentObj.hasResponse= true;
	    currentObj.responseMessage =  currentObj.successMessage;
	    window.ga('send', {
            hitType: 'event',
            eventCategory: 'form',
            eventAction: 'contact-petroglyph',
            eventLabel: 'Submit contact form'
            });
	  })
	  .catch(function (error) {
	//	This will trigger if there's an error in the response OR in the .then() statement
		currentObj.hasResponse= true;
		currentObj.responseIsError= true;
		currentObj.responseMessage = 'An error has occurred. Refresh and try again?';
	  });
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validateSn: function (fieldValue) {
	  axios.get('/actions/snaptcha/field/validate-field-value?value='+fieldValue)
	  .then(function (response) {
		  console.log('Snaptcha - ok: ');
	    console.log(response);
	    return true;
	    
	  })
	  .catch(function (error) {
	    console.log('Snaptcha: '+error);
	    return false;
	  });
     
    }
  }
})

