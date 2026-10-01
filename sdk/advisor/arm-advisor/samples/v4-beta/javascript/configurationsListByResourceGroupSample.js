// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve Azure Advisor configurations.
 *
 * @summary retrieve Azure Advisor configurations.
 * x-ms-original-file: 2026-02-01-preview/ListConfigurations.json
 */
async function getConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurations.listByResourceGroup("resourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getConfigurations();
}

main().catch(console.error);
