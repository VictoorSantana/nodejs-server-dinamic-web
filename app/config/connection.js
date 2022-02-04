const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_TYPE,

    define: {
        timestamps: process.env.DATABASE_DEFINE_TIMESTAMPS,        
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: process.env.DATABASE_POOL_ACQUIRE,
        idle: process.env.DATABASE_POOL_IDLE
      }
      
});
  