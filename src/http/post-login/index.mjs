import arc from '@architect/functions'

export let handler = arc.http(login)

async function login (req) {
  let name = req.body.name.trim() || false
  return { 
    session: {name},
    location: '/'
  }
}
