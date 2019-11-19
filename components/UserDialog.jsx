class UserDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            weight: "",
        };

        console.log(this.props);

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);


    }

    componentDidMount() {
    }


    handleClose = () => {
        this.props.onClose("bob");
    };

    handleSave() {
        this.updateUser();
        this.handleClose();
    }

    updateUser() {

        let userData = {
            name: this.state.name,
            weight: this.state.weight
        };

        const existingUsers = this.props.existingUsers;

        if(!existingUsers.find(u => u.name === this.state.name)){
            //we didn't find the user so must be creating a new one so set the reps to 0
            userData.count = 0;
        }

        db.collection("users").doc(this.state.name).set(userData, {merge: true})
          .then(docRef => console.log("Document written with ID: ", docRef.id))
          .catch(error => { console.error("Error adding document: ", error); });
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleChangeWeight(event) {
        this.setState({weight: event.target.value});
    }

    updateUserInfo(name, weight) {
        this.setState({name: name, weight: weight});
    }

    render() {
        return (

            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">Add/Update User</DialogTitle>
                <DialogContent>
                    <form onSubmit={(event) => event.preventDefault()}>
                        <TextField
                          margin="dense"
                          variant="outlined"
                          id="name"
                          label="Name"
                          value={this.state.name}
                          onChange={this.handleChange} />

                        <br/>

                        <TextField
                          margin="dense"
                          variant="outlined"
                          label="Weight (KG)"
                          value={this.state.weight}
                          onChange={this.handleChangeWeight}/>

                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.handleSave()} color="primary">
                        Save
                    </Button>

                </DialogActions>

            </Dialog>
        );

    }
}
