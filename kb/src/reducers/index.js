import {combineReducers} from 'redux';
import {addPropinsi, deletePropinsiById, editPropinsi, findPropinsiById, findPropinsis} from './propinsi';
import {addKontrasepsi,deleteKontrasepsiById,editKontrasepsi,findKontrasepsiById,findKontrasepsis} from './kontrasepsi';
import {addPemakai,deletePemakaiById,editPemakai,findPemakaiById,findPemakais} from './pemakai';

export default combineReducers({
    addPropinsi, deletePropinsiById, editPropinsi, findPropinsiById, findPropinsis,
    addKontrasepsi,deleteKontrasepsiById,editKontrasepsi,findKontrasepsiById,findKontrasepsis,
    addPemakai,deletePemakaiById,editPemakai,findPemakaiById,findPemakais
})
