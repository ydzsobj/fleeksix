"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _relation = require("../mixins/relation");

var _createNamespace = (0, _utils.createNamespace)('grid'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var _default = createComponent({
  mixins: [(0, _relation.ParentMixin)('vanGrid')],
  props: {
    square: Boolean,
    gutter: [Number, String],
    clickable: Boolean,
    columnNum: {
      type: Number,
      default: 4
    },
    center: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    style: function style() {
      var gutter = this.gutter;

      if (gutter) {
        return {
          paddingLeft: (0, _utils.addUnit)(gutter)
        };
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "style": this.style,
      "class": [bem(), {
        'van-hairline--top': this.border && !this.gutter
      }]
    }, [this.slots()]);
  }
});

exports.default = _default;