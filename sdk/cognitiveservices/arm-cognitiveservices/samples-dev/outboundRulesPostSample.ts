// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the POST API for updating the outbound rules of the managed network associated with the cognitive services account.
 *
 * @summary the POST API for updating the outbound rules of the managed network associated with the cognitive services account.
 * x-ms-original-file: 2026-01-15-preview/ManagedNetwork/postOutboundRulesV2.json
 */
async function postOutboundRules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.outboundRules.post("test-rg", "cognitive-account-name", "default", {
    properties: {
      firewallSku: "Standard",
      isolationMode: "AllowOnlyApprovedOutbound",
      outboundRules: {
        rule_name_1: { type: "FQDN", category: "UserDefined", destination: "destination_endpoint" },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await postOutboundRules();
}

main().catch(console.error);
