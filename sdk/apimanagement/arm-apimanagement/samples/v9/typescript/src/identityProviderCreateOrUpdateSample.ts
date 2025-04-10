/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  IdentityProviderCreateContract,
  ApiManagementClient
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or Updates the IdentityProvider configuration.
 *
 * @summary Creates or Updates the IdentityProvider configuration.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2022-08-01/examples/ApiManagementCreateIdentityProvider.json
 */
async function apiManagementCreateIdentityProvider() {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const identityProviderName = "facebook";
  const parameters: IdentityProviderCreateContract = {
    clientId: "facebookid",
    clientSecret: "facebookapplicationsecret"
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.identityProvider.createOrUpdate(
    resourceGroupName,
    serviceName,
    identityProviderName,
    parameters
  );
  console.log(result);
}

async function main() {
  apiManagementCreateIdentityProvider();
}

main().catch(console.error);
