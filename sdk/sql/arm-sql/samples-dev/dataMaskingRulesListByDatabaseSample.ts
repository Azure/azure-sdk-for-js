// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of database data masking rules.
 *
 * @summary gets a list of database data masking rules.
 * x-ms-original-file: 2025-02-01-preview/DataMaskingRuleListByDatabase.json
 */
async function getsAListOfDatabaseDataMaskingRules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
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

async function main(): Promise<void> {
  await getsAListOfDatabaseDataMaskingRules();
}

main().catch(console.error);
