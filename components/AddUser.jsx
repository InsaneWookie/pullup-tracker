class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            weight: "",
            users: [],
            dialogOpen: false,
            selectedUser: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

        if(!this.state.users.find(u => u.name === this.state.name)){
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
        <Container maxWidth="sm">
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
                onChange={this.handleChangeWeight}
                /*style={{"marginLeft":"10px"}}*//>


              <br/>

              <Button variant="contained" color="primary" onClick={() => this.updateUser()}>
                  Add/Update
              </Button>

              <hr/>

              <User/>
              <List >
                  {this.state.users.map((item) => (
                    <ListItem key={item.name} button onClick={() => this.updateUserInfo(item.name, item.weight)}>

                        <ListItemText>{item.name} - {item.weight} KG - Total reps: {item.count}</ListItemText>
                        <ListItemSecondaryAction onClick={() => this.handleClickOpen(item)} >
                            <Button variant="contained" color="primary">
                                <Icon>addcircle</Icon>
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem >
                  ))}
              </List>


          </form>
              <UserDialog  onClose={this.handleClose} open={this.state.dialogOpen} user={this.state.selectedUser}  />
          </Container>
        );
    }



    handleClickOpen(user)  {
        this.setState({dialogOpen: true, selectedUser: user});
        console.log(user);
        console.log("open");
    };

     handleClose(value) {
         console.log("close");
         this.setState({dialogOpen: false});
    };
}
