// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve counts for Dsc Nodes.
 *
 * @summary retrieve counts for Dsc Nodes.
 * x-ms-original-file: 2024-10-23/listPagedDscNodeConfigurationCounts.json
 */
async function getNodeNodeConfigurationCounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.nodeCountInformation.get(
    "rg",
    "myAutomationAccount33",
    "nodeconfiguration",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve counts for Dsc Nodes.
 *
 * @summary retrieve counts for Dsc Nodes.
 * x-ms-original-file: 2024-10-23/listPagedDscNodeStatusCounts.json
 */
async function getNodeStatusCounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.nodeCountInformation.get("rg", "myAutomationAccount33", "status");
  console.log(result);
}

async function main(): Promise<void> {
  await getNodeNodeConfigurationCounts();
  await getNodeStatusCounts();
}

main().catch(console.error);
