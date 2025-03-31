import arc from '@architect/functions'

export let handler = arc.http(logout)

async function logout (req) {
  return { 
    session: {name: false},
    location: '/'
  }
}
