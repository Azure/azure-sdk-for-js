// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ModelDeployment
 *
 * @summary get a ModelDeployment
 * x-ms-original-file: 2026-05-02-preview/ModelDeployments_Get.json
 */
async function modelDeploymentsGetMaximumSet(): Promise<void> {
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

async function main(): Promise<void> {
  await modelDeploymentsGetMaximumSet();
}

main().catch(console.error);
