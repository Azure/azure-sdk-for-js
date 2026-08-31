// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the namespace-scoped LLM gateway endpoint and the current API keys.
 *
 * @summary returns the namespace-scoped LLM gateway endpoint and the current API keys.
 * x-ms-original-file: 2026-05-02-preview/AIManagerNamespaces_ListAccessKeys.json
 */
async function aiManagerNamespacesListAccessKeysMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagerNamespaces.listAccessKeys(
    "rgaimanagers",
    "aimanager1",
    "namespace-1",
  );
  console.log(result);
}

async function main() {
  await aiManagerNamespacesListAccessKeysMaximumSet();
}

main().catch(console.error);
