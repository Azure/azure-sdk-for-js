// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the POST API for updating the outbound rules of the managed network associated with the machine learning workspace.
 *
 * @summary the POST API for updating the outbound rules of the managed network associated with the machine learning workspace.
 * x-ms-original-file: 2026-03-15-preview/ManagedNetwork/postOutboundRulesV2.json
 */
async function postOutboundRules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.outboundRules.post("test-rg", "aml-workspace-name", "default", {
    properties: {
      enableNetworkMonitor: true,
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
