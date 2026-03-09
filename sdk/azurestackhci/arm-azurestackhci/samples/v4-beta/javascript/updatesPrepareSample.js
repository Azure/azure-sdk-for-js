// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to prepare Update
 *
 * @summary prepare Update
 * x-ms-original-file: 2026-03-01-preview/Updates_Prepare.json
 */
async function prepareUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.updates.prepare("testrg", "testcluster", "Microsoft4.2203.2.32");
}

async function main() {
  await prepareUpdate();
}

main().catch(console.error);
