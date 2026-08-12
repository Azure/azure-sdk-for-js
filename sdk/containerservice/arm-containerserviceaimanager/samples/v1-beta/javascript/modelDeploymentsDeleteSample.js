// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ModelDeployment
 *
 * @summary delete a ModelDeployment
 * x-ms-original-file: 2026-05-02-preview/ModelDeployments_Delete.json
 */
async function modelDeploymentsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.modelDeployments.delete(
    "rgaimanagers",
    "aimanager1",
    "namespace-1",
    "deployment-1",
    { ifMatch: '"abc123def456"' },
  );
}

async function main() {
  await modelDeploymentsDeleteMaximumSet();
}

main().catch(console.error);
