import arc from '@architect/functions'
import data from '@begin/data'

export let handler = arc.http(msg)

async function msg (req) {
  await data.set({
    table: 'messages',
    key: new Date(Date.now()).toISOString(),
    msg: req.body.msg
  })
  return { 
    location: '/'
  }
}
