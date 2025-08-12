// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Relationship
 *
 * @summary create a Relationship
 * x-ms-original-file: 2025-05-01-preview/Relationships_CreateOrUpdate.json
 */
async function relationshipsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.relationships.createOrUpdate("rgopenapi", "model1", "rel1", {
    properties: {
      displayName: "My relationship",
      parentEntityName: "Entity1",
      childEntityName: "Entity2",
      labels: { key9681: "ixfvzsfnpvkkbrce" },
    },
  });
  console.log(result);
}

async function main() {
  await relationshipsCreateOrUpdate();
}

main().catch(console.error);
