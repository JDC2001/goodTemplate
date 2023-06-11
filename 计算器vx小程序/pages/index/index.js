//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        input: '',
        first: '',
        second: '',
        operateSymbol: '',
        result: 0
    },
    //展示输入
    showInput: function () {
        var that = this;
        var firstNum = that.data.first;
        var secondNum = that.data.second;
        var operationSymbol = that.data.operateSymbol;
        var finalInput = '';
        finalInput += firstNum;
        finalInput += operationSymbol === '' ? '' : (' ' + operationSymbol + ' ');
        finalInput += secondNum;
        that.setData({
            input: finalInput
        });
    }, 
    //按下数字键
    tapNumber: function (event) {
        var that = this;
        var content = event.target.dataset.content;
        var firstNum = that.data.first;
        var secondNum = that.data.second;
        var operationSymbol = that.data.operateSymbol;
        //如果是0
        if (content === '0') {
            //存在运算符，针对第二个数
            if (operationSymbol && operationSymbol.length > 0) {
                if (secondNum === '' || secondNum === '0') {
                    this.setData({
                        second: '0'
                    });
                    return;
                }
                this.setData({
                    second: secondNum + content
                });
            } else {
                if (firstNum === '' || firstNum === '0') {
                    that.setData({
                        first: '0'
                    });
                    return;
                }
                that.setData({
                    first: firstNum + content
                });
            }
        }
        //如果是小数点
        if(content == '.'){
            //存在运算符，针对第二个数
            if (operationSymbol && operationSymbol.length > 0) {
                if (secondNum.indexOf('.') >= 0) {
                    return;
                } else {
                    if (secondNum === '') {
                        secondNum = '0'
                    }
                    that.setData({
                        second: secondNum + content
                    });
                }
            } else {
                //不存在操作运算符，针对第一个数
                if (firstNum.indexOf('.') >= 0) {
                    return;
                } else {
                    if (firstNum === '') {
                        firstNum = '0';
                    }
                    that.setData({
                        first: firstNum + content
                    });
                }
            }
        }
        //如果是数字
        if (/[1-9]/.test(content)) {
            if (operationSymbol && operationSymbol.length > 0) {
                that.setData({
                    second: (secondNum === '0' ? '' : secondNum) + content
                });
            } else {
                that.setData({
                    first: (firstNum === '0' ? '' : firstNum) + content
                });
            }
        }
        that.showInput();
    },
    //按下运算符
    tapOperateSymbol: function (event) {
        var that = this;
        var content = event.target.dataset.content;
        var firstNum = that.data.first;
        var result = that.data.result;
        //如果是×操作运算符
        if (content == '×') {
            that.setData({
                operateSymbol: content
            });
            
            if (result != '' && firstNum === '') {
                that.setData({
                    first: result
                });
            }
            that.showInput();
        } else {
            //如果是=操作符，则计算结果
            var firstNum = that.data.first;
            var secondNum = that.data.second;
            var operationSymbol = that.data.operateSymbol;
            if (operationSymbol !== '') {
                var firstNumber = parseFloat(firstNum);
                var secondNumber = parseFloat(secondNum);
                that.calculate(firstNumber, secondNumber, operationSymbol);
            }
        }
    },
    //计算结果
    calculate: function (first, second, operationSymbol) {
        var that = this;
        //是否计算的flag，参与计算后则置为false
        var flag = true;
        if (operationSymbol === '×') {
            flag = false;
            var tempResult = first * second / 1108.89 + '';
            tempResult = that.dealResult(tempResult);
            that.setData({
                result: tempResult
            });  
        }
        //计算完之后，判断flag是否为true，如果为true则表明为进行计算，则不需要重置操作
        if (!flag) {
            that.setData({
                first: '',
                second: '',
                operateSymbol: '',
            });
        }
    },
    //清空
    clear: function () {
        var that = this;
        that.setData({
            input: '',
            first: '',
            second: '',
            operateSymbol: '',
            result: 0
        });
    },
    //删除上一个输入的字符
    removeLast: function () {
        var that = this;
        var firstNum = that.data.first;
        var secondNum = that.data.second;
        var operationSymbol = that.data.operateSymbol;
        
        if (secondNum && secondNum !== '0') {
            secondNum = secondNum.substring(0, secondNum.length - 1);
            that.setData({
                second: secondNum
            }); 
            that.showInput();
            return;
        }
        if (operationSymbol !== '') {
            operationSymbol = '';
            that.setData({
                operateSymbol: operationSymbol
            }); 
            that.showInput();
            return;
        }
        if (firstNum && firstNum !== '0') {
            firstNum = firstNum.substring(0, firstNum.length - 1);
            that.setData({
                first: firstNum
            });
            that.showInput();
            return;
        }
    },
    //删除小数点后多余的0，在dealResult做了调用
    removeZero: function (decimal) {
        var index = 0;
        for (var i = decimal.length - 1; i >=0; i--) {
            if(decimal.charAt(i) === '0') {
                ++index;
            } else {
                break;
            }
        }
        decimal = decimal.substring(0, decimal.length - index);
        return decimal;
    },
    //处理结果
    dealResult: function (tempResult) {
        var that = this;
        if (tempResult.indexOf('\.') >= 0) {
            var length = tempResult.split('\.')[1].length;
            if (length > 6) {
                tempResult = new Number(tempResult).toFixed(4);
                //去掉小数点后多余的0
                var integer = (tempResult + '').split('\.')[0];
                var decimal = (tempResult + '').split('\.')[1];
                decimal = that.removeZero(decimal);
                tempResult = integer + '.' + decimal;
            }
        }
        return tempResult;
    }
})
