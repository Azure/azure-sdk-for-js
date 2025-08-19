// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Checks if specified workspace exists.
 *
 * @summary Checks if specified workspace exists.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/Workspaces_Head.json
 */
async function workspacesHead(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const workspaceName = "default";
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const result = await client.workspaces.head(resourceGroupName, serviceName, workspaceName);
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesHead();
}

main().catch(console.error);
