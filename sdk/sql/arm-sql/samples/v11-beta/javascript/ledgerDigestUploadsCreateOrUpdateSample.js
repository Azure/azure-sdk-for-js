// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 *
 * @summary Enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-02-01-preview/examples/LedgerDigestUploadsEnable.json
 */
async function enablesLedgerDigestUploadConfigurationForADatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "ledgertestrg";
  const serverName = "ledgertestserver";
  const databaseName = "testdb";
  const ledgerDigestUploads = "current";
  const parameters = {
    digestStorageEndpoint: "https://MyAccount.blob.core.windows.net",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.ledgerDigestUploadsOperations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    ledgerDigestUploads,
    parameters,
  );
  console.log(result);
}

async function main() {
  await enablesLedgerDigestUploadConfigurationForADatabase();
}

main().catch(console.error);
