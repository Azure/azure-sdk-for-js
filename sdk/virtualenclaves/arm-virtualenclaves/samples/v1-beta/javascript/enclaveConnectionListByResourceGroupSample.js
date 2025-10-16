// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list EnclaveConnectionResource resources by resource group
 *
 * @summary list EnclaveConnectionResource resources by resource group
 * x-ms-original-file: 2025-05-01-preview/EnclaveConnection_ListByResourceGroup.json
 */
async function enclaveConnectionListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.enclaveConnection.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await enclaveConnectionListByResourceGroup();
}

main().catch(console.error);
