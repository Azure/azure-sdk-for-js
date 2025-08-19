// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create an integration runtime node
 *
 * @summary Create an integration runtime node
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/preview/2021-06-01-preview/examples/IntegrationRuntimeNodes_Update.json
 */

import type { UpdateIntegrationRuntimeNodeRequest } from "@azure/arm-synapse";
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateIntegrationRuntimeNode(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "exampleResourceGroup";
  const workspaceName = "exampleWorkspace";
  const integrationRuntimeName = "exampleIntegrationRuntime";
  const nodeName = "Node_1";
  const updateIntegrationRuntimeNodeRequest: UpdateIntegrationRuntimeNodeRequest = {
    concurrentJobsLimit: 2,
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimeNodes.update(
    resourceGroupName,
    workspaceName,
    integrationRuntimeName,
    nodeName,
    updateIntegrationRuntimeNodeRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateIntegrationRuntimeNode();
}

main().catch(console.error);
