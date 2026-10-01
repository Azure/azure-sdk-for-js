// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a devcenter encryption set.
 *
 * @summary gets a devcenter encryption set.
 * x-ms-original-file: 2026-01-01-preview/DevCenterEncryptionSets_Get.json
 */
async function encryptionSetsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.encryptionSets.get("rg1", "Contoso", "EncryptionWestUs");
  console.log(result);
}

async function main() {
  await encryptionSetsGet();
}

main().catch(console.error);
