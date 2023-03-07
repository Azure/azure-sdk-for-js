// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { isNode } from "@azure/core-util";
import { TokenCredential } from "@azure/identity";
import { assert } from "chai";
import sinon from "sinon";
import { DomainVerificationClient } from "../../src/domainValidationClient";
import { Context } from "mocha";
import { createMockToken } from "../public/utils/recordedClient";
import { getDomainOwnershipChallengeHttpClient } from "../public/utils/mockHttpClients";
import { PipelineRequest } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "../../src/utils/constants";

describe("SipRoutingClient - headers", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  const domainName = "contoso.com";

  let client = new DomainVerificationClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: getDomainOwnershipChallengeHttpClient,
  });
  let request: PipelineRequest;

  afterEach(function () {
    sinon.restore();
  });

  it("calls the spy", async function () {
    const spy = sinon.spy(getDomainOwnershipChallengeHttpClient, "sendRequest");
    await client.createDomainOwnershipChallenge(domainName);
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
      new RegExp(`azsdk-js-communication-domain-verification/${SDK_VERSION}`, "g")
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
    client = new DomainVerificationClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getDomainOwnershipChallengeHttpClient,
    });

    const spy = sinon.spy(getDomainOwnershipChallengeHttpClient, "sendRequest");
    await client.createDomainOwnershipChallenge(domainName);
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

    client = new DomainVerificationClient(endpoint, credential, {
      httpClient: getDomainOwnershipChallengeHttpClient,
    });

    const spy = sinon.spy(getDomainOwnershipChallengeHttpClient, "sendRequest");
    await client.createDomainOwnershipChallenge(domainName);
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(request.headers.get("authorization") as string, /Bearer ./);
  });

  it("can set custom user-agent prefix", async function () {
    client = new DomainVerificationClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getDomainOwnershipChallengeHttpClient,
      userAgentOptions: {
        userAgentPrefix: "domainvalidation-headers-test",
      },
    });

    const spy = sinon.spy(getDomainOwnershipChallengeHttpClient, "sendRequest");
    await client.createDomainOwnershipChallenge(domainName);
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];

    const userAgentHeader = isNode ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(
        `domainvalidation-headers-test azsdk-js-communication-domain-verification/${SDK_VERSION}`,
        "g"
      )
    );
  });
});
