class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // previousWeekCount: User.getPreviousWeek(props),
            // totalCount : User.getTotalCount(props),

        }


        // this.handleChange = this.handleChange.bind(this);
        // this.handleChangeWeight = this.handleChangeWeight.bind(this);


    }


    static getDerivedStateFromProps(props, state) {
        console.log(props, state);
        return {
            previousWeekCount: User.getPreviousWeek(props),
            totalCount : User.getTotalCount(props),

        }
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleAddRepsClick(event) {
        this.props.onClickAddReps();
    }

    static getTotalCount(props) {
        let count  = 0;
        for (var week in props.user.weekCount) {
            count += props.user.weekCount[week] ? props.user.weekCount[week] : 0;
        }

        return count;
    }

    static getPreviousWeek(props) {
        let previousWeek = DateHelper.getPreviousWeekKey(new Date(props.selectedWeek));
        return props.user.weekCount[previousWeek] ? props.user.weekCount[previousWeek] : 0;
    }

    static getCurrentWeek(props) {
        let previousWeek = DateHelper.getStartOfWeekKey(new Date(props.selectedWeek));
        return props.user.weekCount[previousWeek] ? props.user.weekCount[previousWeek] : 0;
    }

    static getNextWeek(props) {
        let previousWeek = DateHelper.getNextWeekKey(new Date(props.selectedWeek));
        return props.user.weekCount[previousWeek] ? props.user.weekCount[previousWeek] : 0;
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
                              </Grid>
                          </Grid>
                      </Grid>
                      <Grid
                          container
                          direction="row"
                          justify="space-around"
                          alignItems="center"
                      >
                          <Grid item xs>
                              <Typography align='center' variant="h6" component="h2">{this.state.totalCount}</Typography>
                              <Typography align='center'>total</Typography>
                          </Grid>
                          <Grid item xs>
                              <Typography align='center' variant="h6" component="h2">{this.state.previousWeekCount}</Typography>
                              <Typography align='center'>previous week</Typography>
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
