import arc from '@architect/functions'
import data from '@begin/data'

export let handler = arc.http(msg)

async function msg (req) {
  let m = await data.set({
    table: 'messages',
    key: new Date(Date.now()).toISOString(),
    msg: req.body.msg,
    name: req.session.name
  })
  const { connectionId } = await data.get({
    table: 'connections-by-name',
    key: req.session.name
  })
  const conns = await data.get({
    table: 'connections'
  })
  for (let c of conns) {
    try {
      await arc.ws.send({
        id: c.key,
        payload: m
      })
    }
    catch (e) {
      console.log('bad conn ignore')
    }
  }
  return { 
    location: '/'
  }
}
