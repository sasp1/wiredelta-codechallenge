import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import {ApiResponse} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({status: 400, description: "Bad parameters"})
  @ApiResponse({status: 409, description: "User already exists"})
  @ApiResponse({status: 201, description: "Successfully created"})
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
