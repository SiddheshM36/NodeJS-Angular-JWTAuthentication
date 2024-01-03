//db connection
const Sequelize = require('sequelize')

//db configurations
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_dialect,
    logging: false,
    define: {
        timestamps: false,                         //to skip createdby and updatedby date in table
        freezeTableName: true,                      //to gave actual name of model to the table
      },
      operatorsAliases: false,
})

// db authentication
sequelize.authenticate()
.then(()=>{
    //listening port
    console.log('db connected success')
}).catch(err=>{
    console.log(err)
})


//creating model
sequelize.sync({ force : false }).then(result=>{              //force true will drop the table and create again
    console.log('Table created')
}).catch(err=>{
    console.log(err)
})

module.exports = sequelize