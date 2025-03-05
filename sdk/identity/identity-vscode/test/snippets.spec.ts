// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { vsCodePlugin } from "../src/index.js";
import {
  DefaultAzureCredential,
  useIdentityPlugin,
  VisualStudioCodeCredential,
} from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleUsePlugin", async () => {
    useIdentityPlugin(vsCodePlugin);
  });

  it("ReadmeSampleVisualStudioCodeCredential", async () => {
    useIdentityPlugin(vsCodePlugin);
    // @ts-preserve-whitespace
    const credential = new VisualStudioCodeCredential();
    // @ts-preserve-whitespace
    // The graph.microsoft.com scope is used as an example
    const scope = "https://graph.microsoft.com/.default";
    // @ts-preserve-whitespace
    // Print out part of the access token
    console.log((await credential.getToken(scope)).token.substr(0, 10), "...");
  });

  it("ReadmeSampleDefaultAzureCredential", async () => {
    useIdentityPlugin(vsCodePlugin);
    // @ts-preserve-whitespace
    // With the plugin enabled above, `DefaultAzureCredential` will use
    // Visual Studio Code's "Azure Account" extension to authenticate if
    // it is available.
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // This will print a JWT access_token and its expiration timestamp
    // The graph.microsoft.com scope is used as an example
    console.log("Token:", await credential.getToken("https://graph.microsoft.com/.default"));
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
