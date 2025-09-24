// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to retrieve enterprise add-on details information
 *
 * @summary retrieve enterprise add-on details information
 * x-ms-original-file: 2024-11-01-preview/EnterpriseDetails_Post.json
 */

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

async function enterpriseDetailsPost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.grafana.checkEnterpriseDetails("myResourceGroup", "myWorkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await enterpriseDetailsPost();
}

main().catch(console.error);
