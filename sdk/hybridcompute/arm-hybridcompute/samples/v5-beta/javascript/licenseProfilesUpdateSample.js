// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a license profile.
 *
 * @summary the operation to update a license profile.
 * x-ms-original-file: 2025-09-16-preview/licenseProfile/LicenseProfile_Update.json
 */
async function updateALicenseProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
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

async function main() {
  await updateALicenseProfile();
}

main().catch(console.error);
