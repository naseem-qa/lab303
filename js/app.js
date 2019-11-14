'use strict';

function Horns(data) {
  this.image_url = data.image_url;
  this.title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
  Horns.all.push(this);
}
Horns.all = [];

Horns.prototype.render = function () {

  let templateMarkup = $(`#horns-template`).html();
  let template = Handlebars.compile(templateMarkup);
  let hornOutput = template(this);
  $(`#photo-template`).append(hornOutput);
};

function populateSelectBox() {
  let seen = {};
  let select = $('select');
  select.empty();
  Horns.all.forEach((horn) => {
    if (!seen[horn.keyword]) {
      let option = `<option value="${horn.keyword}">${horn.keyword}</option>`;
      select.append(option);
      seen[horn.keyword] = true;
    }
  });

  console.log(seen);
}

$('select').on('change', function () {
  let selected = $(this).val();
  $('div').hide();
  $(`.${selected}`).fadeIn(800);
});

$(`button`).on(`click`, function () {
  let num = $(this).attr(`id`);
  readData(num)
})

function readData(pageNum) {
  $('div').remove();
  Horns.all = [];
  $.get(`../data/page-${pageNum}.json`)
    .then(data => {
      data.forEach((thing) => {
        let horn = new Horns(thing);
        horn.render();
      });
    })
    .then(() => populateSelectBox());
}

$(document).ready(function() {
  readData(1);
})