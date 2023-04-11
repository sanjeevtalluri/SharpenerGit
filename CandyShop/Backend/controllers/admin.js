const Candy = require('../models/candy');


exports.getcandies = async (req,res,next)=>{

  try{
    const candies = await Candy.findAll();
    res.json(candies);
  }
  catch(err){
    res.json(err);
  }
}
exports.addcandy = async (req,res,next)=>{
  try{
    const candy = await Candy.create(req.body);
    if (candy) {
      res.json(candy);
     } else {
      res.status(500);
     }
  }
  catch(err){
    res.json(err);
  }
}

exports.updatecandy = async (req,res,next)=>{
  try{
    const candy = await Candy.findByPk(req.params.candyId);
    if (candy) {
      candy.name =  req.body.name;
      candy.description = req.body.description;
      candy.price = req.body.price;
      candy.quantity = req.body.quantity;
      await candy.save();
      res.json();
     } else {
      res.status(500);
     }
  }
  catch(err){
    res.json(err);
  }
}


