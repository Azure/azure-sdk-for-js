// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerate CommunicationService access key. PrimaryKey and SecondaryKey cannot be regenerated at the same time.
 *
 * @summary regenerate CommunicationService access key. PrimaryKey and SecondaryKey cannot be regenerated at the same time.
 * x-ms-original-file: 2026-03-18/communicationServices/regenerateKey.json
 */
async function regenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.regenerateKey(
    "MyResourceGroup",
    "MyCommunicationResource",
    { keyType: "Primary" },
  );
  console.log(result);
}

async function main() {
  await regenerateKey();
}

main().catch(console.error);
