const {Nota} = require("./../models/models");

const nota={
    create: async(nota) =>{
        try{
            const result=await Nota.create(nota);
            return result;
        }
        catch(err) {
            throw new Error(err.message);
        }
    },
    getAll: async() =>{
        try{
            const note=await Nota.findAll();
            return note;
        }
        catch(err)
        {
            throw new Error(err.message);
        }
    },
    delete: async (id) => {
        try{
            return await Nota.destroy({
                where:{
                    id_nota: id
                }
            });
        }
        catch(err) {
            throw new Error(err.message);
        }
    }
};

module.exports=nota;