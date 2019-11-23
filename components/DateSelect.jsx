class DateSelect extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
          <Container>
              <Button onClick={() => this.handleClickPreviousWeek()}><Icon>keyboard_arrow_left</Icon></Button>
              <Button onClick={() => this.handleClickCurrentWeek()}>{this.props.selectedWeek}</Button>
              <Button onClick={() => this.handleClickNextWeek()}><Icon>keyboard_arrow_right</Icon></Button>
          </Container>
        );
    }

    onChangeSelectedWeek(newWeek) {
        this.props.onChangeSelectedWeek(newWeek);
    }


    handleClickPreviousWeek() {
        const selectedWeek = this.props.selectedWeek;

        const previousWeek = DateHelper.getPreviousWeekKey(new Date(selectedWeek));

        this.onChangeSelectedWeek(previousWeek);
    };

    handleClickCurrentWeek() {

        const previousWeek = DateHelper.getStartOfWeekKey(new Date());

        this.onChangeSelectedWeek(previousWeek);
    }

    handleClickNextWeek() {
        const selectedWeek = this.props.selectedWeek;

        const previousWeek = DateHelper.getNextWeekKey(new Date(selectedWeek));

        this.onChangeSelectedWeek(previousWeek);
    }

}
