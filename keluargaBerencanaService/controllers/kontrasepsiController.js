'use strict';

const response = require('../res');
const connection = require('../config/db');

exports.findAllKontrasepsi = function(req, res) {
    connection.query('SELECT * FROM list_kontrasepsi',
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
}

exports.findIdKontrasepsi = function(req, res) {
    const Id_Kontrasepsi = req.params.Id_Kontrasepsi;
    connection.query('SELECT * FROM list_kontrasepsi where Id_Kontrasepsi = ?',
        [ Id_Kontrasepsi ],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
};

exports.createKontrasepsi = function(req, res) {
    const Nama = req.body.Nama_Kontrasepsi;
    connection.query('INSERT INTO list_kontrasepsi (Nama_Kontrasepsi) values (?)',
        [Nama],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("Data berhasil di tambahkan!", res)
            }
        });
};

exports.updateKontrasepsi = function(req, res) {

    const Id_Kontrasepsi = req.params.Id_Kontrasepsi;
    const Nama = req.body.Nama_Kontrasepsi;

    connection.query('UPDATE list_kontrasepsi SET Nama_Kontrasepsi = ? WHERE Id_Kontrasepsi = ?',
        [ Nama, Id_Kontrasepsi ],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("Data berhasil di ubah!", res)
            }
        });
};

exports.deleteKontrasepsi = function(req, res) {
    const Id_Kontrasepsi = req.params.Id_Kontrasepsi;

    connection.query('DELETE FROM list_kontrasepsi WHERE Id_Kontrasepsi = ?',
        [ Id_Kontrasepsi ],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("Data berhasil di hapus!", res)
            }
        });
};
