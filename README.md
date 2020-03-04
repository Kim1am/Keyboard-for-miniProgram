# Keyboard-for-miniProgram
微信小程序自定义键盘（自带切换键盘功能）

>可以自己再二次开发切换成车牌键盘（本人实践过），或者3种输入类型键盘模式

demo图：
![demo1.png](https://github.com/Kim1am/Keyboard-for-miniProgram/tree/master/Keyboard/demo1.png)

使用方法:
1. 直接clone整个rep到自己项目里面
2. 引用到需要该组件的页面上

具体代码：
```html
  <Keyboard 
    title-text="我是标题" 
    c-value="{{eData.containerNo.value}}" 
    value-length="11" 
    change-index="3"  
    bind:changeContainerNo="changeContainerNo"    
    bind:hideKeyBoard="hideKeyBoard">
  </Keyboard>
  <!-- 
    title-text:对应标题
    c-value:对应父组件对应的value
    value-length:对应格子长度
    change-index:输入到第几位时键盘进行类型切换
    bind:xxxxx:子组件触发父组件事件
   -->
```
