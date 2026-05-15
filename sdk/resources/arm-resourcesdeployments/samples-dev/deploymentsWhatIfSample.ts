// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourcesClient } from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns changes that will be made by the deployment if executed at the scope of the resource group.
 *
 * @summary returns changes that will be made by the deployment if executed at the scope of the resource group.
 * x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnResourceGroup.json
 */
async function predictTemplateChangesAtResourceGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new ResourcesClient(credential, subscriptionId);
  const result = await client.deployments.whatIf("my-resource-group", "my-deployment", {
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: { uri: "https://example.com/exampleTemplate.json" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await predictTemplateChangesAtResourceGroupScope();
}

main().catch(console.error);
