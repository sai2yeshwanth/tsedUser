import {join} from "node:path";
import {Configuration} from "@tsed/di";
import {application} from "@tsed/platform-http";
import "@tsed/platform-log-request"; // remove this import if you don&#x27;t want log request
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/mongoose";
import {config} from "./config/index.js";
import * as rest from "./controllers/rest/index.js";
import * as pages from "./controllers/pages/index.js";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  ajv: {
    returnsCoercedValues: true
  },
  mongoose: {
    url: "mongodb://user:password123@localhost:27017/userdb?authSource=users", // Replace with your MongoDB URL
    connectionOptions: {
      // No need for useNewUrlParser or useUnifiedTopology in Mongoose 6+
    }
  },unt: {
    "/rest": [
      ...Object.values(rest)
    ],
    "/": [
      ...Object.values(pages)
    ]
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1"
    }
  ],
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true }}
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  protected app = application();
}
