import{
    ADD_PROPINSI_FAILURE, ADD_PROPINSI_REQUEST, ADD_PROPINSI_SUCCESS,
    DELETE_PROPINSI_FAILURE,DELETE_PROPINSI_REQUEST, DELETE_PROPINSI_SUCCESS,
    FIND_PROPINSI_FAILURE, FIND_PROPINSI_REQUEST, FIND_PROPINSI_SUCCESS,
    FIND_PROPINSIS_FAILURE, FIND_PROPINSIS_REQUEST, FIND_PROPINSIS_SUCCESS,
    UPDATE_PROPINSI_FAILURE, UPDATE_PROPINSI_REQUEST, UPDATE_PROPINSI_SUCCESS
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
        dispatch({ type: DELETE_PROPINSI_REQUEST });

        commonAxios.delete(`prop/delete/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(deletePropinsiSuccess(data));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(deletePropinsiFailure(error));
                Swal.fire(
                    'Ops!',
                    'Delete process went wrong.',
                    'error'
                )
            });
    };


export const findById = (id) =>
    (dispatch) => {

        dispatch({ type: FIND_PROPINSI_REQUEST });

        commonAxios.get(`prop/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findPropinsiSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(findPropinsiFailure(error));
            });
    };

export const add = (item) =>
    (dispatch) => {
        dispatch({ type: ADD_PROPINSI_REQUEST });
        commonAxios.post(`prop/add`,item)
            .then(data => {
                dispatch(addPropinsiSuccess(data));
                Swal.fire(
                    'Added!',
                    'Your file has been added.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(addPropinsiFailure(error));
                Swal.fire(
                    'Ops!',
                    `Adding process went wrong.`,
                    'error'
                );
            });
    };

export const edit = (item) =>
    (dispatch) => {
        dispatch({ type: UPDATE_PROPINSI_REQUEST });
        commonAxios.put(`prop/edit/${item.id}`, item )
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(editPropinsiSuccess(data));
                Swal.fire(
                    'Edited!',
                    'Your file has been edited.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(editPropinsiFailure(error));
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
            type: FIND_PROPINSIS_REQUEST
        });
        commonAxios.get('props')
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findPropinsisSuccess(data));
            })
            .catch(error => {
                dispatch(findPropinsisFailure(error));
            });
    };

function findPropinsiSuccess(data) {
    return {
        type: FIND_PROPINSI_SUCCESS,
        data: data
    }
}

function findPropinsisSuccess(data) {
    return {
        type: FIND_PROPINSIS_SUCCESS,
        data: data
    }
}

function findPropinsiFailure(error) {
    return {
        type: FIND_PROPINSI_FAILURE,
        error: error
    }
}

function findPropinsisFailure(error) {
    return {
        type: FIND_PROPINSIS_FAILURE,
        error: error
    }
}

function deletePropinsiFailure(error) {
    return {
        type: DELETE_PROPINSI_FAILURE,
        error: error
    }
}

function deletePropinsiSuccess(data) {
    return {
        type: DELETE_PROPINSI_SUCCESS,
        data: data
    }
}

function addPropinsiFailure(error) {
    return {
        type: ADD_PROPINSI_FAILURE,
        error: error
    }
}

function addPropinsiSuccess(data) {
    return {
        type: ADD_PROPINSI_SUCCESS,
        data: data
    }
}

function editPropinsiFailure(error) {
    return {
        type: UPDATE_PROPINSI_FAILURE,
        error: error
    }
}

function editPropinsiSuccess(data) {
    return {
        type: UPDATE_PROPINSI_SUCCESS,
        data: data
    }
}
