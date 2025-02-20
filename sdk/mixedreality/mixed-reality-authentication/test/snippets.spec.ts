// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MixedRealityStsClient } from "../src/index.js";
import { AzureKeyCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
// @ts-ignore
import { RemoteRenderingClient } from "@azure/mixed-reality-remote-rendering";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const accountId = "<ACCOUNTD ID>";
    const accountDomain = "<ACCOUNT_DOMAIN>";
    const accountKey = "<ACCOUNT_KEY>";
    // @ts-preserve-whitespace
    const client = new MixedRealityStsClient(
      accountId,
      accountDomain,
      new AzureKeyCredential(accountKey),
    );
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const accountId = "<ACCOUNTD ID>";
    const accountDomain = "<ACCOUNT_DOMAIN>";
    // @ts-preserve-whitespace
    const client = new MixedRealityStsClient(
      accountId,
      accountDomain,
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleGetToken", async () => {
    const accountId = "<ACCOUNTD ID>";
    const accountDomain = "<ACCOUNT_DOMAIN>";
    // @ts-preserve-whitespace
    const client = new MixedRealityStsClient(
      accountId,
      accountDomain,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const token = await client.getToken();
  });

  it("ReadmeSampleCreateClient_WithToken", async () => {
    const accountId = "<ACCOUNTD ID>";
    // @ts-preserve-whitespace
    async function getAccessToken() {
      // Make calls to get an access token from some service
      return {
        token: "<ACCESS_TOKEN>",
        expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
      };
    }
    // @ts-preserve-whitespace
    const accessToken = await getAccessToken();
    // @ts-preserve-whitespace
    const remoteRenderingClient = new RemoteRenderingClient(
      "<serviceEndpoint>",
      accountId,
      accessToken,
    );
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
