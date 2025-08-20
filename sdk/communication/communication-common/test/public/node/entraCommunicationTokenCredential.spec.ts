// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import nock from "nock";
import {
  AzureCommunicationTokenCredential,
  type EntraCommunicationTokenCredentialOptions,
} from "@azure/communication-common";
import { vi, describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { type GetTokenOptions, type TokenCredential } from "@azure/core-auth";
import { EntraTokenCredential } from "$internal/entraTokenCredential.js";

const resourceEndpoint = "https://contoso.communication.azure.com";
const entraToken = "entraToken";
const newEntraToken = "newEntraToken";
const acsToken = "acsToken";
const comunicationClientsEndpoint =
  "/access/entra/:exchangeAccessToken?api-version=2025-03-02-preview";
const communicationClientsScope = "https://communication.azure.com/clients/VoIP";
const teamsExtensionEndpoint = "/access/teamsExtension/:exchangeAccessToken?api-version=2025-06-30";
const teamsExtensionScope = "https://auth.msft.communication.azure.com/TeamsExtension.ManageCalls";

const tokenCredential: TokenCredential = {
  getToken: async (_scopes: string, _options?: GetTokenOptions) => {
    return {
      token: "entraToken",
      expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
    };
  },
};

const communicationApiMock = (): nock.Interceptor =>
  nock(resourceEndpoint)
    .post(comunicationClientsEndpoint)
    .matchHeader("Authorization", `Bearer ${entraToken}`);

const teamsApiMock = (): nock.Interceptor =>
  nock(resourceEndpoint)
    .post(teamsExtensionEndpoint)
    .matchHeader("Authorization", `Bearer ${entraToken}`);

const communicationSuccessApiMock = (): nock.Scope =>
  communicationApiMock().reply(200, {
    accessToken: {
      token: acsToken,
      expiresOn: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    },
  });

const teamsSuccessApiMock = (): nock.Scope =>
  teamsApiMock().reply(200, {
    accessToken: {
      token: acsToken,
      expiresOn: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    },
  });

describe("Entra CommunicationTokenCredential", function () {
  let getTokenSpy: any;

  beforeEach(function () {
    getTokenSpy = vi.spyOn(tokenCredential, "getToken");
  });

  afterEach(function () {
    nock.cleanAll();
    getTokenSpy.mockRestore();
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
      endpoint: teamsExtensionEndpoint,
    },
  ];

  testCases.forEach(({ successMock, mock, scopes, endpoint }) => {
    it("Token exchange is called when passing Entra credential " + endpoint, async function () {
      const apiMock = successMock();

      const credential = new AzureCommunicationTokenCredential({
        resourceEndpoint,
        tokenCredential,
        scopes: [scopes],
      });

      const response = await credential.getToken();
      const tokenResult = response.token;
      assert.strictEqual(tokenResult, acsToken);
      expect(getTokenSpy).toHaveBeenCalledWith([scopes], undefined);
      expect(getTokenSpy).toHaveBeenCalled();
      assert.isTrue(apiMock.isDone());
      getTokenSpy.mockRestore();
    });

    it(
      "Token exchange is not called again when Entra token stays the same " + endpoint,
      async function () {
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
      },
    );

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
      const apiMockNewToken = (): nock.Interceptor =>
        nock(resourceEndpoint)
          .post(endpoint)
          .matchHeader("Authorization", `Bearer ${newEntraToken}`);

      const successApiMockNewToken = (): nock.Scope =>
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
      const successApiMockExpiredTime = (): nock.Scope =>
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
    expect(getTokenSpy).toHaveBeenCalledWith(defaultScopes, undefined);
    expect(getTokenSpy).toHaveBeenCalled();
    assert.isTrue(scope.isDone());
    getTokenSpy.mockRestore();
  });

  async function testAbortSignal(abort: boolean): Promise<void> {
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
    getTokenSpy.mockClear();
    scope = communicationSuccessApiMock();

    // now getToken with abort signal
    const tokenResult = (await credential.getToken({ abortSignal: abortController.signal })).token;

    if (abort) {
      assert.strictEqual(tokenResult, "");
      expect(getTokenSpy).not.toHaveBeenCalled();
      assert.isFalse(scope.isDone());
    } else {
      assert.strictEqual(tokenResult, acsToken);
      expect(getTokenSpy).toHaveBeenCalled();
      assert.isTrue(scope.isDone());
    }
    getTokenSpy.mockRestore();
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
    await expect(credential.getToken()).rejects.toThrow("Service Unavailable");
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

    await expect(credential.getToken()).rejects.toThrow("Unauthorized");
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
    await expect(credential.getToken()).rejects.toThrow("Scopes validation failed");
    assert.isFalse(success.isDone());
  });

  it("It returns error when unrecognized scopes provided", async function () {
    const credential = new AzureCommunicationTokenCredential({
      resourceEndpoint,
      tokenCredential,
      scopes: ["https://contoso.com/clients/unknown"],
    });

    const success = communicationSuccessApiMock();
    await expect(credential.getToken()).rejects.toThrow("Scopes validation failed");
    assert.isFalse(success.isDone());
  });
});
