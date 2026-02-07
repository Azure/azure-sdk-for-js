// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to set queryables for a collection given a list of queryable definitions
 *
 * @summary set queryables for a collection given a list of queryable definitions
 * x-ms-original-file: 2025-04-30-preview/StacQueryables_Create.json
 */
async function stacQueryablesCreate() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.createQueryables("naip-atl", [
    {
      name: "test:property",
      dataType: "number",
      createIndex: false,
      definition: { data_type: "number" },
    },
  ]);
  console.log(result);
}

async function main() {
  await stacQueryablesCreate();
}

main().catch(console.error);
