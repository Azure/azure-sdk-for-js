// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 *
 * @summary Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/deployments/stable/2025-04-01/examples/PostDeploymentValidateOnResourceGroup.json
 */

import { Deployment, DeploymentsClient } from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validatesATemplateAtResourceGroupScope(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000001";
  const resourceGroupName =
    process.env["RESOURCES_RESOURCE_GROUP"] || "my-resource-group";
  const deploymentName = "my-deployment";
  const parameters: Deployment = {
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: {
        queryString:
          "sv=2019-02-02&st=2019-04-29T22%3A18%3A26Z&se=2019-04-30T02%3A23%3A26Z&sr=b&sp=rw&sip=168.1.5.60-168.1.5.70&spr=https&sig=xxxxxxxx0xxxxxxxxxxxxx%2bxxxxxxxxxxxxxxxxxxxx%3d",
        uri: "https://example.com/exampleTemplate.json",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DeploymentsClient(credential, subscriptionId);
  const result = await client.deployments.beginValidateAndWait(
    resourceGroupName,
    deploymentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validatesATemplateAtResourceGroupScope();
}

main().catch(console.error);
