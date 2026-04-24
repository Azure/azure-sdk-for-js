// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get confluent topic by Name
 *
 * @summary get confluent topic by Name
 * x-ms-original-file: 2025-08-18-preview/Topics_Get_MaximumSet_Gen.json
 */
async function topicsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.topics.get(
    "rgconfluent",
    "mwvtthpz",
    "gjcsgothfog",
    "cbgic",
    "bspwihoyrewjny",
  );
  console.log(result);
}

async function main() {
  await topicsGetMaximumSet();
}

main().catch(console.error);
