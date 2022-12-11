import { select } from './settings.js';
import Finder from './components/Finder.js';

const app = {
  initFinder: function (element) {
    const thisApp = this;
    thisApp.element = element;

    const finderElement = document.querySelector(select.containerOf.finder);
    thisApp.finder = new Finder(finderElement);
  },

  init: function (element) {
    const thisApp = this;
    thisApp.initFinder(element);
  },
};

app.init();
