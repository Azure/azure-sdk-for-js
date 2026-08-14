// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AIManagerNamespace
 *
 * @summary get a AIManagerNamespace
 * x-ms-original-file: 2026-05-02-preview/AIManagerNamespaces_Get.json
 */
async function getsAnAIManagerNamespaceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagerNamespaces.get("rg1", "aimanager1", "namespace1");
  console.log(result);
}

async function main() {
  await getsAnAIManagerNamespaceResource();
}

main().catch(console.error);
