// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as msalClient from "../../../src/msal/nodeFlows/msalClient";

import {
  AuthenticationResult,
  ClientApplication,
  ConfidentialClientApplication,
  PublicClientApplication,
} from "@azure/msal-node";
import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { Recorder, env, isLiveMode } from "@azure-tools/test-recorder";

import { AbortError } from "@azure/abort-controller";
import { AuthenticationRequiredError } from "../../../src/errors";
import { Context } from "mocha";
import { DeveloperSignOnClientId } from "../../../src/constants";
import { IdentityClient } from "../../../src/client/identityClient";
import { assert } from "@azure-tools/test-utils";
import { credentialLogger } from "../../../src/util/logging";
import { getUsernamePasswordStaticResources } from "../../msalTestUtils";
import { msalPlugins } from "../../../src/msal/nodeFlows/msalPlugins";
import sinon from "sinon";

describe("MsalClient", function () {
  describe("recorded tests", function () {
    let cleanup: MsalTestCleanup;
    let recorder: Recorder;

    afterEach(async function () {
      await cleanup();
    });

    beforeEach(async function () {
      ({ cleanup, recorder } = await msalNodeTestSetup(this.currentTest));
    });

    it("supports getTokenByClientSecret", async function () {
      if (isLiveMode()) {
        // https://github.com/Azure/azure-sdk-for-js/issues/29929
        this.skip();
      }
      const scopes = ["https://vault.azure.net/.default"];
      const clientSecret = env.IDENTITY_SP_CLIENT_SECRET || env.AZURE_CLIENT_SECRET!;
      const clientId = env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!;
      const tenantId = env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!;

      const clientOptions = recorder.configureClientOptions({});
      const client = msalClient.createMsalClient(clientId, tenantId, {
        tokenCredentialOptions: { additionalPolicies: clientOptions.additionalPolicies },
      });

      const accessToken = await client.getTokenByClientSecret(scopes, clientSecret);
      assert.isNotEmpty(accessToken.token);
      assert.isNotNaN(accessToken.expiresOnTimestamp);
    });

    it("supports getTokenByDeviceCode", async function (this: Context) {
      if (isLiveMode()) {
        // Skip in CI live tests since this credential requires user interaction.
        this.skip();
      }
      const scopes = ["https://vault.azure.net/.default"];
      const clientId = DeveloperSignOnClientId;
      const tenantId = env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!;

      const clientOptions = recorder.configureClientOptions({});
      const client = msalClient.createMsalClient(clientId, tenantId, {
        tokenCredentialOptions: { additionalPolicies: clientOptions.additionalPolicies },
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
        tokenCredentialOptions: { additionalPolicies: clientOptions.additionalPolicies },
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
      const logSpy = sinon.spy(logger.getToken, "info");

      const client = msalClient.createMsalClient(clientId, tenantId, { logger });
      try {
        await client.getTokenByClientSecret(["https://vault.azure.net/.default"], "client-secret");
      } catch (e) {
        // ignore errors
      }

      assert.isAbove(logSpy.callCount, 0);
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
      sinon.restore();
    });

    describe("when CAE is enabled", function () {
      const enableCae = true;

      it("uses the CAE cache", async function () {
        const cachePluginCae = {
          afterCacheAccess: sinon.stub(),
          beforeCacheAccess: sinon.stub(),
        };
        const cachePlugin = {
          afterCacheAccess: sinon.stub(),
          beforeCacheAccess: sinon.stub(),
        };

        sinon.stub(msalPlugins, "generatePluginConfiguration").returns({
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

        assert.isAbove(cachePluginCae.beforeCacheAccess.callCount, 0);
        assert.equal(cachePlugin.beforeCacheAccess.callCount, 0);
      });
    });

    describe("when CAE is disabled", function () {
      const enableCae = false;
      it("initializes the default cache", async function () {
        const cachePluginCae = {
          afterCacheAccess: sinon.stub(),
          beforeCacheAccess: sinon.stub(),
        };
        const cachePlugin = {
          afterCacheAccess: sinon.stub(),
          beforeCacheAccess: sinon.stub(),
        };

        sinon.stub(msalPlugins, "generatePluginConfiguration").returns({
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

        assert.isAbove(cachePlugin.beforeCacheAccess.callCount, 0);
        assert.equal(cachePluginCae.beforeCacheAccess.callCount, 0);
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
      sinon.restore();
    });

    describe("with clientSecret", function () {
      it("uses a confidentialClientApplication", async function () {
        const client = msalClient.createMsalClient(clientId, tenantId);

        const publicClientStub = sinon.stub(
          PublicClientApplication.prototype,
          "acquireTokenByCode",
        );
        const confidentialClientStub = sinon
          .stub(ConfidentialClientApplication.prototype, "acquireTokenByCode")
          .resolves(fakeTokenResponse as AuthenticationResult);

        await client.getTokenByAuthorizationCode(scopes, "code", "redirectUri", "clientSecret");

        assert.equal(publicClientStub.callCount, 0);
        assert.equal(confidentialClientStub.callCount, 1);
      });
    });

    describe("without clientSecret", function () {
      it("uses a publicClientApplication", async function () {
        const client = msalClient.createMsalClient(clientId, tenantId);

        const publicClientStub = sinon
          .stub(PublicClientApplication.prototype, "acquireTokenByCode")
          .resolves(fakeTokenResponse as AuthenticationResult);
        const confidentialClientStub = sinon.stub(
          ConfidentialClientApplication.prototype,
          "acquireTokenByCode",
        );

        await client.getTokenByAuthorizationCode(
          scopes,
          "code",
          "redirectUri",
          undefined /* clientSecret */,
        );

        assert.equal(publicClientStub.callCount, 1);
        assert.equal(confidentialClientStub.callCount, 0);
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
      sinon.restore();
    });

    describe("with silent authentication", function () {
      it("uses AuthenticationRecord if provided", async function () {
        const authenticationRecord = {
          authority: "https://login.microsoftonline.com/tenant-id",
          tenantId,
          username: "testuser",
          homeAccountId: "home-account-id",
          clientId: "client-id",
        };

        const client = msalClient.createMsalClient(clientId, tenantId, {
          authenticationRecord,
        });

        const silentAuthSpy = sinon
          .stub(ClientApplication.prototype, "acquireTokenSilent")
          .resolves({
            accessToken: "token",
            expiresOn: new Date(),
          } as AuthenticationResult);

        const scopes = ["https://vault.azure.net/.default"];

        await client.getTokenByDeviceCode(scopes, deviceCodeCallback);

        assert.equal(silentAuthSpy.callCount, 1);
        assert.deepEqual(silentAuthSpy.firstCall.firstArg.account, {
          ...authenticationRecord,
          localAccountId: authenticationRecord.homeAccountId,
          environment: "login.microsoftonline.com",
        });
      });

      it("attempts silent authentication without AuthenticationRecord", async function () {
        const silentAuthStub = sinon
          .stub(ClientApplication.prototype, "acquireTokenSilent")
          .resolves({
            accessToken: "token",
            expiresOn: new Date(),
          } as AuthenticationResult);

        const clientCredentialAuthStub = sinon
          .stub(PublicClientApplication.prototype, "acquireTokenByDeviceCode")
          .resolves({
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
          clientCredentialAuthStub.callCount,
          1,
          "expected acquireTokenByClientCredential to have been called once",
        );
        assert.equal(
          silentAuthStub.callCount,
          1,
          "expected acquireTokenSilent to have been called once",
        );
      });

      it("throws when silentAuthentication fails with a rethrowable exception", async function () {
        const client = msalClient.createMsalClient(clientId, tenantId, {
          // An authentication record will get us to try the silent flow
          authenticationRecord: {
            authority: "https://login.microsoftonline.com/tenant-id",
            tenantId,
            username: "testuser",
            homeAccountId: "home-account-id",
            clientId: "client-id",
          },
        });

        sinon
          .stub(ClientApplication.prototype, "acquireTokenSilent")
          .rejects(new AbortError("operation has been aborted")); // AbortErrors should get re-thrown

        const scopes = ["https://vault.azure.net/.default"];

        await assert.isRejected(
          client.getTokenByDeviceCode(scopes, deviceCodeCallback),
          "operation has been aborted",
        );
      });

      it("throws when silentAuthentication fails and disableAutomaticAuthentication is true", async function () {
        const scopes = ["https://vault.azure.net/.default"];
        sinon
          .stub(ClientApplication.prototype, "acquireTokenSilent")
          .rejects(new AuthenticationRequiredError({ scopes }));

        const client = msalClient.createMsalClient(clientId, tenantId, {
          // An authentication record will get us to try the silent flow
          authenticationRecord: {
            authority: "https://login.microsoftonline.com/tenant-id",
            tenantId,
            username: "testuser",
            homeAccountId: "home-account-id",
            clientId: "client-id",
          },
        });

        await assert.isRejected(
          client.getTokenByDeviceCode(
            scopes,
            () => {
              // no-op
            },
            { disableAutomaticAuthentication: true },
          ),
          /Automatic authentication has been disabled/,
        );
      });
    });

    it("supports cancellation", async function (this: Context) {
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
      await assert.isRejected(request, AbortError);
    });

    it("supports cross-tenant federation", async function (this: Context) {
      const tenantIdOne = "tenantOne";
      const tenantIdTwo = "tenantTwo";
      const authorityHost = "https://custom.authority.com";

      const expectedAuthority = `${authorityHost}/${tenantIdTwo}`;

      const clientCredentialAuthStub = sinon
        .stub(PublicClientApplication.prototype, "acquireTokenByDeviceCode")
        .resolves({
          accessToken: "token",
          expiresOn: new Date(Date.now() + 3600 * 1000),
        } as AuthenticationResult);

      const client = msalClient.createMsalClient(clientId, tenantIdOne, {
        authorityHost,
      });

      const scopes = ["https://vault.azure.net/.default"];

      await client.getTokenByDeviceCode(scopes, deviceCodeCallback, { tenantId: tenantIdTwo });

      const { authority: requestAuthority } = clientCredentialAuthStub.firstCall.firstArg;
      assert.equal(requestAuthority, expectedAuthority);
    });
  });
});
