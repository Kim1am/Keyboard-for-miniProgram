# Keyboard-for-miniProgram

微信小程序自定义键盘（自带切换键盘功能）

> 可以自己再二次开发切换成车牌键盘（本人实践过），或者 3 种输入类型键盘模式

demo 图：
![demo1.png](https://github.com/Kim1am/Keyboard-for-miniProgram/blob/master/Keyboard/demo1.png)

使用方法:

1. 直接 clone 整个 rep 到自己项目里面
2. 引用到需要该组件的页面上

具体代码：

```html
<Keyboard title-text="车牌号" c-value="{{formData.tractorNo.value}}" show-type="{{keyboardType}}" value-length="8" change-index="1" bind:confirmEvent="confirmEvent" bind:hideKeyBoard="hideKeyBoard"></Keyboard>
<!-- 
    title-text:对应标题
    show-type="{{keyboardType}}"  Array:  目前支持2种类型：例如['tractor', 'NumEn']。可选值：English、Numbers、NumEn、tractor
    c-value:对应父组件对应的value
    value-length:对应格子长度
    change-index:输入到第几位时键盘进行类型切换
    bind:xxxxx:子组件触发父组件事件
   -->
```
