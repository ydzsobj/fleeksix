import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace } from '../../utils';
import { inherit } from '../../utils/functional';
import Icon from '../../icon'; // Types

var _createNamespace = createNamespace('sku-header'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function getSkuImg(sku, selectedSku) {
  var id = selectedSku.s1;

  if (id) {
    // skuImg 挂载在 skuTree 中 s1 上
    var treeItem = sku.tree.filter(function (item) {
      return item.k_s === 's1';
    })[0] || {};

    if (treeItem.v) {
      var matchedSku = treeItem.v.filter(function (skuValue) {
        return skuValue.id === id;
      })[0];

      if (matchedSku) {
        return matchedSku.imgUrl || matchedSku.img_url;
      }
    }
  }
}

function SkuHeader(h, props, slots, ctx) {
  var sku = props.sku,
      goods = props.goods,
      skuEventBus = props.skuEventBus,
      selectedSku = props.selectedSku;
  var goodsImg = getSkuImg(sku, selectedSku) || goods.picture;

  var previewImage = function previewImage() {
    skuEventBus.$emit('sku:previewImage', goodsImg);
  };

  return h("div", _mergeJSXProps([{
    "class": [bem(), 'van-hairline--bottom']
  }, inherit(ctx)]), [h("div", {
    "class": bem('img-wrap'),
    "on": {
      "click": previewImage
    }
  }, [h("img", {
    "attrs": {
      "src": goodsImg
    }
  })]), h("div", {
    "class": bem('goods-info')
  }, [slots.default && slots.default(), h(Icon, {
    "attrs": {
      "name": "clear"
    },
    "class": "van-sku__close-icon",
    "on": {
      "click": function click() {
        skuEventBus.$emit('sku:close');
      }
    }
  })])]);
}

SkuHeader.props = {
  sku: Object,
  goods: Object,
  skuEventBus: Object,
  selectedSku: Object
};
export default createComponent(SkuHeader);