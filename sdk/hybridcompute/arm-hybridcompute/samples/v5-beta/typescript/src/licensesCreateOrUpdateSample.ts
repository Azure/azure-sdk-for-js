// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a license.
 *
 * @summary the operation to create or update a license.
 * x-ms-original-file: 2025-09-16-preview/license/License_CreateOrUpdate.json
 */
async function createOrUpdateALicense(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenses.createOrUpdate("myResourceGroup", "{licenseName}", {
    location: "eastus2euap",
    licenseDetails: {
      type: "pCore",
      edition: "Datacenter",
      processors: 6,
      state: "Activated",
      target: "Windows Server 2012",
    },
    licenseType: "ESU",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateALicense();
}

main().catch(console.error);
