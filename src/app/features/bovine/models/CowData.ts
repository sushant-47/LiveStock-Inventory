import { GENDER } from "../enums/Gender.enum";
import { STATUS } from "../enums/Status.enum";

/** Cow data source */
export class CowData {
    tagNumber: string;
    gender: GENDER;
    status: STATUS;
    pen: string;
    recordedDate: string;
    weight: string;

    constructor(obj: Partial<CowData> = {}) {
        this.tagNumber = obj.tagNumber;
        this.gender = obj.gender;
        this.status = obj.status;
        this.pen = obj.pen;
        this.recordedDate = obj.recordedDate;
        this.weight = obj.weight;        
    }
}
