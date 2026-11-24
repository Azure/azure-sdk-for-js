// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a VM application.
 *
 * @summary creates or updates a VM application.
 * x-ms-original-file: 2026-09-01/application/VMApplications_CreateOrUpdate.json
 */
async function createOrUpdateAVMApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.vmApplications.createOrUpdate(
    "myResourceGroup",
    "myMachine",
    "myApplication",
    {
      location: "eastus2euap",
      tags: { environment: "production" },
      properties: {
        order: 1,
        packageReferenceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/galleryResourceGroup/providers/Microsoft.Compute/galleries/myGallery/applications/myApplication/versions/1.0.0",
        treatFailureAsDeploymentFailure: true,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAVMApplication();
}

main().catch(console.error);
