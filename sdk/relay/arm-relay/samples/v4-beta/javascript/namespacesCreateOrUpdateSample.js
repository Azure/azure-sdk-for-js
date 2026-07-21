// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Azure Relay namespace.
 *
 * @summary create Azure Relay namespace.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceCreate.json
 */
async function relayNamespaceCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdate(
    "resourcegroup",
    "example-RelayNamespace-5849",
    {
      location: "South Central US",
      sku: { name: "Standard", tier: "Standard" },
      tags: { tag1: "value1", tag2: "value2" },
    },
  );
  console.log(result);
}

async function main() {
  await relayNamespaceCreate();
}

main().catch(console.error);
