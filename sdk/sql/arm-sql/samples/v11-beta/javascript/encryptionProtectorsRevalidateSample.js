// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Revalidates an existing encryption protector.
 *
 * @summary Revalidates an existing encryption protector.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/EncryptionProtectorRevalidate.json
 */
async function revalidatesTheEncryptionProtector() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const serverName = "sqlcrudtest-4645";
  const encryptionProtectorName = "current";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.encryptionProtectors.beginRevalidateAndWait(
    resourceGroupName,
    serverName,
    encryptionProtectorName,
  );
  console.log(result);
}

async function main() {
  await revalidatesTheEncryptionProtector();
}

main().catch(console.error);
