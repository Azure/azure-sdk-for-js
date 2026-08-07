// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ModelDeployment
 *
 * @summary get a ModelDeployment
 * x-ms-original-file: 2026-05-02-preview/ModelDeployments_Get.json
 */
async function modelDeploymentsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.modelDeployments.get(
    "rgaimanagers",
    "aimanager1",
    "namespace-1",
    "deployment-1",
  );
  console.log(result);
}

async function main() {
  await modelDeploymentsGetMaximumSet();
}

main().catch(console.error);
