// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DependencyMapClient } = require("@azure/arm-dependencymap");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to export dependencies
 *
 * @summary export dependencies
 * x-ms-original-file: 2025-01-31-preview/Maps_ExportDependencies.json
 */
async function mapsExportDependenciesGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D6E58BDB-45F1-41EC-A884-1FC945058848";
  const client = new DependencyMapClient(credential, subscriptionId);
  await client.maps.exportDependencies("rgdependencyMap", "mapsTest1", {
    focusedMachineId: "qzjpilzxpurauwfwwanpiiafvz",
    filters: {
      dateTime: {
        startDateTimeUtc: new Date("2024-03-29T07:35:15.336Z"),
        endDateTimeUtc: new Date("2024-03-29T07:35:15.336Z"),
      },
      processNameFilter: {
        operator: "contains",
        processNames: ["mnqtvduwzemjcvvmnnoqvcuemwhnz"],
      },
    },
  });
}

async function main() {
  await mapsExportDependenciesGeneratedByMaximumSetRule();
}

main().catch(console.error);
