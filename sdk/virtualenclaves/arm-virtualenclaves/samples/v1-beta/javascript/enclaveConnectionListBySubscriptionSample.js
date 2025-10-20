// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list EnclaveConnectionResource resources by subscription ID
 *
 * @summary list EnclaveConnectionResource resources by subscription ID
 * x-ms-original-file: 2025-05-01-preview/EnclaveConnection_ListBySubscription.json
 */
async function enclaveConnectionListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.enclaveConnection.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await enclaveConnectionListBySubscription();
}

main().catch(console.error);
