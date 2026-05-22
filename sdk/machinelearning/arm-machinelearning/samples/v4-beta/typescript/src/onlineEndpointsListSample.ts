// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Online Endpoints.
 *
 * @summary list Online Endpoints.
 * x-ms-original-file: 2025-12-01/Workspace/OnlineEndpoint/list.json
 */
async function listWorkspaceOnlineEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.onlineEndpoints.list("test-rg", "my-aml-workspace", {
    name: "string",
    count: 1,
    computeType: "Managed",
    tags: "string",
    properties: "string",
    orderBy: "CreatedAtDesc",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkspaceOnlineEndpoint();
}

main().catch(console.error);
