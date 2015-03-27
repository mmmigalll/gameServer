
module.exports = function(app){

    app.get('/', function(req, res, next){
        res.sendFile(path.join('index.html'));
    });

    app.get('/move', function(req, res, next){

        var x = req.query.x;
        var y = req.query.y;

        res.render('index.html', {x: x, y: y});
     });

    app.get('/fight', function(req, res, next){
        var x = req.params.x;
        var y = req.params.y;
    });
};