// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PolicyRestrictionDeleteOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the policy restriction configuration of the Api Management Service.
 *
 * @summary Deletes the policy restriction configuration of the Api Management Service.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeletePolicyRestriction.json
 */
async function apiManagementDeletePolicyRestriction(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const policyRestrictionId = "policyRestriction1";
  const ifMatch = "*";
  const options: PolicyRestrictionDeleteOptionalParams = { ifMatch };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyRestriction.delete(
    resourceGroupName,
    serviceName,
    policyRestrictionId,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeletePolicyRestriction();
}

main().catch(console.error);
