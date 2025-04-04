import arc from '@architect/functions'
import data from '@begin/data'

export let handler = arc.http(auth, fn)

async function auth (req) {
  let isNotLoggedIn = req.session.name === false
  if (isNotLoggedIn) {
    return {
      html: `
      <form action=/login method=post>
        <input type=text name=name>
        <button>Login</button>
      </form>`
    }
  }
}

async function fn (req) {
  let messages = await data.get({
    table: 'messages'
  })

  return {
    html: `
      <form action=/logout method=post>
        <button>Logout ${ req.session.name }</button>
      </form>

      <form action=/message method=post>
        <textarea name=msg></textarea>
        <button>Send message</button>
      </form>
      <div id="output"></div>

      <script>
        window.URL = "${ process.env.ARC_WSS_URL }";
        window.STATE = JSON.parse(atob("${ btoa(JSON.stringify({messages})) }"))
      </script>

      <script src=/_static/wss.js></script>
    `
  }
}
