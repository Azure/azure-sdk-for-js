// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a database's blob auditing policy.
 *
 * @summary creates or updates a database's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAzureMonitorAuditingCreateMin.json
 */
async function createOrUpdateADatabaseAzureMonitorAuditingPolicyWithMinimalParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseBlobAuditingPolicies.createOrUpdate(
    "blobauditingtest-4799",
    "blobauditingtest-6440",
    "testdb",
    { isAzureMonitorTargetEnabled: true, state: "Enabled" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a database's blob auditing policy.
 *
 * @summary creates or updates a database's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/DatabaseBlobAuditingCreateMax.json
 */
async function createOrUpdateADatabaseBlobAuditingPolicyWithAllParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseBlobAuditingPolicies.createOrUpdate(
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
 * This sample demonstrates how to creates or updates a database's blob auditing policy.
 *
 * @summary creates or updates a database's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/DatabaseBlobAuditingCreateMin.json
 */
async function createOrUpdateADatabaseBlobAuditingPolicyWithMinimalParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseBlobAuditingPolicies.createOrUpdate(
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

async function main() {
  await createOrUpdateADatabaseAzureMonitorAuditingPolicyWithMinimalParameters();
  await createOrUpdateADatabaseBlobAuditingPolicyWithAllParameters();
  await createOrUpdateADatabaseBlobAuditingPolicyWithMinimalParameters();
}

main().catch(console.error);
