import { Decimal } from "ion-js";
export declare const DRIVERS_LICENSE: {
    PersonId: string;
    LicenseNumber: string;
    LicenseType: string;
    ValidFromDate: Date;
    ValidToDate: Date;
}[];
export declare const PERSON: {
    FirstName: string;
    LastName: string;
    DOB: Date;
    Address: string;
    GovId: string;
    GovIdType: string;
}[];
export declare const VEHICLE: {
    VIN: string;
    Type: string;
    Year: number;
    Make: string;
    Model: string;
    Color: string;
}[];
export declare const VEHICLE_REGISTRATION: {
    VIN: string;
    LicensePlateNumber: string;
    State: string;
    City: string;
    ValidFromDate: Date;
    ValidToDate: Date;
    PendingPenaltyTicketAmount: Decimal;
    Owners: {
        PrimaryOwner: {
            PersonId: string;
        };
        SecondaryOwners: object[];
    };
}[];
