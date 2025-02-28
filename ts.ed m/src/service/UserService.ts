import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { User } from "src/model/UserModel.js";

@Injectable()
export class UserService {
    @Inject(User)
    private readonly user: MongooseModel<User>;
  async createUser(name: string) {
    const user = new this.user({ name });
    return user.save();
  }

  async getUsers() {
    return this.user.find().exec();
  }
}
