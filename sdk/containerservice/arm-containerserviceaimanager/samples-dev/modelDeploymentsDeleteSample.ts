// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ModelDeployment
 *
 * @summary delete a ModelDeployment
 * x-ms-original-file: 2026-05-02-preview/ModelDeployments_Delete.json
 */
async function modelDeploymentsDeleteMaximumSet(): Promise<void> {
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

async function main(): Promise<void> {
  await modelDeploymentsDeleteMaximumSet();
}

main().catch(console.error);
