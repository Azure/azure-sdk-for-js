// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if specified workspace exists.
 *
 * @summary checks if specified workspace exists.
 * x-ms-original-file: 2024-06-01-preview/Workspaces_Head.json
 */
async function workspacesHead(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.workspaces.head("contoso-resources", "contoso", "default");
}

async function main(): Promise<void> {
  await workspacesHead();
}

main().catch(console.error);
