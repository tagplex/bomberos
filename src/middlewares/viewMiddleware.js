function viewMiddleware(req, res, next){
    if (req.session.userLogged.id_rol == 1 || req.session.userLogged.id_rol == 2) {
        next();
    } else {
        res.render('404.ejs')
    }
}

module.exports = viewMiddleware;