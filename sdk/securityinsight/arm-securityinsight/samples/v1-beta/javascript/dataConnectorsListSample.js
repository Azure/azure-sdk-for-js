// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all data connectors.
 *
 * @summary gets all data connectors.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetDataConnectors.json
 */
async function getAllDataConnectors() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataConnectors.list("myRg", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllDataConnectors();
}

main().catch(console.error);
