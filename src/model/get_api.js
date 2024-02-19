const axios = require("axios");
const { JSDOM } = require("jsdom")

async function get_api(){
    try{
        let url_hhcw = "https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json";
        let url_wilayah = "https://sirekap-obj-data.kpu.go.id/wilayah/pemilu/ppwp/0.json";
        let url_ppwp = "https://sirekap-obj-data.kpu.go.id/pemilu/ppwp.json";
    
        let headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
    
        let [{data: hhcw}, {data: wilayah}, {data: ppwp}] = await Promise.all(
            [
                axios.get(url_hhcw, {headers: headers}),
                axios.get(url_wilayah, {headers: headers}),
                axios.get(url_ppwp, {headers: headers})
            ]
        )
        
        let chart = {};
        let total = 0;
        chart.paslon = [];
        chart.wilayah = [];

        Object.keys(hhcw.chart).forEach((v,i)=>{
            if(v in ppwp){
                total += parseFloat(hhcw.chart[v]);
            }
        })
        
        Object.keys(hhcw.chart).forEach((v,i)=>{
            if(v in ppwp){
                let paslon = Object.assign({}, ppwp[v]);
                paslon.suara = hhcw.chart[v];
                
                switch(i+1){
                    case 1:
                        paslon.image = "https://asset.kompas.com/data/2024/02/05/pemilu/desktop/images/widget/quick-count/paslon-1.png";
                        break;
                    case 2:
                        paslon.image = "https://asset.kompas.com/data/2024/02/05/pemilu/desktop/images/widget/quick-count/paslon-2.png";
                        break;
                    case 3:
                        paslon.image = "https://asset.kompas.com/data/2024/02/05/pemilu/desktop/images/widget/quick-count/paslon-3.png";
                        break;
                }

                paslon.persen = ((parseFloat(hhcw.chart[v]) / total) * 100).toFixed(2);
                
                chart.paslon.push(paslon);
            }
            if(v === "persen"){
                chart.persen = parseInt(hhcw.chart[v]);
            }
        })

        Object.keys(hhcw.table).forEach((v) => {
            let w_chunk = wilayah.filter((value) => value.kode == v)[0];
            let total = 0;
            w_chunk.progress = [];

            Object.keys(hhcw.table[v]).forEach(v_2 => {
                if(v_2 in ppwp){
                    total += parseFloat(hhcw.table[v][v_2]);
                }
            })

            Object.keys(hhcw.table[v]).forEach(v_2 => {
                if(v_2 in ppwp){
                    let paslon = Object.assign({}, ppwp[v_2]);
                    paslon.suara = hhcw.table[v][v_2];
                    paslon.persen = ((parseFloat(hhcw.table[v][v_2]) / total) * 100).toFixed(2);
                    w_chunk.progress.push(paslon);
                }
                if(v_2 === "psu"){
                    w_chunk.psu = hhcw.table[v][v_2];
                }
                if(v_2 === "persen"){
                    w_chunk.persen = hhcw.table[v][v_2];
                }
                if(v_2 === "status_progress"){
                    w_chunk.status_progress = hhcw.table[v][v_2];
                }
            })

            chart.wilayah.push(w_chunk);
        })
    
        return {status: "ok", result: chart};
    }
    catch(e){
        console.log("Error : "+e);
        return {status: "error", error: e.toString()};
    }
}

module.exports = {
    get_api
}