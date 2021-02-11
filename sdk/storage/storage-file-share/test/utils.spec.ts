// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as dotenv from "dotenv";
import { HttpHeaders } from "../src";
import {
  sanitizeHeaders,
  sanitizeURL,
  extractConnectionStringParts,
  isIpEndpointStyle
} from "../src/utils/utils.common";
import { record, Recorder } from "@azure/test-utils-recorder";
import { recorderEnvSetup } from "./utils";
import { URLBuilder } from "@azure/core-http";
dotenv.config();

describe("Utility Helpers", () => {
  let recorder: Recorder;
  const protocol = "https";
  const endpointSuffix = "core.windows.net";
  const accountName = "myaccount";
  const fileEndpoint = `${protocol}://${accountName}.file.${endpointSuffix}`;
  const customDomainFileEndpoint = `${protocol}://customdomain.com`;
  const sharedAccessSignature = "sasToken";

  function verifySASConnectionString(sasConnectionString: string) {
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected."
    );
    assert.equal(
      fileEndpoint,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected."
    );
    assert.equal(
      accountName,
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected."
    );
  }

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function() {
    await recorder.stop();
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
      `FileEndpoint=${fileEndpoint};
        FileEndpoint=https://storagesample.file.core.windows.net;
        SharedAccessSignature=${sharedAccessSignature}`
    );
  });

  it("extractConnectionStringParts parses sas connection string with queue endpoint", async () => {
    verifySASConnectionString(
      `FileEndpoint=${fileEndpoint};
        FileEndpoint=https://storagesample.file.core.windows.net;
        SharedAccessSignature=${sharedAccessSignature}`
    );
  });

  it("extractConnectionStringParts parses sas connection string with custom domain", async () => {
    const sasConnectionString = `FileEndpoint=${customDomainFileEndpoint};
    SharedAccessSignature=${sharedAccessSignature}`;
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected."
    );
    assert.equal(
      customDomainFileEndpoint,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected."
    );
    assert.equal(
      "",
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected."
    );
  });

  it("isIpEndpointStyle", async () => {
    assert.equal(
      isIpEndpointStyle(
        URLBuilder.parse("https://192.0.0.10:1900/accountName/containerName/blobName")
      ),
      true
    );
    assert.equal(
      isIpEndpointStyle(
        URLBuilder.parse(
          "https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/accountName/containerName/blobName"
        )
      ),
      true
    );
    assert.equal(
      isIpEndpointStyle(
        URLBuilder.parse("https://localhost:80/accountName/containerName/blobName")
      ),
      true
    );

    assert.equal(isIpEndpointStyle(URLBuilder.parse("https://192.0.0.10:1900/")), true);
    assert.equal(isIpEndpointStyle(URLBuilder.parse("https://192.0.0.10")), true);

    assert.equal(
      isIpEndpointStyle(
        URLBuilder.parse("https://2001:db8:85a3:8d3:1319:8a2e:370:7348/accountName/containerName")
      ),
      true
    );
    assert.equal(isIpEndpointStyle(URLBuilder.parse("https://2001::1")), true);
    // assert.equal(isIpEndpointStyle(URLBuilder.parse('https://::1')), true); currently not working due to http url.ts's issue. uncomment after core lib fixed.

    assert.equal(isIpEndpointStyle(URLBuilder.parse("https://255")), false);
    assert.equal(isIpEndpointStyle(URLBuilder.parse("https://255.255")), false);
    assert.equal(isIpEndpointStyle(URLBuilder.parse("https://a.b.c.d")), false);
    assert.equal(isIpEndpointStyle(URLBuilder.parse("https://256.1.1.1")), false);
    assert.equal(isIpEndpointStyle(URLBuilder.parse("https://255.256.1.1")), false);
    assert.equal(isIpEndpointStyle(URLBuilder.parse("https://255.255.256.1")), false);
    assert.equal(isIpEndpointStyle(URLBuilder.parse("https://255.255.255.256")), false);
  });
});
