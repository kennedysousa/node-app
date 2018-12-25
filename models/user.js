'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'users'
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};