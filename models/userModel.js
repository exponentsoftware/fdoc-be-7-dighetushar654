module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      Username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail:true
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
          type: Sequelize.ENUM('Admin', 'user')
      }
    });
  
    return User;
  };