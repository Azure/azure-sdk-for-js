// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a failover group.
 *
 * @summary Gets a failover group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-05-01-preview/examples/InstanceFailoverGroupGet.json
 */

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getFailoverGroup(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const locationName = "Japan East";
  const failoverGroupName = "failover-group-test";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.instanceFailoverGroups.get(
    resourceGroupName,
    locationName,
    failoverGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFailoverGroup();
}

main().catch(console.error);
