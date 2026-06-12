// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create or update a license profile.
 *
 * @summary the operation to create or update a license profile.
 * x-ms-original-file: 2025-09-16-preview/licenseProfile/LicenseProfile_CreateOrUpdate.json
 */
async function createOrUpdateALicenseProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenseProfiles.createOrUpdate("myResourceGroup", "myMachine", {
    location: "eastus2euap",
    esuProfile: { assignedLicense: "{LicenseResourceId}" },
    productProfile: {
      productFeatures: [{ name: "Hotpatch", subscriptionStatus: "Enabled" }],
      productType: "WindowsServer",
      subscriptionStatus: "Enabled",
    },
    softwareAssurance: { softwareAssuranceCustomer: true },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateALicenseProfile();
}

main().catch(console.error);
