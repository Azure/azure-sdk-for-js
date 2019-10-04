import { RestError } from "../lib/coreHttp";
import * as assert from "assert";
import { ResponseBodyNotFoundError } from "../lib/responseBodyNotFoundError";

describe("instanceof for RestError and derived classes works", () => {
  it("RestError", () => {
    const err = new RestError("message");
    assert.ok(err instanceof Error);
  });

  it("ResponseBodyNotFoundError", () => {
    const err = new ResponseBodyNotFoundError("message");
    assert.ok("ResponseBodyNotFoundError", err.name);
    assert.ok(err instanceof Error);
    assert.ok(err instanceof RestError);
  });
});
