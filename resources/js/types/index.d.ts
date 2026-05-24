export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'staff' 
    email_verified_at?: string;
}

export interface Attendance{
    id:number 
    user_id:number
    type:'in' | 'out'
    photo_path:string
    latitude:string
    longitude:string
    attendance_time:string
    attendance_date:string
    created_at?: string;
    updated_at?: string;

    user?:User
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
