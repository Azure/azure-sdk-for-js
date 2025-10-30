// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a queryable given a queryable definition and
 * corresponding collection id.
 *
 * @summary updates a queryable given a queryable definition and
 * corresponding collection id.
 * x-ms-original-file: 2025-04-30-preview/StacQueryables_Replace.json
 */
async function stacQueryablesReplace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.replaceQueryable(
    "naip-atl",
    "test%3Aproperty",
    {
      name: "test:property",
      dataType: "number",
      createIndex: false,
      definition: {
        data_type: "number",
        description: "Test property - updated",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stacQueryablesReplace();
}

main().catch(console.error);
