// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates authorization.
 *
 * @summary Creates or updates authorization.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateAuthorizationAADAuthCode.json
 */

import {
  AuthorizationContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateAuthorizationAadAuthCode(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "aadwithauthcode";
  const authorizationId = "authz2";
  const parameters: AuthorizationContract = {
    authorizationType: "OAuth2",
    oAuth2GrantType: "AuthorizationCode",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorization.createOrUpdate(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates authorization.
 *
 * @summary Creates or updates authorization.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateAuthorizationAADClientCred.json
 */
async function apiManagementCreateAuthorizationAadClientCred(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "aadwithclientcred";
  const authorizationId = "authz1";
  const parameters: AuthorizationContract = {
    authorizationType: "OAuth2",
    oAuth2GrantType: "AuthorizationCode",
    parameters: {
      clientId: "clientsecretid",
      clientSecret: "clientsecretvalue",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorization.createOrUpdate(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateAuthorizationAadAuthCode();
  await apiManagementCreateAuthorizationAadClientCred();
}

main().catch(console.error);
