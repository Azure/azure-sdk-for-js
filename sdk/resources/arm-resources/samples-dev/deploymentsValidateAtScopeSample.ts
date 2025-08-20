// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 *
 * @summary Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-03-01/examples/PostDeploymentValidateOnScope.json
 */

import { Deployment, ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validatesATemplateAtScope(): Promise<void> {
  const scope =
    "subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/my-resource-group";
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
  const client = new ResourceManagementClient(credential);
  const result = await client.deployments.beginValidateAtScopeAndWait(
    scope,
    deploymentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validatesATemplateAtScope();
}

main().catch(console.error);
