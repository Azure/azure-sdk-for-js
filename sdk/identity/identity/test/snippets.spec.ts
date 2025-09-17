// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPipelineRequest } from "@azure/core-rest-pipeline";
import {
  AzureAuthorityHosts,
  ChainedTokenCredential,
  ClientSecretCredential,
  DefaultAzureCredential,
  DeviceCodeCredential,
  getBearerTokenProvider,
  InteractiveBrowserCredential,
  OnBehalfOfCredential,
  useIdentityPlugin,
} from "@azure/identity";
import { KeyClient } from "@azure/keyvault-keys";
import { setLogLevel } from "@azure/logger";
import dotenv from "dotenv";
import { describe, expect, it, vi } from "vitest";

describe("snippets", function () {
  it("defaultazurecredential_vscode", function () {
    // @ts-ignore
    useIdentityPlugin(vsCodePlugin);
    // @ts-ignore
    const credential = new DefaultAzureCredential();
  });

  it("defaultazurecredential_authenticate", function () {
    // Configure vault URL
    const vaultUrl = "https://<your-unique-keyvault-name>.vault.azure.net";
    // @ts-preserve-whitespace
    // Azure SDK clients accept the credential as a parameter
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Create authenticated client
    // @ts-ignore
    const client = new KeyClient(vaultUrl, credential);
  });
  snippet: it("chaintedtokencredential_authenticate", function () {
    // Configure variables
    const vaultUrl = "https://<your-unique-keyvault-name>.vault.azure.net";
    const tenantId = "<tenant-id>";
    const clientId = "<client-id>";
    const clientSecret = "<client-secret>";
    const anotherClientId = "<another-client-id>";
    const anotherSecret = "<another-client-secret>";
    // @ts-preserve-whitespace
    // When an access token is requested, the chain will try each
    // credential in order, stopping when one provides a token
    const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
    const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
    // @ts-preserve-whitespace
    // The chain can be used anywhere a credential is required
    // @ts-ignore
    const client = new KeyClient(vaultUrl, credentialChain);
  });

  it("cloudconfiguration_authenticate", function () {
    // @ts-ignore
    const credential = new ClientSecretCredential(
      "<YOUR_TENANT_ID>",
      "<YOUR_CLIENT_ID>",
      "<YOUR_CLIENT_SECRET>",
      {
        authorityHost: AzureAuthorityHosts.AzureGovernment,
      },
    );
  });

  it("cloudconfiguration_authorityhost", function () {
    // @ts-ignore
    const credential = new ClientSecretCredential(
      "<YOUR_TENANT_ID>",
      "<YOUR_CLIENT_ID>",
      "<YOUR_CLIENT_SECRET>",
      {
        authorityHost: "https://login.partner.microsoftonline.cn",
      },
    );
  });

  it("identity_breakingchanges_addexplicitadditionallyallowedtenants", function () {
    // @ts-ignore
    const credential = new DefaultAzureCredential({
      additionallyAllowedTenants: ["<tenant_id_1>", "<tenant_id_2>"],
    });
  });

  it("identity_breakingchanges_addalladditionallyallowedtenants", function () {
    // @ts-ignore
    const credential = new DefaultAzureCredential({
      additionallyAllowedTenants: ["*"],
    });
  });

  it("troubleshooting_authentication_error", async function () {
    // Create a key client using the DefaultAzureCredential
    const keyVaultUrl = "https://key-vault-name.vault.azure.net";
    const credential = new DefaultAzureCredential();
    const client = new KeyClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    try {
      // Retrieving the properties of the existing keys in that specific Key Vault.
      console.log(await client.listPropertiesOfKeys().next());
    } catch (error) {
      console.log("Microsoft Entra ID service response with error", error);
    }
  });

  it("troubleshooting_authentication_required_error", async function () {
    // Create a key client using the DefaultAzureCredential
    const keyVaultUrl = "https://key-vault-name.vault.azure.net";
    const credential = new DefaultAzureCredential();
    const client = new KeyClient(keyVaultUrl, credential);
    // @ts-preserve-whitespace
    try {
      // Retrieving the properties of the existing keys in that specific Key Vault.
      console.log(await client.listPropertiesOfKeys().next());
    } catch (error) {
      console.log("Authentication Failed", error);
    }
  });

  it("troubleshooting_logging", async function () {
    // set up the log level to enable the logger
    setLogLevel("info");
  });

  it("troubleshooting_dotenv", async function () {
    dotenv.config({ path: ".env" });
  });

  it("troubleshooting_logging_identifiers", async function () {
    setLogLevel("info");
    // @ts-preserve-whitespace
    // @ts-ignore
    const credential = new DefaultAzureCredential({
      loggingOptions: { allowLoggingAccountIdentifiers: true },
    });
  });

  it("troubleshooting_pii_logging", async function () {
    setLogLevel("info");
    // @ts-preserve-whitespace
    // @ts-ignore
    const credential = new DefaultAzureCredential({
      loggingOptions: { enableUnsafeSupportLogging: true },
    });
  });

  it("interactivebrowsercredential_node", async function () {
    // @ts-ignore
    const credential = new InteractiveBrowserCredential({
      // You may provide a client ID if you have an application configured.
      clientId: "my-client-id",
      // You may provide a tenant ID based on the resource you are trying to access.
      tenantId: "my-tenant-id",
      // You may provide a redirectUri based on the redirectUri configured in your Microsoft Entra application:
      redirectUri: "http://localhost:8080/",
    });
  });

  it("interactivebrowsercredential_browser", async function () {
    // @ts-ignore
    const credential = new InteractiveBrowserCredential({
      // You MUST provide a client ID if you have an application configured.
      clientId: "my-client-id",
      // You may provide a tenant ID based on the resource you are trying to access.
      tenantId: "my-tenant-id",
      // You may provide a redirectUri based on the redirectUri configured in your Microsoft Entra application:
      redirectUri: "http://localhost:8080/",
    });
  });

  it("token_provider_example", async function () {
    const credential = new DefaultAzureCredential();
    const scope = "https://cognitiveservices.azure.com/.default";
    const getAccessToken = getBearerTokenProvider(credential, scope);
    const token = await getAccessToken();
    // @ts-preserve-whitespace
    // usage
    const request = createPipelineRequest({ url: "https://example.com" });
    request.headers.set("Authorization", `Bearer ${token}`);
  });

  it("chained_token_credential_example", async function () {
    const tenantId = "<tenant-id>";
    const clientId = "<client-id>";
    const clientSecret = "<client-secret>";
    const anotherClientId = "<another-client-id>";
    const anotherSecret = "<another-client-secret>";
    // @ts-preserve-whitespace
    const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
    // @ts-preserve-whitespace
    // @ts-ignore
    const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
  });

  it("credential_persistence_options_example", async function () {
    // @ts-ignore
    useIdentityPlugin(cachePersistencePlugin);
    // @ts-preserve-whitespace
    // @ts-ignore
    const credential = new DeviceCodeCredential({
      tokenCachePersistenceOptions: {
        enabled: true,
      },
    });
  });

  it("device_code_credential_example", async function () {
    // @ts-ignore
    const credential = new DeviceCodeCredential({
      tenantId: process.env.AZURE_TENANT_ID,
      clientId: process.env.AZURE_CLIENT_ID,
      userPromptCallback: (info) => {
        console.log("CUSTOMIZED PROMPT CALLBACK", info.message);
      },
    });
  });

  it("on_behalf_of_credential_pem_example", async function () {
    const tokenCredential = new OnBehalfOfCredential({
      tenantId: "tenant-id",
      clientId: "client-id",
      certificatePath: "/path/to/certificate.pem",
      userAssertionToken: "access-token",
    });
    const client = new KeyClient("vault-url", tokenCredential);
    // @ts-preserve-whitespace
    await client.getKey("key-name");
  });

  it("on_behalf_of_credential_secret_example", async function () {
    const tokenCredential = new OnBehalfOfCredential({
      tenantId: "tenant-id",
      clientId: "client-id",
      clientSecret: "client-secret",
      userAssertionToken: "access-token",
    });
    const client = new KeyClient("vault-url", tokenCredential);
    // @ts-preserve-whitespace
    await client.getKey("key-name");
  });

  it("on_behalf_of_credential_assertion_example", async function () {
    const tokenCredential = new OnBehalfOfCredential({
      tenantId: "tenant-id",
      clientId: "client-id",
      getAssertion: () => {
        return Promise.resolve("my-jwt");
      },
      userAssertionToken: "access-token",
    });
    const client = new KeyClient("vault-url", tokenCredential);
    // @ts-preserve-whitespace
    await client.getKey("key-name");
  });

  it("consumer_example", async function () {
    // @ts-ignore
    useIdentityPlugin(cachePersistencePlugin);
    // The plugin has the capability to extend `DeviceCodeCredential` and to
    // add middleware to the underlying credentials, such as persistence.
    // @ts-ignore
    const credential = new DeviceCodeCredential({
      tokenCachePersistenceOptions: {
        enabled: true,
      },
    });
  });

  it("defaultazurecredential_requiredEnvVars", function () {
    // @ts-ignore
    const credential = new DefaultAzureCredential({
      requiredEnvVars: [
        "AZURE_CLIENT_ID",
        "AZURE_TENANT_ID",
        "AZURE_CLIENT_SECRET",
        "AZURE_TOKEN_CREDENTIALS",
      ],
    });
  });
});
