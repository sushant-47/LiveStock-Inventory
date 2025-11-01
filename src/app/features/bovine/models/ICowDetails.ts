import { BREED } from "../enums/Breed.enum";
import { GENDER } from "../enums/Gender.enum";
import { STATUS } from "../enums/Status.enum";

export interface ICowDetails {
    tagNumber: string;
    gender: GENDER;
    status: STATUS;
    pen: string;
    recordedDate: string;
    weight: string;
    dailyWeightGain: string;
    breed: BREED;
    breedOrigin: string;
}
