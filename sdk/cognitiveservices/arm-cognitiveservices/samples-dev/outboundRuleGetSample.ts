// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the GET API for retrieving a single outbound rule of the managed network associated with the cognitive services account.
 *
 * @summary the GET API for retrieving a single outbound rule of the managed network associated with the cognitive services account.
 * x-ms-original-file: 2026-01-15-preview/ManagedNetwork/getRuleV2.json
 */
async function getOutboundRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.outboundRule.get(
    "test-rg",
    "cognitive-account-name",
    "default",
    "name_of_the_fqdn_rule",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getOutboundRule();
}

main().catch(console.error);
