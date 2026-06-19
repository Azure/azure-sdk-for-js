// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the resource name is valid and is not already in use.
 *
 * @summary checks that the resource name is valid and is not already in use.
 * x-ms-original-file: 2025-01-01-preview/SignalR_CheckNameAvailability.json
 */
async function signalRCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalR.checkNameAvailability("eastus", {
    name: "mySignalRService",
    type: "Microsoft.SignalRService/SignalR",
  });
  console.log(result);
}

async function main() {
  await signalRCheckNameAvailability();
}

main().catch(console.error);
