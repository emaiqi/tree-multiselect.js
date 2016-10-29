chai.config.includeStack = true;

beforeEach(() => {
  var $fixture = $("#fixture");
  if (!$fixture.length) {
    $fixture = $("<div id='fixture'></div>");
    $("body").append($fixture);
  }

  $fixture.empty();

  var select = document.createElement("select");
  select.setAttribute("multiple", "multiple");
  $fixture.append(select);
});

module.exports = {
  assertSelectionItem(el, params) {
    var $el = $(el);
    assert($el.hasClass('item'));
    assert.equal(this.textOf($el), params.text);
    assert.equal($el.attr('data-value'), params.value);
  },

  assertSelectedItem(el, params) {
    var $el = $(el);
    assert($el.hasClass('item'));
    assert.equal(this.textOf($el), params.text);
    assert.equal($el.attr('data-value'), params.value);
    var $sectionName = $el.children(".section-name");
    assert.equal($sectionName.length, 1);
    assert.equal(this.textOf($sectionName), params.section);
  },

  attributeOf(el, key) {
    return $(el).attr(key);
  },

  getSelections() {
    return $("div.selections div.item");
  },

  getSelected() {
    return $("div.selected div.item");
  },

  getSections() {
    return $("div.section");
  },

  getSelectionsWithText(text) {
    return this.getSelections().filter((idx, el) => {
      return this.textOf(el) === text;
    });
  },

  getSelectedWithText(text) {
    return this.getSelected().filter((idx, el) => {
      return this.textOf(el) === text;
    })
  },

  getSectionsWithTitle(title) {
    return this.getSections().filter((idx, el) => {
      return this.textOf($(el).children("div.title")) === title;
    });
  },

  textOf(el) {
    var $el = $(el);
    var $label = $el.children("label");
    if ($label.length) {
      return $label.first().text();
    } else {
      return $el.clone().children().remove().end().text();
    }
  },

  // DOM element finders
  find(container, options) {
    var text = null;
    var value = null;
    var checked = false;

    if (options) {
      text = options.text;
      value = options.value;
      checked = options.checked;
    }

    var selector = container + (value ? `[data-value=${value}]` : '');
    var $els = $(selector);

    if (text) {
      $els = $els.filter((idx, el) => {
        return this.textOf(el) === text;
      });
    }

    if (checked) {
      $els = $els.filter((idx, el) => {
        return el.checked === checked;
      });
    }

    return $els;
  },

  selection(options) {
    return this.find('.selections .item', options);
  },

  selected(options) {
    return this.find('.selected .item', options);
  },

  section(options) {
    // need to search title text, then go back up to section
    return this.find('.selections .section > .title', options).parent();
  },

  selectionCheckbox(options) {
    return this.find(".selections .item", options).children("input.option[type=checkbox]");
  },

  sectionCheckbox(options) {
    return this.find('.selections .section > .title', options).children("input.section[type=checkbox]");
  },

  sectionTitle(section) {
    return this.textOf($(section).children("div.title"));
  }
};

