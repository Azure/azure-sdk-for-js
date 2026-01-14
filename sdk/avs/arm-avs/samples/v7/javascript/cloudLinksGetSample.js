// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a CloudLink
 *
 * @summary get a CloudLink
 * x-ms-original-file: 2025-09-01/CloudLinks_Get.json
 */
async function cloudLinksGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.cloudLinks.get("group1", "cloud1", "cloudLink1");
  console.log(result);
}

async function main() {
  await cloudLinksGet();
}

main().catch(console.error);
