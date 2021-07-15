import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Role, RoleDocument} from "./schemas/role.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {
    }

    async create(user) {
        const existingUser = await this.userModel.findOne({email: user.email});
        if (existingUser) throw new ConflictException("User already exists");

        const newUser = new this.userModel(user);
        newUser.password = await this.encryptPwd(user.password);

        const role = await this.roleModel.findOne({role: user.role});

        newUser.role = role.id;
        return newUser.save();
    }

    encryptPwd(password) {
        const saltOrRounds = 10;
        return bcrypt.hash(password, saltOrRounds);
    }

    findOne(email: string) {
        return this.userModel.findOne({email})
    }
}
