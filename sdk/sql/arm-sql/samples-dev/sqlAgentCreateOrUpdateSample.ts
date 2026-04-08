// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to puts new sql agent configuration to instance.
 *
 * @summary puts new sql agent configuration to instance.
 * x-ms-original-file: 2025-02-01-preview/SqlAgentConfigurationPut.json
 */
async function putsNewSqlAgentConfigurationToInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.sqlAgent.createOrUpdate("sqlcrudtest-7398", "sqlcrudtest-4645", {
    state: "Enabled",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putsNewSqlAgentConfigurationToInstance();
}

main().catch(console.error);
