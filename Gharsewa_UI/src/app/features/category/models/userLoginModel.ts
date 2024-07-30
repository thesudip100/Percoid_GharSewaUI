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
    bookingId:number
}