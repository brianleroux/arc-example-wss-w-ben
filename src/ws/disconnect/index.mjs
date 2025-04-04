import arc from '@architect/functions'
import data from '@begin/data'

export let handler = arc.http(fn)

async function fn (req) {
  await data.destroy({
    table: 'connections',
    key: req.requestContext.connectionId,
  })
  await data.destroy({
    table: 'connections-by-name',
    key: req.session.name
  })
  return { statusCode: 200 }
}
