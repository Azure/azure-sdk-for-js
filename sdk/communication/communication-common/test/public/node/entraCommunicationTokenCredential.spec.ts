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

const resourceEndpoint = "https://contoso.communication.azure.com";
const entraToken = "entraToken";
const newEntraToken = "newEntraToken";
const acsToken = "acsToken";
const comunicationClientsEndpoint = "/access/entra/:exchangeAccessToken?api-version=2024-04-01-preview";
const communicationClientsScope = "https://communication.azure.com/clients/VoIP";
const teamsExtensionEndpoint = "/access/teamsPhone/:exchangeAccessToken?api-version=2025-03-02-preview";
const teamsExtensionScope = "https://auth.msft.communication.azure.com/TeamsExtension.ManageCalls";

const tokenCredential: TokenCredential = {
  getToken: async (_scopes: string, _options?: GetTokenOptions) => {
    return {
      token: "entraToken",
      expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
    };
  },
};

const communicationApiMock = () =>
  nock(resourceEndpoint)
    .post(comunicationClientsEndpoint)
    .matchHeader("Authorization", `Bearer ${entraToken}`);

const teamsApiMock = () =>
  nock(resourceEndpoint)
    .post(teamsExtensionEndpoint)
    .matchHeader("Authorization", `Bearer ${entraToken}`);


const communicationSuccessApiMock = () =>
  communicationApiMock().reply(200, {
    accessToken: {
      token: acsToken,
      expiresOn: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    },
  });


const teamsSuccessApiMock = () =>
  teamsApiMock().reply(200, {
    accessToken: {
      token: acsToken,
      expiresOn: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    },
  });

describe("Entra CommunicationTokenCredential", function () {
  let getTokenSpy: sinon.SinonSpy;

  beforeEach(function() {
    getTokenSpy = sinon.spy(tokenCredential, "getToken");
  });

  afterEach(function() {
    nock.cleanAll();
    getTokenSpy.restore();
  });

  const testCases = [
    {
      successMock: communicationSuccessApiMock,
      mock: communicationApiMock,
      scopes: communicationClientsScope,
      endpoint: comunicationClientsEndpoint,
    },
    { 
      successMock: teamsSuccessApiMock, 
      mock: teamsApiMock,
      scopes: teamsExtensionScope, 
      endpoint: teamsExtensionEndpoint 
    },
  ];

  testCases.forEach(({ successMock, mock, scopes, endpoint }) => {
    it('Token exchange is called when passing Entra credential ' + endpoint, async function () {
      const apiMock = successMock();

      const credential = new AzureCommunicationTokenCredential({
        resourceEndpoint,
        tokenCredential,
        scopes: [scopes],
      });

      const response = await credential.getToken();
      const tokenResult = (response).token;
      assert.strictEqual(tokenResult, acsToken);
      assert.isTrue(getTokenSpy.alwaysCalledWithExactly([scopes], undefined));
      assert.isTrue(getTokenSpy.callCount > 0);
      assert.isTrue(apiMock.isDone());
      getTokenSpy.restore();
    });

  it("Token exchange is not called again when Entra token stays the same " + endpoint, async function () {
    let scope = successMock();
    const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
      resourceEndpoint: resourceEndpoint,
      tokenCredential: tokenCredential,
      scopes: [scopes],
    };
    const entraTokenCredential = new EntraTokenCredential(entraTokenCredentialOptions);

    let tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(scope.isDone());

    scope = successMock();

    tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isFalse(scope.isDone());
  });

  it("Token exchange gets called again when Entra token changes " + endpoint, async function () {
    let passNewToken = false;
    const customTokenCredential: TokenCredential = {
      getToken: async (_scopes: string, _options?: GetTokenOptions) => {
        return {
          token: passNewToken ? newEntraToken : entraToken,
          expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
        };
      },
    };
    let scope = successMock();
    const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
      resourceEndpoint: resourceEndpoint,
      tokenCredential: customTokenCredential,
      scopes: [scopes],
    };
    const entraTokenCredential = new EntraTokenCredential(entraTokenCredentialOptions);

    let tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(scope.isDone());

    scope = successMock();

    // Token exchange doesn't get called again when Entra token doesn't change
    tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isFalse(scope.isDone());

    passNewToken = true;
    const apiMockNewToken = () =>
      nock(resourceEndpoint)
        .post(endpoint)
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

  it("Token exchange gets called again when acs token expires " + endpoint, async function () {
    const expiredDate = new Date(Date.now() - 1000 * 60);
    const successApiMockExpiredTime = () =>
      mock().reply(200, {
        accessToken: {
          token: acsToken,
          expiresOn: expiredDate.toISOString(),
        },
      });

    let scope = successApiMockExpiredTime();
    const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
      resourceEndpoint: resourceEndpoint,
      tokenCredential: tokenCredential,
      scopes: [scopes],
    };
    const entraTokenCredential = new EntraTokenCredential(entraTokenCredentialOptions);

    let tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(scope.isDone());

    scope = successMock();

    tokenResult = (await entraTokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(scope.isDone());
  });

  it("Retries when service is busy " + endpoint, async function () {
    const busy = mock().reply(
      503,
      {
        error: "Service Unavailable",
      },
      {
        "Retry-After": "0",
      },
    );

    const success = successMock();

    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes: [scopes],
    });

    const tokenResult = (await credential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(busy.isDone());
    assert.isTrue(success.isDone());
  });
});

  it("Token exchange is called with default scopes when not passing scopes on AzureCommunicationTokenCredential", async function () {
    const scope = communicationSuccessApiMock();
    const defaultScopes = ["https://communication.azure.com/clients/.default"];

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

  async function testAbortSignal(abort: boolean) {
    let scope = communicationSuccessApiMock();
    const abortController = new AbortController();

    if (abort) {
      abortController.abort();
    }

    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes: [communicationClientsScope],
    });

    // the credential constructor immediately starts fetching,
    // so await and then reset the internally cached result to force a new token exchange
    await credential.getToken();
    assert.isTrue(scope.isDone());
    const cachedResult = (credential as any).tokenCredential.result;
    cachedResult.acsToken.token = "";
    cachedResult.entraToken = "";
    getTokenSpy.resetHistory();
    scope = communicationSuccessApiMock();

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
    const busy = communicationApiMock().times(4).reply(
      503,
      {
        error: "Service Unavailable",
      },
      {
        "Retry-After": "0",
      },
    );
    const success = communicationSuccessApiMock();

    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes: [communicationClientsScope],
    });

    await assert.isRejected(credential.getToken(), Error, "Service Unavailable");
    assert.isTrue(busy.isDone());
    assert.isFalse(success.isDone());
  });

  it("It returns error when tokenExchange fails", async function () {
    const tokenExchangeFailure = communicationApiMock().reply(401, {
      error: "Unauthorized",
    });
    const success = communicationSuccessApiMock();

    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes: [communicationClientsScope],
    });

    await assert.isRejected(credential.getToken(), Error, "Unauthorized");
    assert.isTrue(tokenExchangeFailure.isDone());
    assert.isFalse(success.isDone());
  });

  it("It returns error when empty scopes provided", async function () {
    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes: [],
    });

    const success = communicationSuccessApiMock();

    await assert.isRejected(credential.getToken(), Error, "Scopes validation failed");
    assert.isFalse(success.isDone());
  });

  it("It returns error when unrecognized scopes provided", async function () {
    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes: ["https://contoso.com/clients/unknown"],
    });

    const success = communicationSuccessApiMock();

    await assert.isRejected(credential.getToken(), Error, "Scopes validation failed");
    assert.isFalse(success.isDone());
  });
});
