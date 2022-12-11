import { select } from './settings.js';
import Finder from './components/Finder.js';

const app = {
  // eslint-disable-next-line no-unused-vars
  initFinder: function (element) {
    const thisApp = this;

    const finderElement = document.querySelector(select.containerOf.finder);
    thisApp.finder = new Finder(finderElement);
  },

  init: function () {
    // eslint-disable-next-line no-undef
    this.initFinder(element);
  },
};

app.init();
