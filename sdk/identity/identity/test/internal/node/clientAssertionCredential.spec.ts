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
import { ConfidentialClientApplication } from "@azure/msal-node";
import {setLogLevel } from "@azure/logger";

describe("ClientAssertionCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let spy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(function (this: Context) {
    const setup = msalNodeTestSetup(this);
    cleanup = setup.cleanup;
    spy = setup.sandbox.spy(msalNode, "ConfidentialClientApplication");
    doGetTokenSpy = setup.sandbox.stub(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential"
    ).callsFake(() => {
      console.log("@@@@@@@@@@@@@@@@@@@@@@")
      return Promise.resolve({accessToken: ""} as any)
    })
  });
  afterEach(async function () {
    await cleanup();
  });

  // it.only("call count", () => {
  //   const x = new ConfidentialClientApplication({auth: {clientId: ""}});
  //   console.log(x)
  //   // x.acquireTokenByClientCredential({scopes: [""]});
  //   assert.equal(spy.callCount, 1)
  // })

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

  it.only("Sends the expected parameters", async function () {
    setLogLevel("verbose");
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
  // async function getAssertion(): Promise<string> {
  //   return "assertion";
  // };
//console.log(spy.callCount);
    console.log(spy.name);
    // console.dir(doGetTokenSpy.calledWith({
    //   assertion: await getAssertion() ,
    //   assertionType: "jwt_bearer"
    // }));
    console.log(doGetTokenSpy.name);
    assert.equal(spy.name, "ConfidentialClientApplication");

   const sentConfiguration = spy.args[0][0];
    assert.equal(sentConfiguration.auth.clientAssertion, "assertion");
    console.log(doGetTokenSpy.callCount);
    console.log(spy.callCount);
  });
});
