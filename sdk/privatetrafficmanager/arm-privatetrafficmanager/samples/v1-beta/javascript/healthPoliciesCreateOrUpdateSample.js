// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Traffic Manager health policy.
 *
 * @summary create or update a Traffic Manager health policy.
 * x-ms-original-file: 2026-02-09-preview/HealthPolicies_CreateOrUpdate_MaximumSet_Gen.json
 */
async function healthPoliciesCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.healthPolicies.createOrUpdate(
    "rgprivateTrafficManager",
    "myProfile",
    "myHealthPolicy",
    {
      properties: {
        probeConfig: {
          protocol: "HTTPS",
          port: 443,
          path: "/health",
          intervalInSeconds: 30,
          timeoutInSeconds: 10,
          toleratedNumberOfFailures: 3,
        },
      },
      kind: "Probe",
    },
  );
  console.log(result);
}

async function main() {
  await healthPoliciesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
