// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Starts the managed instance.
 *
 * @summary Starts the managed instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/StartManagedInstance.json
 */
async function startsTheManagedInstance() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "startrg";
  const managedInstanceName = "mitostart";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstances.beginStartAndWait(
    resourceGroupName,
    managedInstanceName,
  );
  console.log(result);
}

async function main() {
  await startsTheManagedInstance();
}

main().catch(console.error);
