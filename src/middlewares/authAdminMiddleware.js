function authAdminMiddleware(req, res, next){
    if (req.session.userLogged.id_rol == 1) {
        next();
    } else {
        res.render('404.ejs')
    }
}

module.exports = authAdminMiddleware;