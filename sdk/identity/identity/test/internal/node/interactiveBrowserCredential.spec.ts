// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-namespace */

import Sinon from "sinon";
import http from "http";
import { assert } from "chai";
import { Context } from "mocha";
import { env } from "@azure-tools/test-recorder";
import { InteractiveBrowserCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { interactiveBrowserMockable } from "../../../src/msal/nodeFlows/msalOpenBrowser";

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
  let listen: http.Server | undefined;

  beforeEach(function(this: Context) {
    const setup = msalNodeTestSetup(this);
    sandbox = setup.sandbox;
    cleanup = setup.cleanup;
  });
  afterEach(async function() {
    if (listen) {
      listen.close();
    }
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Throws an expected error if no browser is available", async function(this: Context) {
    // The SinonStub type does not include this second parameter to throws().
    const testErrorMessage = "No browsers available on this test.";
    (sandbox.stub(interactiveBrowserMockable, "open") as any).throws("TestError", testErrorMessage);

    const credential = new InteractiveBrowserCredential({
      redirectUri: "http://localhost:8081",
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID
    });

    let error: Error | undefined;
    try {
      await credential.getToken(scope);
    } catch (e) {
      error = e;
    }

    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(
      error?.message,
      `InteractiveBrowserCredential: Could not open a browser window. Error: ${testErrorMessage}`
    );
  });

  it("Throws an expected error if port 1337 is not available", async function(this: Context) {
    const app = http.createServer((): void => undefined);

    const asyncListen = (port: string): Promise<http.Server> =>
      new Promise((resolve, reject) => {
        const server = (app as any).listen(port, "localhost", () => resolve(server));
        server.on("error", reject);
      });

    let port = "1337";
    try {
      listen = await asyncListen(port);
    } catch (e) {
      port = "1338";
      listen = await asyncListen(port);
    }

    const credential = new InteractiveBrowserCredential({
      redirectUri: `http://localhost:${port}`,
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID
    });

    let error: Error | undefined;
    try {
      await credential.getToken(scope);
    } catch (e) {
      error = e as Error;
    }

    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(
      error?.message,
      [
        `InteractiveBrowserCredential: Access denied to port ${port}.`,
        `Try sending a redirect URI with a different port, as follows:`,
        '`new InteractiveBrowserCredential({ redirectUri: "http://localhost:1337" })`'
      ].join(" ")
    );
  });
});
