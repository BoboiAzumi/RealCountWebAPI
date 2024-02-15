const HookService = require("./src/model/hook_service");
const { event, hook_service } = require("./src/model/hook_service");
const webserver = require("./src/webserver");

const hookService = new HookService();

webserver(hookService.event);
/*
const axios = require("axios");

(async()=>{
    const { data: wilayah } = await axios.get("https://sirekap-obj-data.kpu.go.id/wilayah/pemilu/ppwp/0.json");
    const { data:capres } = await axios.get("https://sirekap-obj-data.kpu.go.id/pemilu/ppwp.json");
    const { data } = await axios.get("https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json");
    const clean = [];
    Object.keys(data.table).forEach((v) => {
        clean.push({ wilayah: wilayah.find(w => w.kode == v).nama, data: Object.keys(capres).map(c => {
            return {
                [capres[c].nama]: data.table[v][c]
            }
        }), status_progress: data.table[v].status_progress, psu: data.table[v].psu})
    });
    console.log(JSON.stringify(clean))
})();*/

//const { get_api } = require("./src/model/get_api");

//get_api().then((e)=> console.log(e))