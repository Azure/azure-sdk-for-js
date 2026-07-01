// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a OutboundRuleBasicResource
 *
 * @summary create a OutboundRuleBasicResource
 * x-ms-original-file: 2026-03-15-preview/ManagedNetwork/createOrUpdateRuleV2.json
 */
async function createOrUpdateOutboundRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.outboundRule.createOrUpdate(
    "test-rg",
    "aml-workspace-name",
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
