const form = document.querySelector("form[action='/message']")
form.onsubmit = async function submit (e) {
  e.preventDefault()
  await fetch(this.action, {
    method: 'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(new FormData(this))
  }) 
  let msg = this.querySelector('textarea')
  msg.value = ''
  msg.focus()
}

/** draw the ui */
function render (state) {
  console.log(state)
  let output = document.querySelector("#output");
  let html = ''
  for (m of state.messages) 
    html += `<p>${ m.msg } - <b>${ m.name }</b></p>`
  output.innerHTML = html
}

render(window.STATE)



/** web socket business here */
const websocket = new WebSocket(window.URL);

function writeToScreen(message) {
  const output = document.querySelector("#output");
  output.insertAdjacentHTML("afterbegin", `<p>${message}</p>`);
}

function sendMessage(message) {
  writeToScreen(`SENT: ${message}`);
  websocket.send(message);
}

websocket.onopen = (e) => {
}

/*
 * retry logic would go here
  websocket.onclose = (e) => {
    writeToScreen("DISCONNECTED");
  };*/

websocket.onmessage = function message (e) {
  let msg = JSON.parse(e.data)
  window.STATE.messages.push(msg)
  render(window.STATE)
  //console.log(e)
}

