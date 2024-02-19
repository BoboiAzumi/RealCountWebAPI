const { get_api } = require("../get_api")
async function modeling_legacy(){
    // GET LSP
    const lsp = await get_api(wilayah, "lsp");

    // GET indikator
    const indikator = await get_api(wilayah, "indikator");

    // GET poltracking
    const poltracking = await get_api(wilayah, "poltracking");

    const model = {
        lsp : lsp,
        indikator : indikator,
        poltracking : poltracking
    }

    return model;
}

module.exports = {
    modeling
}