// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a CloudLink
 *
 * @summary delete a CloudLink
 * x-ms-original-file: 2025-09-01/CloudLinks_Delete.json
 */
async function cloudLinksDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.cloudLinks.delete("group1", "cloud1", "cloudLink1");
}

async function main() {
  await cloudLinksDelete();
}

main().catch(console.error);
