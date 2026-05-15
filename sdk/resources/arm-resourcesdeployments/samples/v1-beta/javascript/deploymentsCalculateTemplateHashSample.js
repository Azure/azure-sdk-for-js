// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourcesClient } = require("@azure/arm-resourcesdeployments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to calculate the hash of the given template.
 *
 * @summary calculate the hash of the given template.
 * x-ms-original-file: 2025-04-01/CalculateTemplateHash.json
 */
async function calculateTemplateHash() {
  const credential = new DefaultAzureCredential();
  const client = new ResourcesClient(credential);
  const result = await client.deployments.calculateTemplateHash({
    $schema:
      "http://schemas.management.azure.com/deploymentTemplate?api-version=2014-04-01-preview",
    contentVersion: "1.0.0.0",
    outputs: { string: { type: "string", value: "myvalue" } },
    parameters: { string: { type: "string" } },
    resources: [],
    variables: {
      array: [1, 2, 3, 4],
      bool: true,
      int: 42,
      object: { object: { location: "West US", vmSize: "Large" } },
      string: "string",
    },
  });
  console.log(result);
}

async function main() {
  await calculateTemplateHash();
}

main().catch(console.error);
