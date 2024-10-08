export interface userLoginModel {
    UserName: string,
    PassWord: string
}

export interface bookserviceModel {
    serviceName: string,
    bookingDate: string
}

export interface editProfileModel {
    userName: string,
    fullName: string,
    address: string,
    email: string,
    phone: string
}

export interface changePasswordModel {
    oldpassword:string,
    newpassword:string
}

export interface viewAllBookingsModel
{
    fullName:string,
    address: string,
    phone: string,
    serviceName: string,
    bookingDate: string,
    bookingId:number,
    bookingApproval:boolean
}

export interface feedbackModel{
    id:number,
    userId:number,
    feedbackby:string,
    feedbackfor:string,
    message:string
}

export interface addServicesModel{
    categoryname:string
}

export interface AdminStats{
    approvedBookingsCount: number,
    unapprovedBookingsCount:number,
    categoryCount:number
}