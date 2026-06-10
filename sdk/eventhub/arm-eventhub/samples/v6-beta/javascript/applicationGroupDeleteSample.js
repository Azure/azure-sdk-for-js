// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an ApplicationGroup for a Namespace.
 *
 * @summary deletes an ApplicationGroup for a Namespace.
 * x-ms-original-file: 2026-01-01/ApplicationGroup/ApplicationGroupDelete.json
 */
async function applicationGroupDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.applicationGroup.delete("contosotest", "contoso-ua-test-eh-system-1", "appGroup1");
}

async function main() {
  await applicationGroupDelete();
}

main().catch(console.error);
