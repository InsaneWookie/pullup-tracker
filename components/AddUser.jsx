class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            weight: 0,
            users: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);


    }

    componentDidMount() {
        db.collection("users")
          .onSnapshot((querySnapshot) => {
              let users = [];
              querySnapshot.forEach(function(doc) {
                  users.push(doc.data());
              });
              console.log(users);
              this.setState({users: users});
          });
    }

    addUser(){
        db.collection("users").add({
            name: this.state.name,
            weight: this.state.weight
        }).then(docRef => console.log("Document written with ID: ", docRef.id))
          .catch(error => { console.error("Error adding document: ", error); });
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleChangeWeight(event) {
        this.setState({weight: event.target.value});
    }



    render() {
        return (
          <form onSubmit={(event) => event.preventDefault()}>
              <label>
                  <input value={this.state.name} onChange={this.handleChange} />
              </label>
              <br />
              <label>
                  <input value={this.state.weight} onChange={this.handleChangeWeight} />
              </label>

              <button onClick={() => this.addUser()}>
                  Add
              </button>

              <div>
                  {this.state.users.map((item) => (
                    <div key={item.name}>{item.name} - {item.weight}</div>
                  ))}
              </div>
          </form>
        );
    }
}