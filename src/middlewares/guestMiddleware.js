function guestMiddleware(req, res, next){
    if(req.session.userLogged){
        return res.redirect("/home");
    }
    next();
}
module.exports = guestMiddleware;