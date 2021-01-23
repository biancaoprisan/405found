const db=require("./backend/models/models");
db.sequelize.sync({force:true}).then(async()=>{
    console.log('tablesCreated');
    
    let user=await db.User.create({
        nume:'Popescu Maria',
        role:'student',
        email:'maria@gmail.com',
        password:'password'
    });

    let project=await db.Project.create({
        link:'https://www.google.com/',
        name:'Worldwide'
        
    });

    
    // await db.Nota.create({
    //     link_commit:"https://git"
    //     punctaj:10,
    //     data:'10-10-2018',
    //     id_user:user.id_user,
    //     id_project:project.id_project

    // })
    await db.Member.create({
        id_project:project.id_project,
        id_user:user.id_user
    })
}).catch(()=>{
    console.log('could not create tables');
})