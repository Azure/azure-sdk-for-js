// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates the policy restriction configuration of the Api Management service.
 *
 * @summary Creates or updates the policy restriction configuration of the Api Management service.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreatePolicyRestriction.json
 */

import {
  PolicyRestrictionContract,
  PolicyRestrictionCreateOrUpdateOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreatePolicyRestriction(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const policyRestrictionId = "policyRestriction1";
  const ifMatch = "*";
  const parameters: PolicyRestrictionContract = {
    requireBase: "true",
    scope: "Sample Path to the policy document.",
  };
  const options: PolicyRestrictionCreateOrUpdateOptionalParams = { ifMatch };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyRestriction.createOrUpdate(
    resourceGroupName,
    serviceName,
    policyRestrictionId,
    parameters,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreatePolicyRestriction();
}

main().catch(console.error);
