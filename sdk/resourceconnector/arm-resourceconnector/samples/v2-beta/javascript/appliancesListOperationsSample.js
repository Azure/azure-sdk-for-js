// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceConnectorManagementClient } = require("@azure/arm-resourceconnector");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all available Appliances operations.
 *
 * @summary lists all available Appliances operations.
 * x-ms-original-file: 2025-03-01-preview/AppliancesListOperations.json
 */
async function listAppliancesOperations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appliances.listOperations()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAppliancesOperations();
}

main().catch(console.error);
