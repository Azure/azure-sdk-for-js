// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the DELETE API for deleting a single outbound rule of the managed network associated with the cognitive services account.
 *
 * @summary the DELETE API for deleting a single outbound rule of the managed network associated with the cognitive services account.
 * x-ms-original-file: 2026-01-15-preview/ManagedNetwork/deleteRuleV2.json
 */
async function deleteOutboundRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.outboundRule.delete("test-rg", "cognitive-account-name", "default", "rule-name");
}

async function main() {
  await deleteOutboundRule();
}

main().catch(console.error);
