// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates an invitation token that allows attaching a follower database to this database.
 *
 * @summary generates an invitation token that allows attaching a follower database to this database.
 * x-ms-original-file: 2025-02-14/KustoDatabaseInviteFollower.json
 */
async function kustoDatabaseInviteFollower() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.database.inviteFollower("kustorptest", "kustoCluster", "database", {
    inviteeEmail: "invitee@contoso.com",
    tableLevelSharingProperties: {
      externalTablesToExclude: [],
      externalTablesToInclude: ["ExternalTable*"],
      functionsToExclude: ["functionsToExclude2"],
      functionsToInclude: ["functionsToInclude1"],
      materializedViewsToExclude: ["MaterializedViewTable2"],
      materializedViewsToInclude: ["MaterializedViewTable1"],
      tablesToExclude: ["Table2"],
      tablesToInclude: ["Table1"],
    },
  });
  console.log(result);
}

async function main() {
  await kustoDatabaseInviteFollower();
}

main().catch(console.error);
