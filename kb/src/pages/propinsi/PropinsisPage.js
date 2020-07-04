import React, {Component} from 'react';
import Page from '../../components/pages';
import Swal from 'sweetalert2';
import MUIDataTable from "mui-datatables";
import styles from './styles';
import {findAll, deleteById} from '../../actions/propinsi';
import {withStyles} from '@material-ui/core/styles';
import {Button, CircularProgress} from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import RefreshIcon from '@material-ui/icons/RefreshRounded';
import {connect} from 'react-redux';

class Propinsis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount() {
        this.reload();
    }

    reload() {
        this.props.findAll();
    }

    onRowClick = (rowData) => {
        this.props.history.push(`/prop/${rowData}`);
    }

    componentDidUpdate(prevProps, prevState) {
        const {deleteData, deleteError, error, data} = this.props;
        if (prevProps.data !== data) {
            this.setState({data: data});
        } else if (prevProps.deleteData !== deleteData) {
            this.reload();
        } else if (deleteError && prevProps.deleteError !== deleteError) {
            this.setState({error: deleteError});
        } else if (error && prevProps.error !== error) {
            this.setState({error: error});
        }
    }

    onAdd = () => {
        this.props.history.push(`/prop/add`);
    }

    onReload = () => {
        this.reload();
    }

    onRowsDelete = (rowsDeleted) => {
        const e = rowsDeleted.data.index[0];
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.props.deleteById(e);
            }
        })
    }

    // onChangePage = (currentPage) => {
    //     const {params} = this.state;
    //     this.setState({params: {...params, page: currentPage}});
    // }
    //
    // onSearchChange = (searchText) => {
    //     const {params} = this.state;
    //     this.setState({params: {...params, search: {name: searchText}}});
    // }
    //
    // onColumnSortChange = (changedColumn, direction) => {
    //     const {params} = this.state;
    //     const sort = direction === 'descending' ? 'desc' : 'asc';
    //     this.setState({params: {...params, sort}});
    // }
    //
    // onChangeRowsPerPage = (numberOfRows) => {
    //     const {params} = this.state;
    //     this.setState({params: {...params, size: numberOfRows}});
    // }

    render() {
        const {classes, loading} = this.props;
        const {data, total, error} = this.state;
        const column = [
            {
                name: "Id_Propinsi",
                label: "ID",
            },
            {
                name: "Nama_Propinsi",
                label: "Name",
                options: {
                    sort: false
                }
            }
        ];

        const options = {
            serverSide: true,
            selectableRows: 'single',
            count: total,
            filter: false,
            onRowClick: this.onRowClick,
            // onChangePage: this.onChangePage,
            // onChangeRowsPerPage: this.onChangeRowsPerPage,
            // onSearchChange: this.onSearchChange,
            // onColumnSortChange: this.onColumnSortChange,
            onRowsDelete: this.onRowsDelete,
            textLabels: {
                body: {
                    noMatch: loading ? <CircularProgress/> : "sorry, no items found"
                }
            }
        }
        return (
            <Page error={error}>
                <div className={classes.buttonContainer}>
                    <Button className={classes.buttonStyle} variant="contained" color="primary"
                            onClick={this.onAdd}
                            startIcon={<AddIcon/>}>
                        New Item
                    </Button>
                    <Button className={classes.buttonStyle} variant="contained" color="primary"
                            onClick={this.onReload}
                            startIcon={<RefreshIcon/>}
                            disabled={loading}>
                        Reload
                    </Button>
                </div>
                <MUIDataTable
                    title={"Propinsis List"}
                    data={!loading ? data : []}
                    columns={column}
                    options={options}
                />
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    data: state.findPropinsis.data,
    loading: state.findPropinsis.loading || state.deletePropinsiById.loading,
    error: state.findPropinsis.error,
    deleteData: state.deletePropinsiById.data,
    deleteError: state.deletePropinsiById.error,
});

const mapDispatchToProps = {
    findAll, deleteById
};


export default withStyles(styles, {withTheme: true})(
    connect(mapStateToProps, mapDispatchToProps)(Propinsis)
);
