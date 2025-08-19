// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a dryrun job
 *
 * @summary delete a dryrun job
 * x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/preview/2024-07-01-preview/examples/DeleteDryrun.json
 */

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteDryrun(): Promise<void> {
  const resourceUri =
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app";
  const dryrunName = "dryrunName";
  const credential = new DefaultAzureCredential();
  const client = new ServiceLinkerManagementClient(credential);
  const result = await client.linkers.deleteDryrun(resourceUri, dryrunName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteDryrun();
}

main().catch(console.error);
