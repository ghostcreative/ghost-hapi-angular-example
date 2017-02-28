declare var require: any;

import {Component} from '@angular/core';

@Component({
  selector: 'home',
  template: require('./home.html'),
  styles: [require('./home.css')]
})

export class Home {
  name = 'World';
  messagePreboot = '';
  messageLazyLoading = '';

  constructor() {
    setTimeout(() => this.name = 'Ghost Creative', 1000);
  }

  onCheckPreboot() {
    console.log('Check preboot');
    this.messagePreboot = 'Preboot is working';
  }

  onCheckLazyLoading() {
    require.ensure([], () => {
      const greeter = require('../greeter/greeter.ts');
      this.messageLazyLoading = greeter.greet();
    });
  }
}