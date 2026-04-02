// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the PUT API for creating or updating a single outbound rule of the managed network associated with the cognitive services account.
 *
 * @summary the PUT API for creating or updating a single outbound rule of the managed network associated with the cognitive services account.
 * x-ms-original-file: 2026-01-15-preview/ManagedNetwork/createOrUpdateRuleV2.json
 */
async function createOrUpdateOutboundRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.outboundRule.createOrUpdate(
    "test-rg",
    "cognitive-account-name",
    "default",
    "rule_name_1",
    {
      properties: {
        type: "FQDN",
        category: "UserDefined",
        destination: "destination_endpoint",
        status: "Active",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateOutboundRule();
}

main().catch(console.error);
