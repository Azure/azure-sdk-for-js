// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the stored upgrade insights for the specified managed cluster, one entry per
 * scope that has been generated and not yet expired. This is a read-only operation and
 * does not regenerate any evaluation.
 *
 * @summary lists the stored upgrade insights for the specified managed cluster, one entry per
 * scope that has been generated and not yet expired. This is a read-only operation and
 * does not regenerate any evaluation.
 * x-ms-original-file: 2026-08-02-preview/ManagedClustersListUpgradeInsights.json
 */
async function listTheStoredUpgradeInsightsForAManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.upgradeInsights.list("rg1", "clustername1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheStoredUpgradeInsightsForAManagedCluster();
}

main().catch(console.error);
