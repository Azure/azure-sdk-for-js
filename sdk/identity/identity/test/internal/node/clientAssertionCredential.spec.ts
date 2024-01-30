// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import * as path from "path";

import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";

import { ClientAssertionCredential } from "../../../src";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { Context } from "mocha";
import { MsalNode } from "../../../src/msal/nodeFlows/msalNodeCommon";
import Sinon from "sinon";
import { assert } from "chai";
import { createJWTTokenFromCertificate } from "../../public/node/utils/utils";
import { env } from "@azure-tools/test-recorder";

describe("ClientAssertionCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;

    getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");
    doGetTokenSpy = Sinon.spy(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential",
    );
  });
  afterEach(async function () {
    await cleanup();
    Sinon.restore();
  });

  it("Should throw if the parameteres are not correctly specified", async function () {
    const errors: Error[] = [];
    try {
      new ClientAssertionCredential(
        undefined as any,
        env.AZURE_CLIENT_ID ?? "client",
        async () => "assertion",
      );
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(
        env.AZURE_TENANT_ID ?? "tenant",
        undefined as any,
        async () => "assertion",
      );
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(
        env.AZURE_TENANT_ID ?? "tenant",
        env.AZURE_CLIENT_ID ?? "client",
        undefined as any,
      );
    } catch (e: any) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(undefined as any, undefined as any, undefined as any);
    } catch (e: any) {
      errors.push(e);
    }
    assert.equal(errors.length, 4);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "ClientAssertionCredential: tenantId, clientId, and clientAssertion are required parameters.",
      );
    });
  });

  it("Sends the expected parameters", async function () {
    const tenantId = env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!;
    const clientId = env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!;
    const certificatePath = env.IDENTITY_SP_CERT_PEM || path.join("assets", "fake-cert.pem");
    const authorityHost = `https://login.microsoftonline.com/${tenantId}`;

    async function getAssertion(): Promise<string> {
      const jwtoken = await createJWTTokenFromCertificate(authorityHost, clientId, certificatePath);
      return jwtoken;
    }
    const credential = new ClientAssertionCredential(tenantId, clientId, getAssertion);

    try {
      await credential.getToken("https://vault.azure.net/.default");
    } catch (e: any) {
      // We're ignoring errors since our main goal here is to ensure that we send the correct parameters to MSAL.
      console.log("error", e);
    }

    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    // TODO: you can test if this matches
    // const returnedAssertion = await getAssertion();
    // const sentConfiguration = doGetTokenSpy.args[0][0];
    // assert.equal(sentConfiguration.clientAssertion, "assertion");
  });
});
