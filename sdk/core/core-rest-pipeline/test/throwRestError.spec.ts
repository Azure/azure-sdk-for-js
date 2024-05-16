import { it } from "vitest";
import { RestError } from "../src/restError.js";
import { createHttpHeaders } from "../src/httpHeaders.js";

it.only("Throw a RestError", () => {
  console.log("This console.log should not appear");
  throw new RestError("Hello, I am a RestError", {
    request: {
      headers: createHttpHeaders({
        "Authorization": "this should have been sanitized but wasn't"
      }),
      url: "http://google.com/?st=3034-50-40&sig=23480938422503",
      method: "GET",
      timeout: 0,
      withCredentials: false,
      requestId: "AAAA",
    }
  })
})
