// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the GET API for retrieving the list of outbound rules of the managed network associated with the cognitive services account.
 *
 * @summary the GET API for retrieving the list of outbound rules of the managed network associated with the cognitive services account.
 * x-ms-original-file: 2026-01-15-preview/ManagedNetwork/listRuleV2.json
 */
async function listOutboundRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.outboundRule.list(
    "test-rg",
    "cognitive-account-name",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOutboundRules();
}

main().catch(console.error);
