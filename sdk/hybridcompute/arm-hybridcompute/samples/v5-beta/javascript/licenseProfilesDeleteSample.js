// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a license profile.
 *
 * @summary the operation to delete a license profile.
 * x-ms-original-file: 2026-06-16-preview/licenseProfile/LicenseProfile_Delete.json
 */
async function deleteALicenseProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.licenseProfiles.delete("myResourceGroup", "myMachine");
}

async function main() {
  await deleteALicenseProfile();
}

main().catch(console.error);
