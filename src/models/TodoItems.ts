export class TodoItems {

    date: number // ALL the date will be saved to milli seconds
    deadlineDate: number;
    deadlineTime: number; //the deadline is set here
    todos: Array<string>;
    title: string;
    subTitle: string;
    isDeadlineSet: boolean = false;

    //if is the id in firebase database
    id: string;


    constructor(id: string, date: number,
        todos: Array<string> = [],
        title: string = "Not Set",
        subTitle: string = "",
        isDeadlineSet: boolean,
        deadDate?: number,
        deadTime?: number) {

        this.id = id;
        this.date = date
        this.todos = todos;
        this.title = title;
        this.subTitle = subTitle;

        if (isDeadlineSet) {
            this.deadlineDate = deadDate;
            this.deadlineTime = deadTime;
        }

    }

    getDate() {

        let realDate = new Date(this.date);

        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        try {

            let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

            let day = realDate.getDay();
            let date = realDate.getDate();
            let monthIndex = realDate.getMonth();
            let year = realDate.getFullYear();
            return dayNames[day] + ", " + date + " " + monthNames[monthIndex] + " " + year;
        } catch (error) {
            console.log("no date");
        }

    }

    getTitle() {
        return this.title;
    }
    getSubTitle() {
        return this.subTitle;
    }

    getTodos() {
        return this.todos;
    }

    setDeadline() {

    }
}
