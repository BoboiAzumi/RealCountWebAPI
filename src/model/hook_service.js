const { EventEmitter } = require("events");
const { get_api } = require("./get_api");

class HookService{
    constructor(){
        this.event = new EventEmitter()
        this.hook();
        setInterval(() => this.hook(), 120000);
    }

    async hook(){
        let get = await get_api();

        if(get.status === "error"){
            this.event.emit("error", get.error);
            return;
        }
        this.event.emit("get", get.result);
    }
}

module.exports = HookService