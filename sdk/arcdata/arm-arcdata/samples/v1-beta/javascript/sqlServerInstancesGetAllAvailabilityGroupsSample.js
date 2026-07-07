// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves full properties of all the Availability Groups in a SQL Server instance.
 *
 * @summary retrieves full properties of all the Availability Groups in a SQL Server instance.
 * x-ms-original-file: 2026-03-01-preview/FilteredListBySqlServerInstanceAvailabilityGroup.json
 */
async function getsAllAvailabilityGroupsAssociatedWithAnArcEnabledSqlServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlServerInstances.getAllAvailabilityGroups(
    "exampleResourceGroup",
    "exampleSqlServerInstance",
    {
      availabilityGroupRetrievalFilters: {
        availabilityGroupTypeFilter: "DISTRIBUTED",
        replicationPartnerTypeFilter: "AzureSQLManagedInstance",
      },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAllAvailabilityGroupsAssociatedWithAnArcEnabledSqlServer();
}

main().catch(console.error);
