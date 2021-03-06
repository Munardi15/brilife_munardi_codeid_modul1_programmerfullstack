const styles = theme => ({
    formButton: {
        margin: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-start'
    },
    formField: {
        '& > *': {
            margin: theme.spacing(2),
            width: '50ch',
        },
    },
    buttonStyle: {
        background: 'linear-gradient(45deg, #242322 30%, #363535 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        margin: 4

    },
    loadingStyle: {
        margin: 0
    }
});

export default styles;
