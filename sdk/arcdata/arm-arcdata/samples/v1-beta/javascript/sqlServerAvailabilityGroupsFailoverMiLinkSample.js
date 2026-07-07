// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to request failover of Arc Sql Server to Azure Managed Instance.
 *
 * @summary request failover of Arc Sql Server to Azure Managed Instance.
 * x-ms-original-file: 2026-03-01-preview/failoverMiLink.json
 */
async function failOverFromAnArcSqlServerAvailabilityGroupToAManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.failoverMiLink(
    "testrg",
    "testSqlServer_INST1",
    "testDAG",
    {
      managedInstanceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Sql/managedInstances/testcl",
    },
  );
  console.log(result);
}

async function main() {
  await failOverFromAnArcSqlServerAvailabilityGroupToAManagedInstance();
}

main().catch(console.error);
