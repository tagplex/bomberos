let db = require("../database/models");

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;
    let emailInCookie = "";
    if(req.cookies.email) emailInCookie = req.cookies.email;
    db.User.findOne({where:{email: emailInCookie}})
    .then((userFromCookie) => {
        if(userFromCookie){
            req.session.userLogged = userFromCookie;
        }
        if(req.session && req.session.userLogged){
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged
        }
        next();
    })
    .catch((error)=>{
        console.log(error)
    })
}
module.exports = userLoggedMiddleware;