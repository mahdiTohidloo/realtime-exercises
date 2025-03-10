const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");
const presence = document.getElementById("presence-indicator");

console.log('fuckkkkkkk')
// this will hold all the most recent messages
let allChat = [];

chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postNewMsg(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

async function postNewMsg(user, text) {
  const data = {
    user,
    text,
  };

  // request options
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // send POST request
  // we're not sending any json back, but we could
  await fetch("/msgs", options);
}

async function getNewMsgs() {
  console.log('helloooo')
  let reader;
  const utf8Decoder = new TextDecoder('utf-8');
  try {
    const res = await fetch('/msgs');
    reader = res.body.getReader();

  } catch(e) {
    console.log('helooo from catching server error', e);
  }
  presence.innerHTML = '😍';

  let readerResponse;
  try {
      readerResponse = await reader.read();
      console.log(utf8Decoder.decode(readerResponse.value, { stream: true }));

  } catch(e) {
    console.log('reader reponse error', e);
    presence.innerHTML = '😖';
    return;
  }

  /*
   *
   * code goes here
   *
   */
}

function render() {
  const html = allChat.map(({ user, text, time, id }) =>
    template(user, text, time, id)
  );
  msgs.innerHTML = html.join("\n");
}

const template = (user, msg) =>
  `<li class="collection-item"><span class="badge">${user}</span>${msg}</li>`;

getNewMsgs();
