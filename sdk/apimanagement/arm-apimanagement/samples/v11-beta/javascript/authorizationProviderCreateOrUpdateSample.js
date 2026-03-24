// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates authorization provider.
 *
 * @summary creates or updates authorization provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateAuthorizationProviderAADAuthCode.json
 */
async function apiManagementCreateAuthorizationProviderAADAuthCode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.createOrUpdate(
    "rg1",
    "apimService1",
    "aadwithauthcode",
    {
      displayName: "aadwithauthcode",
      identityProvider: "aad",
      oauth2: {
        grantTypes: {
          authorizationCode: {
            clientId: "clientsecretid",
            clientSecret: "clientsecretvalue",
            resourceUri: "https://graph.microsoft.com",
            scopes: "User.Read.All Group.Read.All",
          },
        },
        redirectUrl:
          "https://authorization-manager.consent.azure-apim.net/redirect/apim/apimService1",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates authorization provider.
 *
 * @summary creates or updates authorization provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateAuthorizationProviderAADAuthCodeWithKeyVault.json
 */
async function apiManagementCreateAuthorizationProviderAADAuthCodeWithKeyVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.createOrUpdate(
    "rg1",
    "apimService1",
    "aadwithkeyvault",
    {
      displayName: "Azure AD with Key Vault",
      identityProvider: "aad",
      oauth2: {
        grantTypes: {
          authorizationCode: {
            clientId: "53790825-fdd3-4b80-bc7a-4c3aaf25801d",
            resourceUri: "https://graph.microsoft.com",
            scopes: "User.Read.All Group.Read.All",
          },
        },
        keyVault: { secretIdentifier: "https://my.vault.azure.net/secrets/clientSecret" },
        redirectUrl:
          "https://authorization-manager.consent.azure-apim.net/redirect/apim/apimService1",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates authorization provider.
 *
 * @summary creates or updates authorization provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateAuthorizationProviderAADClientCred.json
 */
async function apiManagementCreateAuthorizationProviderAADClientCred() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.createOrUpdate(
    "rg1",
    "apimService1",
    "aadwithclientcred",
    {
      displayName: "aadwithclientcred",
      identityProvider: "aad",
      oauth2: {
        grantTypes: {
          authorizationCode: {
            resourceUri: "https://graph.microsoft.com",
            scopes: "User.Read.All Group.Read.All",
          },
        },
        redirectUrl:
          "https://authorization-manager.consent.azure-apim.net/redirect/apim/apimService1",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates authorization provider.
 *
 * @summary creates or updates authorization provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateAuthorizationProviderGenericOAuth2.json
 */
async function apiManagementCreateAuthorizationProviderGenericOAuth2() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.createOrUpdate(
    "rg1",
    "apimService1",
    "eventbrite",
    {
      displayName: "eventbrite",
      identityProvider: "oauth2",
      oauth2: {
        grantTypes: {
          authorizationCode: {
            authorizationUrl: "https://www.eventbrite.com/oauth/authorize",
            clientId: "clientid",
            clientSecret: "clientsecretvalue",
            refreshUrl: "https://www.eventbrite.com/oauth/token",
            tokenUrl: "https://www.eventbrite.com/oauth/token",
          },
        },
        redirectUrl:
          "https://authorization-manager.consent.azure-apim.net/redirect/apim/apimService1",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates authorization provider.
 *
 * @summary creates or updates authorization provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateAuthorizationProviderOOBGoogle.json
 */
async function apiManagementCreateAuthorizationProviderOOBGoogle() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.createOrUpdate(
    "rg1",
    "apimService1",
    "google",
    {
      displayName: "google",
      identityProvider: "google",
      oauth2: {
        grantTypes: {
          authorizationCode: {
            clientId: "99999999-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
            clientSecret: "clientsecretvalue",
            scopes:
              "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
          },
        },
        redirectUrl:
          "https://authorization-manager.consent.azure-apim.net/redirect/apim/apimService1",
      },
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateAuthorizationProviderAADAuthCode();
  await apiManagementCreateAuthorizationProviderAADAuthCodeWithKeyVault();
  await apiManagementCreateAuthorizationProviderAADClientCred();
  await apiManagementCreateAuthorizationProviderGenericOAuth2();
  await apiManagementCreateAuthorizationProviderOOBGoogle();
}

main().catch(console.error);
