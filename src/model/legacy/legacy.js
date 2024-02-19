const axios = require("axios");
const { JSDOM } = require("jsdom")

async function get_api_legacy(wilayah, lembaga){
    let url = `https://pemilu.bisnis.com/select-wilayah?wilayah=${wilayah}&lembaga=${lembaga}`;
    try{
        let get = await axios(url);
        return get.data;
    }
    catch(e){
        console.log("ERROR "+e);
        return null;
    }
}

async function get_api_kompas(){
    let url = "https://pemilu.kompas.com/quickcount";
    let headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
    }
    let result = [];
    try{
        let get = await axios(url, headers);
        let dom = new JSDOM(get.data);

        let items = dom.window.document.getElementsByClassName("qcResult__item");

        for(let i = 0; i < items.length; i++){
            let res = {};
            // Get Instance Image
            let image = items[i].getElementsByTagName("img")[0].getAttribute("src");
            res.image = image
            
            // Get quickcount percent
            let qc = items[i].getElementsByClassName("qcResult__percent");
            res.qc = [];

            for(let j = 0; j < qc.length; j++){
                res.qc.push({
                    paslon: j+1,
                    qc_percent: qc[j].getAttribute("data-target")
                })
            }

            // Get last update info
            let vote_info = items[i].getElementsByClassName("qcResult__vote__item");
            let update = vote_info[0].textContent.replace("Update", "").trim();
            let last_data = vote_info[1].textContent.replace("Data Masuk", "").trim();
            res.update = update;
            res.last_data = last_data;

            result.push(res);
        }

        return {status: "ok", result: result};
    }
    catch(e){
        console.log("Error : "+e);
        return {status: "error", error: e.toString()};
    }
}