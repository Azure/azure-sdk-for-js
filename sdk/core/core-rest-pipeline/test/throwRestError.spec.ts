import { it } from "vitest";
import { RestError } from "../src/restError.js";
import { createHttpHeaders } from "../src/httpHeaders.js";

it("This test fails by throwing a RestError", () => {
  throw new RestError("RestError", {
    request: {
      headers: createHttpHeaders({
        Authorization: "this_value_needs_to_be_redacted",
      }),
      url: "https://example.com/?sig=should_get_redacted",
      method: "GET",
      timeout: 0,
      withCredentials: true,
      requestId: "test",
    },
  });
});
