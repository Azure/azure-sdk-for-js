// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list by subscription
 *
 * @summary list by subscription
 * x-ms-original-file: 2025-06-01/Schemas_ListBySubscription_MaximumSet_Gen.json
 */
async function schemasListBySubscriptionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schemas.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await schemasListBySubscriptionMaximumSet();
}

main().catch(console.error);
