// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { isNode } from "@azure/core-util";
import { TokenCredential } from "@azure/identity";
import { assert } from "chai";
import sinon from "sinon";
import { PhoneNumbersClient } from "../../src/phoneNumbersClient";
import { getPhoneNumberHttpClient } from "../public/utils/mockHttpClients";
import { SDK_VERSION } from "../../src/utils/constants";
import { Context } from "mocha";
import { createMockToken } from "../public/utils/recordedClient";
import { PipelineRequest } from "@azure/core-rest-pipeline";

describe("PhoneNumbersClient - headers", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client = new PhoneNumbersClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: getPhoneNumberHttpClient,
  });
  let request: PipelineRequest;

  afterEach(function () {
    sinon.restore();
  });

  it("calls the spy", async function () {
    const spy = sinon.spy(getPhoneNumberHttpClient, "sendRequest");
    await client.getPurchasedPhoneNumber("+18005550100");
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
  });

  it("[node] sets correct host", function (this: Context) {
    if (!isNode) {
      this.skip();
    }
    assert.equal(request.headers.get("host"), "contoso.spool.azure.local");
  });

  it("sets correct default user-agent", function () {
    const userAgentHeader = isNode ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(`azsdk-js-communication-phone-numbers/${SDK_VERSION}`, "g")
    );
  });

  it("sets date header", function () {
    const dateHeader = "x-ms-date";
    assert.typeOf(request.headers.get(dateHeader), "string");
  });

  it("sets signed authorization header with KeyCredential", function () {
    assert.isDefined(request.headers.get("authorization"));
    assert.match(
      request.headers.get("authorization") as string,
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/
    );
  });

  it("sets signed authorization header with connection string", async function () {
    client = new PhoneNumbersClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getPhoneNumberHttpClient,
    });

    const spy = sinon.spy(getPhoneNumberHttpClient, "sendRequest");
    await client.getPurchasedPhoneNumber("+18005550100");
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(
      request.headers.get("authorization") as string,
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/
    );
  });

  it("sets bearer authorization header with TokenCredential", async function (this: Context) {
    const credential: TokenCredential = createMockToken();

    client = new PhoneNumbersClient(endpoint, credential, {
      httpClient: getPhoneNumberHttpClient,
    });

    const spy = sinon.spy(getPhoneNumberHttpClient, "sendRequest");
    await client.getPurchasedPhoneNumber("+18005550100");
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(request.headers.get("authorization") as string, /Bearer ./);
  });

  it("can set custom user-agent prefix", async function () {
    client = new PhoneNumbersClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getPhoneNumberHttpClient,
      userAgentOptions: {
        userAgentPrefix: "phonenumbersclient-headers-test",
      },
    });

    const spy = sinon.spy(getPhoneNumberHttpClient, "sendRequest");
    await client.getPurchasedPhoneNumber("+18005550100");
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];

    const userAgentHeader = isNode ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(
        `phonenumbersclient-headers-test azsdk-js-communication-phone-numbers/${SDK_VERSION}`,
        "g"
      )
    );
  });
});
