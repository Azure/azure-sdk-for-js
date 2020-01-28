import { assert } from "chai";
import { SearchIndexClient, SearchApiKeyCredential } from "../src/index";

describe("Hello world", () => {
  it("should say hello world", () => {
    const indexClient = new SearchIndexClient(
      "test",
      "test",
      "test",
      new SearchApiKeyCredential("test")
    );
    assert.isNotNull(indexClient);
  });
});
