// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete confluent topic by name
 *
 * @summary delete confluent topic by name
 * x-ms-original-file: 2025-08-18-preview/Topics_Delete_MaximumSet_Gen.json
 */
async function topicsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.topics.delete(
    "rgconfluent",
    "xxoxo",
    "ohwjl",
    "llmaybvui",
    "xnprfffvbjtsnneofwwlpwuzua",
  );
}

/**
 * This sample demonstrates how to delete confluent topic by name
 *
 * @summary delete confluent topic by name
 * x-ms-original-file: 2025-08-18-preview/Topics_Delete_MinimumSet_Gen.json
 */
async function topicsDeleteMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.topics.delete(
    "rgconfluent",
    "dmkqbkbzegenjirw",
    "flqluwoymahhtfjmx",
    "xrqfldtrcxvbxxqwbbouosmvnckut",
    "uflu",
  );
}

async function main() {
  await topicsDeleteMaximumSet();
  await topicsDeleteMinimumSet();
}

main().catch(console.error);
