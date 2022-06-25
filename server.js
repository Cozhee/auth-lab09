const express = require('express')
const app = express()
const routes = require('./routes/routes')

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(routes)


function start() {
    app.listen(PORT,() => console.log(`Listening on port ${PORT}`))
}

module.exports = { server: app, start }