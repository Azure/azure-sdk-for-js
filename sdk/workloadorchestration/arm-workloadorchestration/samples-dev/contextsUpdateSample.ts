// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an Context Resource
 *
 * @summary update an Context Resource
 * x-ms-original-file: 2026-05-01-preview/Contexts_Update_MaximumSet_Gen.json
 */
async function contextsUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.contexts.update("rgconfigurationmanager", "testname", {
    properties: {
      capabilities: [{ name: "alufbbxccup", state: "active", description: "hnwcxjwfecxnwsqkoac" }],
      hierarchies: [{ name: "fz", description: "nlrpsglqgbdmwpantk" }],
    },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await contextsUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
