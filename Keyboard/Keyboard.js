Component({
  properties: {
    titleText: { type: String, value: '' },
    cValue: { type: String, value: '' },
    changeIndex: { type: Number, value: 0 },
    valueLength: { type: Number, value: 0 }
  },

  data: {
    keyBoardShow: true,
    English: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ],
    inputValue: ['', '', '', '', '', '', '', '', '', '', ''],
    keybordIndex: 0,
    Numbers: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0']],
    currentType: 'English'
  },
  lifetimes: {
    attached: function() {
      let self = this
      if (typeof self.data.valueLength === 'number') {
        self.setData({
          inputValue: Array.from(Array(self.data.valueLength), (v, i) => {
            if (self.data.cValue == '') {
              return ''
            } else {
              let str = self.data.cValue.substring(0, self.data.valueLength)
              if (str.hasOwnProperty(i)) {
                return str[i]
              } else {
                return ''
              }
            }
          })
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //输入框框点击事件
    clickInputBox(e) {
      let _this = this
      let index = e.currentTarget.dataset.index
      let keyBordType = 'English'
      if (index <= 3) {
        keyBordType = 'English'
      } else {
        keyBordType = 'Numbers'
      }
      _this.setData({
        keybordIndex: index,
        currentType: keyBordType
      })
      if (!_this.data.keyBoardShow) {
        _this.setData({
          keyBoardShow: true
        })
      }
    },
    //键盘按钮事件
    clickKeybord(e) {
      let _this = this
      let key = e.currentTarget.dataset.key
      let index = _this.data.keybordIndex
      _this.data.inputValue[index] = key
      if (index == _this.data.changeIndex) {
        _this.changeType()
      }
      _this.setData({
        inputValue: _this.data.inputValue
      })
      if (index + 1 == _this.data.inputValue.length) {
        _this.setData({
          keyBoardShow: false
        })
        return
      } else {
        _this.setData({
          keybordIndex: index + 1
        })
      }
    },

    deleteKey() {
      let _this = this
      let index = _this.data.keybordIndex
      if (index == 0) {
        return
      }
      if (_this.data.inputValue[index] != '') {
        _this.data.inputValue[index] = ''
      } else {
        _this.data.inputValue[index - 1] = ''
        index = index - 1
      }
      if (index === _this.data.changeIndex) {
        _this.changeType()
      }
      _this.setData({
        keybordIndex: index,
        inputValue: _this.data.inputValue
      })
    },
    //更改输入模式
    changeType() {
      let _this = this
      let keyBordType = 'English'
      if (_this.data.currentType == 'English') {
        keyBordType = 'Numbers'
      } else {
        keyBordType = 'English'
      }
      _this.setData({
        currentType: keyBordType
      })
    },
    submitValue() {
      let _this = this
      let myEventDetail = { inputValue: _this.data.inputValue.join('') }
      let myEventOption = {} // 触发事件的选项
      _this.triggerEvent('changeContainerNo', myEventDetail, myEventOption)
    },
    cancelKeyBoard() {
      let _this = this
      let myEventDetail = {}
      let myEventOption = {}
      _this.triggerEvent('hideKeyBoard', myEventDetail, myEventOption)
    }
  }
})
