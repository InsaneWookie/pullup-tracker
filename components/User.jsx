class User extends React.Component {
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



    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleChangeWeight(event) {
        this.setState({weight: event.target.value});
    }


    render() {
        return (
          <div >

          </div>
        );
    }
}
