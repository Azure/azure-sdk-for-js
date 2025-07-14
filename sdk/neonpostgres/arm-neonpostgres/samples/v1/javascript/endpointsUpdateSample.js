// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Endpoint
 *
 * @summary update a Endpoint
 * x-ms-original-file: 2025-03-01/Endpoints_Update_MaximumSet_Gen.json
 */
async function endpointsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "rgneon",
    "test-org",
    "entity-name",
    "entity-name",
    "entity-name",
    {
      properties: {
        entityName: "entity-name",
        attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
        projectId: "rtvdeeflqzlrpfzhjqhcsfbldw",
        branchId: "rzsyrhpfbydxtfkpaa",
        endpointType: "read_only",
      },
    },
  );
  console.log(result);
}

async function main() {
  await endpointsUpdateMaximumSet();
}

main().catch(console.error);
