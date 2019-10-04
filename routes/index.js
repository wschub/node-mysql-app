const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db');



router.get('/createtable',(req,res)=>{
   
  
  var sql = `
     CREATE TABLE agenda (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) DEFAULT NULL,
    address varchar(255) DEFAULT NULL,
    phone decimal(10,0) NOT NULL
    
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8
  `;
    mysqlConnection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

  res.send('created!');

});


router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM alumnos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});


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



router.post('/', (req, res) => {
  const {name, lastName, grupo} = req.body;

 
let alumno = [name,lastName,grupo];
let insertData = `INSERT INTO alumnos(name,lastName,grupo)
            VALUES(?,?,?)`;

mysqlConnection.query(insertData, alumno, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  res.json({ message:`Alumno matriculado`, })

});


});

router.put('/:id', (req, res) => {
  const { name, lastName, grupo } = req.body;
  const { id } = req.params;

  
  
  mysqlConnection.query('UPDATE alumnos SET name = ?, lastName = ?, grupo = ? WHERE id = ?', [name, lastName,grupo,id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Estudiante actualizado'});
    } else {
      console.log(err);
    }
  });
});


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



module.exports = router;