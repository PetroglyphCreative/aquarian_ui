import _ from 'lodash';
import img from './assets/img/sometimes_800.jpg';
import tw_logo from './assets/img/tw-logo-white.svg';
import Vue from 'vue/dist/vue.js';
import axios from "axios";
import VueGtm from '@gtm-support/vue2-gtm';
import VueRouter from 'vue-router';
const router = new VueRouter();

Vue.use(VueGtm, {
  id: 'GTM-TJB28Q', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
  defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
  compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
  nonce: '2726c7f26c', // Will add `nonce` to the script tag
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
});


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
    location: window.location.pathname,
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
      this.$gtm.trackEvent({
        event: null, // Event type [default = 'interaction'] (Optional)
        category: "Contact",
        action: "Submit",
        label: "Form Submission: " + location,
        value: 0,
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

