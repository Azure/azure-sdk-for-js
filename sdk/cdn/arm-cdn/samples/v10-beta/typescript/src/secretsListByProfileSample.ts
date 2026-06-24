// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists existing AzureFrontDoor secrets.
 *
 * @summary lists existing AzureFrontDoor secrets.
 * x-ms-original-file: 2025-12-01/Secrets_ListByProfile.json
 */
async function secretsListByProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.secrets.listByProfile("RG", "profile1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await secretsListByProfile();
}

main().catch(console.error);
