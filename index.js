'use strict';

function get_pg_client(){
    var pg = require('pg');
    pg.defaults.ssl = true;
    var conString = process.env.DATABASE_URL;
    return new pg.Client(conString);
    
};

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
        res.send('Hello World!');
        });


app.get('/people', function(req,res){
        var client = get_pg_client();        
        var people = {};
        var err = {};        
        var q_name = req.query.name;
        
        client.connect(function(err) {
                       if(err) {
                        console.log(err);
                        res.json(err)
                       }
                       
                       });
        
        console.log("DB connected~~!")
        
        client.query('SELECT * FROM PEOPLE where full_name like \'%'+q_name+'%\'', function(err, result) {
                     if(err) {
                        return res.json(err);
                     }else {
                     if(result.rowCount > 0) {
                        people.full_name = result.rows[0].full_name;
                        people.title = result.rows[0].title;
                        people.title_link = result.rows[0].title_link;
                        people.color = result.rows[0].color;
                        people.thumb_url = result.rows[0].thumb_url;
                        return res.json(people);
                     };
                      return res.json(people);
                     }
                     });
        
        });

app.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Hi Zhu, Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});


app.post('/slack-test', function(req, res) {
    
    var action = req.body.result.action;
    
    var slack_message = welcome();
    
    if (req.body.result && req.body.result.parameters && req.body.result.parameters.TR) {
        slack_message = tr();
    }
    if (req.body.result && req.body.result.parameters && req.body.result.parameters.PRJ) {
        slack_message = bimbqm();        
    }
    if (req.body.result && req.body.result.parameters && req.body.result.parameters.JF) {
        slack_message = jf();        
    }

    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});

function jf(){
    return {
        "text": "John Finch",
        "attachments": [ {
            "title": "Chief Technology Officer, Financial and Risk at Thomson Reuters",
            "title_link": "https://uk.linkedin.com/in/john-finch-0a854920",
            "color": "#f49e42",
            "thumb_url": "https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAALhAAAAJGUzMmU1MjY4LWFkNTEtNDhmNi05YTM1LTlmZTVkZjBhNjIwOA.jpg"
        }]
    }
}

function welcome(){
    return {
        "text": "What can I help you?",
        "attachments": [ {
            "title": "TR BJOC Innovation Lab",
            "title_link": "https://www.thomsonreuters.cn/content/dam/openweb/images/china/artworked/Jinhui3.jpg",
            "color": "#f49e42",
            "thumb_url": "https://www.thomsonreuters.cn/content/dam/openweb/images/china/artworked/Jinhui3.jpg"
        }]
    }
}

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
