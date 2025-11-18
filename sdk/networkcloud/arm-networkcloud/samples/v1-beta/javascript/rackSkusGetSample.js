// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the properties of the provided rack SKU.
 *
 * @summary Get the properties of the provided rack SKU.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/preview/2025-07-01-preview/examples/RackSkus_Get.json
 */
async function getRackSkuResource() {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] || "123e4567-e89b-12d3-a456-426655440000";
  const rackSkuName = "rackSkuName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.rackSkus.get(rackSkuName);
  console.log(result);
}

async function main() {
  await getRackSkuResource();
}

main().catch(console.error);
