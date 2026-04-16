// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete confluent cluster by id
 *
 * @summary delete confluent cluster by id
 * x-ms-original-file: 2025-08-18-preview/Cluster_Delete_MaximumSet_Gen.json
 */
async function clusterDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.cluster.delete(
    "rgconfluent",
    "rwzpoelzgevhnkrvyqy",
    "gnijsroqxwwyyariafdnmkc",
    "zsvnfsirukovzkth",
  );
}

/**
 * This sample demonstrates how to delete confluent cluster by id
 *
 * @summary delete confluent cluster by id
 * x-ms-original-file: 2025-08-18-preview/Cluster_Delete_MinimumSet_Gen.json
 */
async function clusterDeleteMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.cluster.delete(
    "rgconfluent",
    "tvbhdezawspzzfprrnjoxfwtwlp",
    "mtmberahkmffekuuz",
    "nyfmkuwyeqhkgwehdjakbjheujj",
  );
}

async function main() {
  await clusterDeleteMaximumSet();
  await clusterDeleteMinimumSet();
}

main().catch(console.error);
