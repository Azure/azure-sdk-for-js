// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list EnclaveResource resources by subscription ID
 *
 * @summary list EnclaveResource resources by subscription ID
 * x-ms-original-file: 2025-05-01-preview/VirtualEnclave_ListBySubscription.json
 */
async function virtualEnclaveListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualEnclave.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualEnclaveListBySubscription();
}

main().catch(console.error);
