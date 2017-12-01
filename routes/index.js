//setup routes
exports.home = function(req, res) {
    res.render('index', {
        title : "Mail Management"
    });
};

exports.notFound = function(req, res) {
    res.send("404.html");
};