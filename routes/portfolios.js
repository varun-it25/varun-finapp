// var person_Services = require("../model/person_model"); 

const express = require("express")
const router = express.Router()
const config = require('config'); 
const host = config.get('server.host');
const api_host_root = config.get('server.api_host_root');
 


router.get("/", (req, res) => {
    res.render("portfolios/index", {
        api_host: api_host_root,
        site_root: host,
        title: "Portfolio",
        layout: "./layouts/partial_pages"
    });
});




// // Gallary
// router.get("/person/gallery/list/:id", function (req, res) {
 
//     person_id = req.params.id
//     gallery_Services.get_all_images_by_user(person_id, function (result) {
//         lst_images = result 
         
//         rec_count = result.length;         
//         res.render('gallery/list', { api_host : api_host_root , site_root : host , title: 'Janta Portal - Gallery', layout: './layouts/full-width', "lst_images": lst_images,"person_id" : person_id, "rec_count": rec_count});
//     });
// });

 

module.exports = router