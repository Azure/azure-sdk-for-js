// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Traffic Manager health policy.
 *
 * @summary gets a Traffic Manager health policy.
 * x-ms-original-file: 2026-02-09-preview/HealthPolicies_Get_MaximumSet_Gen.json
 */
async function healthPoliciesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.healthPolicies.get(
    "rgprivateTrafficManager",
    "myProfile",
    "myHealthPolicy",
  );
  console.log(result);
}

async function main() {
  await healthPoliciesGetMaximumSet();
}

main().catch(console.error);
