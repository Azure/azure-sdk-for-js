// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the GET API for retrieveing the list of outbound rules of the managed network associated with the machine learning workspace.
 *
 * @summary the GET API for retrieveing the list of outbound rules of the managed network associated with the machine learning workspace.
 * x-ms-original-file: 2026-03-15-preview/ManagedNetwork/listRuleV2.json
 */
async function listOutboundRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.outboundRule.list("test-rg", "aml-workspace-name", "default")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOutboundRules();
}

main().catch(console.error);
