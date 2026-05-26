// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get account capabilityHost.
 *
 * @summary get account capabilityHost.
 * x-ms-original-file: 2026-01-15-preview/AccountCapabilityHost/get.json
 */
async function getAccountCapabilityHost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accountCapabilityHosts.get(
    "test-rg",
    "account-1",
    "capabilityHostName",
  );
  console.log(result);
}

async function main() {
  await getAccountCapabilityHost();
}

main().catch(console.error);
