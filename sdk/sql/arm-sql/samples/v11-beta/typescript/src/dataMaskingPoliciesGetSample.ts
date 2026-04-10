// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the database data masking policy.
 *
 * @summary gets the database data masking policy.
 * x-ms-original-file: 2025-02-01-preview/DataMaskingPolicyGet.json
 */
async function getsTheDatabaseDataMaskingPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.dataMaskingPolicies.get(
    "sqlcrudtest-6852",
    "sqlcrudtest-2080",
    "sqlcrudtest-331",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheDatabaseDataMaskingPolicies();
}

main().catch(console.error);
