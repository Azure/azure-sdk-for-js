// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a license profile.
 *
 * @summary the operation to delete a license profile.
 * x-ms-original-file: 2025-09-16-preview/licenseProfile/LicenseProfile_Delete.json
 */
async function deleteALicenseProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.licenseProfiles.delete("myResourceGroup", "myMachine");
}

async function main(): Promise<void> {
  await deleteALicenseProfile();
}

main().catch(console.error);
