// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalClient from "../../../src/msal/msalClient";

import { AuthenticationResult, ConfidentialClientApplication } from "@azure/msal-node";

import { AbortError } from "@azure/abort-controller";
import { AuthenticationRequiredError } from "../../../src/errors";
import { IdentityClient } from "../../../src/client/identityClient";
import { assert } from "@azure/test-utils";
import { credentialLogger } from "../../../src/util/logging";
import sinon from "sinon";

describe("MsalClient", function () {
  describe("#createMsalClient", function () {
    it("can create an msal client with minimal configuration", function () {
      const clientId = "client-id";
      const tenantId = "tenant-id";

      const client = msalClient.createMsalClient(clientId, tenantId);
      assert.exists(client);
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

      it("configures logging options", function () {
        const clientId = "client-id";
        const tenantId = "tenant-id";
        const loggingOptions = {
          enableUnsafeSupportLogging: true,
        };
        const testCorrelationId = "test-correlation-id-1";
        const logger = credentialLogger("test");
        const logSpy = sinon.spy(logger, "info");

        const config = msalClient.generateMsalConfiguration(clientId, tenantId, {
          loggingOptions,
          logger,
        });
        config.auth.clientSecret = "client-secret";
        const cca = new ConfidentialClientApplication(config);

        assert.equal(config.system!.loggerOptions!.piiLoggingEnabled, true);

        cca.getLogger().info("logging test", testCorrelationId);
        const loggerCall = logSpy.getCalls().find((c) => c.lastArg.includes(testCorrelationId));
        assert.exists(
          loggerCall,
          `Unable to find logger call with correlation id ${testCorrelationId}`,
        );
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

  describe("#getTokenByClientSecret", function () {
    let sandbox: sinon.SinonSandbox;

    // TODO: helper to fetch env vars
    const clientId = process.env.AZURE_CLIENT_ID!;
    const tenantId = process.env.AZURE_TENANT_ID!;

    afterEach(async function () {
      sandbox.restore();
    });

    beforeEach(async function () {
      sandbox = sinon.createSandbox();
    });

    it("is supported", async function () {
      const scopes = ["https://vault.azure.net/.default"];
      const clientSecret = process.env.AZURE_CLIENT_SECRET!;

      const client = msalClient.createMsalClient(clientId, tenantId);

      sandbox
        .stub(ConfidentialClientApplication.prototype, "acquireTokenByClientCredential")
        .resolves({
          accessToken: "token",
          expiresOn: new Date(Date.now() + 3600 * 1000),
        } as AuthenticationResult);

      const accessToken = await client.getTokenByClientSecret(scopes, clientSecret);
      assert.isNotEmpty(accessToken.token);
      assert.isAtLeast(accessToken.expiresOnTimestamp, Date.now());
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

        const silentAuthSpy = sandbox
          .stub(ConfidentialClientApplication.prototype, "acquireTokenSilent")
          .resolves({
            accessToken: "token",
            expiresOn: new Date(),
          } as AuthenticationResult);

        const scopes = ["https://vault.azure.net/.default"];
        const clientSecret = process.env.AZURE_CLIENT_SECRET!;

        await client.getTokenByClientSecret(scopes, clientSecret);

        assert.equal(silentAuthSpy.callCount, 1);
        assert.deepEqual(silentAuthSpy.firstCall.firstArg.account, {
          ...authenticationRecord,
          localAccountId: authenticationRecord.homeAccountId,
          environment: "login.microsoftonline.com",
        });
      });

      it("attempts silent authentication without AuthenticationRecord", async function () {
        const silentAuthStub = sandbox
          .stub(ConfidentialClientApplication.prototype, "acquireTokenSilent")
          .resolves({
            accessToken: "token",
            expiresOn: new Date(),
          } as AuthenticationResult);

        const clientCredentialAuthStub = sandbox
          .stub(ConfidentialClientApplication.prototype, "acquireTokenByClientCredential")
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
        const clientSecret = process.env.AZURE_CLIENT_SECRET!;

        const client = msalClient.createMsalClient(clientId, tenantId);

        await client.getTokenByClientSecret(scopes, clientSecret);
        await client.getTokenByClientSecret(scopes, clientSecret);

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

        sandbox
          .stub(ConfidentialClientApplication.prototype, "acquireTokenSilent")
          .rejects(new AbortError("operation has been aborted")); // AbortErrors should get rethrown

        const scopes = ["https://vault.azure.net/.default"];
        const clientSecret = process.env.AZURE_CLIENT_SECRET!;

        await assert.isRejected(
          client.getTokenByClientSecret(scopes, clientSecret),
          "operation has been aborted",
        );
      });

      it("throws when silentAuthentication fails and disableAutomaticAuthentication is true", async function () {
        const client = msalClient.createMsalClient(clientId, tenantId, {
          disableAutomaticAuthentication: true,
          // An authentication record will get us to try the silent flow
          authenticationRecord: {
            authority: "https://login.microsoftonline.com/tenant-id",
            tenantId,
            username: "testuser",
            homeAccountId: "home-account-id",
            clientId: "client-id",
          },
        });

        const scopes = ["https://vault.azure.net/.default"];
        sandbox
          .stub(ConfidentialClientApplication.prototype, "acquireTokenSilent")
          .rejects(new AuthenticationRequiredError({ scopes }));

        const clientSecret = process.env.AZURE_CLIENT_SECRET!;

        await assert.isRejected(
          client.getTokenByClientSecret(scopes, clientSecret),
          /Automatic authentication has been disabled/,
        );
      });
    });
  });
});
