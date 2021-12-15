const BloodBank = require("../models/bloodBankModel");

exports.insertBlood = (async (req, res, next) => {
    if (!req.body) {
        return next(res.status(400).send({message : "body not found"}));
    }
    const bank = await BloodBank.create(req.body);
    res.status(201).send(bank);
       
});

exports.getAll = (async (req, res, next) => {
    const all = await BloodBank.find()
    if (!all) {
        return next(res.status(400).send({message : "empty"}));
     }
    res.status(200).send(all);
});

exports.transferBlood = (async (req, res, next) => {
    if (!req.body) {
        return next(res.status(400).send({message : "body not found"}));
    }
    const cat = await req.body.category;
    const subCat = await req.body.subCategory;
    const qt = await req.body.quantity;
    const cF = await req.body.cityFrom;
    const cT = await req.body.cityTo;
    const from = await BloodBank.findOne({category: cat, subCategory: subCat, city : cF});
    const qtFrom = from.quantity;
    if (qt > qtFrom) {
        return next(res.status(400).send({message : "insufficient amount"}));
    }
    await BloodBank.findOneAndUpdate({category: cat, subCategory: subCat, city : cF},{$set:{quantity:qtFrom - qt}}, {new: true});
    const to = await BloodBank.findOne({category: cat, subCategory: subCat, city : cT});
    const qtTo = to.quantity;
    await BloodBank.findOneAndUpdate({category: cat, subCategory: subCat, city : cT},{$set:{quantity:qtTo + qt}}, {new: true});
    res.status(200).send({message : "done"});
});

exports.getCount = (async (req, res, next) => {
    const num = await BloodBank.findOne({category: req.params.cat, subCategory:req.params.subcat, city : req.params.c})
    if (!num) {
        return next(res.status(400).send({message : "No blood"}));
     }
    const quantity = num.quantity 
    res.status(200).send({quantity});
});

exports.getPourcentage = (async (req, res, next) => {
    const num = await BloodBank.findOne({category: req.params.cat, subCategory:req.params.subcat, city : req.params.c})
    if (!num) {
        return next(res.status(400).send({message : "No blood"}));
     }
    const p = req.params.p;
    const quantity = Math.trunc((num.quantity * p) / 100);
    res.status(200).send({quantity});
});