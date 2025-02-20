// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Connector
 *
 * @summary update a Connector
 * x-ms-original-file: 2024-05-01-preview/Connectors_Update.json
 */
async function connectorsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74f5e23f-d4d9-410a-bb4d-8f0608adb10d";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.connectors.Connectors_update("testconnector1", {
    properties: { connectorType: "AzureMonitor" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  connectorsUpdate();
}

main().catch(console.error);
