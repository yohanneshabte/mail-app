var Mail = require('../models/mail'),
    DateDiff = require('date-diff');
    /*new Mail({
        to: "testuser14",
        from: "Wells Fargo, 1801 S Minnesota Ave, Sioux Falls, SD 57105",
        recievedDate: new Date(),
    }).save().then(function(newMail) {
        console.log("Mail created: "+newMail);
    });*/

    //flag(include picked up mail): all, history, new
    var MailH = {
        fetchMailByUser: function(username, callback, flag){
            if(flag == 'all' || typeof flag === 'undefined')
                Mail.find({ to : username }, function(err, mails) {
                    for(var i=0;i<mails.length;i++)
                        mails[i].dateDiff = Date.diff(new Date(), mails[i].recievedDate).hours(); 
                    callback(mails);
                });
            else
            {
                if(flag=='history') flag = true;
                else flag = false;
                Mail.find({ to : username, pickedup: flag }, function(err, mails) {
                    for(var i=0;i<mails.length;i++)
                        mails[i].dateDiff = Date.diff(new Date(), mails[i].recievedDate).hours();
                    callback(mails);
                });
            }
    }
}
  
 
module.exports = MailH;    