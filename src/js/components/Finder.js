/* eslint-disable indent */
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
    // thisFinder.initAction();

    thisFinder.grid = {};
    for (let row = 1; row <= 10; row++) {
      thisFinder.grid[row] = {};
      for (let col = 1; col <= 10; col++) {
        thisFinder.grid[row][col] = false;
      }
    }
    console.log(thisFinder.grid);
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
        html += `<div class="field" data-row="${row}" data-col="${col}"></div>`;
      }
    }

    thisFinder.element.querySelector(select.finder.grid).innerHTML = html;

    thisFinder.initAction();
  }

  getElements() {
    const thisFinder = this;

    thisFinder.dom = {
      wrapper: thisFinder.element,
      finderContainer: document.querySelector(select.containerOf.finder),
      button: document.querySelector(select.finder.button),
      fields: document.querySelectorAll(classNames.finder.field),
    };
  }

  changeStep(newStep) {
    const thisFinder = this;
    thisFinder.step = newStep;
    thisFinder.render();
  }

  initAction() {
    const thisFinder = this;

    thisFinder.getElements();

    if (thisFinder.step === 1) {
      thisFinder.dom.button.addEventListener('click', function (e) {
        e.preventDefault();
        thisFinder.changeStep(2);
      });

      thisFinder.dom.fields.forEach((field) => {
        field.addEventListener('click', function (e) {
          e.preventDefault();

          if (e.target.classList.contains('field')) {
            thisFinder.toggleField(e.target);
          }
        });
      });
    } else if (thisFinder.step === 2) {
      thisFinder.dom.button.addEventListener('click', function (e) {
        e.preventDefault();
        thisFinder.changeStep(3);
      });
    } else if (thisFinder.step === 3) {
      // TO DO
      thisFinder.dom.button.addEventListener('click', function (e) {
        e.preventDefault();
        thisFinder.changeStep(1);
      });
    }
  }

  toggleField(fieldElem) {
    const thisFinder = this;

    // get row and col info from field elem attrs
    const field = {
      row: fieldElem.getAttribute('data-row'),
      col: fieldElem.getAttribute('data-col'),
    };

    // if field with this row and col is true -> unselect it
    if (thisFinder.grid[field.row][field.col]) {
      thisFinder.grid[field.row][field.col] = false;
      fieldElem.classList.remove('active');
    } else {
      // flatten object to array of values e.g. [false, false, false]
      const gridValues = Object.values(thisFinder.grid)
        .map((col) => Object.values(col))
        .flat();

      console.log(gridValues);

      // if grid isn't empty...
      if (gridValues.includes(true)) {
        // determine edge fields
        const edgeFields = [];
        if (field.col > 1)
          edgeFields.push(thisFinder.grid[field.row][field.col - 1]); //get field on the left value
        if (field.col < 10)
          edgeFields.push(thisFinder.grid[field.row][field.col + 1]); //get field on the right value
        if (field.row > 1)
          edgeFields.push(thisFinder.grid[field.row - 1][field.col]); //get field on the top value
        // if (field.row < 10)
        //   edgeFields.push(thisFinder.grid[field.row + 1][field.col]); //get field on the bottom value

        // if clicked field doesn't touch at least one that is already selected -> show alert and finish function
        if (!edgeFields.includes(true)) {
          alert(
            'A new field should touch at least one that is already selected!'
          );
          return;
        }
      }

      // select clicked field
      thisFinder.grid[field.row][field.col] = true;
      fieldElem.classList.add('active');
    }
  }
}

export default Finder;
