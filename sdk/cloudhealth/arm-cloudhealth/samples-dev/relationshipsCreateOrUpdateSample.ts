// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Relationship
 *
 * @summary create a Relationship
 * x-ms-original-file: 2025-05-01-preview/Relationships_CreateOrUpdate.json
 */

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

async function relationshipsCreateOrUpdate(): Promise<void> {
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

async function main(): Promise<void> {
  await relationshipsCreateOrUpdate();
}

main().catch(console.error);
