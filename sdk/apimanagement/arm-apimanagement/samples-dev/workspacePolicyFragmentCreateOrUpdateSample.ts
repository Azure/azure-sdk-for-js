// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PolicyFragmentContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a policy fragment.
 *
 * @summary Creates or updates a policy fragment.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspacePolicyFragment.json
 */
async function apiManagementCreateWorkspacePolicyFragment(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const id = "policyFragment1";
  const parameters: PolicyFragmentContract = {
    format: "xml",
    description: "A policy fragment example",
    value:
      '<fragment><json-to-xml apply="always" consider-accept-header="false" /></fragment>',
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result =
    await client.workspacePolicyFragment.beginCreateOrUpdateAndWait(
      resourceGroupName,
      serviceName,
      workspaceId,
      id,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspacePolicyFragment();
}

main().catch(console.error);
