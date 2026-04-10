// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an extended database's blob auditing policy.
 *
 * @summary creates or updates an extended database's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/ExtendedDatabaseAzureMonitorAuditingCreateMin.json
 */
async function createOrUpdateAnExtendedDatabaseAzureMonitorAuditingPolicyWithMinimalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.extendedDatabaseBlobAuditingPolicies.createOrUpdate(
    "blobauditingtest-4799",
    "blobauditingtest-6440",
    "testdb",
    { isAzureMonitorTargetEnabled: true, state: "Enabled" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an extended database's blob auditing policy.
 *
 * @summary creates or updates an extended database's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/ExtendedDatabaseBlobAuditingCreateMax.json
 */
async function createOrUpdateAnExtendedDatabaseBlobAuditingPolicyWithAllParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.extendedDatabaseBlobAuditingPolicies.createOrUpdate(
    "blobauditingtest-4799",
    "blobauditingtest-6440",
    "testdb",
    {
      auditActionsAndGroups: [
        "DATABASE_LOGOUT_GROUP",
        "DATABASE_ROLE_MEMBER_CHANGE_GROUP",
        "UPDATE on database::TestDatabaseName by public",
      ],
      isAzureMonitorTargetEnabled: true,
      isStorageSecondaryKeyInUse: false,
      predicateExpression: "statement = 'select 1'",
      queueDelayMs: 4000,
      retentionDays: 6,
      state: "Enabled",
      storageAccountAccessKey:
        "sdlfkjabc+sdlfkjsdlkfsjdfLDKFTERLKFDFKLjsdfksjdflsdkfD2342309432849328476458/3RSD==",
      storageAccountSubscriptionId: "00000000-1234-0000-5678-000000000000",
      storageEndpoint: "https://mystorage.blob.core.windows.net",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an extended database's blob auditing policy.
 *
 * @summary creates or updates an extended database's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/ExtendedDatabaseBlobAuditingCreateMin.json
 */
async function createOrUpdateAnExtendedDatabaseBlobAuditingPolicyWithMinimalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.extendedDatabaseBlobAuditingPolicies.createOrUpdate(
    "blobauditingtest-4799",
    "blobauditingtest-6440",
    "testdb",
    {
      state: "Enabled",
      storageAccountAccessKey:
        "sdlfkjabc+sdlfkjsdlkfsjdfLDKFTERLKFDFKLjsdfksjdflsdkfD2342309432849328476458/3RSD==",
      storageEndpoint: "https://mystorage.blob.core.windows.net",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnExtendedDatabaseAzureMonitorAuditingPolicyWithMinimalParameters();
  await createOrUpdateAnExtendedDatabaseBlobAuditingPolicyWithAllParameters();
  await createOrUpdateAnExtendedDatabaseBlobAuditingPolicyWithMinimalParameters();
}

main().catch(console.error);
