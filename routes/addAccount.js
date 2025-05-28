const express = require("express")
const router = express.Router()
const config = require('config'); 
const host = config.get('server.host');
const api_host_root = config.get('server.api_host_root');
  
router.get("/", (req, res) => {
    res.render("addAccount/index", {
        api_host: api_host_root,
        site_root: host,
        title: "Add Account",
        layout: "./layouts/partial_pages"
    });
});


 

module.exports = router