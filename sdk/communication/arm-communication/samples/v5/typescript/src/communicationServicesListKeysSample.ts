// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the access keys of the CommunicationService resource.
 *
 * @summary get the access keys of the CommunicationService resource.
 * x-ms-original-file: 2026-03-18/communicationServices/listKeys.json
 */
async function listKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.listKeys(
    "MyResourceGroup",
    "MyCommunicationResource",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listKeys();
}

main().catch(console.error);
