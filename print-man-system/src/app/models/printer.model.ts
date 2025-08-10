

export interface Printer {
    _id: String;
    model: string;
    serialNumber: string;
    address: string;
    ipAddress: string;
    macAddress: string;
    totalCounter: Number;
    branch?: string [];
    branch_code: string;

}