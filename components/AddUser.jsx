class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            weight: "",
            users: [],
            dialogOpen: false
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
        db.collection("users").doc(this.state.name).set({
            name: this.state.name,
            weight: this.state.weight
        }).then(docRef => console.log("Document written with ID: ", docRef.id))
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
          <div>
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
                        <ListItemText>{item.name} - {item.weight}KG</ListItemText>
                    </ListItem >
                  ))}
              </List>


          </form>
              <UserDialog  onClose={this.handleClose} open={this.state.dialogOpen}  />
          </div>
        );
    }



    handleClickOpen()  {
        this.setState({dialogOpen: true});
        console.log("open");
    };

     handleClose(value) {
         console.log("close");
         this.setState({dialogOpen: false});
    };
}
