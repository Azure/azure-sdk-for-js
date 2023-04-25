// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { PipelineRequest, PipelinePolicy, createEmptyPipeline } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "../../src/utils/constants";
import { AlphaIdsClient } from "../../src";
import { TokenCredential } from "@azure/identity";
import { assert } from "chai";
import { createMockToken } from "../public/utils/recordedClient";
import { configurationHttpClient } from "../public/utils/mockHttpClients";
import { isNode } from "@azure/test-utils";
import sinon from "sinon";

export const userAgentPolicy: (policyName: string, customHeader: string) => PipelinePolicy = (
  customHeader: string,
  policyName: string
) => {
  return {
    name: policyName,
    sendRequest: async (req, next) => {
      const userAgentHeader = isNode ? "user-agent" : "x-ms-useragent";
      req.headers.set(userAgentHeader, customHeader);
      return next(req);
    },
  };
};

describe("AlphaIdsClient - headers", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client = new AlphaIdsClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: configurationHttpClient,
  });
  let request: PipelineRequest;

  afterEach(function () {
    sinon.restore();
  });

  it("calls the spy", async function () {
    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getConfiguration();
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
      new RegExp(`azsdk-js-communication-alpha-ids/${SDK_VERSION}`, "g")
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
    client = new AlphaIdsClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: configurationHttpClient,
    });

    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getConfiguration();
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

    client = new AlphaIdsClient(endpoint, credential, {
      httpClient: configurationHttpClient,
    });

    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getConfiguration();
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(request.headers.get("authorization") as string, /Bearer ./);
  });

  it("can set custom user-agent prefix", async function () {
    client = new AlphaIdsClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: configurationHttpClient,
      userAgentOptions: {
        userAgentPrefix: "alphaidsclient-headers-test",
      },
    });

    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getConfiguration();
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];

    const userAgentHeader = isNode ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(`alphaidsclient-headers-test azsdk-js-communication-alpha-ids/${SDK_VERSION}`, "g")
    );
  });

  it("can set custom user-agent prefix through additional policies", async function () {
    const testPipeline = createEmptyPipeline();
    const customPolicyName = "custom-header-policy";
    const customHeader = "alphaidsclient-headers-test-additional";
    const customApiVersion = "alphaids-custom-api-version";
    testPipeline.addPolicy(userAgentPolicy(customHeader, customPolicyName));
    client = new AlphaIdsClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: configurationHttpClient,
      apiVersion: customApiVersion,
      pipeline: testPipeline,
    } as never);

    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getConfiguration();
    sinon.assert.calledOnce(spy);
    request = spy.getCall(0).args[0];

    const userAgentHeader = isNode ? "user-agent" : "x-ms-useragent";
    assert.match(request.headers.get(userAgentHeader) as string, new RegExp(customHeader, "g"));
    assert.match(request.url, new RegExp(customApiVersion, "g"));
  });

  it("set undefined endpoint and test the error from client", async function () {
    const undefinedConnection: unknown = null;
    assert.throws(() => {
      new AlphaIdsClient(undefinedConnection as string);
    });
    //assert client is created correctly without options
    const client = new AlphaIdsClient(`endpoint=${endpoint};accessKey=${accessKey}`);
    assert.instanceOf(client, AlphaIdsClient);
  });
});
