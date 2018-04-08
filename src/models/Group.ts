import { UserId } from "./UserId"
export interface Group {
    title: string;
    adminId: UserId[]; //the user who takes control, may read write kick and make people an admin
    gId: string; //id generated to 8 alphanumeric characters XXXXXXXX. E.g. 45AF56BT all caps.

    timelineIds?: string[];  // #TLXXXXXXXXXXX
    memberIds?: string[];
    chatroomIds?: string[];
    timeScheduleIds?: string[];
}