// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new or updates existing workspace.
 *
 * @summary creates new or updates existing workspace.
 * x-ms-original-file: 2024-06-01-preview/Workspaces_CreateOrUpdate.json
 */
async function workspacesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("contoso-resources", "contoso", "default", {
    properties: { title: "default" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesCreateOrUpdate();
}

main().catch(console.error);
