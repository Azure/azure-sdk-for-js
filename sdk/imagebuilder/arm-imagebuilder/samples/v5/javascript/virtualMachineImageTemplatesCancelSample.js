// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel the long running image build based on the image template
 *
 * @summary cancel the long running image build based on the image template
 * x-ms-original-file: 2025-10-01/CancelImageBuild.json
 */
async function cancelTheImageBuildBasedOnTheImageTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  await client.virtualMachineImageTemplates.cancel("myResourceGroup", "myImageTemplate");
}

async function main() {
  await cancelTheImageBuildBasedOnTheImageTemplate();
}

main().catch(console.error);
