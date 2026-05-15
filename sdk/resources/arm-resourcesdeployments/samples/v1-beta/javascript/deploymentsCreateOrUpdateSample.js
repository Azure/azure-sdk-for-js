// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourcesClient } = require("@azure/arm-resourcesdeployments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to you can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary you can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: 2025-04-01/PutDeploymentResourceGroup.json
 */
async function createADeploymentThatWillDeployATemplateWithAUriAndQueryString() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new ResourcesClient(credential, subscriptionId);
  const result = await client.deployments.createOrUpdate("my-resource-group", "my-deployment", {
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

/**
 * This sample demonstrates how to you can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary you can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: 2025-04-01/PutDeploymentResourceGroupTemplateSpecsWithId.json
 */
async function createADeploymentThatWillDeployATemplateSpecWithTheGivenResourceId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new ResourcesClient(credential, subscriptionId);
  const result = await client.deployments.createOrUpdate("my-resource-group", "my-deployment", {
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/my-resource-group/providers/Microsoft.Resources/TemplateSpecs/TemplateSpec-Name/versions/v1",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to you can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary you can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: 2025-04-01/PutDeploymentWithExternalInputs.json
 */
async function createDeploymentUsingExternalInputs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new ResourcesClient(credential, subscriptionId);
  const result = await client.deployments.createOrUpdate("my-resource-group", "my-deployment", {
    properties: {
      externalInputDefinitions: { fooValue: { config: "FOO_VALUE", kind: "sys.envVar" } },
      externalInputs: { fooValue: { value: "baz" } },
      mode: "Incremental",
      parameters: { inputObj: { expression: "[createObject('foo', externalInputs('fooValue'))]" } },
      template: {
        $schema: "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
        contentVersion: "1.0.0.0",
        outputs: { inputObj: { type: "object", value: "[parameters('inputObj')]" } },
        parameters: { inputObj: { type: "object" } },
        resources: [],
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to you can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary you can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: 2025-04-01/PutDeploymentWithOnErrorDeploymentLastSuccessful.json
 */
async function createADeploymentThatWillRedeployTheLastSuccessfulDeploymentOnFailure() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourcesClient(credential, subscriptionId);
  const result = await client.deployments.createOrUpdate("my-resource-group", "my-deployment", {
    properties: {
      mode: "Complete",
      onErrorDeployment: { type: "LastSuccessful" },
      parameters: {},
      templateLink: { uri: "https://example.com/exampleTemplate.json" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to you can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary you can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: 2025-04-01/PutDeploymentWithOnErrorDeploymentSpecificDeployment.json
 */
async function createADeploymentThatWillRedeployAnotherDeploymentOnFailure() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourcesClient(credential, subscriptionId);
  const result = await client.deployments.createOrUpdate("my-resource-group", "my-deployment", {
    properties: {
      mode: "Complete",
      onErrorDeployment: {
        type: "SpecificDeployment",
        deploymentName: "name-of-deployment-to-use",
      },
      parameters: {},
      templateLink: { uri: "https://example.com/exampleTemplate.json" },
    },
  });
  console.log(result);
}

async function main() {
  await createADeploymentThatWillDeployATemplateWithAUriAndQueryString();
  await createADeploymentThatWillDeployATemplateSpecWithTheGivenResourceId();
  await createDeploymentUsingExternalInputs();
  await createADeploymentThatWillRedeployTheLastSuccessfulDeploymentOnFailure();
  await createADeploymentThatWillRedeployAnotherDeploymentOnFailure();
}

main().catch(console.error);
