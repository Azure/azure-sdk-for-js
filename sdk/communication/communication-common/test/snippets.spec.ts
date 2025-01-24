// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureCommunicationTokenCredential } from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCredentialStaticToken", async () => {
    const tokenCredential = new AzureCommunicationTokenCredential(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM2MDB9.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs",
    );
  });

  it("ReadmeSampleCredentialCallback", async () => {
    function fetchTokenFromMyServerForUser(user: string): Promise<string> {
      // Your custom implementation to fetch a token for the user
      return Promise.resolve("some-unique-token-for-" + user);
    }
    // @ts-preserve-whitespace
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher: async () => fetchTokenFromMyServerForUser("bob@contoso.com"),
    });
  });

  it("ReadmeSampleCredentialProactiveRefresh", async () => {
    function fetchTokenFromMyServerForUser(user: string): Promise<string> {
      // Your custom implementation to fetch a token for the user
      return Promise.resolve("some-unique-token-for-" + user);
    }
    // @ts-preserve-whitespace
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher: async () => fetchTokenFromMyServerForUser("bob@contoso.com"),
      refreshProactively: true,
    });
  });

  it("ReadmeSampleCredentialProactiveRefreshWithInitialToken", async () => {
    function fetchTokenFromMyServerForUser(user: string): Promise<string> {
      // Your custom implementation to fetch a token for the user
      return Promise.resolve("some-unique-token-for-" + user);
    }
    // @ts-preserve-whitespace
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher: async () => fetchTokenFromMyServerForUser("bob@contoso.com"),
      refreshProactively: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM2MDB9.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs",
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
