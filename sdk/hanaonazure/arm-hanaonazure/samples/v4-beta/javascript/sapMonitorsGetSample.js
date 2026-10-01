// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HanaManagementClient } = require("@azure/arm-hanaonazure");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023.
 *
 * @summary the product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023.
 * x-ms-original-file: 2020-02-07-preview/SapMonitors_Get.json
 */
async function getPropertiesOfASAPMonitor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HanaManagementClient(credential, subscriptionId);
  const result = await client.sapMonitors.get("myResourceGroup", "mySapMonitor");
  console.log(result);
}

async function main() {
  await getPropertiesOfASAPMonitor();
}

main().catch(console.error);
