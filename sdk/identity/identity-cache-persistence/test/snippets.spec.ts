// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceCodeCredential, useIdentityPlugin } from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleUsePlugin", () => {
    useIdentityPlugin(cachePersistencePlugin);
  });

  it("ReadmeSampleDeviceCodeCredential", async () => {
    const credential = new DeviceCodeCredential({
      tokenCachePersistenceOptions: {
        enabled: true,
      },
    });
    // @ts-preserve-whitespace
    // We'll use the Microsoft Graph scope as an example
    const scope = "https://graph.microsoft.com/.default";
    // @ts-preserve-whitespace
    // Print out part of the access token
    console.log((await credential.getToken(scope)).token.substring(0, 10), "...");
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
