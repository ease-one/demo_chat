class FieldValidator {
  constructor(txtId, validatorFn) {
    this.input = $('#' + txtId);
    this.validatorFn = validatorFn;
    this.p = this.input.nextElementSibling;
    this.input.addEventListener('blur', () =>
      this.validate()
    )
    // 细节：事件回调函数如果是普通函数，函数当中的this会指向dom实例，这里要用箭头函数（箭头函数不绑定自己的this，而是捕获其所在上下文的this值）或者修改函数this指向
    // this.input.addEventListener('blur', function () {
    //   console.log(this);
    //   this.validate();
    // }.bind(this))
  }
  async validate() {
    const err = await this.validatorFn(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = '';
      return true;
    }
  }

  static async validate(...validators) {
    const proms = validators.map(item => item.validate());
    const result = await Promise.all(proms);
    return result.every(item => item);
  }
}

