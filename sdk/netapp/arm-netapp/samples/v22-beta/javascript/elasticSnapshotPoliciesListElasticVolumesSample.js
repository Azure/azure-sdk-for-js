// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get elastic volumes associated with Elastic Snapshot Policy
 *
 * @summary get elastic volumes associated with Elastic Snapshot Policy
 * x-ms-original-file: 2025-09-01-preview/ElasticSnapshotPolicies_ListElasticVolumes.json
 */
async function elasticSnapshotPoliciesListElasticVolumes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticSnapshotPolicies.listElasticVolumes(
    "myRG",
    "account1",
    "snapshotPolicyName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await elasticSnapshotPoliciesListElasticVolumes();
}

main().catch(console.error);
