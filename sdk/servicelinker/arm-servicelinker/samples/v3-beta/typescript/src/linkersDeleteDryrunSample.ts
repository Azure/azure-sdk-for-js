// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a dryrun job
 *
 * @summary delete a dryrun job
 * x-ms-original-file: 2024-07-01-preview/DeleteDryrun.json
 */
async function deleteDryrun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  await client.linkers.deleteDryrun(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app",
    "dryrunName",
  );
}

async function main(): Promise<void> {
  await deleteDryrun();
}

main().catch(console.error);
