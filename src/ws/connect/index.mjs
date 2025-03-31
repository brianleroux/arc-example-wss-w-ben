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
  let connections = await data.get({
    table: 'connections'
  })
  console.log(connections)
  return { statusCode: 200 }
}
