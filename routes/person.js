var person_Services = require("../model/person_model"); 

const express = require("express")
const router = express.Router()
const config = require('config'); 
const host = config.get('server.host');
const api_host_root = config.get('server.api_host_root');
function get_overall_Performance() {
    return "POOR"
}

router.get("/person/list", function (req, res) {
    res.render('person/list', {  api_host : api_host_root ,site_root : host , title: 'Janta Portal - Person List', layout: './layouts/full-width'}); 
     
});

router.post('/person/list', (req,res,next) => {   
    
    
    rec_item = {}
    rec_item["state_name"] = req.body.drp_state ;    
    rec_item["city_name"] = req.body.drp_city;
    rec_item["pincode"] =  req.body.pincode;
    rec_item["department_id"] = req.body.drp_department; 
    rec_item["hdn_department"] = req.body.hdn_department; 
    rec_item["hdn_department_id"] = req.body.hdn_department_id; 

    console.log(rec_item)
    person_Services.get_person_list(rec_item, function(result){  
        
        res.render('person/list', { api_host : api_host_root , site_root : host , title: 'Janta Portal - Person List', layout: './layouts/full-width', "search_filter" : rec_item ,"user_details" : result});
     });  
    
}); 


router.get("/person/detail/:id", function (req, res) {
    person_id = req.params.id
    
    res.cookie('viewed',person_id,{
        maxAge: 5000,
        // expires works the same as the maxAge 
        secure: false,
        httpOnly: false,
        sameSite: 'lax'
    });
    
    person_Services.get_person_detail_by_ID(person_id, function (result) {
        user_detail = result

        page_title = "Janta Portal - " + user_detail[0].first_name + " " + user_detail[0].last_name + " - " + user_detail[0].designation + " "
        console.log(page_title)
        res.render('person/detail', { api_host : api_host_root , site_root : host , title: page_title , layout: './layouts/full-width', "user_detail": user_detail[0] });
    });
});


// Gallary
router.get("/person/gallery/list/:id", function (req, res) {
 
    person_id = req.params.id
    gallery_Services.get_all_images_by_user(person_id, function (result) {
        lst_images = result 
         
        rec_count = result.length;         
        res.render('gallery/list', { api_host : api_host_root , site_root : host , title: 'Janta Portal - Gallery', layout: './layouts/full-width', "lst_images": lst_images,"person_id" : person_id, "rec_count": rec_count});
    });
});


// Complaints
router.get("/person/complaint/list/:id", function (req, res) {
    
    person_id = req.params.id
    complaint_Services.get_All_Complaints_By_User(person_id, function (result) {
        lst_complaints = result 
        rec_count = result.length;
        overall_performance = get_overall_Performance();
        res.render('complaints/list', { api_host : api_host_root , site_root : host , title: 'Janta Portal - Complaints', layout: './layouts/full-width', "lst_complaints": lst_complaints,"person_id" : person_id, "rec_count": rec_count, "overall_performance": overall_performance });
    });
});

router.get("/person/complaint/detail/:id", function (req, res) {

    complaint_id = req.params.id
    complaint_Services.get_complaint_by_ID(complaint_id, function (result) {
        person_id = result[0].assigned_to
        res.render('complaints/detail', { api_host : api_host_root , site_root : host , title: 'Janta Portal - Complaint Detail', layout: './layouts/full-width', "complaint_details": result,"person_id" : person_id });
    });

});


// Feedback calls
router.get("/person/feedback/list/:id", function (req, res) {

    person_id = req.params.id
    dict_item = {"person_id" : person_id , "status" : "1"}
    feedback_Services.get_all_feedback_By_User(dict_item, function (result) {
        var lst_feedback = result
        rec_count = result.length;
        overall_performance = get_overall_Performance(); 
        console.log(lst_feedback)
        res.render('feedbacks/list', { api_host : api_host_root , site_root : host , title: 'Janta Portal - Feedbacks', layout: './layouts/full-width', "lst_feedback": lst_feedback, "rec_count": rec_count, "overall_performance": overall_performance });
    });
});


// Suggestions calls
router.get("/person/suggestion/list/:id", function (req, res) {

    person_id = req.params.id
    dict_item = {"person_id" : person_id , "status" : "1"}
    suggestion_Services.get_all_suggestion_By_User(dict_item, function (result) {
        var lst_suggestion = result
        rec_count = result.length;
        overall_performance = get_overall_Performance();        
        res.render('suggestions/list', { api_host : api_host_root , site_root : host , title: 'Janta Portal - Suggestions', layout: './layouts/full-width', "lst_suggestion": lst_suggestion, "rec_count": rec_count, "overall_performance": overall_performance });
    });
});

// Activities calls
router.get("/person/activity/list/:id", function (req, res) {
    person_id = req.params.id
    dict_item = {"person_id" : person_id , "status" : "1"}
    person_Services.get_all_activity_By_user_ID(dict_item, function (result) {
        var lst_activity = result
        rec_count = result.length;
        overall_performance = get_overall_Performance();         
        res.render('person_activity/list', { api_host : api_host_root , site_root : host , title: 'Janta Portal - Social Activity', layout: './layouts/full-width', "lst_activity": lst_activity, "rec_count": rec_count, "overall_performance": overall_performance });
    });
});



// Survey List

router.get("/person/survey/list/:id", function (req, res) { 
    person_id = req.params.id
    dict_item = {"person_id" : person_id , "status" : "1"}
    survey_Services.get_survey_list(dict_item, function (result) {
        var lst_survey = result
        rec_count = result.length;         
        res.render('survey/list', {  api_host : api_host_root ,site_root : host , title: 'Janta Portal - Survey', layout: './layouts/full-width', "lst_survey": lst_survey,"person_id" : person_id, "rec_count": rec_count});
    });
});

router.get("/person/survey/detail/:id", function (req, res) { 
    dict_item = {}
     
    dict_item["survey_id"] = req.params.id
    dict_item["status"] = "1" 

    survey_Services.get_questions_by_survey_id(dict_item, function (result) {
        var survey_questions = result;
        rec_count = result.length; 
         
        res.render('survey/detail', { api_host : api_host_root , site_root : host , title: 'Janta Portal - Survey', layout: './layouts/full-width', "survey_questions": survey_questions,"survey_id" : dict_item.survey_id,"audiance_count" : "1000"});
    });
});

router.get("/person/survey/:person_id/:id", function (req, res) { 
    dict_item = {}
    
    dict_item["person_id"] = req.params.person_id
    dict_item["survey_id"] = req.params.id
    dict_item["status"] = "1" 

    survey_Services.get_survey_by_id(dict_item, function (result) {
        var survey_questions = result;
        rec_count = result.length; 
         
        res.render('survey/run_survey', { api_host : api_host_root ,site_root : host ,  title: 'Janta Portal - Survey', layout: './layouts/landing_survey', "survey_questions": survey_questions,"survey_id" : dict_item.survey_id,"user_id" : dict_item["person_id"] });
    });
});

router.get("/person/createpage", function (req, res) { 
    res.render('person/create_page', { api_host : api_host_root , site_root : host , title: 'Create Your Page', layout: './layouts/full-width'});
}); 

module.exports = router