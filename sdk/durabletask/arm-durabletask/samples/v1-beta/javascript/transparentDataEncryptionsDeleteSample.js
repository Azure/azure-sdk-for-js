// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Transparent Data Encryption
 *
 * @summary delete a Transparent Data Encryption
 * x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_Delete_MaximumSet_Gen.json
 */
async function transparentDataEncryptionsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  await client.transparentDataEncryptions.delete("rgdurabletask", "testscheduler");
}

async function main() {
  await transparentDataEncryptionsDeleteMaximumSet();
}

main().catch(console.error);
