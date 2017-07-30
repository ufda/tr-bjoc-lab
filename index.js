'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "ZZS: Seems like some problem. Speak again."
    var action = req.body.result.action;
    return res.json({
        speech: 'action:'+action+';echo:'+speech,
        displayText: 'ZZS:'+speech,
        source: 'webhook-echo-sample'
    });
});

restService.post('/slack-test', function(req, res) {
    
    var action = req.body.result.action;
    
    var slack_message = tr();
    
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});

function tr(){
    return {
        "text": "The Answer Company",
        "attachments": [ {
            "title": "Board of Directors",
            "title_link": "https://www.thomsonreuters.com/en/about-us/board-of-directors.html",
            "color": "#f49e42",
            "thumb_url": "https://www.thomsonreuters.com/content/dam/openweb/images/corporate/16-9/bio-photos/david-thomson.jpg/_jcr_content/renditions/cq5dam.thumbnail.370.208.png"
        },
        {
            "title": "Executive Team",
            "title_link": "https://www.thomsonreuters.com/en/about-us/executive-team.html",
            "color": "#f49e42",
            "thumb_url": "https://www.thomsonreuters.com/content/dam/openweb/images/corporate/16-9/bio-photos/James-Smith.jpg/_jcr_content/renditions/cq5dam.thumbnail.370.208.png"        
        }]
    }
}

function bimbqm(){
    return {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.thomsonreuters.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.thomsonreuters.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
}



restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
