// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import {
  sanitizeHeaders,
  sanitizeURL,
  extractConnectionStringParts,
} from "../src/utils/utils.common";

describe("Utility Helpers", () => {
  const accountName = "myaccount";
  const blobEndpoint = `https://${accountName}.blob.core.windows.net`;
  const sharedAccessSignature = "sasToken";

  function verifySASConnectionString(sasConnectionString: string) {
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected.",
    );
    assert.equal(
      blobEndpoint,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected.",
    );
    assert.equal(
      accountName,
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected.",
    );
  }

  it("sanitizeURL redacts SAS token", () => {
    const url = "https://some.url.com/container/blob?sig=sasstring";
    const sanitized = sanitizeURL(url);
    assert.ok(sanitized.indexOf("sasstring") === -1, "Expecting SAS string to be redacted.");
    assert.ok(sanitized.indexOf("*****") !== -1, "Expecting SAS string to be redacted.");
  });

  it("sanitizeHeaders redacts SAS token", () => {
    const url = "https://some.url.com/container/blob?sig=sasstring";
    const headers = createHttpHeaders();
    headers.set("authorization", "Bearer abcdefg");
    headers.set("x-ms-copy-source", url);
    headers.set("otherheader", url);

    const sanitized = sanitizeHeaders(headers);
    assert.ok(
      sanitized.get("x-ms-copy-source")!.indexOf("sasstring") === -1,
      "Expecting SAS string to be redacted.",
    );
    assert.ok(
      sanitized.get("x-ms-copy-source")!.indexOf("*****") !== -1,
      "Expecting SAS string to be redacted.",
    );
    assert.ok(
      sanitized.get("authorization")! === "*****",
      "Expecting authorization header value to be redacted.",
    );

    assert.ok(
      sanitized.get("otherheader")!.indexOf("sasstring") !== -1,
      "Other header should not be changed.",
    );
  });

  it("extractConnectionStringParts parses sas connection string with queue and file endpoints", async () => {
    verifySASConnectionString(
      `BlobEndpoint=${blobEndpoint};
        FileEndpoint=https://storagesample.file.core.windows.net;
        SharedAccessSignature=${sharedAccessSignature}`,
    );
  });

  it("extractConnectionStringParts parses sas connection string with queue endpoint", async () => {
    verifySASConnectionString(
      `BlobEndpoint=${blobEndpoint};
        FileEndpoint=https://storagesample.file.core.windows.net;
        SharedAccessSignature=${sharedAccessSignature}`,
    );
  });
});
