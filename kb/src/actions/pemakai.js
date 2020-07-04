import{
    ADD_PEMAKAI_FAILURE, ADD_PEMAKAI_REQUEST, ADD_PEMAKAI_SUCCESS,
    DELETE_PEMAKAI_FAILURE,DELETE_PEMAKAI_REQUEST, DELETE_PEMAKAI_SUCCESS,
    FIND_PEMAKAI_FAILURE, FIND_PEMAKAI_REQUEST, FIND_PEMAKAI_SUCCESS,
    FIND_PEMAKAIS_FAILURE, FIND_PEMAKAIS_REQUEST, FIND_PEMAKAIS_SUCCESS,
    UPDATE_PEMAKAI_FAILURE, UPDATE_PEMAKAI_REQUEST, UPDATE_PEMAKAI_SUCCESS
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
        dispatch({ type: DELETE_PEMAKAI_REQUEST });

        commonAxios.delete(`pem/delete/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(deletePemakaiSuccess(data));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(deletePemakaiFailure(error));
                Swal.fire(
                    'Ops!',
                    'Delete process went wrong.',
                    'error'
                )
            });
    };


export const findById = (id) =>
    (dispatch) => {

        dispatch({ type: FIND_PEMAKAI_REQUEST });

        commonAxios.get(`pem/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findPemakaiSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(findPemakaiFailure(error));
            });
    };

export const add = (item) =>
    (dispatch) => {
        dispatch({ type: ADD_PEMAKAI_REQUEST });
        commonAxios.post(`pem/add`,item)
            .then(data => {
                dispatch(addPemakaiSuccess(data));
                Swal.fire(
                    'Added!',
                    'Your file has been added.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(addPemakaiFailure(error));
                Swal.fire(
                    'Ops!',
                    `Adding process went wrong.`,
                    'error'
                );
            });
    };

export const edit = (item) =>
    (dispatch) => {
        dispatch({ type: UPDATE_PEMAKAI_REQUEST });
        commonAxios.put(`pem/edit/${item.id}`, item )
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(editPemakaiSuccess(data));
                Swal.fire(
                    'Edited!',
                    'Your file has been edited.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(editPemakaiFailure(error));
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
            type: FIND_PEMAKAIS_REQUEST
        });
        commonAxios.get('pemn')
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findPemakaisSuccess(data));
            })
            .catch(error => {
                dispatch(findPemakaisFailure(error));
            });
    };

function findPemakaiSuccess(data) {
    return {
        type: FIND_PEMAKAI_SUCCESS,
        data: data
    }
}

function findPemakaisSuccess(data) {
    return {
        type: FIND_PEMAKAIS_SUCCESS,
        data: data
    }
}

function findPemakaiFailure(error) {
    return {
        type: FIND_PEMAKAI_FAILURE,
        error: error
    }
}

function findPemakaisFailure(error) {
    return {
        type: FIND_PEMAKAIS_FAILURE,
        error: error
    }
}

function deletePemakaiFailure(error) {
    return {
        type: DELETE_PEMAKAI_FAILURE,
        error: error
    }
}

function deletePemakaiSuccess(data) {
    return {
        type: DELETE_PEMAKAI_SUCCESS,
        data: data
    }
}

function addPemakaiFailure(error) {
    return {
        type: ADD_PEMAKAI_FAILURE,
        error: error
    }
}

function addPemakaiSuccess(data) {
    return {
        type: ADD_PEMAKAI_SUCCESS,
        data: data
    }
}

function editPemakaiFailure(error) {
    return {
        type: UPDATE_PEMAKAI_FAILURE,
        error: error
    }
}

function editPemakaiSuccess(data) {
    return {
        type: UPDATE_PEMAKAI_SUCCESS,
        data: data
    }
}
