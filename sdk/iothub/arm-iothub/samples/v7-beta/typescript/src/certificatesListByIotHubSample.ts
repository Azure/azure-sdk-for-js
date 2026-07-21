// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the list of certificates.
 *
 * @summary returns the list of certificates.
 * x-ms-original-file: 2026-03-01-preview/iothub_listcertificates.json
 */
async function certificatesListByIotHub(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.certificates.listByIotHub("myResourceGroup", "testhub");
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesListByIotHub();
}

main().catch(console.error);
