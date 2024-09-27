// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceCodeCredential, useIdentityPlugin } from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
import { setLogLevel } from "@azure/logger";

describe("snippets", function () {
  it("getting_started", function () {
    useIdentityPlugin(cachePersistencePlugin);
  });

  it("device_code_credential_example", async function () {
    const credential = new DeviceCodeCredential({
      tokenCachePersistenceOptions: {
        enabled: true,
      },
    });

    // We'll use the Microsoft Graph scope as an example
    const scope = "https://graph.microsoft.com/.default";

    // Print out part of the access token
    console.log((await credential.getToken(scope)).token.substring(0, 10), "...");
  });

  it("logging", async function () {
    setLogLevel("info");
  });
});
