// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a dedicated host .
 *
 * @summary create or update a dedicated host .
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_CreateOrUpdate.json
 */
async function createOrUpdateADedicatedHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.dedicatedHosts.createOrUpdate(
    "myResourceGroup",
    "myDedicatedHostGroup",
    "myDedicatedHost",
    {
      location: "westus",
      tags: { department: "HR" },
      properties: { platformFaultDomain: 1 },
      sku: { name: "DSv3-Type1" },
    },
  );
}

async function main(): Promise<void> {
  await createOrUpdateADedicatedHost();
}

main().catch(console.error);
