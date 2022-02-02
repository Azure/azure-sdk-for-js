// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { env } from "@azure-tools/test-recorder";
import { ClientAssertionCredential } from "../../../src";
import { Context } from "mocha";
import Sinon from "sinon";
import { msalNodeTestSetup, MsalTestCleanup } from "../../msalTestUtils";
import * as msalNode from "@azure/msal-node";

describe("ClientAssertionCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let spy: Sinon.SinonSpy;

  beforeEach(function (this: Context) {
    const setup = msalNodeTestSetup(this);
    cleanup = setup.cleanup;

    spy = setup.sandbox.spy(msalNode, "ConfidentialClientApplication");
  });
  afterEach(async function () {
    await cleanup();
  });

  it("Should throw if the parameteres are not correctly specified", async function () {
    const errors: Error[] = [];
    try {
      new ClientAssertionCredential(undefined as any, env.AZURE_CLIENT_ID, async () => "assertion");
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(env.AZURE_TENANT_ID, undefined as any, async () => "assertion");
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID, undefined as any);
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(undefined as any, undefined as any, undefined as any);
    } catch (e) {
      errors.push(e);
    }
    assert.equal(errors.length, 4);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "ClientAssertionCredential: tenantId, clientId, and clientAssertion are required parameters."
      );
    });
  });

  it("Sends the expected parameters", async function () {
    const credential = new ClientAssertionCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      async () => "assertion"
    );

    try {
      await credential.getToken("https://vault.azure.net/.default");
    } catch (e) {
      // We're ignoring errors since our main goal here is to ensure that we send the correct parameters to MSAL.
    }
    const sentConfiguration = spy.args[0][0];
    assert.equal(sentConfiguration.auth.clientAssertion, "assertion");
  });
});
