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
        this.handleSelectedWeek = this.handleSelectedWeek.bind(this);


    }

    getUserTotalCount(user) {
        let total = 0;
        for (var key in user.weekCount) {
            if (user.weekCount.hasOwnProperty(key)) {
                total += parseInt(key);
            }
        }

        return total;
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
              users.sort((user1, user2) => {
                  let user1Count = typeof user1.weekCount[this.state.selectedWeek] !== 'undefined' ? user1.weekCount[this.state.selectedWeek] : 0;
                  let user2Count = typeof user2.weekCount[this.state.selectedWeek] !== 'undefined' ? user2.weekCount[this.state.selectedWeek] : 0;

                  if (user1Count == 0 && user2Count == 0) {
                      return this.getUserTotalCount(user2) - this.getUserTotalCount(user1);
                  }
                  return user2Count - user1Count;
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

    handleSelectedWeek(newWeek){
        console.log(`New week: ${newWeek}`);
        this.setState({selectedWeek: newWeek});
    }

    render() {
        return (
          <Container >

              <Grid container spacing={1}
                    justify="center"
                    alignItems="center">
                  <Grid item xs={12} align="center">
                      <DateSelect selectedWeek={this.state.selectedWeek} onChangeSelectedWeek={this.handleSelectedWeek}/>
                  </Grid>
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
