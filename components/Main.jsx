class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            weight: "",
            users: [],
            dialogOpen: false,
            userDialogOpen: false,
            selectedUser: {},
            selectedWeek: DateHelper.getStartOfWeekKey()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUserDialogClose = this.handleUserDialogClose.bind(this);


    }


    componentDidMount() {
        db.collection("users")
          .onSnapshot((querySnapshot) => {
              let users = [];
              querySnapshot.forEach(function (doc) {
                  let user = doc.data();
                  user._id = doc.id;
                  users.push(user);
              });
              console.log(users);
              this.setState({users: users});
          });
    }

    updateUser() {

        let userData = {
            name: this.state.name,
            weight: this.state.weight
        };

        if (!this.state.users.find(u => u.name === this.state.name)) {
            //we didn't find the user so must be creating a new one so set the reps to 0
            userData.count = 0;
        }

        db.collection("users").doc(this.state.name).set(userData, {merge: true})
          .then(docRef => console.log("Document written with ID: ", docRef.id))
          .catch(error => {
              console.error("Error adding document: ", error);
          });
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
          <Container >
              <Grid container spacing={1}>
                  {this.state.users.map((user) => (
                    <Grid key={user.name} item xs={12} sm={4} lg={3}>
                        <User user={user} onClickAddReps={() => this.handleClickOpen(user)} selectedWeek={this.state.selectedWeek}/>
                    </Grid>
                  ))}

              </Grid>

              <RepsDialog onClose={this.handleClose} open={this.state.dialogOpen} user={this.state.selectedUser}/>
              <UserDialog
                onClose={this.handleUserDialogClose}
                open={this.state.userDialogOpen}
                existingUsers={this.state.users}/>


              <Fab color="primary" aria-label="add" onClick={() => this.handleUserDialogOpen(this.state.selectedUser)}
                   style={{position: 'fixed', bottom: 20, right: 20}}>
                  <Icon>addcircle</Icon>
              </Fab>
          </Container>
        );
    }


    handleClickOpen(user) {
        this.setState({dialogOpen: true, selectedUser: user});
        console.log(user);
    };

    handleClose(value) {
        this.setState({dialogOpen: false});
    };


    handleUserDialogOpen(user) {
        this.setState({userDialogOpen: true});
        console.log(user);
    };

    handleUserDialogClose(){
        this.setState({userDialogOpen: false})
    }
}
