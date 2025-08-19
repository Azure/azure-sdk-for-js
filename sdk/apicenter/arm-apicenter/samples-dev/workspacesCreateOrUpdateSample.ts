// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Workspace } from "@azure/arm-apicenter";
import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates new or updates existing workspace.
 *
 * @summary Creates new or updates existing workspace.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/Workspaces_CreateOrUpdate.json
 */
async function workspacesCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const workspaceName = "default";
  const payload: Workspace = { properties: { title: "default" } };
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceName,
    payload,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesCreateOrUpdate();
}

main().catch(console.error);
