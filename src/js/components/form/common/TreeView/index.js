/**
 * ------------------------------------------------------------
 * TreeView  树型视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const SourceComponent = require('../../../../ui-base/sourceComponent');
const template = require('./index.html');
const _ = require('../../../../ui-base/_');

require('../TreeViewList');

/**
 * @class TreeView
 * @extend SourceComponent
 * @param {object}    [options.data]                          = 绑定属性
 * @param {object[]}  [options.data.source=[]]                <=> 数据源
 * @param {string}    [options.data.source[].name]            => 每项的内容
 * @param {boolean}   [options.data.source[].open=false]      => 此项为展开/收起状态
 * @param {boolean}   [options.data.source[].checked=false]   => 选中此项
 * @param {boolean}   [options.data.source[].disabled=false]  => 禁用此项
 * @param {boolean}   [options.data.source[].divider=false]   => 设置此项为分隔线
 * @param {string}    [options.data.value=null]               <=> 当前选择值
 * @param {object}    [options.data.selected=null]            <=> 当前选择项
 * @param {string}    [options.data.separator=,]              => 多选时value分隔符
 * @param {string}    [options.data.itemTemplate=null]        @=> 单项模板
 * @param {boolean}   [options.data.multiple=false]           => 是否多选
 * @param {boolean}   [options.data.hierarchical=false]       @=> 是否分级动态加载，需要service
 * @param {boolean}   [options.data.readonly=false]           => 是否只读
 * @param {boolean}   [options.data.disabled=false]           => 是否禁用
 * @param {boolean}   [options.data.visible=true]             => 是否显示
 * @param {string}    [options.data.class]                    => 补充class
 * @param {object}    [options.service]                       @=> 数据服务
 */
const TreeView = SourceComponent.extend({
  name: 'tree-view',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      // @inherited source: [],
      key: 'id',
      nameKey: 'name',
      value: null,
      selected: null,
      multiple: false,
      hierarchical: false,
    });
    this.supr();
    this.$ancestor = this;
    this.$watch('selected', function (newVal) {
      const { key, nameKey, separator } = this.data;
      if (!newVal) return (this.data.value = '');
      if (Array.isArray(newVal)) {
        return (this.data.value = newVal
          .map(d => d[key] || d[nameKey])
          .join(separator));
      }
      this.data.value = newVal[key] || newVal[nameKey];
    });
  },
  /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
  select(item) {
    if (
      this.data.readonly ||
      this.data.disabled ||
      item.disabled ||
      item.divider
    ) {
      return;
    }

    if (this.data.multiple) return (item.selected = !item.selected);

    this.data.selected = item;
    /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择项
         */
    this.$emit('select', {
      sender: this,
      selected: item,
    });
  },
  /**
     * @method toggle(item,open) 展开/收起某一项
     * @public
     * @param  {object} item 处理项
     * @param  {object} open 展开/收起状态。如果无此参数，则在两种状态之间切换。
     * @return {void}
     */
  toggle(item, _open) {
    if (
      this.data.readonly ||
      this.data.disabled ||
      item.disabled ||
      item.divider
    ) {
      return;
    }

    let open = _open;
    if (open === undefined) open = !item.open;
    item.open = open;

    /**
         * @event toggle 展开或收起某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} item 处理项
         * @property {boolean} open 展开/收起状态
         */
    this.$emit('toggle', {
      sender: this,
      item,
      open,
    });
  },
  /**
     * @private
     */
  _getSelected(source) {
    const self = this;
    if (!source) return [];
    let arr = [];
    source.forEach((d) => {
      const child = d[self.data.childKey];
      if (child && child.length) {
        arr = arr.concat(self._getSelected(d[self.data.childKey]));
      } else if (d.checked) {
        arr = arr.concat(d);
      }
    });
    return arr;
  },
  setSelected() {
    this.data.selected = this._getSelected(this.data.source);
  },
});

module.exports = TreeView;
