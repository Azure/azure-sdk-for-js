// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the currently assigned Workspace Quotas based on VMFamily.
 *
 * @summary gets the currently assigned Workspace Quotas based on VMFamily.
 * x-ms-original-file: 2025-12-01/Quota/list.json
 */
async function listWorkspaceQuotasByVMFamily(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.quotas.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkspaceQuotasByVMFamily();
}

main().catch(console.error);
