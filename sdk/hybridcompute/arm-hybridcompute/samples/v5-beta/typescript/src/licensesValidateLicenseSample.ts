// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to validate a license.
 *
 * @summary the operation to validate a license.
 * x-ms-original-file: 2026-06-16-preview/license/License_ValidateLicense.json
 */
async function validateALicense(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenses.validateLicense({
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
  await validateALicense();
}

main().catch(console.error);
