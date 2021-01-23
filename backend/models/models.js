const configuration  = require('./../config/configuration.json');
const Sequelize = require('sequelize');

const DB_NAME = configuration.database.database_name;
const DB_USER = configuration.database.username;
const DB_PASS = configuration.database.password;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: 'localhost',
  dialect: 'mssql',
  port: '55892',
  define: {
      timestamps: false, 
       freezeTableName: true 
      }
  
});

sequelize.authenticate().then(() => {
    console.log('Database connection success!');
}).catch(err => {
    console.log(`Database connection error: ${err}`);
});

class User extends Sequelize.Model { }
User.init({
    id_user:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nume:{
        type:Sequelize.STRING,
        allowNull:false
    },
    role:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    
},{
    sequelize,
    modelName:'users'
});

class Project extends Sequelize.Model { }
Project.init({
    id_project:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
        
    },
    link:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    deadline: {
        type:Sequelize.DATE,
        allowNull:true
    }
},{
    sequelize,
    modelName:'projects'
})

class Member extends Sequelize.Model { }
Member.init({
    id_member:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_project:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName:'members'
})

class Nota extends Sequelize.Model{}
Nota.init({
    id_nota:{
        type:Sequelize.INTEGER,
        primaryKey:true,
     
        autoIncrement:true
        
    },
    link_commit:{
        type:Sequelize.STRING,
        allowNull:false
    },
    punctaj:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    data:{
        type:Sequelize.DATE,
        allowNull:true
    }
    
},{
    sequelize,
    modelName:'note'
})

Project.hasMany(Member, {foreignKey:'id_project', foreignKeyConstraint: true});
User.hasMany(Member, {foreignKey:'id_user', foreignKeyConstraint:true});
Project.hasMany(Nota, {foreignKey:'id_project', foreignKeyConstraint: true});
User.hasMany(Nota, {foreignKey: 'id_user', foreignKeyConstraint:true});

module.exports={
    sequelize, 
    User,
    Project,
    Member,
    Nota,
}

