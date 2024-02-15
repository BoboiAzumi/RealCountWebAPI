const { WebSocketServer } = require("ws");

async function ws(event){
    const ws = new WebSocketServer({port: 1001});

    ws.on("connection", (wss) => {
        wss.on("message", (data) => {

        })
    })
}