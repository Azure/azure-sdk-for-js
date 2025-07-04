// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops an UpdateRun.
 *
 * @summary stops an UpdateRun.
 * x-ms-original-file: 2025-03-01/UpdateRuns_Stop.json
 */
async function stopsAnUpdateRun() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.stop("rg1", "fleet1", "run1");
  console.log(result);
}

/**
 * This sample demonstrates how to stops an UpdateRun.
 *
 * @summary stops an UpdateRun.
 * x-ms-original-file: 2025-03-01/UpdateRuns_Stop_MaximumSet_Gen.json
 */
async function stopsAnUpdateRunGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.stop("rgfleets", "fleet1", "fleet1", {
    ifMatch: "jb",
  });
  console.log(result);
}

async function main() {
  await stopsAnUpdateRun();
  await stopsAnUpdateRunGeneratedByMaximumSetRule();
}

main().catch(console.error);
