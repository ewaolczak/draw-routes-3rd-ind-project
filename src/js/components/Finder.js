import { templates } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;

    // save reference to finder page div
    thisFinder.element = element;

    // start at step 1
    thisFinder.step = 1;

    // render view for the first time
    thisFinder.render();
  }

  render() {
    const thisFinder = this;

    // determine what title and button content should be used
    // eslint-disable-next-line no-unused-vars
    let pageData = null;
    switch (thisFinder.step) {
    case 1:
      pageData = { title: 'Draw routes', buttonText: 'Finish drawing' };
      break;
    case 2:
      pageData = { title: 'Pick start and finish', buttonText: 'Compute' };
      break;
    case 3:
      pageData = { title: 'The best route is', buttonText: 'Start again' };
      break;
    }

    // generate view from the template and set it as page content
    const generatedHTML = templates.finder(thisFinder.pageData);
    thisFinder.element.innerHTML = generatedHTML;
  }
}

export default Finder;
