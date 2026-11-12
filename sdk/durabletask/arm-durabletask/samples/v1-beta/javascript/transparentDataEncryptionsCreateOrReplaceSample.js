// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or Update a Transparent Data Encryption
 *
 * @summary create or Update a Transparent Data Encryption
 * x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_CreateOrReplace_MaximumSet_Gen.json
 */
async function transparentDataEncryptionsCreateOrReplaceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.transparentDataEncryptions.createOrReplace(
    "rgdurabletask",
    "testscheduler",
    {
      properties: {
        keySource: "CustomerManaged",
        keyVaultKeyUri: "https://microsoft.com/ap",
        autoRotationEnabled: true,
      },
    },
  );
  console.log(result);
}

async function main() {
  await transparentDataEncryptionsCreateOrReplaceMaximumSet();
}

main().catch(console.error);
