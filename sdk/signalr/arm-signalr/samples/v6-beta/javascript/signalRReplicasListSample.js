// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all replicas belong to this resource
 *
 * @summary list all replicas belong to this resource
 * x-ms-original-file: 2025-01-01-preview/SignalRReplicas_List.json
 */
async function signalRReplicasList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalRReplicas.list("myResourceGroup", "mySignalRService")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await signalRReplicasList();
}

main().catch(console.error);
