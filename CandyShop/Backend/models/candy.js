const sequelize = require('../util/database');
const Sequelize = require('sequelize');


const Candy = sequelize.define('candy',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type:Sequelize.STRING,
    allowNull: false,
  },
  description:{
    type:Sequelize.STRING,
    allowNull: false,
  },
  price:{
    type:Sequelize.DOUBLE,
    allowNull: false,
  },
  quantity:{
    type:Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      min:0
    }
  },
})

module.exports = Candy;
