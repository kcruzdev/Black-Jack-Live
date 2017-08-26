module.exports = function(sequelize, DataTypes){
    var blackjack = sequelize.define("blackjack",{
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        bank: {type: DataTypes.FLOAT, defaultValue:1000.00}
    });
    return blackjack
}