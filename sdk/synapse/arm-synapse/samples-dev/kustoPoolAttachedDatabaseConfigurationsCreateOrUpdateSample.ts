// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an attached database configuration.
 *
 * @summary Creates or updates an attached database configuration.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/preview/2021-06-01-preview/examples/KustoPoolAttachedDatabaseConfigurationsCreateOrUpdate.json
 */

import type { AttachedDatabaseConfiguration } from "@azure/arm-synapse";
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoPoolAttachedDatabaseConfigurationsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const workspaceName = "kustorptest";
  const kustoPoolName = "kustoclusterrptest4";
  const attachedDatabaseConfigurationName = "attachedDatabaseConfigurations1";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "kustorptest";
  const parameters: AttachedDatabaseConfiguration = {
    kustoPoolResourceId:
      "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Synapse/Workspaces/kustorptest/KustoPools/kustoclusterrptest4",
    databaseName: "kustodatabase",
    defaultPrincipalsModificationKind: "Union",
    location: "westus",
    tableLevelSharingProperties: {
      externalTablesToExclude: ["ExternalTable2"],
      externalTablesToInclude: ["ExternalTable1"],
      materializedViewsToExclude: ["MaterializedViewTable2"],
      materializedViewsToInclude: ["MaterializedViewTable1"],
      tablesToExclude: ["Table2"],
      tablesToInclude: ["Table1"],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.kustoPoolAttachedDatabaseConfigurations.beginCreateOrUpdateAndWait(
    workspaceName,
    kustoPoolName,
    attachedDatabaseConfigurationName,
    resourceGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoPoolAttachedDatabaseConfigurationsCreateOrUpdate();
}

main().catch(console.error);
