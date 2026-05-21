// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get status for an ongoing purge operation.
 *
 * @summary get status for an ongoing purge operation.
 * x-ms-original-file: 2020-02-02/ComponentsPurgeStatus.json
 */
async function componentPurge() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.components.getPurgeStatus(
    "OIAutoRest5123",
    "aztest5048",
    "purge-970318e7-b859-4edb-8903-83b1b54d0b74",
  );
  console.log(result);
}

async function main() {
  await componentPurge();
}

main().catch(console.error);
