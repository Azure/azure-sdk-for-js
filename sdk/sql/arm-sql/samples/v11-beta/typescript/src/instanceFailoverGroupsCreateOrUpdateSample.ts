// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a failover group.
 *
 * @summary creates or updates a failover group.
 * x-ms-original-file: 2025-02-01-preview/InstanceFailoverGroupCreateOrUpdate.json
 */
async function createFailoverGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
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

async function main(): Promise<void> {
  await createFailoverGroup();
}

main().catch(console.error);
