Component({
  properties: {
    titleText: { type: String, value: '' },
    cValue: { type: String, value: '' },
    changeIndex: { type: Number, value: 0 },
    valueLength: { type: Number, value: 0 },
    showType: { type: Array, value: ['tractor', 'NumEn'] },
  },

  data: {
    keyBoardShow: true,
    inputValue: [''],
    keybordIndex: 0,
    keyBoardObject: {
      English: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      ],
      Numbers: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0']],
      NumEn: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      ],
      tractor: [
        ['京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑', '苏'],
        ['浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼'],
        ['川', '贵', '云', '陕', '甘', '青', '蒙', '桂', '宁', '新'],
        ['藏', '使', '领', '警', '学', '港', '澳'],
      ],
    },
    currentType: 'tractor',
  },
  lifetimes: {
    attached: function () {
      let _this = this
      const {
        data: { cValue, valueLength, showType },
      } = _this
      if (typeof valueLength === 'number') {
        const inputValue = Array.from(Array(valueLength), (v, i) => {
          if (cValue == '') {
            return ''
          } else {
            let str = cValue.substring(0, valueLength)
            if (str.hasOwnProperty(i)) {
              return str[i]
            } else {
              return ''
            }
          }
        })
        const [currentType] = showType
        _this.setData({
          inputValue,
          currentType,
        })
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //输入框框点击事件
    clickInputBox(e) {
      const _this = this
      const {
        currentTarget: {
          dataset: { index },
        },
      } = e
      _this.setData({
        keybordIndex: index,
      })
      _this.changeType()
      if (!_this.data.keyBoardShow) {
        _this.setData({
          keyBoardShow: true,
        })
      }
    },
    //键盘按钮事件
    clickKeybord(e) {
      const _this = this
      const {
        currentTarget: {
          dataset: { key },
        },
      } = e
      const {
        data: { keybordIndex: index },
      } = _this
      let {
        data: { inputValue },
      } = _this
      inputValue[index] = key
      _this.setData({
        inputValue,
      })
      if (index + 1 == inputValue.length) {
        _this.setData({
          keyBoardShow: false,
        })
        return
      } else {
        _this.setData({
          keybordIndex: index + 1,
        })
      }
      _this.changeType()
    },

    deleteKey() {
      let _this = this
      let {
        data: { keybordIndex: index },
      } = _this
      if (index == 0) {
        return
      }
      if (_this.data.inputValue[index] != '') {
        _this.data.inputValue[index] = ''
      } else {
        _this.data.inputValue[index - 1] = ''
        index = index - 1
      }
      _this.setData({
        keybordIndex: index,
        inputValue: _this.data.inputValue,
      })
      _this.changeType()
    },
    //更改输入模式
    changeType() {
      const _this = this
      const {
        data: { currentType, showType, changeIndex, keybordIndex: index },
      } = _this
      const [firstType, secondType] = showType
      let keyBordType = firstType
      if (index < changeIndex) {
        keyBordType = firstType
      } else {
        keyBordType = secondType
      }
      if (currentType !== keyBordType) {
        _this.setData({
          currentType: keyBordType,
        })
      }
    },
    submitValue() {
      let _this = this
      let myEventDetail = { inputValue: _this.data.inputValue.join('') }
      let myEventOption = {} // 触发事件的选项
      _this.triggerEvent('confirmEvent', myEventDetail, myEventOption)
    },
    cancelKeyBoard() {
      let _this = this
      let myEventDetail = {}
      let myEventOption = {}
      _this.triggerEvent('hideKeyBoard', myEventDetail, myEventOption)
    },
  },
})
