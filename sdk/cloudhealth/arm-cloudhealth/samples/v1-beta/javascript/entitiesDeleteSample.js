// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Entity
 *
 * @summary delete a Entity
 * x-ms-original-file: 2025-05-01-preview/Entities_Delete.json
 */
async function entitiesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.entities.delete("rgopenapi", "model1", "U4VTRFlUkm9kR6H23-c-6U-XHq7n");
}

async function main() {
  await entitiesDelete();
}

main().catch(console.error);
