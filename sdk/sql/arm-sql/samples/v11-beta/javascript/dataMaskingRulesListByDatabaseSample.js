// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of database data masking rules.
 *
 * @summary gets a list of database data masking rules.
 * x-ms-original-file: 2025-02-01-preview/DataMaskingRuleListByDatabase.json
 */
async function getsAListOfDatabaseDataMaskingRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataMaskingRules.listByDatabase(
    "sqlcrudtest-6852",
    "sqlcrudtest-2080",
    "sqlcrudtest-331",
    "Default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAListOfDatabaseDataMaskingRules();
}

main().catch(console.error);
