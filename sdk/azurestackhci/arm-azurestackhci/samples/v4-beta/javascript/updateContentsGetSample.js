// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets content for an update.
 *
 * @summary gets content for an update.
 * x-ms-original-file: 2025-12-01-preview/UpdateContents_Get_MaximumSet_Gen.json
 */
async function updateContentsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2886575D-173A-44A0-80E2-7DBA57F18B46";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.updateContents.get("westus2", "12.2510.0.1");
  console.log(result);
}

async function main() {
  await updateContentsGetMaximumSet();
}

main().catch(console.error);
