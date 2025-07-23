// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Compute
 *
 * @summary create a Compute
 * x-ms-original-file: 2025-03-01/Computes_CreateOrUpdate_MaximumSet_Gen.json
 */
async function computesCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.computes.createOrUpdate(
    "rgneon",
    "test-org",
    "entity-name",
    "entity-name",
    "entity-name",
    {
      properties: {
        entityName: "entity-name",
        attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
        region: "mcfyojzptdliawyuxyxzqxif",
        cpuCores: 29,
        memory: 2,
        status: "upwdpznysuwt",
      },
    },
  );
  console.log(result);
}

async function main() {
  await computesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
