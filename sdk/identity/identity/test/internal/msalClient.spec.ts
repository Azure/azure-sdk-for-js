// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalClient from "../../src/msal/msalClient";

import { assert } from "@azure/test-utils";
import { msalNodeTestSetup } from "../node/msalNodeTestSetup";

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

  describe("#getTokenByClientCredential", function () {
    it("is supported", async function () {
      const clientId = "client-id";
      const tenantId = "tenant-id";

      const client = msalClient.createMsalClient(clientId, tenantId);
      const scopes = ["scope"];
      const clientSecret = process.env.AZURE_CLIENT_SECRET!;

      const accessToken = await client.getTokenByClientSecret(scopes, clientSecret);
      assert.deepEqual(accessToken, {
        token: "token",
        expiresOnTimestamp: 0,
      });
    });
  });
});
