const express = require('express');
const router = express.Router();
const Voo = require('../models/voo.js');

router.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
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

router.get('/:id', getVoo, (req, res, next) => {
  res.json(res.Voo);
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

router.put('/:id', getVoo, async (req,res,next) =>{
    if (req.Voo.companhia != null){
        res.Voo.companhia = req.body.companhia;
    }

    if (req.Voo.aeroportoIda != null){
        res.Voo.aeroportoIda = req.body.aeroportoIda;
    }

    if (req.Voo.aeroportoVolta != null){
        res.Voo.aeroportoVolta = req.body.aeroportoVolta;
    }

    if (req.Voo.dataIda != null){
        res.Voo.dataIda = req.body.dataIda;
    }

    if (req.Voo.dataVolta != null){
        res.Voo.dataVolta = req.body.dataVolta;
    }

    if (req.Voo.horaIda != null){
        res.Voo.horaIda = req.body.horaIda;
    }

    if (req.Voo.horaVolta != null){
        res.Voo.horaVolta = req.body.horaVolta;
    }

    try {
        const updatedVoo = await res.Voo.save();
        res.json(updatedVoo);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

router.delete('/:id', getVoo, async (req, res, next) => {
    try {
      await res.Voo.deleteOne();
      res.json({ message: 'Voo excluído com sucesso!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getVoo(req, res, next) {
    try {
      const Voo = await Voo.findById(req.params.id);
      if (Voo == null) {
        return res.status(404).json({ message: 'Voo não encontrado' });
      }
      res.Voo = Voo;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  
  module.exports = router;