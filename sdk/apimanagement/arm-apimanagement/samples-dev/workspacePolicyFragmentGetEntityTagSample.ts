// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the entity state (Etag) version of a policy fragment.
 *
 * @summary Gets the entity state (Etag) version of a policy fragment.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementHeadWorkspacePolicyFragment.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementHeadWorkspacePolicyFragment(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const id = "policyFragment1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicyFragment.getEntityTag(
    resourceGroupName,
    serviceName,
    workspaceId,
    id,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadWorkspacePolicyFragment();
}

main().catch(console.error);
