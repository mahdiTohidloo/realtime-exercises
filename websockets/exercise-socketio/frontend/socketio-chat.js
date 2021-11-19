// a global called "io" is being loaded separately

const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");
const presence = document.getElementById("presence-indicator");
let allChat = [];

// window.WebSocket = null;

const socket = io('http://localhost:8080');

socket.on('connect', () => {
  presence.innerHTML = '😍';
  console.log('connected');
});



socket.on('disconnect', () => {
  presence.innerHTML = '😖';
  console.log('connected');
});

socket.on('msg:get', (payload) => {
  allChat = payload.msg;
  render();
});



/*
 *
 * Code goes here
 *
 */

chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postNewMsg(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

async function postNewMsg(user, text) {
  /*
   *
   * Code goes here
   *
   */
  socket.emit('msg:post', { user , text });
}

function render() {
  const html = allChat.map(({ user, text }) => template(user, text));
  msgs.innerHTML = html.join("\n");
}

const template = (user, msg) =>
  `<li class="collection-item"><span class="badge">${user}</span>${msg}</li>`;
