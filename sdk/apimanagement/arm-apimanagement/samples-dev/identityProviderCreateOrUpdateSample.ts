// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  IdentityProviderCreateContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or Updates the IdentityProvider configuration.
 *
 * @summary Creates or Updates the IdentityProvider configuration.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateIdentityProvider.json
 */
async function apiManagementCreateIdentityProvider(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const identityProviderName = "facebook";
  const parameters: IdentityProviderCreateContract = {
    clientId: "facebookid",
    clientSecret: "facebookapplicationsecret",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.identityProvider.createOrUpdate(
    resourceGroupName,
    serviceName,
    identityProviderName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateIdentityProvider();
}

main().catch(console.error);
