// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list SignalDefinition resources by HealthModel
 *
 * @summary list SignalDefinition resources by HealthModel
 * x-ms-original-file: 2025-05-01-preview/SignalDefinitions_ListByHealthModel.json
 */

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

async function signalDefinitionsListByHealthModel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalDefinitions.listByHealthModel(
    "rgopenapi",
    "myHealthModel",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await signalDefinitionsListByHealthModel();
}

main().catch(console.error);
