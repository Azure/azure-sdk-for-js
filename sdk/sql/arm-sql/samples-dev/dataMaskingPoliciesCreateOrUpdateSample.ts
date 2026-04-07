// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a database data masking policy.
 *
 * @summary creates or updates a database data masking policy.
 * x-ms-original-file: 2025-02-01-preview/DataMaskingPolicyCreateOrUpdateMax.json
 */
async function createOrUpdateDataMaskingPolicyMax(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.dataMaskingPolicies.createOrUpdate(
    "sqlcrudtest-6852",
    "sqlcrudtest-2080",
    "sqlcrudtest-331",
    "Default",
    { dataMaskingState: "Enabled", exemptPrincipals: "testuser;" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a database data masking policy.
 *
 * @summary creates or updates a database data masking policy.
 * x-ms-original-file: 2025-02-01-preview/DataMaskingPolicyCreateOrUpdateMin.json
 */
async function createOrUpdateDataMaskingPolicyMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.dataMaskingPolicies.createOrUpdate(
    "sqlcrudtest-6852",
    "sqlcrudtest-2080",
    "sqlcrudtest-331",
    "Default",
    { dataMaskingState: "Enabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateDataMaskingPolicyMax();
  await createOrUpdateDataMaskingPolicyMin();
}

main().catch(console.error);
