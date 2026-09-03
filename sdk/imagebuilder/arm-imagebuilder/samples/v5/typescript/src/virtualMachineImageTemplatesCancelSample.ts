// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancel the long running image build based on the image template
 *
 * @summary cancel the long running image build based on the image template
 * x-ms-original-file: 2025-10-01/CancelImageBuild.json
 */
async function cancelTheImageBuildBasedOnTheImageTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  await client.virtualMachineImageTemplates.cancel("myResourceGroup", "myImageTemplate");
}

async function main(): Promise<void> {
  await cancelTheImageBuildBasedOnTheImageTemplate();
}

main().catch(console.error);
