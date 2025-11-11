// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a dryrun job
 *
 * @summary get a dryrun job
 * x-ms-original-file: 2024-07-01-preview/ConnectorDryrunGet.json
 */
async function connectorDryrunGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.connector.getDryrun("test-rg", "westus", "dryrunName");
  console.log(result);
}

async function main() {
  await connectorDryrunGet();
}

main().catch(console.error);
