const Sequelize = require('sequelize');
const sequelize = new Sequelize('candy shop','root','root',{
    dialect:'mysql',
    host:'localhost'
})
module.exports = sequelize;