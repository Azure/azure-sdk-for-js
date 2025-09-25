// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DependencyMapClient } from "@azure/arm-dependencymap";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get dependencies for all machines
 *
 * @summary get dependencies for all machines
 * x-ms-original-file: 2025-07-01-preview/Maps_GetDependencyViewForAllMachines.json
 */
async function mapsGetDependencyViewForAllMachinesMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D6E58BDB-45F1-41EC-A884-1FC945058848";
  const client = new DependencyMapClient(credential, subscriptionId);
  const result = await client.maps.getDependencyViewForAllMachines(
    "rgdependencyMap",
    "sfakshfkjsdh",
    {
      filters: {
        processNameFilter: {
          operator: "contains",
          processNames: ["syovpvhbornjajguuihieb"],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await mapsGetDependencyViewForAllMachinesMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
