// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List all Elastic monitor resources within a specified subscription, helping you audit and manage your monitoring setup.
 *
 * @summary List all Elastic monitor resources within a specified subscription, helping you audit and manage your monitoring setup.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/Monitors_List.json
 */
async function monitorsList() {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await monitorsList();
}

main().catch(console.error);
