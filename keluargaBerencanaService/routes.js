'use strict';

module.exports = function(app) {
    const propinsiController = require("./controllers/propinsiController");
    const kontrasepsiController = require("./controllers/kontrasepsiController");
    const pemakaiController = require("./controllers/pemakaiController");

    app.route('/props')
        .get(propinsiController.findAllPropinsi);
    app.route('/prop/:Id_Propinsi')
        .get(propinsiController.findIdPropinsi);
    app.route('/prop/add')
        .post(propinsiController.createPropinsi);
    app.route('/prop/edit/:Id_Propinsi')
        .put(propinsiController.updatePropinsi);
    app.route('/prop/delete/:Id_Propinsi')
        .delete(propinsiController.deletePropinsi);

    app.route('/kons')
        .get(kontrasepsiController.findAllKontrasepsi);
    app.route('/kon/:Id_Kontrasepsi ')
        .get(kontrasepsiController.findIdKontrasepsi);
    app.route('/kon/add')
        .post(kontrasepsiController.createKontrasepsi);
    app.route('/prop/update/:Id_Kontrasepsi ')
        .put(kontrasepsiController.updateKontrasepsi);
    app.route('/prop/delete/:Id_Kontrasepsi ')
        .delete(kontrasepsiController.deleteKontrasepsi);

    app.route('/pems').get(pemakaiController.findAllPemakai);
    app.route('/pem/:Id_List').get(pemakaiController.findIdPemakai);
    app.route('/pem/add').post(pemakaiController.createPemakai);
    app.route('/pem/update/:Id_List').put(pemakaiController.updatePemakai);
    app.route('/pem/delete/:Id_List').delete(pemakaiController.deletePemakai);
    app.route('/pemn').get(pemakaiController.findAllNamePemakai);
};
