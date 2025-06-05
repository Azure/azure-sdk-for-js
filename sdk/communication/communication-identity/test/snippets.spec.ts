// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { CommunicationIdentityClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const key = "<some-key>";
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new AzureKeyCredential(key);
    const client = new CommunicationIdentityClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    // Example connection string
    const connectionString =
      "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
    // @ts-preserve-whitespace
    const client = new CommunicationIdentityClient(connectionString);
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
  });

  it("ReadmeSampleCreateUser", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
    // @ts-preserve-whitespace
    const user = await client.createUser();
  });

  it("ReadmeSampleCreateUser_CustomId", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
    // @ts-preserve-whitespace
    const user = await client.createUser({ customId: "alice@contoso.com" });
    const getResult = await client.getUser(user);
  });

  it("ReadmeSampleCreateToken", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
    // @ts-preserve-whitespace
    const user = await client.createUser();
    // @ts-preserve-whitespace
    const { token } = await client.getToken(user, ["chat"]);
  });

  it("ReadmeSampleRefreshToken", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
    // @ts-preserve-whitespace
    const user = await client.createUser();
    // @ts-preserve-whitespace
    let { token } = await client.getToken(user, ["chat"]);
    // @ts-preserve-whitespace
    // Refresh the token again
    ({ token } = await client.getToken(user, ["chat"]));
  });

  it("ReadmeSampleCreateTokenWithOptions", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
    // @ts-preserve-whitespace
    const user = await client.createUser();
    // @ts-preserve-whitespace
    const tokenOptions = { tokenExpiresInMinutes: 60 };
    const { token } = await client.getToken(user, ["chat"], tokenOptions);
  });

  it("ReadmeSampleCreateUserAndToken", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
    // @ts-preserve-whitespace
    const { user, token } = await client.createUserAndToken(["chat"]);
  });

  it("ReadmeSampleCreateUserAndTokenWithOptions", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
    // @ts-preserve-whitespace
    const userAndTokenOptions = { tokenExpiresInMinutes: 60 };
    const { user, token } = await client.createUserAndToken(["chat"], userAndTokenOptions);
  });

  it("ReadmeSampleRevokeTokens", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Create user
    const user = await client.createUser();
    // @ts-preserve-whitespace
    // Later when you want to revoke the user's tokens
    await client.revokeTokens(user);
  });

  it("ReadmeSampleDeleteUser", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Create user
    const user = await client.createUser();
    // @ts-preserve-whitespace
    // Later when you want to delete the user
    await client.deleteUser(user);
  });

  it("ReadmeSampleGetTokenForTeamsUser", async () => {
    const endpoint = "https://contoso.eastus.communications.azure.net";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new CommunicationIdentityClient(endpoint, credential);
    // @ts-preserve-whitespace
    const { token, expiresOn } = await client.getTokenForTeamsUser({
      teamsUserAadToken: "<aad-access-token-of-a-teams-user>",
      clientId: "<cliend-id-of-an-aad-application>",
      userObjectId: "<aad-object-id-of-a-teams-user>",
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
