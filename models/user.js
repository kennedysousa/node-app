const bcrypt = require('bcrypt-nodejs');

'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlphanumeric: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'users'
    });

    User.addHook('beforeSave', (user, options, cb) => {
        const salt = bcrypt.genSaltSync(10);
        
        user.password = bcrypt.hashSync(user.password, salt);
    });

    User.prototype.comparePassword = function(candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) { return callback(err); }

            callback(null, isMatch);
        })
    }

    User.associate = function(models) {
        // associations can be defined here
    };


    return User;
};