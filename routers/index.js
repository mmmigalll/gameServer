
module.exports = function(app){

    app.get('/', function(req, res, next){
        res.sendFile(path.join('index.html'));
    });

    app.get('/move/:x/:y', function(req, res, next){
        var x = req.params.x;
        var y = req.params.y;
    });

    app.get('/fight', function(req, res, next){
        var x = req.params.x;
        var y = req.params.y;
    });
};