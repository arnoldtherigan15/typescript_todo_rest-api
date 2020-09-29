'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "invalid email format"
        },
        notEmpty: {
          msg: "email is required"
        }
      },
      unique: {
        args: true,
        msg: "email is being used"
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "password is required"
        },
        len: {
          args: [6],
          msg: "password minimal 6 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        const SALT = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, SALT)
      }
    }
  });
  return User;
};