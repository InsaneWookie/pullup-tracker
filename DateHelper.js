
class DateHelper {


    static getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
          diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    static getStartOfWeekKey(){
        const startOfWeek = DateHelper.getMonday(new Date());
        return startOfWeek.getFullYear() +  "-" + (startOfWeek.getMonth() + 1) + "-"+ startOfWeek.getDate();
    }
}