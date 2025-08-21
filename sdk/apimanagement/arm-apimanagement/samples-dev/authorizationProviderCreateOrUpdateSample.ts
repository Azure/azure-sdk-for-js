// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates authorization provider.
 *
 * @summary Creates or updates authorization provider.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateAuthorizationProviderAADAuthCode.json
 */

import {
  type AuthorizationProviderContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateAuthorizationProviderAadAuthCode(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "aadwithauthcode";
  const parameters: AuthorizationProviderContract = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.createOrUpdate(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates authorization provider.
 *
 * @summary Creates or updates authorization provider.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateAuthorizationProviderAADClientCred.json
 */
async function apiManagementCreateAuthorizationProviderAadClientCred(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "aadwithclientcred";
  const parameters: AuthorizationProviderContract = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.createOrUpdate(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates authorization provider.
 *
 * @summary Creates or updates authorization provider.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateAuthorizationProviderGenericOAuth2.json
 */
async function apiManagementCreateAuthorizationProviderGenericOAuth2(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "eventbrite";
  const parameters: AuthorizationProviderContract = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.createOrUpdate(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates authorization provider.
 *
 * @summary Creates or updates authorization provider.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateAuthorizationProviderOOBGoogle.json
 */
async function apiManagementCreateAuthorizationProviderOobGoogle(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "google";
  const parameters: AuthorizationProviderContract = {
    displayName: "google",
    identityProvider: "google",
    oauth2: {
      grantTypes: {
        authorizationCode: {
          clientId:
            "99999999-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
          clientSecret: "clientsecretvalue",
          scopes:
            "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
      redirectUrl:
        "https://authorization-manager.consent.azure-apim.net/redirect/apim/apimService1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.createOrUpdate(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateAuthorizationProviderAadAuthCode();
  await apiManagementCreateAuthorizationProviderAadClientCred();
  await apiManagementCreateAuthorizationProviderGenericOAuth2();
  await apiManagementCreateAuthorizationProviderOobGoogle();
}

main().catch(console.error);
