// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InteractiveBrowserCredential } from "@azure/identity";
import {
  AzureCommunicationTokenCredential,
  EntraCommunicationTokenCredentialOptions,
} from "@azure/communication-common";
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

  it("ReadmeSampleCredentialEntraUser", async () => {
    const options = {
      tenantId: "<your-tenant-id>",
      clientId: "<your-client-id>",
      redirectUri: "<your-redirect-uri>",
    };
    const entraTokenCredential = new InteractiveBrowserCredential(options);
    // @ts-preserve-whitespace
    const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
      resourceEndpoint: "https://<your-resource>.communication.azure.com",
      tokenCredential: entraTokenCredential,
      scopes: ["https://communication.azure.com/clients/VoIP"],
    };
    // @ts-preserve-whitespace
    const credential = new AzureCommunicationTokenCredential(entraTokenCredentialOptions);
  });

  it("ReadmeSampleCredentialEntraUserTeamsPhoneExtensibility", async () => {
    const options = {
      tenantId: "<your-tenant-id>",
      clientId: "<your-client-id>",
      redirectUri: "<your-redirect-uri>",
    };
    const entraTokenCredential = new InteractiveBrowserCredential(options);
    // @ts-preserve-whitespace
    const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
      resourceEndpoint: "https://<your-resource>.communication.azure.com",
      tokenCredential: entraTokenCredential,
      scopes: ["https://auth.msft.communication.azure.com/TeamsExtension.ManageCalls"],
    };
    // @ts-preserve-whitespace
    const credential = new AzureCommunicationTokenCredential(entraTokenCredentialOptions);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
