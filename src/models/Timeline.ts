import { Day } from './Day';
export class Timeline {

    lockTimeline: boolean = true; //no new member can join.

    title: string;
    adminId: string[]; //the user who takes control, may read write kick and make people an admin
    id: string; //id generated  ==> TLXXXXXXXXXX

    //the days and the matters are linked together.
    days:Day[];

    constructor(
        title: string,
        adminId: string[],
        id: string) {

        this.title = title;
        this.adminId = adminId;
        this.id = id;

    }

}