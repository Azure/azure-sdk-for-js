// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  sanitizeHeaders,
  sanitizeURL,
  extractConnectionStringParts,
  isIpEndpointStyle,
} from "../src/utils/utils.common.js";
import { Recorder } from "@azure-tools/test-recorder";
import { recorderEnvSetup } from "./utils/testutils.common.js";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Utility Helpers", () => {
  let recorder: Recorder;
  const protocol = "https";
  const endpointSuffix = "core.windows.net";
  const accountName = "myaccount";
  const queueEndpoint = `${protocol}://${accountName}.queue.${endpointSuffix}`;
  const customDomainQueueEndpoint = `${protocol}://customdomain.com`;
  const sharedAccessSignature = "sasToken";

  function verifySASConnectionString(sasConnectionString: string) {
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected.",
    );
    assert.equal(
      queueEndpoint,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected.",
    );
    assert.equal(
      accountName,
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected.",
    );
  }

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("sanitizeURL redacts SAS token", () => {
    const url = "https://some.url.com/container/blob?sig=sasstring";
    const sanitized = sanitizeURL(url);
    assert.strictEqual(sanitized.indexOf("sasstring"), -1, "Expecting SAS string to be redacted.");
    assert.notStrictEqual(sanitized.indexOf("*****"), -1, "Expecting SAS string to be redacted.");
  });

  it("sanitizeHeaders redacts SAS token", () => {
    const url = "https://some.url.com/container/blob?sig=sasstring";
    const headers = createHttpHeaders();
    headers.set("authorization", "Bearer abcdefg");
    headers.set("x-ms-copy-source", url);
    headers.set("otherheader", url);

    const sanitized = sanitizeHeaders(headers);
    assert.strictEqual(
      sanitized.get("x-ms-copy-source")!.indexOf("sasstring"),
      -1,
      "Expecting SAS string to be redacted.",
    );
    assert.notStrictEqual(
      sanitized.get("x-ms-copy-source")!.indexOf("*****"),
      -1,
      "Expecting SAS string to be redacted.",
    );
    assert.strictEqual(
      sanitized.get("authorization"),
      "*****",
      "Expecting authorization header value to be redacted.",
    );

    assert.notStrictEqual(
      sanitized.get("otherheader")!.indexOf("sasstring"),
      -1,
      "Other header should not be changed.",
    );
  });

  it("extractConnectionStringParts parses sas connection string with queue and file endpoints", async () => {
    verifySASConnectionString(
      `QueueEndpoint=${queueEndpoint};
        FileEndpoint=https://storagesample.file.core.windows.net;
        SharedAccessSignature=${sharedAccessSignature}`,
    );
  });

  it("extractConnectionStringParts parses sas connection string with queue endpoint", async () => {
    verifySASConnectionString(
      `QueueEndpoint=${queueEndpoint};
        FileEndpoint=https://storagesample.file.core.windows.net;
        SharedAccessSignature=${sharedAccessSignature}`,
    );
  });

  it("extractConnectionStringParts parses sas connection string with custom domain", async () => {
    const sasConnectionString = `QueueEndpoint=${customDomainQueueEndpoint};
    SharedAccessSignature=${sharedAccessSignature}`;
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected.",
    );
    assert.equal(
      customDomainQueueEndpoint,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected.",
    );
    assert.equal(
      "",
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected.",
    );
  });

  it("isIpEndpointStyle", async () => {
    assert.equal(
      isIpEndpointStyle(new URL("https://192.0.0.10:1900/accountName/containerName/blobName")),
      true,
    );
    assert.equal(
      isIpEndpointStyle(
        new URL(
          "https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/accountName/containerName/blobName",
        ),
      ),
      true,
    );
    assert.equal(
      isIpEndpointStyle(new URL("https://localhost:80/accountName/containerName/blobName")),
      true,
    );

    assert.equal(isIpEndpointStyle(new URL("https://192.0.0.10:1900/")), true);
    assert.equal(isIpEndpointStyle(new URL("https://192.0.0.10")), true);

    assert.equal(
      isIpEndpointStyle(
        new URL("https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]/accountName/containerName"),
      ),
      true,
    );
  });
});
