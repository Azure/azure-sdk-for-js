// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a SignalDefinition
 *
 * @summary get a SignalDefinition
 * x-ms-original-file: 2025-05-01-preview/SignalDefinitions_Get.json
 */

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

async function signalDefinitionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.signalDefinitions.get("rgopenapi", "myHealthModel", "sig1");
  console.log(result);
}

async function main(): Promise<void> {
  await signalDefinitionsGet();
}

main().catch(console.error);
