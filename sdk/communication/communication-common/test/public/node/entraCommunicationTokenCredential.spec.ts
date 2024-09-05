// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import nock from "nock";
import { AzureCommunicationTokenCredential } from "../../../src";
import { assert } from "chai";
import { GetTokenOptions, TokenCredential } from "@azure/core-auth";
import sinon from "sinon";

const tokenExchangePath = "/access/entra:exchangeToken";
const resourceEndpoint = "https://contoso.communication.azure.com";
const entraToken = "entraToken";
const acsToken = "acsToken";
const scopes = ["https://communication.azure.com/clients/VoIP"];

const tokenCredential: TokenCredential = {
  getToken: async (_scopes: string, _options?: GetTokenOptions) => {
    return {
      token:  "entraToken",
      expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
    };
  }
};

const apiMock = () => nock(resourceEndpoint)
.post(tokenExchangePath)
.matchHeader("Authorization", `Bearer ${entraToken}`);

const successApiMock = () => apiMock()
.reply(200, {
  accessToken: {
    token: acsToken,
    expiresOn: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  }
});

describe("Entra CommunicationTokenCredential", function () {
  afterEach(() => {
    nock.cleanAll();
  });

  it("Token exchange is called when passing Entra credential", async function () {
    const scope = successApiMock();
    const getTokenSpy: sinon.SinonSpy = sinon.spy(tokenCredential, "getToken");

    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes
    });

    const tokenResult = (await credential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(getTokenSpy.alwaysCalledWithExactly(scopes, undefined));
    assert.isTrue(getTokenSpy.callCount > 0);
    assert.isTrue(scope.isDone());
    getTokenSpy.restore();
  });

  it("Retries when service is busy", async function () {
    const busy = apiMock()
    .reply(503, {
      error: "Service Unavailable"
    }, {
      "Retry-After": "0"
    });

    const success = successApiMock();

    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes
    });

    const tokenResult = (await credential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(busy.isDone());
    assert.isTrue(success.isDone());
  });

  async function testAbortSignal(abort: boolean) {
    let scope = successApiMock();
    const getTokenSpy: sinon.SinonSpy = sinon.spy(tokenCredential, "getToken");
    const abortController = new AbortController();

    if (abort) {
      abortController.abort();
    }

    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes
    });

    // the credential constructor immediately starts fetching,
    // so await and then reset the internally cached result to force a new token exchange
    await credential.getToken();
    assert.isTrue(scope.isDone());
    const cachedResult = (credential as any).tokenCredential.result;
    cachedResult.acsToken.token = "";
    cachedResult.entraToken = "";
    getTokenSpy.resetHistory();
    scope = successApiMock();

    // now getToken with abort signal
    const tokenResult = (await credential.getToken({ abortSignal: abortController.signal })).token;

    if (abort) {
      assert.strictEqual(tokenResult, "");
      assert.isFalse(getTokenSpy.called);
      assert.isFalse(scope.isDone());
    } else {
      assert.strictEqual(tokenResult, acsToken);
      assert.isTrue(getTokenSpy.called);
      assert.isTrue(scope.isDone());
    }
    getTokenSpy.restore();
  };

  it("Respects abort signal", () => testAbortSignal(true));
  it("Continues when abort signal isn't aborted", () => testAbortSignal(false));

  // todo: doesn't retry more than 3 times
});
