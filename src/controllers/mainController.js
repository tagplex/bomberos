const { validationResult } = require("express-validator");
const db = require("../database/models");
const moment = require('moment');
const Op = db.Sequelize.Op;

const controladorMain ={
    index: (req, res) => {
        let today = moment(new Date()).utc().format("MM/DD/YYYY")
        let lastMonth = moment().subtract(1, 'months');
        let lastMonthConverted = lastMonth.format("MM/DD/YYYY");
                
        let users = db.User.count({ where: { state: 1 } });
        
        Promise.all([users])
        .then(function([users]){
            return res.render('index.ejs', { user: req.session.userLogged, users: users})
        }) 
    },
    test: (req, res) => {
        let location = db.Itemsvehicle.findAll({
            include: [
                { association: 'user', attributes: ['email','first_name','last_name','password','id_rol']},
                { association: 'vehicle', attributes: ['brand','PPU','year']},
                { association: 'typeitem', attributes: ['id','name']}
            ]} 
        )
        .then(function (location) {
            res.send(location)
        })
    }
}

module.exports = controladorMain;