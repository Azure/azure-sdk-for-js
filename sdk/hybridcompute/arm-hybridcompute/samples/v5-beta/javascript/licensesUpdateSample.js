// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a license.
 *
 * @summary the operation to update a license.
 * x-ms-original-file: 2026-06-16-preview/license/License_Update.json
 */
async function updateALicense() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenses.update("myResourceGroup", "{licenseName}", {
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
  await updateALicense();
}

main().catch(console.error);
