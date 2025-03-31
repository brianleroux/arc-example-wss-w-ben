@app
wss-test

@ws

@http
get /
post /login
post /logout
post /message

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
