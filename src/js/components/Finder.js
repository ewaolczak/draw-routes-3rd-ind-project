import { templates, select, classNames } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;

    // save reference to finder page div
    thisFinder.element = element;

    // start at step 1
    thisFinder.step = 1;

    // render view for the first time
    thisFinder.render();
    thisFinder.getElements();
    thisFinder.selectField();
  }

  render() {
    const thisFinder = this;

    // determine what title and button content should be used
    let pageData = null;
    switch (thisFinder.step) {
    case 1:
      pageData = { title: 'Draw routes', btnText: 'Finish drawing' };
      break;
    case 2:
      pageData = { title: 'Pick start and finish', btnText: 'Compute' };
      break;
    case 3:
      pageData = { title: 'The best route is', btnText: 'Start again' };
      break;
    }

    // generate view from the template and set it as page content
    const generatedHTML = templates.finder(pageData);
    thisFinder.element.innerHTML = generatedHTML;

    // generate 100 fields for grid and add it to HTML
    let html = '';
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 10; col++) {
        html +=
          '<div class="field" data-row="' +
          row +
          '" data-col="' +
          col +
          '"></div>';
      }
    }

    thisFinder.element.querySelector(select.finder.grid).innerHTML = html;
  }

  getElements() {
    const thisFinder = this;

    thisFinder.dom = {
      wrapper: thisFinder.element,
      finderContainer: document.querySelector(select.containerOf.finder),
      field: document.querySelector(classNames.finder.field),
      button: document.querySelector(classNames.finder.button),
    };
  }

  selectField() {
    const thisFinder = this;

    thisFinder.dom.finderContainer.addEventListener('click', function (e) {
      e.preventDefault();

      const clickedElement = e.target;
      console.log(clickedElement);
    });
  }
}

export default Finder;
