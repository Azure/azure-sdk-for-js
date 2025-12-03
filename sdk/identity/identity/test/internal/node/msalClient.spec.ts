// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as msalClient from "$internal/msal/nodeFlows/msalClient.js";

import type { AuthenticationResult } from "@azure/msal-node";
import {
  ClientApplication,
  ConfidentialClientApplication,
  PublicClientApplication,
} from "@azure/msal-node";
import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isLiveMode } from "@azure-tools/test-recorder";

import { AbortError } from "@azure/abort-controller";
import { AuthenticationRequiredError } from "$internal/errors.js";
import { DeveloperSignOnClientId } from "$internal/constants.js";
import { IdentityClient } from "$internal/client/identityClient.js";
import { credentialLogger } from "$internal/util/logging.js";
import { getUsernamePasswordStaticResources } from "../../msalTestUtils.js";
import { msalPlugins } from "$internal/msal/nodeFlows/msalPlugins.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("MsalClient", function () {
  describe("recorded tests", function () {
    let cleanup: MsalTestCleanup;
    let recorder: Recorder;

    afterEach(async function () {
      await cleanup();
    });

    beforeEach(async function (ctx) {
      ({ cleanup, recorder } = await msalNodeTestSetup(ctx));
    });

    it.skipIf(isLiveMode())("supports getTokenByClientSecret", async function () {
      // https://github.com/Azure/azure-sdk-for-js/issues/29929
      const scopes = ["https://vault.azure.net/.default"];
      const clientSecret = env.IDENTITY_SP_CLIENT_SECRET || env.AZURE_CLIENT_SECRET!;
      const clientId = env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!;
      const tenantId = env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!;

      const clientOptions = recorder.configureClientOptions({});
      const client = msalClient.createMsalClient(clientId, tenantId, {
        additionalPolicies: clientOptions.additionalPolicies,
      });

      const accessToken = await client.getTokenByClientSecret(scopes, clientSecret);
      assert.isNotEmpty(accessToken.token);
      assert.isNotNaN(accessToken.expiresOnTimestamp);
    });

    it.skipIf(isLiveMode())("supports getTokenByDeviceCode", async function () {
      // Skip in CI live tests since this credential requires user interaction.
      const scopes = ["https://vault.azure.net/.default"];
      const clientId = DeveloperSignOnClientId;
      const tenantId = env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!;

      const clientOptions = recorder.configureClientOptions({});
      const client = msalClient.createMsalClient(clientId, tenantId, {
        additionalPolicies: clientOptions.additionalPolicies,
      });

      const accessToken = await client.getTokenByDeviceCode(scopes, (info) => {
        console.log(
          `To complete the test recording, please go to ${info.verificationUri} and use code ${info.userCode} to authenticate.`,
        );
      });
      assert.isNotEmpty(accessToken.token);
      assert.isNotNaN(accessToken.expiresOnTimestamp);
    });

    it("supports getTokenByUsernamePassword", async function () {
      const scopes = ["https://vault.azure.net/.default"];
      const { username, password, clientId, tenantId } = getUsernamePasswordStaticResources();

      const clientOptions = recorder.configureClientOptions({});
      const client = msalClient.createMsalClient(clientId, tenantId, {
        additionalPolicies: clientOptions.additionalPolicies,
      });

      const accessToken = await client.getTokenByUsernamePassword(scopes, username, password);
      assert.isNotEmpty(accessToken.token);
      assert.isNotNaN(accessToken.expiresOnTimestamp);
    });
  });

  describe("#createMsalClient", function () {
    it("can create an msal client with minimal configuration", function () {
      const clientId = "client-id";
      const tenantId = "tenant-id";

      const client = msalClient.createMsalClient(clientId, tenantId);
      assert.exists(client);
    });

    it("can configure a custom logger for the client", async function () {
      const clientId = "client-id";
      const tenantId = "tenant-id";
      const logger = credentialLogger("test");
      const logSpy = vi.spyOn(logger.getToken, "info");

      const client = msalClient.createMsalClient(clientId, tenantId, { logger });
      try {
        await client.getTokenByClientSecret(["https://vault.azure.net/.default"], "client-secret");
      } catch (e) {
        // ignore errors
      }

      assert.isAbove(logSpy.mock.calls.length, 0);
    });
  });

  describe("#generateMsalConfiguration", function () {
    describe("with valid data", function () {
      it("generates a configuration with minimal input", function () {
        const clientId = "client-id";
        const tenantId = "tenant-id";

        const config = msalClient.generateMsalConfiguration(clientId, tenantId, {});
        assert.exists(config);
        assert.equal(config.auth.clientId, clientId);
        assert.equal(config.auth.authority, "https://login.microsoftonline.com/tenant-id");
        assert.isEmpty(config.auth.knownAuthorities);
      });

      it("uses IdentityClient as networkClient", function () {
        const clientId = "client-id";
        const tenantId = "tenant-id";

        const config = msalClient.generateMsalConfiguration(clientId, tenantId, {});
        assert.instanceOf(config.system!.networkClient, IdentityClient);
      });
    });

    describe("with invalid data", function () {
      it("throws when tenantId is invalid", function () {
        assert.throws(
          () => msalClient.generateMsalConfiguration("client-id", "invalid-tenant-id$%*^@#(;"),
          /Invalid tenant id provided/,
        );
      });
    });
  });

  describe("CAE support", function () {
    let subject: msalClient.MsalClient;

    const clientId = "client-id";
    const tenantId = "tenant-id";

    afterEach(async function () {
      vi.restoreAllMocks();
    });

    describe("when CAE is enabled", function () {
      const enableCae = true;

      it("uses the CAE cache", async function () {
        const cachePluginCae = {
          afterCacheAccess: vi.fn(),
          beforeCacheAccess: vi.fn(),
        };
        const cachePlugin = {
          afterCacheAccess: vi.fn(),
          beforeCacheAccess: vi.fn(),
        };

        vi.spyOn(msalPlugins, "generatePluginConfiguration").mockReturnValue({
          broker: {
            isEnabled: false,
            enableMsaPassthrough: false,
          },
          cache: {
            cachePlugin: Promise.resolve(cachePlugin),
            cachePluginCae: Promise.resolve(cachePluginCae),
          },
        });

        subject = msalClient.createMsalClient(clientId, tenantId, {
          tokenCachePersistenceOptions: {
            enabled: true,
          },
        });

        try {
          await subject.getTokenByClientSecret(
            ["https://vault.azure.net/.default"],
            "client-secret",
            { enableCae },
          );
        } catch (e) {
          // ignore errors
        }

        assert.isAbove(cachePluginCae.beforeCacheAccess.mock.calls.length, 0);
        expect(cachePlugin.beforeCacheAccess).toHaveBeenCalledTimes(0);
      });
    });

    describe("when CAE is disabled", function () {
      const enableCae = false;
      it("initializes the default cache", async function () {
        const cachePluginCae = {
          afterCacheAccess: vi.fn(),
          beforeCacheAccess: vi.fn(),
        };
        const cachePlugin = {
          afterCacheAccess: vi.fn(),
          beforeCacheAccess: vi.fn(),
        };

        vi.spyOn(msalPlugins, "generatePluginConfiguration").mockReturnValue({
          broker: {
            isEnabled: false,
            enableMsaPassthrough: false,
          },
          cache: {
            cachePlugin: Promise.resolve(cachePlugin),
            cachePluginCae: Promise.resolve(cachePluginCae),
          },
        });

        subject = msalClient.createMsalClient(clientId, tenantId, {
          tokenCachePersistenceOptions: {
            enabled: true,
          },
        });

        try {
          await subject.getTokenByClientSecret(
            ["https://vault.azure.net/.default"],
            "client-secret",
            { enableCae },
          );
        } catch (e) {
          // ignore errors
        }

        assert.isAbove(cachePlugin.beforeCacheAccess.mock.calls.length, 0);
        expect(cachePluginCae.beforeCacheAccess).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("#getTokenByAuthorizationCode", function () {
    const clientId = "client-id";
    const tenantId = "tenant-id";
    const fakeTokenResponse = {
      accessToken: "token",
      expiresOn: new Date(Date.now() + 3600 * 1000),
      account: {
        environment: "environment",
        homeAccountId: "homeAccountId",
        localAccountId: "localAccountId",
        tenantId: "tenantId",
        username: "username",
      },
    };
    const scopes = ["https://vault.azure.net/.default"];

    afterEach(async function () {
      vi.restoreAllMocks();
    });

    describe("with clientSecret", function () {
      it("uses a confidentialClientApplication", async function () {
        const client = msalClient.createMsalClient(clientId, tenantId);

        const publicClientStub = vi.spyOn(PublicClientApplication.prototype, "acquireTokenByCode");
        const confidentialClientStub = vi
          .spyOn(ConfidentialClientApplication.prototype, "acquireTokenByCode")
          .mockResolvedValue(fakeTokenResponse as AuthenticationResult);
        await client.getTokenByAuthorizationCode(scopes, "code", "redirectUri", "clientSecret");

        expect(publicClientStub).toHaveBeenCalledTimes(0);
        expect(confidentialClientStub).toHaveBeenCalledTimes(1);
      });
    });

    describe("without clientSecret", function () {
      it("uses a publicClientApplication", async function () {
        const client = msalClient.createMsalClient(clientId, tenantId);

        const publicClientStub = vi
          .spyOn(PublicClientApplication.prototype, "acquireTokenByCode")
          .mockResolvedValue(fakeTokenResponse as AuthenticationResult);
        const confidentialClientStub = vi.spyOn(
          ConfidentialClientApplication.prototype,
          "acquireTokenByCode",
        );

        await client.getTokenByAuthorizationCode(
          scopes,
          "code",
          "redirectUri",
          undefined /* clientSecret */,
        );

        expect(publicClientStub).toHaveBeenCalledTimes(1);
        expect(confidentialClientStub).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("#getTokenByDeviceCode", function () {
    const clientId = "client-id";
    const tenantId = "tenant-id";
    const deviceCodeCallback: () => void = () => {
      // no-op
    };

    afterEach(async function () {
      vi.restoreAllMocks();
    });

    describe("with silent authentication", function () {
      it("uses AuthenticationRecord if provided", async function () {
        const authenticationRecord = {
          authority: "login.partner.microsoftonline.cn",
          tenantId,
          username: "testuser",
          homeAccountId: "home-account-id",
          clientId: "client-id",
        };

        const client = msalClient.createMsalClient(clientId, tenantId, {
          authenticationRecord,
        });

        const silentAuthSpy = vi
          .spyOn(ClientApplication.prototype, "acquireTokenSilent")
          .mockResolvedValue({
            accessToken: "token",
            expiresOn: new Date(),
          } as AuthenticationResult);
        const scopes = ["https://vault.azure.net/.default"];

        await client.getTokenByDeviceCode(scopes, deviceCodeCallback);

        expect(silentAuthSpy).toHaveBeenCalledTimes(1);
        assert.deepEqual(silentAuthSpy.mock.calls[0][0].account, {
          homeAccountId: authenticationRecord.homeAccountId,
          tenantId: authenticationRecord.tenantId,
          username: authenticationRecord.username,
          localAccountId: authenticationRecord.homeAccountId,
          environment: authenticationRecord.authority,
        });
      });

      it("attempts silent authentication without AuthenticationRecord", async function () {
        const silentAuthStub = vi
          .spyOn(ClientApplication.prototype, "acquireTokenSilent")
          .mockResolvedValue({
            accessToken: "token",
            expiresOn: new Date(),
          } as AuthenticationResult);
        const clientCredentialAuthStub = vi
          .spyOn(PublicClientApplication.prototype, "acquireTokenByDeviceCode")
          .mockResolvedValue({
            accessToken: "token",
            expiresOn: new Date(Date.now() + 3600 * 1000),
            account: {
              environment: "environment",
              homeAccountId: "homeAccountId",
              localAccountId: "localAccountId",
              tenantId: "tenantId",
              username: "username",
            },
          } as AuthenticationResult);
        const scopes = ["https://vault.azure.net/.default"];

        const client = msalClient.createMsalClient(clientId, tenantId);

        await client.getTokenByDeviceCode(scopes, deviceCodeCallback);
        await client.getTokenByDeviceCode(scopes, deviceCodeCallback);

        assert.equal(
          clientCredentialAuthStub.mock.calls.length,
          1,
          "expected acquireTokenByClientCredential to have been called once",
        );
        assert.equal(
          silentAuthStub.mock.calls.length,
          1,
          "expected acquireTokenSilent to have been called once",
        );
      });

      it("throws when silentAuthentication fails with a rethrowable exception", async function () {
        const client = msalClient.createMsalClient(clientId, tenantId, {
          // An authentication record will get us to try the silent flow
          authenticationRecord: {
            authority: "login.microsoftonline.com",
            tenantId,
            username: "testuser",
            homeAccountId: "home-account-id",
            clientId: "client-id",
          },
        });

        vi.spyOn(ClientApplication.prototype, "acquireTokenSilent").mockRejectedValue(
          new AbortError("operation has been aborted"),
        ); // AbortErrors should get re-thrown

        const scopes = ["https://vault.azure.net/.default"];

        await expect(client.getTokenByDeviceCode(scopes, deviceCodeCallback)).rejects.toThrow(
          "operation has been aborted",
        );
      });

      it("throws when silentAuthentication fails and disableAutomaticAuthentication is true", async function () {
        const scopes = ["https://vault.azure.net/.default"];
        vi.spyOn(ClientApplication.prototype, "acquireTokenSilent").mockRejectedValue(
          new AuthenticationRequiredError({ scopes }),
        );

        const client = msalClient.createMsalClient(clientId, tenantId, {
          // An authentication record will get us to try the silent flow
          authenticationRecord: {
            authority: "login.microsoftonline.com",
            tenantId,
            username: "testuser",
            homeAccountId: "home-account-id",
            clientId: "client-id",
          },
        });

        await expect(
          client.getTokenByDeviceCode(
            scopes,
            () => {
              // no-op
            },
            { disableAutomaticAuthentication: true },
          ),
        ).rejects.toThrow(/Automatic authentication has been disabled/);
      });
    });

    it("supports cancellation", async function () {
      const client = msalClient.createMsalClient(clientId, tenantId);

      const scopes = ["https://vault.azure.net/.default"];
      // we expect the request to be aborted immediately without trying to reach the network
      const abortSignal = AbortSignal.abort();
      const request = client.getTokenByDeviceCode(
        scopes,
        () => {
          // no-op
        },
        {
          abortSignal,
        },
      );
      await expect(request).rejects.toThrow(AbortError);
    });

    describe("cross-tenant federation", function () {
      it("allows passing an authority host", async function () {
        const tenantIdOne = "tenantOne";
        const tenantIdTwo = "tenantTwo";
        const authorityHost = "https://custom.authority.com";

        const expectedAuthority = `${authorityHost}/${tenantIdTwo}`;

        const clientCredentialAuthStub = vi
          .spyOn(PublicClientApplication.prototype, "acquireTokenByDeviceCode")
          .mockResolvedValue({
            accessToken: "token",
            expiresOn: new Date(Date.now() + 3600 * 1000),
          } as AuthenticationResult);
        const client = msalClient.createMsalClient(clientId, tenantIdOne, {
          authorityHost,
        });

        const scopes = ["https://vault.azure.net/.default"];

        await client.getTokenByDeviceCode(scopes, deviceCodeCallback, { tenantId: tenantIdTwo });

        const { authority: requestAuthority } = clientCredentialAuthStub.mock.calls[0][0];
        assert.equal(requestAuthority, expectedAuthority);
      });

      it("allows using the AZURE_AUTHORITY_HOST environment variable", async function () {
        const tenantIdOne = "tenantOne";
        const tenantIdTwo = "tenantTwo";
        const authorityHost = "https://custom.authority.com";

        const expectedAuthority = `${authorityHost}/${tenantIdTwo}`;

        vi.stubEnv("AZURE_AUTHORITY_HOST", authorityHost);

        const clientCredentialAuthStub = vi
          .spyOn(PublicClientApplication.prototype, "acquireTokenByDeviceCode")
          .mockResolvedValue({
            accessToken: "token",
            expiresOn: new Date(Date.now() + 3600 * 1000),
          } as AuthenticationResult);
        const client = msalClient.createMsalClient(clientId, tenantIdOne);

        const scopes = ["https://vault.azure.net/.default"];

        await client.getTokenByDeviceCode(scopes, deviceCodeCallback, { tenantId: tenantIdTwo });

        const { authority: requestAuthority } = clientCredentialAuthStub.mock.calls[0][0];
        assert.equal(requestAuthority, expectedAuthority);
      });
    });
  });
});
