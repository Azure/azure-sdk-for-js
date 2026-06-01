// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentsClient } from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 *
 * @summary validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 * x-ms-original-file: 2025-04-01/PostDeploymentValidateOnTenant.json
 */
async function validatesATemplateAtTenantScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentsClient(credential);
  const result = await client.deployments.validateAtTenantScope("my-deployment", {
    location: "eastus",
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: { uri: "https://example.com/exampleTemplate.json" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await validatesATemplateAtTenantScope();
}

main().catch(console.error);
