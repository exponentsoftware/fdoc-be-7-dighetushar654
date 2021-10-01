module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
      todotitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM('work','hobby','task')
      }
    });
  
    return Todo;
  };