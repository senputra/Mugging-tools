export class Timeline {

    lockTimeline: boolean = true; //no new member can join.

    title: string;
    adminId: string[]; //the user who takes control, may read write kick and make people an admin
    id: string; //id generated to 8 alphanumeric characters XXXXXXXX. E.g. 45AF56BT all caps.
    groupIds: string[];  // #45A5S6SD, #55F6Q8SR
    memberIds: string[];

    //the date and the activity are linked together.
    date: number[] = []; //{198798789797, 198746546516}
    activity;//{{type : "Homework", content : "Qn 7"}, {type : "Lecture", content : "Topic 5"}}

    constructor(
        title: string,
        adminId: string[],
        id: string,
        groupIds: string[],
        memberIds: string[]) {

        this.title = title;
        this.adminId = adminId;
        this.id = id;
        this.groupIds = groupIds;
        this.memberIds = memberIds;

    }


    demoTimeline() {
        this.date[0] = new Date().getTime();
        this.activity = [{type: "Homework", content : "Qn 7" }, { type: "Lecture", content : "Topic 5" }]
    }


}