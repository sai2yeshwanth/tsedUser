import {Constant, Controller, Inject} from "@tsed/di";
import {HeaderParams} from "@tsed/platform-params";
import {View} from "@tsed/platform-views";
import {SwaggerSettings} from "@tsed/swagger";
import {Hidden, Get, Returns} from "@tsed/schema";
import { User } from "src/model/UserModel.js";
import { MongooseModel } from "@tsed/mongoose";

@Hidden()
@Controller("/")
export class IndexController {
    @Inject(User)
    private readonly user: MongooseModel<User>;

  @Constant("swagger", [])
  private swagger: SwaggerSettings[];

  @Get("/")
  @View("swagger.ejs")
  @(Returns(200, String).ContentType("text/html"))
  get(@HeaderParams("x-forwarded-proto") protocol: string, @HeaderParams("host") host: string) {
    const hostUrl = `${protocol || "http"}://${host}`;

    return {
      BASE_URL: hostUrl,
      docs: this.swagger.map((conf) => {
        return {
          url: hostUrl + conf.path,
          ...conf
        };
      })
    };
  }
}
