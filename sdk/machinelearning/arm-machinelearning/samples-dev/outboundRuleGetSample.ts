// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the GET API for retrieveing a single outbound rule of the managed network associated with the machine learning workspace.
 *
 * @summary the GET API for retrieveing a single outbound rule of the managed network associated with the machine learning workspace.
 * x-ms-original-file: 2026-03-15-preview/ManagedNetwork/getRuleV2.json
 */
async function getOutboundRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.outboundRule.get(
    "test-rg",
    "aml-workspace-name",
    "default",
    "name_of_the_fqdn_rule",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getOutboundRule();
}

main().catch(console.error);
