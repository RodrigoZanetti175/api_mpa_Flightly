const express = require('express');
const router = express.Router();
const Voo = require('../models/voo.js');

// router.use(function(req, res, next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })
// Rota para obter todos os contatos
router.get('/', async (req, res, next) => {
  try {
    const voos = await Voo.find();
    res.json(voos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um contato por ID

router.get('/:id',  async (req, res, next) => {
  const { id } = req.params;

  try{
  const voo = await Voo.findById(id);
  if(!voo)
    res.status(404).send({message: "Voo não encontrado"})
  res.status(200).send({message: "Voo encontrado com sucesso", item: voo})
  }
  catch(err)
  {
  res.status(400).send({message: err.message})
  }
});

router.post('/', async (req, res, next) => {
    const voo = new Voo({
      companhia: req.body.companhia,
      aeroportoIda: req.body.aeroportoIda,
      dataIda: req.body.dataIda,
      horaIda: req.body.horaIda,
      aeroportoVolta: req.body.aeroportoVolta,
      dataVolta: req.body.dataVolta,
      horaVolta: req.body.horaVolta,
    });
  
    try {
      const newVoo = await voo.save();
      res.status(201).json(newVoo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

router.put('/:id',  async (req,res) =>{
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedVoo = await Voo.findByIdAndUpdate(id, updates, { new: true, runValidators: true})
        if(!updatedVoo)
          res.status(404).send({message: "Voo não encontrado"})
        res.status(200).send({message: "Voo alterado com sucesso", item: updatedVoo})
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

router.delete('/:id',  async (req, res) => {
  const { id } = req.params;  
  try {
      const deletedVoo = await Voo.findByIdAndDelete(id)

      if(!deletedVoo)
        return res.status(404).send({ message: 'Voo não encontrado'})
      res.status(200).send({ message: 'Voo excluído com sucesso!', item: deletedVoo });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;