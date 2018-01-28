export class Group {

    lockGroup: boolean = true; //no new member can join.

    name: string;
    writeId: string[]; //the user who takes control, may read write kick and make people an admin
    id: string; //id generated to 8 alphanumeric characters XXXXXXXX. E.g. 45AF56BT all caps.
    timelineIds: string[];  // #45A5S6SD, #55F6Q8SR
    memberIds: string[];
    announcement: string[]; //announcement that is shown at the homescreen

    constructor(
        name: string,
        writeId: string[],
        id: string) {
        this.name = name;
        this.writeId = writeId;
        this.id = id;
    }
}