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

        // this.handleChange = this.handleChange.bind(this);
        // this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.handleClose = this.handleClose.bind(this);


    }


    componentDidMount() {

    }



    render() {
        return (<div></div>


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
