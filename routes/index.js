const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db');

// GET all Employees
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM alumnos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM alumnos WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });

});

// DELETE An Employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM alumnos WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Alumno eliminado!'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An Employee

router.post('/', (req, res) => {
  const {name, lastName, group} = req.body;
 
  
 const alumno = {
      'name':name,
    'lastName':lastName,
    'group':group
};
    
  mysqlConnection.query('INSERT INTO `alumnos` SET ?',alumno,(err, rows, fields) => {
    if(!err) {
      res.json({status: 'Alumno matriculado'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { name, lastName, group } = req.body;
  const { id } = req.params;

  const alumno = {
    'name':name,
  'lastName':lastName,
  'group':group
};
  
  mysqlConnection.query('UPDATE alumnos SET name = ?, lastName = ?, group = ? WHERE id = ?', [name, lastName,group,id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Estudiante actualizado'});
    } else {
      console.log(err);
    }
  });
});


module.exports = router;