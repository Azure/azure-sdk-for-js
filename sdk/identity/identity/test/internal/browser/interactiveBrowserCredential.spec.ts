// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @azure/azure-sdk/ts-no-namespaces */

import Sinon from "sinon";
import assert from "assert";
import { Context } from "mocha";
import * as msalBrowser from "@azure/msal-browser";
import { env } from "@azure/test-utils-recorder";
import { InteractiveBrowserCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";

import { URL } from "url";
import { delay } from "@azure/core-http";

declare global {
  namespace NodeJS {
    interface Global {
      URL: typeof import("url").URL;
    }
  }
}

describe("InteractiveBrowserCredential (internal)", function() {
  let cleanup: MsalTestCleanup;
  let sandbox: Sinon.SinonSandbox;

  beforeEach(function(this: Context) {
    const setup = msalNodeTestSetup(this);
    sandbox = setup.sandbox;
    cleanup = setup.cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it.only("Passes properties correctly to MSAL", async function(this: Context) {
    // On Node 8, URL is not defined. We use URL on the msalOpenBrowser.ts file.
    if (process.version.startsWith("v8.")) {
      global.URL = URL;
    }

    const msalSpy = sandbox.spy(msalBrowser.PublicClientApplication.prototype, "loginRedirect");

    const credential = new InteractiveBrowserCredential({
      redirectUri: "http://localhost:8081",
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID,
      loginClaims: "login-claims",
      loginDomainHint: "login-domain-hint",
      loginExtraQueryParameters: { parameter: "value" },
      loginOnRedirectNavigate: () => undefined,
      loginRedirectStartPage: "",
      loginNonce: "login-nonce",
      loginState: "login-state",
      loginStyle: "popup"
    });

    const timeout = 500;
    try {
      credential.getToken(scope, {
        requestOptions: {
          timeout
        }
      });
      await delay(timeout);
    } catch (e) {
      // Nothing to do here
    }

    // Now we check the spy

    assert.equal(msalSpy.callCount, 1);
  });
});
