import express from 'express'

export class HTTPServer {
    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use('/', express.static('./client'))
    }

    register (method, endpoint, callback) {
        this.app[method](endpoint, async (request, response) => {
            const output = await callback(request.params, request.body)
            response.json(output)
        })
    }

    listen (port) {
        this.app.listen(port, () => console.log(`🚀 Server running on port ${port}!`))
    }
}