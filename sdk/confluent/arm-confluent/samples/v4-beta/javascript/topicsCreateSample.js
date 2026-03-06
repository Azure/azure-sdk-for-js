// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create confluent topics by Name
 *
 * @summary create confluent topics by Name
 * x-ms-original-file: 2025-08-18-preview/Topics_Create_MaximumSet_Gen.json
 */
async function topicsCreateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.topics.create(
    "rgconfluent",
    "pejjxxaztwoiqnzxsjqreefyuwriny",
    "kgozj",
    "bvhtsxflbnakmigqocm",
    "zlqnddejetmtrl",
    {
      body: {
        kind: "olpxpglrwgzffeibtxqbzqn",
        topicId: "pughhn",
        metadata: { self: "jvriqck", resourceName: "jdscdybqkdiknhnyjb" },
        partitions: { related: "bgeg" },
        configs: { related: "bgeg" },
        inputConfigs: [{ name: "pkjzhjsbugwmpqawh", value: "j" }],
        partitionsReassignments: { related: "bgeg" },
        partitionsCount: "fxcu",
        replicationFactor: "ftsyww",
      },
    },
  );
  console.log(result);
}

async function main() {
  await topicsCreateMaximumSet();
}

main().catch(console.error);
