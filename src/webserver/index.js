function webserver(event){
    const express = require("express");
    const path = require("path")

    const App = express()
    App.set("view engine", "ejs");
    App.set("views", path.join(__dirname, "/views"));
    App.use(express.static(path.join(__dirname, "public")));
    
    let result = {}
    event.on("error", (e) => {
        result = {};
        result.status = "error";
        result.e = e;
        result.lastcheck = new Date().toLocaleString("id-ID", {timeZone: 'Asia/Jakarta'});
        console.log(result);
    })

    event.on("get", (res) => {
        result = {};
        result = res;
        result.status = "ok"
        result.lastcheck = new Date().toLocaleString("id-ID", {timeZone: 'Asia/Jakarta'});
    })
    
    App.get("/", async (req, res) => {
        //let result = JSON.parse('[{"image":"https://asset.kompas.com/data/2024/02/07/pemilu/desktop/images/widget/quick-count/logo-litbang-kompas.png","qc":[{"paslon":1,"qc_percent":"24.70"},{"paslon":2,"qc_percent":"59.08"},{"paslon":3,"qc_percent":"16.22"}],"update":"14/02/2024 | 16:40 WIB","last_data":"70.95%"},{"image":"https://asset.kompas.com/data/2024/02/05/pemilu/desktop/images/widget/quick-count/logo-charta-politika.png","qc":[{"paslon":1,"qc_percent":"25.92"},{"paslon":2,"qc_percent":"57.64"},{"paslon":3,"qc_percent":"16.43"}],"update":"14/02/2024 | 16:44 WIB","last_data":"70.89%"},{"image":"https://asset.kompas.com/data/2024/02/05/pemilu/desktop/images/widget/quick-count/logo-indikator.png","qc":[{"paslon":1,"qc_percent":"25.61"},{"paslon":2,"qc_percent":"58.02"},{"paslon":3,"qc_percent":"16.37"}],"update":"14/02/2024 | 16:43 WIB","last_data":"69.47%"},{"image":"https://asset.kompas.com/data/2024/02/05/pemilu/desktop/images/widget/quick-count/logo-lsi.png","qc":[{"paslon":1,"qc_percent":"25.64"},{"paslon":2,"qc_percent":"57.08"},{"paslon":3,"qc_percent":"17.28"}],"update":"14/02/2024 | 16:40 WIB","last_data":"64.85%"},{"image":"https://asset.kompas.com/data/2024/02/05/pemilu/desktop/images/widget/quick-count/logo-poltracking.png","qc":[{"paslon":1,"qc_percent":"23.77"},{"paslon":2,"qc_percent":"59.49"},{"paslon":3,"qc_percent":"16.74"}],"update":"14/02/2024 | 16:43 WIB","last_data":"71.20%"},{"image":"https://asset.kompas.com/data/2024/02/05/pemilu/desktop/images/widget/quick-count/logo-populi.png","qc":[{"paslon":1,"qc_percent":"24.38"},{"paslon":2,"qc_percent":"59.65"},{"paslon":3,"qc_percent":"15.97"}],"update":"14/02/2024 | 16:42 WIB","last_data":"68.12%"}]');
        res.render("index", {result: result});
    })

    App.get("/api/", async (req, res) => {
        if(result.status === "error"){
            res.statusCode = 500;
        }
        res.send(JSON.stringify({data: result}));
    })

    App.listen(1000, () => console.log("Running 1000"))
}

module.exports = webserver