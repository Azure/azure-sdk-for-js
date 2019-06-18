import * as assert from "assert";
import * as dotenv from "dotenv";
import { HttpHeaders } from "../src";
import {
  extractConnectionStringParts,
  sanitizeHeaders,
  sanitizeURL
} from "../src/utils/utils.common";
dotenv.config({ path: "../.env" });

describe("Utility Helpers", () => {
  it("sanitizeURL redacts SAS token", () => {
    const url = "https://some.url.com/container/blob?sig=sasstring";
    const sanitized = sanitizeURL(url);
    assert.ok(sanitized.indexOf("sasstring") === -1, "Expecting SAS string to be redacted.");
    assert.ok(sanitized.indexOf("*****") !== -1, "Expecting SAS string to be redacted.");
  });

  it("sanitizeHeaders redacts SAS token", () => {
    const url = "https://some.url.com/container/blob?sig=sasstring";
    const headers = new HttpHeaders();
    headers.set("authorization", "Bearer abcdefg");
    headers.set("x-ms-copy-source", url);
    headers.set("otherheader", url);

    const sanitized = sanitizeHeaders(headers);
    assert.ok(
      sanitized.get("x-ms-copy-source")!.indexOf("sasstring") === -1,
      "Expecting SAS string to be redacted."
    );
    assert.ok(
      sanitized.get("x-ms-copy-source")!.indexOf("*****") !== -1,
      "Expecting SAS string to be redacted."
    );
    assert.ok(
      sanitized.get("authorization")! === "*****",
      "Expecting authorization header value to be redacted."
    );

    assert.ok(
      sanitized.get("otherheader")!.indexOf("sasstring") !== -1,
      "Other header should not be changed."
    );
  });

  it("extractConnectionStringParts throws error when passed an invalid protocol in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=a;AccountName=b;AccountKey=c;EndpointSuffix=d"
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.ok(error);
    }
  });

  it("extractConnectionStringParts throws error when passed an invalid connection string with typo", async () => {
    try {
      extractConnectionStringParts(
        // Typo in the attributes
        "DefaultEndpointsProtocol=https;Name=b;AccountKey=c;EndpointSuffix=d"
      );

      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Invalid Connection String",
        error.message,
        "Connection string error message is different than expected"
      );
    }
  });

  it("extractConnectionStringParts throws error with empty EndpointSuffix in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=https;AccountName=b;AccountKey=cdefg;EndpointSuffix="
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Invalid EndpointSuffix in the provided Connection String",
        error.message,
        "Connection string error message is different than expected"
      );
    }
  });

  it("extractConnectionStringParts throws error with empty AccountKey in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=https;AccountName=b;AccountKey=;EndpointSuffix=d"
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Invalid AccountKey in the provided Connection String",
        error.message,
        "Connection string error message is different than expected"
      );
    }
  });

  it("extractConnectionStringParts throws error with empty AccountName in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=https;AccountName=;AccountKey=c;EndpointSuffix=d"
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Invalid AccountName in the provided Connection String",
        error.message,
        "Connection string error message is different than expected"
      );
    }
  });

  it("extractConnectionStringParts throws error with empty DefaultEndpointsProtocol in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=;AccountName=b;AccountKey=c;EndpointSuffix=d"
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Invalid DefaultEndpointsProtocol in the provided Connection String. Expecting 'https' or 'http'",
        error.message,
        "Connection string error message is different than expected"
      );
    }
  });
});
