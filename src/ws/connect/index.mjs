import arc from '@architect/functions'
import data from '@begin/data'

export let handler = arc.http(fn)

async function fn (req) {
  await data.set({
    table: 'connections',
    key: req.requestContext.connectionId,
    name: req.session.name,
    ttl: 7200
  })
  await data.set({
    table: 'connections-by-name',
    key: req.session.name,
    connectionId: req.requestContext.connectionId,
    ttl: 7200
  })
  return { statusCode: 200 }
}
