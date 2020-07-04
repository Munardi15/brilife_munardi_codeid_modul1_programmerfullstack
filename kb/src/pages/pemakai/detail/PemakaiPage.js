import React, {Component} from 'react';
import {Button, CircularProgress} from '@material-ui/core';
import Page from '../../../components/pages';
import {findById, add, edit} from '../../../actions/pemakai';
import styles from './styles';
import {withStyles} from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/SaveRounded';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {findAll as findAllPropinsi} from '../../../actions/propinsi';
import {findAll as findAllKontrasepsi} from '../../../actions/kontrasepsi';
import FormControl from '@material-ui/core/FormControl';


class PemakaiPage extends Component {
    constructor(props) {
        super(props);
        const {match} = this.props;
        this.state = {
            list_pemakai_kontrasepsi: {
                id: match.params.id,
                Jumlah_Pemakai: 0,
                list_propinsi: {},
                list_kontrasepsi: {}
            },
            error: false,
        };
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        const {list_pemakai_kontrasepsi} = this.state;
        if (list_pemakai_kontrasepsi.Id_List) {
            this.props.findById(list_pemakai_kontrasepsi.Id_List);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {data, error, addError, editError} = this.props;

        if (prevProps.data !== data) {
            this.setState({list_pemakai_kontrasepsi: data});
        } else if (prevProps.addError !== addError) {
            this.setState({error: addError});
        } else if (prevProps.editError !== editError) {
            this.setState({error: editError});
        } else if (prevProps.error !== error) {
            this.setState({error: error});
        }
    }

    onChange = (event) => {
        const {name, value} = event.target;
        const {list_pemakai_kontrasepsi} = this.state;
        this.setState({
            list_pemakai_kontrasepsi: {
                ...list_pemakai_kontrasepsi,
                [name]: value
            }
        });
    }

    onUnitChange = (event, value) => {
        const {list_pemakai_kontrasepsi} = this.state;
        this.setState({list_pemakai_kontrasepsi: {...list_pemakai_kontrasepsi, list_kontrasepsi: value}})
        console.log(event);
    }

    onItemChange = (event, value) => {
        const {list_pemakai_kontrasepsi} = this.state;
        this.setState({list_pemakai_kontrasepsi: {...list_pemakai_kontrasepsi, list_propinsi: value}})
        console.log(event);
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.list_pemakai_kontrasepsi)
        if (this.state.list_pemakai_kontrasepsi.Id_List === undefined) {
            this.props.add(this.state.list_pemakai_kontrasepsi);
            this.setState({name: ''});
        } else {
            this.props.edit(this.state.list_pemakai_kontrasepsi);
        }


    };

    onItemTextChange = (event) => {
        const {value} = event.target;
        if (value) {
            this.props.findAllPropinsi({search: {name: value}});
        }
    }

    goBack() {
        this.props.history.goBack();
    }

    onUnitOpen = (event, value) => {
        this.props.findAllKontrasepsi();
    }

    render() {
        const {classes, loading, addError, list_propinsisData, list_propinsisLoading, list_kontrasepsisLoading, list_kontrasepsisData} = this.props;
        const {list_pemakai_kontrasepsi, error} = this.state;

        const list_propinsiOptions = !list_propinsisLoading && list_propinsisData ? list_propinsisData.list : [];
        const list_kontrasepsiOptions = !list_kontrasepsisLoading && list_kontrasepsisData ? list_kontrasepsisData.list : [];
        const errorData = addError?.data || {};
        return (
            <Page error={error}>
                {!loading ?
                    <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                        {list_pemakai_kontrasepsi.Id_List &&
                        <div className={classes.formField}>
                            <TextField id="id" name="id" label="ID" value={list_pemakai_kontrasepsi.Id_List} fullWidth
                                       InputProps={{readOnly: true}} error={errorData.name}
                                       helperText={errorData.name ? errorData.name[0] : null}/>
                        </div>
                        }
                        <div className={classes.formField}>
                            <Autocomplete
                                id="list_propinsi"
                                style={{width: 300}}
                                value={list_pemakai_kontrasepsi.list_propinsi}
                                options={list_propinsiOptions}
                                autoHighlight
                                onChange={this.onItemChange}
                                freeSolo
                                loading={list_propinsisLoading}
                                getOptionSelected={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Kontrasepsi"
                                        variant="outlined"
                                        onChange={this.onItemTextChange}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={classes.formField}>
                            <FormControl className={classes.formControl}>
                                <TextField style={{width: 200}} id="Jumlah_Pemakai" name="Jumlah_Pemakai" label="Jumlah_Pemakai"
                                           value={list_pemakai_kontrasepsi.Jumlah_Pemakai} fullWidth onChange={this.onChange}/>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Autocomplete
                                    id="list_kontrasepsi"
                                    style={{width: 300}}
                                    value={list_pemakai_kontrasepsi.list_kontrasepsi}
                                    options={list_kontrasepsiOptions}
                                    onChange={this.onUnitChange}
                                    autoHighlight
                                    onOpen={this.onUnitOpen}
                                    loading={list_kontrasepsisLoading}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Propinsi"
                                            variant="outlined"

                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}

                                        />
                                    )}
                                />
                            </FormControl>
                        </div>
                        <div className={classes.formButton}>
                            <Button className={classes.buttonStyle} variant="contained" color="primary"
                                    onClick={this.goBack}
                                    startIcon={<ArrowBackRoundedIcon/>}
                                    disabled={loading}>
                                Back
                            </Button>
                            <Button className={classes.buttonStyle} variant="contained" onClick={this.onSubmit}
                                    color="primary" startIcon={<SaveIcon/>}>
                                Save
                            </Button>
                        </div>
                    </form> : <CircularProgress className={classes.loadingStyle}/>
                }
            </Page>

        );
    }
}

const mapStateToProps = state => ({
    list_propinsisData: state.findPropinsis.data,
    list_propinsisLoading: state.findPropinsis.loading || state.deletePropinsiById.loading,
    list_propinsisError: state.findPropinsis.error,

    list_kontrasepsisData: state.findKontrasepsis.data,
    list_kontrasepsisLoading: state.findKontrasepsis.loading || state.deleteKontrasepsiById.loading,
    list_kontrasepsisError: state.findKontrasepsis.error,

    data: state.findPemakaiById.data,
    loading: state.findPemakaiById.loading || state.addPemakai.loading || state.editPemakai.loading,
    error: state.findPemakaiById.error,
    addData: state.addPemakai.data,
    editData: state.editPemakai.data,
    addError: state.addPemakai.error,
    editError: state.editPemakai.error
});

const mapDispatchToProps = {
    findById,
    add,
    edit,
    findAllPropinsi,
    findAllKontrasepsi
};

export default withStyles(styles, {withTheme: true})(
    connect(mapStateToProps, mapDispatchToProps)(PemakaiPage)
);
