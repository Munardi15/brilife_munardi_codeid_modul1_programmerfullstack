import{
    ADD_KONTRASEPSI_FAILURE, ADD_KONTRASEPSI_REQUEST, ADD_KONTRASEPSI_SUCCESS,
    DELETE_KONTRASEPSI_FAILURE,DELETE_KONTRASEPSI_REQUEST, DELETE_KONTRASEPSI_SUCCESS,
    FIND_KONTRASEPSI_FAILURE, FIND_KONTRASEPSI_REQUEST, FIND_KONTRASEPSI_SUCCESS,
    FIND_KONTRASEPSIS_FAILURE, FIND_KONTRASEPSIS_REQUEST, FIND_KONTRASEPSIS_SUCCESS,
    UPDATE_KONTRASEPSI_FAILURE, UPDATE_KONTRASEPSI_REQUEST, UPDATE_KONTRASEPSI_SUCCESS
} from "./contans"
import {commonAxios} from  '../utils/apiUtils';
import Swal from 'sweetalert2';

function sleep(delay, value) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay, value);
    });
}

export const deleteById = (id) =>
    (dispatch) => {
        dispatch({ type: DELETE_KONTRASEPSI_REQUEST });

        commonAxios.delete(`kon/delete/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(deleteKontrasepsiSuccess(data));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(deleteKontrasepsiFailure(error));
                Swal.fire(
                    'Ops!',
                    'Delete process went wrong.',
                    'error'
                )
            });
    };


export const findById = (id) =>
    (dispatch) => {

        dispatch({ type: FIND_KONTRASEPSI_REQUEST });

        commonAxios.get(`kon/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findKontrasepsiSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(findKontrasepsiFailure(error));
            });
    };

export const add = (item) =>
    (dispatch) => {
        dispatch({ type: ADD_KONTRASEPSI_REQUEST });
        commonAxios.post(`kon/add`,item)
            .then(data => {
                dispatch(addKontrasepsiSuccess(data));
                Swal.fire(
                    'Added!',
                    'Your file has been added.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(addKontrasepsiFailure(error));
                Swal.fire(
                    'Ops!',
                    `Adding process went wrong.`,
                    'error'
                );
            });
    };

export const edit = (item) =>
    (dispatch) => {
        dispatch({ type: UPDATE_KONTRASEPSI_REQUEST });
        commonAxios.put(`kon/edit/${item.id}`, item )
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(editKontrasepsiSuccess(data));
                Swal.fire(
                    'Edited!',
                    'Your file has been edited.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(editKontrasepsiFailure(error));
                Swal.fire(
                    'Ops!',
                    'Adding process went wrong.',
                    'error'
                );
            });
    };



export const findAll = () =>
    (dispatch) => {
        dispatch({
            type: FIND_KONTRASEPSIS_REQUEST
        });
        commonAxios.get('kons')
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findKontrasepsisSuccess(data));
            })
            .catch(error => {
                dispatch(findKontrasepsisFailure(error));
            });
    };

function findKontrasepsiSuccess(data) {
    return {
        type: FIND_KONTRASEPSI_SUCCESS,
        data: data
    }
}

function findKontrasepsisSuccess(data) {
    return {
        type: FIND_KONTRASEPSIS_SUCCESS,
        data: data
    }
}

function findKontrasepsiFailure(error) {
    return {
        type: FIND_KONTRASEPSI_FAILURE,
        error: error
    }
}

function findKontrasepsisFailure(error) {
    return {
        type: FIND_KONTRASEPSIS_FAILURE,
        error: error
    }
}

function deleteKontrasepsiFailure(error) {
    return {
        type: DELETE_KONTRASEPSI_FAILURE,
        error: error
    }
}

function deleteKontrasepsiSuccess(data) {
    return {
        type: DELETE_KONTRASEPSI_SUCCESS,
        data: data
    }
}

function addKontrasepsiFailure(error) {
    return {
        type: ADD_KONTRASEPSI_FAILURE,
        error: error
    }
}

function addKontrasepsiSuccess(data) {
    return {
        type: ADD_KONTRASEPSI_SUCCESS,
        data: data
    }
}

function editKontrasepsiFailure(error) {
    return {
        type: UPDATE_KONTRASEPSI_FAILURE,
        error: error
    }
}

function editKontrasepsiSuccess(data) {
    return {
        type: UPDATE_KONTRASEPSI_SUCCESS,
        data: data
    }
}
