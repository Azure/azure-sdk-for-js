// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the DELETE API for deleting a single outbound rule of the managed network associated with the machine learning workspace.
 *
 * @summary the DELETE API for deleting a single outbound rule of the managed network associated with the machine learning workspace.
 * x-ms-original-file: 2026-03-15-preview/ManagedNetwork/deleteRuleV2.json
 */
async function deleteOutboundRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.outboundRule.delete("test-rg", "aml-workspace-name", "default", "rule-name");
}

async function main(): Promise<void> {
  await deleteOutboundRule();
}

main().catch(console.error);
