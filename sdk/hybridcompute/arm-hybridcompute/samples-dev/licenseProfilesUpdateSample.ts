// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a license profile.
 *
 * @summary the operation to update a license profile.
 * x-ms-original-file: 2026-06-16-preview/licenseProfile/LicenseProfile_Update.json
 */
async function updateALicenseProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenseProfiles.update("myResourceGroup", "myMachine", {
    esuProfile: { assignedLicense: "{LicenseResourceId}" },
    productProfile: {
      productFeatures: [{ name: "Hotpatch", subscriptionStatus: "Enable" }],
      productType: "WindowsServer",
      subscriptionStatus: "Enable",
    },
    softwareAssurance: { softwareAssuranceCustomer: true },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateALicenseProfile();
}

main().catch(console.error);
