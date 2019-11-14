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

    addUser() {
        db.collection("users").add({
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

              <Button variant="contained" color="primary" onClick={() => this.addUser()}>
                  Add
              </Button>

              <hr/>

              <User/>
              <div>
                  {this.state.users.map((item) => (
                    <div key={item.name}><Link href="#"  onClick={l => {console.log(item); this.handleClickOpen()}}>{item.name} - {item.weight}</Link></div>
                  ))}
              </div>


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
