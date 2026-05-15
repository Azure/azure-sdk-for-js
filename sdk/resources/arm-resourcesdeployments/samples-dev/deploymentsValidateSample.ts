// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourcesClient } from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 *
 * @summary validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 * x-ms-original-file: 2025-04-01/PostDeploymentValidateOnResourceGroup.json
 */
async function validatesATemplateAtResourceGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new ResourcesClient(credential, subscriptionId);
  const result = await client.deployments.validate("my-resource-group", "my-deployment", {
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: {
        queryString:
          "sv=2019-02-02&st=2019-04-29T22%3A18%3A26Z&se=2019-04-30T02%3A23%3A26Z&sr=b&sp=rw&sip=168.1.5.60-168.1.5.70&spr=https&sig=xxxxxxxx0xxxxxxxxxxxxx%2bxxxxxxxxxxxxxxxxxxxx%3d",
        uri: "https://example.com/exampleTemplate.json",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await validatesATemplateAtResourceGroupScope();
}

main().catch(console.error);
