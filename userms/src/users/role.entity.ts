
import {User} from "./schemas/user.schema";



export class Role {

    id: string

    role: string

    created_at: Date

    updated_at: Date


    user: User
}
