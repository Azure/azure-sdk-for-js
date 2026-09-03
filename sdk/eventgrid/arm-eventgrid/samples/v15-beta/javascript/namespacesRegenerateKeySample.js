// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerate a shared access key for a namespace.
 *
 * @summary regenerate a shared access key for a namespace.
 * x-ms-original-file: 2025-07-15-preview/Namespaces_RegenerateKey.json
 */
async function namespacesRegenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaces.regenerateKey("examplerg", "exampleNamespaceName1", {
    keyName: "key1",
  });
  console.log(result);
}

async function main() {
  await namespacesRegenerateKey();
}

main().catch(console.error);
