import * as assert from "assert";
import * as dotenv from "dotenv";
import { HttpHeaders } from "../src";
import {
  sanitizeHeaders,
  sanitizeURL,
  extractConnectionStringParts
} from "../src/utils/utils.common";
import { record, Recorder } from "@azure/test-utils-recorder";
import { setupEnvironment } from "./utils/testutils.common";
dotenv.config({ path: "../.env" });

describe("Utility Helpers", () => {
  setupEnvironment();
  let recorder: Recorder;
  const protocol = "https";
  const endpointSuffix = "core.windows.net";
  const accountName = "myaccount";
  const queueEndpoint = `${protocol}://${accountName}.queue.${endpointSuffix}`;
  const sharedAccessSignature = "sasToken";

  function verifySASConnectionString(sasConnectionString: string) {
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected."
    );
    assert.equal(
      queueEndpoint,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected."
    );
  }

  beforeEach(async function() {
    recorder = record(this);
  });

  afterEach(async function() {
    recorder.stop();
  });

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

  it("extractConnectionStringParts parses sas connection string with queue and file endpoints", async () => {
    verifySASConnectionString(
      `QueueEndpoint=${queueEndpoint};
        FileEndpoint=https://storagesample.file.core.windows.net;
        SharedAccessSignature=${sharedAccessSignature}`
    );
  });

  it("extractConnectionStringParts parses sas connection string with queue endpoint", async () => {
    verifySASConnectionString(
      `QueueEndpoint=${queueEndpoint};
        FileEndpoint=https://storagesample.file.core.windows.net;
        SharedAccessSignature=${sharedAccessSignature}`
    );
  });
});
