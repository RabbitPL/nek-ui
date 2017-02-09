---
title: 表单
---

## 基本形式

<div class="m-example"></div>

```xml
<ui.form ref="formgroup">
    <form.item title="标题1" cols=12>
        <ui.select />
    </form.item>
    <form.item title="标题2" cols=12>
        <ui.input />
    </form.item>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {}
});
```

## 基本形式 垂直布局

<div class="m-example"></div>

```xml
<ui.form ref="formgroup">
    <form.item title="标题1" cols=12 column="column">
        <ui.select />
    </form.item>
    <form.item title="标题2" cols=12 column="column">
        <ui.input />
    </form.item>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {}
});
``` 

## 获取select数据接口

<div class="m-example"></div>

```xml
<ui.form service={api.selector} ref="formgroup">
    <form.item title="标题1" cols=12 sourceKey="importTypeList">
        <ui.select />
    </form.item>
    <form.item title="标题2" cols=12>
        <ui.input />
    </form.item>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        api: {
            selector: '../../data/selector.json'
        }
    }
});
```