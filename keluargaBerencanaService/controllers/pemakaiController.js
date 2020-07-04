'use strict';

const response = require('../res');
const connection = require('../config/db');

exports.findAllNamePemakai = function(req, res) {
    connection.query('SELECT Id_list, Nama_Propinsi, Nama_kontrasepsi, Jumlah_Pemakai FROM list_pemakai_kontrasepsi' +
        ' pk' +
        ' JOIN List_Propinsi p ON pk.Id_Propinsi = p.Id_Propinsi JOIN List_Kontrasepsi k ON k.Id_Kontrasepsi =' +
        ' pk.Id_Kontrasepsi ',
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
}

exports.findAllPemakai = function(req, res) {
    connection.query('SELECT * FROM list_pemakai_kontrasepsi',
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
}

exports.findIdPemakai = function(req, res) {
    const Id_List = req.params.Id_List;
    connection.query('SELECT * FROM list_pemakai_kontrasepsi where Id_List = ?',
        [ Id_List ],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
};

exports.createPemakai = function(req, res) {
    const Id_Propinsi = req.body.Id_Propinsi;
    const Id_Kontrasepsi = req.body.Id_Kontrasepsi;
    const Jumlah_Pemakai = req.body.Jumlah_Pemakai;

    connection.query
    ('INSERT INTO list_pemakai_kontrasepsi (Id_Propinsi, Id_Kontrasepsi, Jumlah_Pemakai) values (?,?,?)',
        [Id_Propinsi, Id_Kontrasepsi, Jumlah_Pemakai],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("Data berhasil di tambah!", res)
            }
        });
};

exports.updatePemakai = function(req, res) {
    const Id_List = req.params.Id_List;

    const Id_Propinsi = req.body.Id_Propinsi;
    const Id_Kontrasepsi = req.body.Id_Kontrasepsi;
    const Jumlah_Pemakai = req.body.Jumlah_Pemakai;

    connection.query
    ('UPDATE list_pemakai_kontrasepsi SET Id_Propinsi = ?, Id_Kontrasepsi = ?, Jumlah_Pemakai' +
        ` = ?  WHERE Id_List = ?`,
        [ Id_Propinsi, Id_Kontrasepsi, Jumlah_Pemakai, Id_List ],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("data berhasil di rubah!", res)
            }
        });
};

exports.deletePemakai = function(req, res) {
    const Id_List = req.params.Id_List;

    connection.query('DELETE FROM list_pemakai_kontrasepsi WHERE Id_List = ?',
        [ Id_List ],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("data berhasil di hapus!", res)
            }
        });
};
