// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list capabilityHost.
 *
 * @summary list capabilityHost.
 * x-ms-original-file: 2026-01-15-preview/AccountCapabilityHost/list.json
 */
async function listAccountCapabilityHosts() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accountCapabilityHosts.list("test-rg", "account-1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAccountCapabilityHosts();
}

main().catch(console.error);
