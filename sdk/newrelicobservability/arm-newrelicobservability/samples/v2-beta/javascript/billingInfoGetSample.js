// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2025-05-01-preview/BillingInfo_Get.json
 */
async function billingInfoGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.billingInfo.get("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await billingInfoGet();
}

main().catch(console.error);
