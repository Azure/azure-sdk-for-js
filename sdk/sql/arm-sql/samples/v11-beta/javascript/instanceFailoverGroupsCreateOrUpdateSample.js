// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a failover group.
 *
 * @summary creates or updates a failover group.
 * x-ms-original-file: 2025-02-01-preview/InstanceFailoverGroupCreateOrUpdate.json
 */
async function createFailoverGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.instanceFailoverGroups.createOrUpdate(
    "Default",
    "Japan East",
    "failover-group-test-3",
    {
      managedInstancePairs: [
        {
          partnerManagedInstanceId:
            "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/managedInstances/failover-group-secondary-mngdInstance",
          primaryManagedInstanceId:
            "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/managedInstances/failover-group-primary-mngdInstance",
        },
      ],
      partnerRegions: [{ location: "Japan West" }],
      readOnlyEndpoint: { failoverPolicy: "Disabled" },
      readWriteEndpoint: {
        failoverPolicy: "Automatic",
        failoverWithDataLossGracePeriodMinutes: 480,
      },
      secondaryType: "Geo",
    },
  );
  console.log(result);
}

async function main() {
  await createFailoverGroup();
}

main().catch(console.error);
