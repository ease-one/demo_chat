// 验证账号
const loginIdValidator = new FieldValidator('txtLoginId', function (value) {
  if (!value) {
    return '请填写账号'
  }
})

// 验证密码
const loginPwdValidator = new FieldValidator('txtLoginPwd', function (value) {
  if (!value) {
    return '请填写密码'
  }
})

// 提交
const form = $('.user-form');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate(loginIdValidator, loginPwdValidator);
  if (result) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const resp = await login(data);
    if (resp.code === 0) {
      alert('登录成功，点击确定，跳转到主页');
      location.href = './index.html';
    }
  }
})