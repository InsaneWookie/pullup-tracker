
class DateHelper {

    static DATE_KEY_FORMAT = 'YYYY-MM-DD';

    static getStartOfWeekKey(currentDate){
        return moment(currentDate ? currentDate : new Date()).day(1).format(DateHelper.DATE_KEY_FORMAT)
    }

    static getPreviousWeekKey(fromDate){
        return moment(fromDate ? fromDate : new Date()).subtract(7, 'days').format(DateHelper.DATE_KEY_FORMAT);
    }

    static getNextWeekKey(fromDate){
        return moment(fromDate ? fromDate : new Date()).add(7, 'days').format(DateHelper.DATE_KEY_FORMAT);
    }
}