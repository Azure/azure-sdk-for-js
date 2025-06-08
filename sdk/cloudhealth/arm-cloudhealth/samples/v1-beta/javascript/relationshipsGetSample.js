// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Relationship
 *
 * @summary get a Relationship
 * x-ms-original-file: 2025-05-01-preview/Relationships_Get.json
 */
async function relationshipsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.relationships.get(
    "rgopenapi",
    "myHealthModel",
    "Ue-21-F3M12V3w-13x18F8H-7HOk--kq6tP-HB",
  );
  console.log(result);
}

async function main() {
  await relationshipsGet();
}

main().catch(console.error);
