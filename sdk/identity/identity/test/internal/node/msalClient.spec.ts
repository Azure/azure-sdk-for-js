// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalClient from "../../../src/msal/msalClient";

import { IdentityClient } from "../../../src/client/identityClient";
import { assert } from "@azure/test-utils";
import { expect } from "chai";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import sinon from "sinon";

describe.only("MsalClient", function () {
  let cleanup: any;
  afterEach(async function () {
    if (cleanup) {
      await cleanup();
    }
  });
  beforeEach(async function () {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
  });

  describe("#createMsalClient", function () {
    it("can create an msal client with minimal configuration", function () {
      const clientId = "client-id";
      const tenantId = "tenant-id";

      const client = msalClient.createMsalClient(clientId, tenantId);
      assert.exists(client);
    });
  });

  describe("#generateMsalConfiguration", function () {
    // TODO: integration tests, ie exercise the msal library using this config
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

      it("handles known authorities");

      it("configures logging options", function () {
        const clientId = "client-id";
        const tenantId = "tenant-id";
        const loggingOptions = {
          enableUnsafeSupportLogging: true,
        };

        const config = msalClient.generateMsalConfiguration(clientId, tenantId, { loggingOptions });
        assert.equal(config.system!.loggerOptions!.piiLoggingEnabled, true);
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
    it("is supported", async function () {
      // TODO: helper to fetch env vars
      const clientId = process.env.AZURE_CLIENT_ID!;
      const tenantId = process.env.AZURE_TENANT_ID!;

      const client = msalClient.createMsalClient(clientId, tenantId);
      const scopes = ["https://vault.azure.net/.default"];
      const clientSecret = process.env.AZURE_CLIENT_SECRET!;

      const accessToken = await client.getTokenByClientSecret(scopes, clientSecret);
      assert.isNotEmpty(accessToken.token);
      assert.isAtLeast(accessToken.expiresOnTimestamp, Date.now());
    });

    it("attempts silent authentication first");
  });
});
