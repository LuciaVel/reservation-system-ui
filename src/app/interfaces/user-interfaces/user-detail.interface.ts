export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface UserList {
    UserList: UserModel[];
    TotalRow: number;
}

