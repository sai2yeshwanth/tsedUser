import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Default, Required, Property } from "@tsed/schema";

@Model()
export class User {
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  name: string;

  @Property()
  @Default(false)
  isActive: boolean;
}
