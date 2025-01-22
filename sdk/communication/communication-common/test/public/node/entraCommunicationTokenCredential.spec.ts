// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import nock from "nock";
import {
  AzureCommunicationTokenCredential,
  EntraCommunicationTokenCredentialOptions,
} from "../../../src";
import { assert } from "chai";
import { GetTokenOptions, TokenCredential } from "@azure/core-auth";
import sinon from "sinon";
import { EntraTokenCredential } from "../../../src/entraTokenCredential";

const tokenExchangePath = "/access/entra/:exchangeAccessToken?api-version=2024-04-01-preview";
const resourceEndpoint = "https://contoso.communication.azure.com";
const entraToken = "entraToken";
const newEntraToken = "newEntraToken";
const acsToken = "acsToken";
const scopes = ["https://communication.azure.com/clients/VoIP"];

const tokenCredential: TokenCredential = {
  getToken: async (_scopes: string, _options?: GetTokenOptions) => {
    return {
      token: "entraToken",
      expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
    };
  },
};

const apiMock = () =>
  nock(resourceEndpoint)
    .post(tokenExchangePath)
    .matchHeader("Authorization", `Bearer ${entraToken}`);

const successApiMock = () =>
  apiMock().reply(200, {
    accessToken: {
      token: acsToken,
      expiresOn: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    },
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
      scopes,
    });

    const tokenResult = (await credential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(getTokenSpy.alwaysCalledWithExactly(scopes, undefined));
    assert.isTrue(getTokenSpy.callCount > 0);
    assert.isTrue(scope.isDone());
    getTokenSpy.restore();
  });

  it("Token exchange is called with default scopes when not passing scopes on AzureCommunicationTokenCredential", async function () {
    const scope = successApiMock();
    const defaultScopes = ["https://communication.azure.com/clients/.default"];
    const getTokenSpy: sinon.SinonSpy = sinon.spy(tokenCredential, "getToken");

    const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
      resourceEndpoint: resourceEndpoint,
      tokenCredential: tokenCredential,
    };

    const credential = new AzureCommunicationTokenCredential(entraTokenCredentialOptions);

    const tokenResult = (await credential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(getTokenSpy.alwaysCalledWithExactly(defaultScopes, undefined));
    assert.isTrue(getTokenSpy.callCount > 0);
    assert.isTrue(scope.isDone());
    getTokenSpy.restore();
  });

  it("Token exchange is not called again when Entra token stays the same", async function () {
    let scope = successApiMock();
    const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
      resourceEndpoint: resourceEndpoint,
      tokenCredential: tokenCredential,
      scopes,
    };
    const entraTokenCredential = new EntraTokenCredential(entraTokenCredentialOptions);

    let tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(scope.isDone());

    scope = successApiMock();

    tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isFalse(scope.isDone());
  });

  it("Token exchange gets called again when Entra token changes", async function () {
    let passNewToken = false;
    const customTokenCredential: TokenCredential = {
      getToken: async (_scopes: string, _options?: GetTokenOptions) => {
        return {
          token: passNewToken ? newEntraToken : entraToken,
          expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
        };
      },
    };
    let scope = successApiMock();
    const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
      resourceEndpoint: resourceEndpoint,
      tokenCredential: customTokenCredential,
      scopes,
    };
    const entraTokenCredential = new EntraTokenCredential(entraTokenCredentialOptions);

    let tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(scope.isDone());

    scope = successApiMock();

    // Token exchange doesn't get called again when Entra token doesn't change
    tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isFalse(scope.isDone());

    passNewToken = true;
    const apiMockNewToken = () =>
      nock(resourceEndpoint)
        .post(tokenExchangePath)
        .matchHeader("Authorization", `Bearer ${newEntraToken}`);

    const successApiMockNewToken = () =>
      apiMockNewToken().reply(200, {
        accessToken: {
          token: acsToken,
          expiresOn: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        },
      });

    scope = successApiMockNewToken();

    // Token exchange gets called again when Entra token changes
    tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(scope.isDone());
  });

  it("Token exchange gets called again when acs token expires", async function () {
    const expiredDate = new Date(Date.now() - 1000 * 60);
    const successApiMockExpiredTime = () =>
      apiMock().reply(200, {
        accessToken: {
          token: acsToken,
          expiresOn: expiredDate.toISOString(),
        },
      });

    let scope = successApiMockExpiredTime();
    const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
      resourceEndpoint: resourceEndpoint,
      tokenCredential: tokenCredential,
      scopes,
    };
    const entraTokenCredential = new EntraTokenCredential(entraTokenCredentialOptions);

    let tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(scope.isDone());

    scope = successApiMock();

    tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(scope.isDone());
  });

  it("Retries when service is busy", async function () {
    const busy = apiMock().reply(
      503,
      {
        error: "Service Unavailable",
      },
      {
        "Retry-After": "0",
      },
    );

    const success = successApiMock();

    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes,
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
      scopes,
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
  }

  it("Respects abort signal", () => testAbortSignal(true));
  it("Continues when abort signal isn't aborted", () => testAbortSignal(false));

  it("It retries only 3 times when service is busy", async function () {
    const busy = apiMock().times(4).reply(
      503,
      {
        error: "Service Unavailable",
      },
      {
        "Retry-After": "0",
      },
    );
    const success = successApiMock();

    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes,
    });

    await assert.isRejected(credential.getToken(), Error, "Service Unavailable");
    assert.isTrue(busy.isDone());
    assert.isFalse(success.isDone());
  });

  it("It returns error when tokenExchange fails", async function () {
    const tokenExchangeFailure = apiMock().reply(401, {
      error: "Unauthorized",
    });
    const success = successApiMock();

    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes,
    });

    await assert.isRejected(credential.getToken(), Error, "Unauthorized");
    assert.isTrue(tokenExchangeFailure.isDone());
    assert.isFalse(success.isDone());
  });
});
