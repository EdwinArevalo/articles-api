let db = require('../models/database');
var fs = require('fs');

let articulos = {
  listar( req, res ){
    let sql = "SELECT * FROM articulos";
    db.query(sql,function(err, result){
      if( err ){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(result);
      }
    });
  },
  
  store( req, res ){

    var file = req.files.file;
    var tmp_path = file.path;
    var target_path = './public/images/' + file.name;
    //console.log(tmp_path);
    console.log(target_path);
    console.log(file.name);
    let nombre_archivo = file.name;
    let ruta_archivo = target_path;

    fs.copyFile(tmp_path,target_path,function(err)
    {
        if (err) throw err;        
        fs.unlink(tmp_path, function() {
          if (err) throw err;
          res.status(200).send('File uploaded to: ' + target_path);          
        });
            
    });  
    val_nombre = req.body.nombre;
    val_tipo = req.body.tipo;
    val_precio = req.body.precio;
    val_stock = req.body.stock;
    let sql = "INSERT INTO articulos(nombre, tipo, precio, stock, nombre_archivo, ruta_archivo) VALUES(?,?,?,?,?,?)";
    db.query(sql,[val_nombre, val_tipo, val_precio, val_stock, nombre_archivo, ruta_archivo],function(err, newData){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        //res.json(newData);
      }
    });
  },


  show( req, res ){
    val_id = req.params.id;
    let sql = "SELECT * FROM articulos WHERE id=?";
    db.query(sql,[val_id],function(err, rowData){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(rowData);
      }
    });
  },
  edit( req, res ){
    val_id = req.body.id;
    val_nombre = req.body.nombre;
    val_tipo = req.body.tipo;
    val_precio = req.body.precio;
    val_stock = req.body.stock;
    let sql = "UPDATE articulos SET nombre=?, tipo=?, precio=?, stock=? WHERE id=?";
    db.query(sql,[val_nombre, val_tipo, val_precio, val_stock, val_id],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.json(newData);
      }
    });
  },
  delete( req, res ){
    val_id = req.params.id;
    let sql = "DELETE FROM articulos WHERE id=?";
    db.query(sql,[val_id],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  }
}

module.exports = articulos;
