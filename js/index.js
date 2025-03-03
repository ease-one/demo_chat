(async function () {
  const resp = await profile();
  const user = resp.data;

  if (!user) {
    alert('未登录或登录已过期，请重新登录');
    location.href = './login.html';
    return;
  }

  const doms = {
    aside: {
      nickname: $('#nickname'),
      loginId: $('#loginId'),
    },
    close: $('.close'),
    chatContainer: $('.chat-container'),
    form: $('.msg-container'),
    txtInput: $('#txtMsg'),
  }

  setUserInfo();
  loadHistory();


  doms.close.addEventListener('click', function () {
    loginOut();
    location.href = './login.html'
  })

  doms.form.addEventListener('submit', function (e) {
    e.preventDefault();
    sendContent();
  })

  // 设置用户名称
  function setUserInfo() {
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
  }

  // 添加历史消息记录
  async function loadHistory() {
    const resp = await getHistory();
    resp?.data.forEach(item => addChat(item));

    scrollBottom();
  }

  // 添加消息
  function addChat(chat) {
    const div = $$$('div');
    div.classList.add('chat-item');
    if (chat.from) div.classList.add('me');

    const img = $$$('img');
    img.classList.add('chat-avatar')
    img.src = chat.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

    const content = $$$('div');
    content.classList.add('chat-content')
    content.innerText = chat.content;

    const date = $$$('div');
    date.classList.add('chat-date');
    date.innerText = formatDate(chat.createdAt);

    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(date);
    doms.chatContainer.appendChild(div)
  }

  // 格式化时间
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const day = date.getDate().toString().padStart(2, 0);
    const hour = date.getHours().toString().padStart(2, 0);
    const minute = date.getMinutes().toString().padStart(2, 0);
    const second = date.getSeconds().toString().padStart(2, 0);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }

  // 让聊天区域的滚动条滚动到底
  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  // 发送消息
  async function sendContent() {
    const content = doms.txtInput.value.trim();
    if (!content) return;

    addChat({
      content,
      from: user.nickname,
      createdAt: Date.now(),
    });
    scrollBottom();
    doms.txtInput.value = '';

    const resp = await sendChat(content);
    console.log(resp);

    addChat(resp.data);
    scrollBottom();
  }
})()