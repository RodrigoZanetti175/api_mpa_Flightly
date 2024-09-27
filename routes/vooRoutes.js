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

router.get('/:id', getVoo, (req, res, next) => {
  res.json(res.voo);
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
    if (req.voo.companhia != null){
        res.voo.companhia = req.body.companhia;
    }

    if (req.voo.aeroportoIda != null){
        res.voo.aeroportoIda = req.body.aeroportoIda;
    }

    if (req.voo.aeroportoVolta != null){
        res.voo.aeroportoVolta = req.body.aeroportoVolta;
    }

    if (req.voo.dataIda != null){
        res.voo.dataIda = req.body.dataIda;
    }

    if (req.voo.dataVolta != null){
        res.voo.dataVolta = req.body.dataVolta;
    }

    if (req.voo.horaIda != null){
        res.voo.horaIda = req.body.horaIda;
    }

    if (req.voo.horaVolta != null){
        res.voo.horaVolta = req.body.horaVolta;
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
      await res.voo.deleteOne();
      res.json({ message: 'Voo excluído com sucesso!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getVoo(req, res, next) {
    try {
      const voo = await Voo.findById(req.params.id);
      if (voo == null) {
        return res.status(404).json({ message: 'Voo não encontrado' });
      }
      res.voo = voo;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  
  module.exports = router;