// Initialize Sequelize

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
//create connection with database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate()
.then(() => {
  console.log("Postgres Database Connected...");
}).catch(err => {
  console.log("Error" +err);
})
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Todo = require("./todoModel.js")(sequelize, Sequelize);
db.User = require("./userModel.js")(sequelize, Sequelize);

db.User.hasMany(db.Todo,{foreignKey:'user_id', as:'todos'});
db.Todo.belongsTo(db.User,{foreignKey: "user_id",as:"users"});

module.exports = db;