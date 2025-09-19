// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve marketplace and organization billing information mapped to the given Elastic monitor resource.
 *
 * @summary retrieve marketplace and organization billing information mapped to the given Elastic monitor resource.
 * x-ms-original-file: 2025-06-01/BillingInfo_Get.json
 */
async function billingInfoGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.billingInfo.get("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await billingInfoGet();
}

main().catch(console.error);
