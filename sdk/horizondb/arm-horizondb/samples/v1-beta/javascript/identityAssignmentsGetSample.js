// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a change data capture identity assignment.
 *
 * @summary gets a change data capture identity assignment.
 * x-ms-original-file: 2026-10-01-preview/IdentityAssignments_Get.json
 */
async function getAChangeDataCaptureIdentityAssignment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.identityAssignments.get(
    "example-resource-group",
    "example-cluster",
    "fabric-mirroring",
    "fabric-writer",
  );
  console.log(result);
}

async function main() {
  await getAChangeDataCaptureIdentityAssignment();
}

main().catch(console.error);
