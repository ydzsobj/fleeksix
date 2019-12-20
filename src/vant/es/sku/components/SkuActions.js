import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace } from '../../utils';
import { inherit } from '../../utils/functional';
import Button from '../../button'; // Types

var _createNamespace = createNamespace('sku-actions'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function SkuActions(h, props, slots, ctx) {
  var createEmitter = function createEmitter(name) {
    return function () {
      props.skuEventBus.$emit(name);
    };
  };

  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx)]), [props.showAddCartBtn && h(Button, {
    "attrs": {
      "size": "large",
      "type": "warning",
      "text": props.addCartText || '加入购物车'
    },
    "on": {
      "click": createEmitter('sku:addCart')
    }
  }), h(Button, {
    "attrs": {
      "size": "large",
      "type": "danger",
      "text": props.buyText || '立即购买'
    },
    "on": {
      "click": createEmitter('sku:buy')
    }
  })]);
}

SkuActions.props = {
  buyText: String,
  addCartText: String,
  skuEventBus: Object,
  showAddCartBtn: Boolean
};
export default createComponent(SkuActions);