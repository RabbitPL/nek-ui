/**
 * ------------------------------------------------------------
 * KLRow 栅格布局-行
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLRow
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {string}          [options.data.class]                  => 补充class
 * @param {string}          [options.data.type='']              => 布局模式，可选 flex，现代浏览器下有效
 * @param {string}          [options.data.justify='start']      => flex 布局下的水平排列方式
 * @param {string}          [options.data.align='top']          => flex 布局下的垂直排列方式
 * @param {string}          [options.data.wrap='wrap']          => flex布局下的换行显示方式,wrap/nowrap/wrap-reverse
 * @param {number}          [options.data.gutter='40']           => 栅格间隔
 */
const KLRow = Component.extend({
  name: 'kl-row',
  template,
  config(data) {
    this.defaults({
      type: '',
      justify: 'start',
      align: 'top',
      gutter: 40,
      wrap: 'wrap',
    });

    this.supr(data);
  },
});

KLRow.directive('gutter', function (ele, value) {
  this.$watch(value, (gutter) => {
    if (gutter) {
      const margin = `-${gutter / 2}px`;
      ele.style.marginLeft = margin;
      ele.style.marginRight = margin;
    }
  });
});

module.exports = KLRow;
