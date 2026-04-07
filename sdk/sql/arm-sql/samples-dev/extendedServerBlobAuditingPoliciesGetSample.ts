// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an extended server's blob auditing policy.
 *
 * @summary gets an extended server's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/ExtendedServerBlobAuditingGet.json
 */
async function getAServerBlobExtendedAuditingPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.extendedServerBlobAuditingPolicies.get(
    "blobauditingtest-4799",
    "blobauditingtest-6440",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAServerBlobExtendedAuditingPolicy();
}

main().catch(console.error);
