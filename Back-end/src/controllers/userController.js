const User = require("../models/userModel");

exports.createUser = (async (req, res, next) => {
    if (!req.body) {
        return next(res.status(400).send({message : "body not found"}));
    }
    const user = await User.create(req.body);
    res.status(201).send(user); 
});

exports.login = (async (req, res, next) => {
    if (!req.body) {
        return next(res.status(400).send({message : "body not found"}));
    }
    await User.findOne({login : req.body.login})
               .then((user) => {
                   if(user){
                       let compare = (user.pass == req.body.pass)
                       if(compare){
                        next(res.status(201).send({ login : user.login }));
                       };
                       next(res.status(400).send({message : "user not found"})); 
                    };
                    next(res.status(400).send({message : "user not found"})); 
               })
});

