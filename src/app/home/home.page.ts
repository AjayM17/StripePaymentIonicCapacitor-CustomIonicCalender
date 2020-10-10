import { Component } from '@angular/core';
declare var Stripe;
 import { Stripe as Mobile } from '@ionic-native/stripe/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  stripe_web = Stripe('pk_test_NonjCsmAmGAz5YMOpkbMst1y');
  card: any;
  constructor(
    private stripe:Mobile
    
    ) {
      // this.setupStripe();
    }
    ngOnInit() {
      this.setupStripe();
   }

  pay(){
    this.stripe.setPublishableKey("pk_test_NonjCsmAmGAz5YMOpkbMst1y");
    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
     }
     
     this.stripe.createCardToken(card)
        .then(token => {
          // alert("succes")
          alert(JSON.stringify(token))
        })
        .catch(error => {
          // alert("error")
         alert(JSON.stringify(error))
      });
  }
  setupStripe() {
    let elements = this.stripe_web.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });
    console.log(this.card);
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(event)

      this.stripe_web.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
          // this.makePayment(result.id);
        }
      });
    });
  }

}
