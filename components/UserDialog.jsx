class UserDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            weight: 0,
            count: 0,
            reps: []
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleChangeWeight = this.handleChangeWeight.bind(this);


    }

    componentDidMount() {
        db.collection("users").doc('1qOY8vqEuHT9dDlUHfuM')
          .get().then((doc) => {
            console.log(doc.data());
        });
    }


    handleClose = () => {
        this.props.onClose("bob");
    };

    handleListItemClick(value) {
        // this.onClose(value);
    };

    render() {
        return (

          <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
              <DialogTitle id="simple-dialog-title">Add Reps</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      TODO: Some user data here
                  </DialogContentText>
              </DialogContent>

          </Dialog>
        );
    }
}
