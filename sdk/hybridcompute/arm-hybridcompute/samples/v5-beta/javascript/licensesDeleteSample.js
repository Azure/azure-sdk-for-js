// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a license.
 *
 * @summary the operation to delete a license.
 * x-ms-original-file: 2025-09-16-preview/license/License_Delete.json
 */
async function deleteALicense() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.licenses.delete("myResourceGroup", "{licenseName}");
}

async function main() {
  await deleteALicense();
}

main().catch(console.error);
