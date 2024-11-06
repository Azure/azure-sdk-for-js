// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InteractiveBrowserCredential, useIdentityPlugin } from "@azure/identity";
import { nativeBrokerPlugin } from "@azure/identity-broker";
import { setLogLevel } from "@azure/logger";

describe("snippets", function () {
  it("getting_started", function () {
    useIdentityPlugin(nativeBrokerPlugin);
  });

  it("using_plugins", async function () {
    useIdentityPlugin(nativeBrokerPlugin);

    // @ts-ignore
    const credential = new InteractiveBrowserCredential({
      brokerOptions: {
        enabled: true,
        parentWindowHandle: new Uint8Array(0), // This should be a handle to the parent window
      },
    });
  });

  it("usage_example", async function () {
    useIdentityPlugin(nativeBrokerPlugin);

    const credential = new InteractiveBrowserCredential({
      brokerOptions: {
        enabled: true,
        parentWindowHandle: new Uint8Array(0), // This should be a handle to the parent window
      },
    });

    // We'll use the Microsoft Graph scope as an example
    const scope = "https://graph.microsoft.com/.default";

    // Print out part of the access token
    console.log((await credential.getToken(scope)).token.substring(0, 10), "...");
  });

  it("use_default_account", async function () {
    useIdentityPlugin(nativeBrokerPlugin);

    const credential = new InteractiveBrowserCredential({
      brokerOptions: {
        enabled: true,
        useDefaultBrokerAccount: true,
        parentWindowHandle: new Uint8Array(0), // This should be a handle to the parent window
      },
    });

    // We'll use the Microsoft Graph scope as an example
    const scope = "https://graph.microsoft.com/.default";

    // Print out part of the access token
    console.log((await credential.getToken(scope)).token.substr(0, 10), "...");
  });

  it("logging", async function () {
    setLogLevel("info");
  });
});
