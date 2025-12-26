// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sTAC search operation.
 *
 * @summary sTAC search operation.
 * x-ms-original-file: 2025-04-30-preview/StacSearch_Create.json
 */
async function stacSearchCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.search({
    collections: ["naip-atl"],
    filterLang: "cql2-json",
    filter: {
      op: "s_intersects",
      args: [
        { property: "geometry" },
        {
          type: "Polygon",
          coordinates: [
            [
              [-84.46416308610219, 33.6033686729869],
              [-84.38815071170247, 33.6033686729869],
              [-84.38815071170247, 33.6713179813099],
              [-84.46416308610219, 33.6713179813099],
              [-84.46416308610219, 33.6033686729869],
            ],
          ],
        },
      ],
    },
    datetime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
    sortBy: [{ field: "datetime", direction: "desc" }],
    limit: 50,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await stacSearchCreate();
}

main().catch(console.error);
