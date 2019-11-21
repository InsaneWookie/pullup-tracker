class User extends React.Component {
    constructor(props) {
        super(props);


        // this.handleChange = this.handleChange.bind(this);
        // this.handleChangeWeight = this.handleChangeWeight.bind(this);


    }

    componentDidMount() {
        // db.collection("users").doc('1qOY8vqEuHT9dDlUHfuM')
        //   .get().then((doc) => {
        //       console.log(doc.data());
        //   });

    }


    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleAddRepsClick(event) {
        this.props.onClickAddReps();
    }

    getTotalCount() {
        let count  = 0;
        for (var week in this.props.user.weekCount) {
            count += this.props.user.weekCount[week] ? this.props.user.weekCount[week] : 0;
        }

        return count;
    }

    render() {
        return (
          <Card>
              <CardContent>
                  <Grid container spacing={1} direction="row" justify="center"
                        alignItems="center">
                      <Grid item xs align="center">
                          <Avatar style={{width: 100, height: 100}}>
                              <Icon style={{fontSize: 72}}>face</Icon>
                          </Avatar>
                      </Grid>
                      <Grid item xs>
                          <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center">
                              <Grid item xs align="center">
                                  <Typography gutterBottom variant="h5" component="h2">
                                      {this.props.user.name}
                                  </Typography>
                              </Grid>
                              <Grid item xs align="center">
                                  <Typography gutterBottom variant="h3" component="h2">
                                      {this.props.user.weekCount[this.props.selectedWeek] ? this.props.user.weekCount[this.props.selectedWeek ] : 0}
                                  </Typography>
                                  <Typography gutterBottom variant="h6" component="h2">
                                      total {this.getTotalCount()}
                                  </Typography>
                              </Grid>

                          </Grid>

                      </Grid>
                  </Grid>

              </CardContent>
              <CardActions>
                  <div style={{marginLeft: 'auto'}}/>
                  <Button onClick={() => this.handleAddRepsClick()}>
                      <Icon>add</Icon>
                  </Button>
              </CardActions>
          </Card>
        );
    }
}
