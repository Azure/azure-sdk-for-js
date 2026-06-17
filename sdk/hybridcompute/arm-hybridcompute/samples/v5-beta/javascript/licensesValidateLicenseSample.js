// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to validate a license.
 *
 * @summary the operation to validate a license.
 * x-ms-original-file: 2025-09-16-preview/license/License_ValidateLicense.json
 */
async function validateALicense() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
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

async function main() {
  await validateALicense();
}

main().catch(console.error);
