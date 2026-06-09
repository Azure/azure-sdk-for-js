// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about the view of a license profile.
 *
 * @summary retrieves information about the view of a license profile.
 * x-ms-original-file: 2025-09-16-preview/licenseProfile/LicenseProfile_Get.json
 */
async function getLicenseProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenseProfiles.get("myResourceGroup", "myMachine");
  console.log(result);
}

async function main(): Promise<void> {
  await getLicenseProfile();
}

main().catch(console.error);
