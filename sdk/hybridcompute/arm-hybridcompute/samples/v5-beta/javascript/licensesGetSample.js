// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about the view of a license.
 *
 * @summary retrieves information about the view of a license.
 * x-ms-original-file: 2026-06-16-preview/license/License_Get.json
 */
async function getLicense() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenses.get("myResourceGroup", "{licenseName}");
  console.log(result);
}

async function main() {
  await getLicense();
}

main().catch(console.error);
