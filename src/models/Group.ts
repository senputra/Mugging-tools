export class Group {

    lockGroup: boolean = true; //no new member can join.

    name: string;
    adminId: string[]; //the user who takes control, may read write kick and make people an admin
    id: string; //id generated to 8 alphanumeric characters XXXXXXXX. E.g. 45AF56BT all caps.

    timelineIds: string[];  // #TLXXXXXXXXXXX
    memberIds: string[];
    chatroomIds :string[];
    timeScheduleIds :string[];
    announcement: string[]; //announcement that is shown at the homescreen

    constructor(
        name: string,
        adminId: string[],
        id: string) {
        this.name = name;
        this.adminId = adminId;
        this.id = id;
    }
}