'use strict';

const response = require('../res');
const connection = require('../config/db');

exports.findAllPropinsi = function(req, res) {
    connection.query('SELECT * FROM list_propinsi',
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
}

exports.findIdPropinsi = function(req, res) {
    const Id_Propinsi = req.params.Id_Propinsi;
    connection.query('SELECT * FROM list_propinsi where Id_Propinsi = ?',
        [ Id_Propinsi ],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
};

exports.createPropinsi = function(req, res) {
    const Nama = req.body.Nama_Propinsi;
    console.log(req.body)
    connection.query('INSERT INTO list_propinsi (Nama_Propinsi) values (?)',
        [Nama],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("Data berhasil di tambah!", res)
            }
        });
};

exports.updatePropinsi = function(req, res) {

    const Id_Propinsi = req.params.Id_Propinsi;
    const Nama = req.body.Nama_Propinsi;

    connection.query('UPDATE list_propinsi SET Nama_Propinsi = ? WHERE Id_Propinsi = ?',
        [ Nama, Id_Propinsi ],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("Data berhasil di ubah!", res)
            }
        });
};

exports.deletePropinsi = function(req, res) {
    const Id_Propinsi = req.body.Id_Propinsi;

    connection.query('DELETE FROM list_propinsi WHERE Id_Propinsi = ?',
        [ Id_Propinsi ],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("Data berhasil di hapus!", res)
            }
        });
};
