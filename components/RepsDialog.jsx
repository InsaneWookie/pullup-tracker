class RepsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            weight: 0,
            count: 0,
        };

        console.log(this.props);

        // this.handleChange = this.handleChange.bind(this);
        // this.handleChangeWeight = this.handleChangeWeight.bind(this);


    }

    componentDidMount() {
        // db.collection("users").doc('1qOY8vqEuHT9dDlUHfuM')
        //   .get().then((doc) => {
        //     console.log(doc.data());
        // });
    }


    handleClose = () => {
        this.setState({count: 0});
        this.props.onClose("bob");
    };

    handleListItemClick(value) {
        // this.onClose(value);
    };

    addReps(count) {
        this.setState(prevState => {
            return {count: prevState.count + count}
        });
    }

    clearReps() {
        this.setState({count: 0});
    }

    handleSave() {

        const currentCount = this.state.count;

        let newReps = {
            userId: this.props.user._id,
            count: currentCount,
            time: new Date()
        };

        db.collection("reps").add(newReps)
          .then(docRef => console.log("Document reps written with ID: ", docRef.id))
          .catch(error => {
              console.error("Error adding reps document: ", error);
          });

        db.collection("users").doc(this.props.user._id)
          .update({count: this.props.user.count + currentCount})
          .then(() => console.log("Document successfully updated!"))
          .catch(error => {
              console.error("Error updating user document: ", error);
          });


        this.handleClose();
    }

    render() {
        return (

          <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
              <DialogTitle id="simple-dialog-title">{this.props.user.name}, do you even lift</DialogTitle>
              <DialogContent>
                  <Typography variant="h1" component="h2" style={{textAlign: 'center'}}>
                      {this.state.count}
                  </Typography>
                  <Grid container spacing={1} style={{marginBottom: '10px'}}
                        justify="center"
                        alignItems="center">
                      <Grid item xs={4} align="center">
                          <Fab variant="round" color="secondary" onClick={() => this.addReps(1)}>1</Fab>
                      </Grid>
                      <Grid item xs={4} align="center">
                          <Fab variant="round" color="secondary" onClick={() => this.addReps(5)}>5</Fab>
                      </Grid>
                      <Grid item xs={4} align="center">
                          <Fab variant="round" color="secondary" onClick={() => this.addReps(10)}>10</Fab>
                      </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{marginBottom: '10px'}} justify="center"
                        alignItems="center">
                      <Grid item xs={12} align="center">
                          <Fab variant="round" color="secondary" onClick={() => this.clearReps()}>
                              <Icon>deleteforever</Icon>
                          </Fab>
                      </Grid>
                  </Grid>

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
