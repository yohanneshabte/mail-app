var Mail = require('../models/mail'),
    DateDiff = require('date-diff');
    /*new Mail({
        to: "testuser14",
        from: "Wells Fargo, 1801 S Minnesota Ave, Sioux Falls, SD 57105",
        recievedDate: new Date(),
        sender: "Amazon"
    }).save().then(function(newMail) {
        console.log("Mail created: "+newMail);
    });*/

    //flag(include picked up mail): all, history, new
    //this function might not be accurate
var dateDiffSmart = function(date1, date2) {
    var diff = {
        value: 0,
        type: ""
    };
    diff.value = Date.diff(date1, date2).seconds();
    diff.type = "secs";
    if (diff.value >= 60) {
        diff.value = Date.diff(date1, date2).minutes();
        diff.type = "mins";
        if (diff.value >= 60) {
            diff.value = Date.diff(date1, date2).hours();
            diff.type = "hours";
            if (diff.value >= 24) {
                diff.value = Date.diff(date1, date2).days();
                diff.type = "days";
                if (diff.value >= 7) {
                    diff.value = Date.diff(date1, date2).weeks();
                    diff.type = "weeks";
                    if (diff.value >= 4) {
                        diff.value = Date.diff(date1, date2).months();
                        diff.type = "months";
                        if (diff.value >= 12) {
                            diff.value = Date.diff(date1, date2).years();
                            diff.type = "years";
                        }
                    }
                }
            }
        }
    }
    
    //make type singular if value is 1
    diff.value = Math.round(diff.value);
    if(diff.value == 1)
        diff.type = diff.type.slice(0, -1);
    return diff;
}
var MailH = {
    fetchMailByUser: function(username, callback, flag) {
        if(flag == 'all' || typeof flag === 'undefined')
            Mail.find({ to : username }, null, {sort: '-recievedDate'}, function(err, mails) {
                for(var i=0;i<mails.length;i++) {
                    mails[i].dateDiff = dateDiffSmart(new Date(), mails[i].recievedDate); 
                    mails[i].new = mails[i].pickedup==false ? 'newmail':'test';
                }
                callback(mails);
            });
        else
        {
            var boolFlag;
            if(flag=='history') boolFlag = true;
            else boolFlag = false;
            Mail.find({ to : username, pickedup: boolFlag }, null, {sort: '-recievedDate'}, function(err, mails) {
                for(var i=0;i<mails.length;i++)
                    mails[i].dateDiff = dateDiffSmart(new Date(), mails[i].recievedDate);
                callback(mails);
                
            });
        }

    },
    pickupMail: function(id,callback) {
        Mail.update({ _id:id },{ $set: { pickedup: true }}, callback);
    },
    countNewMails: function(id, callback) {
        Mail.count({ _id:id, pickedup: 'false' }, callback);
    }
};
  

module.exports = MailH;    