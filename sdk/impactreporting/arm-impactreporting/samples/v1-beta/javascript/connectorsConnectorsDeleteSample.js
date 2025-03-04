// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImpactClient } = require("@azure/arm-impactreporting");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Connector
 *
 * @summary delete a Connector
 * x-ms-original-file: 2024-05-01-preview/Connectors_Delete.json
 */
async function connectorsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8F74B371-8573-4773-9BDA-D546505BDB3A";
  const client = new ImpactClient(credential, subscriptionId);
  await client.connectors.delete("testconnector1");
}

async function main() {
  await connectorsDelete();
}

main().catch(console.error);
