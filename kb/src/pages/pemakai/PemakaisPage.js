import React, { Component } from 'react';
import Page from '../../components/pages';
import Swal from 'sweetalert2';
import MUIDataTable from "mui-datatables";
import { findAll, deleteById } from '../../actions/pemakai';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import RefreshIcon from '@material-ui/icons/RefreshRounded';
import { connect } from 'react-redux';

class PemakaisPage extends Component {
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
        this.props.history.push(`/pem/${rowData[0]}`);
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
        this.props.history.push(`/pem/add`);
    }

    onReload = () => {
        this.reload();
    }

    onRowsDelete = (rowsDeleted) => {
        const { list } = this.props.data;
        const e = list[rowsDeleted.data[0].index];
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
                this.props.deleteById(e.id);
            }
        })
    }

    // onChangePage = (currentPage) => {
    //     const { params } = this.state;
    //     this.setState({ params: { ...params, page: currentPage } });
    // }
    //
    // onSearchChange = (searchText) => {
    //     const { params } = this.state;
    //     this.setState({ params: { ...params, search: { name: searchText } } });
    // }
    //
    // onColumnSortChange = (changedColumn, direction) => {
    //     const { params } = this.state;
    //     const sort = direction === 'descending' ? 'desc' : 'asc';
    //     this.setState({ params: { ...params, sort } });
    // }
    //
    // onChangeRowsPerPage = (numberOfRows) => {
    //     const { params } = this.state;
    //     this.setState({ params: { ...params, size: numberOfRows } });
    // }


    render() {
        const { classes, loading } = this.props;
        const { data, total, error } = this.state;

        const column = [
            {
                name: "Id_list",
                label: "Id_list"
            },
            {
                name: "Nama_Propinsi",
                label: "Nama_Propinsi"
            },
            {
                name: "Nama_kontrasepsi",
                label: "Nama_kontrasepsi"
            },
            {
                name: "Jumlah_Pemakai",
                label: "Jumlah_Pemakai"
            }
        ];

        const options = {
            serverSide: true,
            selectableRows: 'single',
            search: false,
            count: total,
            rowsPerPageOptions: [2, 5, 10, 15, 100],
            filter: false,
            onRowClick: this.onRowClick,
            onRowsDelete: this.onRowsDelete,
            textLabels: {
                body: {
                    noMatch: loading ? <CircularProgress /> : "Maaf, data tidak di temukan"
                }
            }
        }

        return (
            <Page error={error} >
                <div className={classes.buttonContainer}>
                    <Button className={classes.buttonStyle} variant="contained" color="primary"
                            onClick={this.onAdd}
                            startIcon={<AddIcon />}>
                        Tambah pemakai
                    </Button>
                    <Button className={classes.buttonStyle} variant="contained" color="primary"
                            onClick={this.onReload}
                            startIcon={<RefreshIcon />}
                            disabled={loading}>
                        Reload
                    </Button>
                </div>
                <MUIDataTable
                    title={"List pemakai kontrasepsi"}
                    data={!loading ? data : []}
                    columns={column}
                    options={options}
                />

            </Page>

        );
    }
}

const mapStateToProps = state => ({
    data: state.findPemakais.data,
    loading: state.findPemakais.loading || state.deletePemakaiById.loading,
    error: state.findPemakais.error,
    deleteData: state.deletePemakaiById.data,
    deleteError: state.deletePemakaiById.error,
});

const mapDispatchToProps = {
    findAll, deleteById
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(PemakaisPage)
);
