// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an attached database configuration.
 *
 * @summary creates or updates an attached database configuration.
 * x-ms-original-file: 2025-02-14/KustoAttachedDatabaseConfigurationsCreateOrUpdate.json
 */
async function attachedDatabaseConfigurationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.attachedDatabaseConfigurations.createOrUpdate(
    "kustorptest",
    "kustoCluster2",
    "attachedDatabaseConfigurationsTest",
    {
      location: "westus",
      clusterResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Kusto/Clusters/kustoCluster2",
      databaseName: "kustodatabase",
      databaseNameOverride: "overridekustodatabase",
      defaultPrincipalsModificationKind: "Union",
      tableLevelSharingProperties: {
        externalTablesToExclude: ["ExternalTable2"],
        externalTablesToInclude: ["ExternalTable1"],
        materializedViewsToExclude: ["MaterializedViewTable2"],
        materializedViewsToInclude: ["MaterializedViewTable1"],
        tablesToExclude: ["Table2"],
        tablesToInclude: ["Table1"],
      },
    },
  );
  console.log(result);
}

async function main() {
  await attachedDatabaseConfigurationsCreateOrUpdate();
}

main().catch(console.error);
