// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SignalDefinition resources by HealthModel
 *
 * @summary list SignalDefinition resources by HealthModel
 * x-ms-original-file: 2026-05-01-preview/SignalDefinitions_ListByHealthModel.json
 */
async function signalDefinitionsListByHealthModel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalDefinitions.listByHealthModel(
    "online-store-rg",
    "online-store",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await signalDefinitionsListByHealthModel();
}

main().catch(console.error);
