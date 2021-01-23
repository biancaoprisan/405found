const notaService =require("./../service/notaService");

const createNota=async (req,res)=>{
    const nota=req.body;
    if(nota.link_commit && nota.punctaj){
       const result=await notaService.create(nota);
       res.status(201).send({
           message:'Grade create successfully'
       });
       
    }else{
        res.status(400).send({
            message:'Invalid grade payload.'
        })
    }
};

const getAllNote = async (req, res, next) => {
    try {
        const note = await notaService.getAll();
        res.status(200).send(note);
    } catch(err) {
        res.status(500).send({
            message: `Error occured: ${err.message}`
        });
    }
};

const deleteNota = async (req, res) => {
    try {
        await nota.Service.delete(req.params.id);
        res.status(200).send();
    } catch(err) {
        res.status(500).send({
            message: `Error occured: ${err.message}`
        });
    }
};

module.exports={
    createNota,
    getAllNote,
    deleteNota
};