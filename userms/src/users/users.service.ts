import {Injectable} from '@nestjs/common';
import {User, UserDocument} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async findOne(userId: string): Promise<User | undefined> {
        return undefined
    }

    createUser(data: CreateUserDto) {
        const user = new this.userModel(data);
        return user.save();
    }
}
