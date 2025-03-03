// 验证账号
const loginIdValidator = new FieldValidator('txtLoginId', async function (value) {
  if (!value) {
    return '请填写账号'
  }
  const res = await exists(loginIdValidator.input.value)
  console.log(res);
  if (!res.data) {
    return '账号已存在'
  }
})

// 验证曾用名
const nicknameValidator = new FieldValidator('txtNickname', async function (value) {
  if (!value) {
    return '请填写曾用名'
  }
})

// 验证密码
const loginPwdValidator = new FieldValidator('txtLoginPwd', function (value) {
  if (!value) {
    return '请填写密码'
  }
})

// 验证密码
const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', function (value) {
  if (!value) {
    return '请填写确认密码'
  }
  if (value !== loginPwdValidator.input.value) {
    return '两次密码不一致'
  }
})

// 提交验证
const form = $('.user-form');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate(loginIdValidator, nicknameValidator, loginPwdValidator, loginPwdConfirmValidator);
  if (result) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const resp = await reg(data);
    if (resp.code === 0) {
      alert('注册成功，点击确定，跳转到登录页');
      location.href = './login.html';
    }
  }
})