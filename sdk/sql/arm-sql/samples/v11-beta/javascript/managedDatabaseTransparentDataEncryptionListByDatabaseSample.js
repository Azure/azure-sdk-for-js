// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of managed database's transparent data encryptions.
 *
 * @summary gets a list of managed database's transparent data encryptions.
 * x-ms-original-file: 2025-02-01-preview/ManagedTransparentDataEncryptionList.json
 */
async function getAListOfTheDatabaseTransparentDataEncryptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseTransparentDataEncryption.listByDatabase(
    "security-tde-resourcegroup",
    "securitytde",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfTheDatabaseTransparentDataEncryptions();
}

main().catch(console.error);
