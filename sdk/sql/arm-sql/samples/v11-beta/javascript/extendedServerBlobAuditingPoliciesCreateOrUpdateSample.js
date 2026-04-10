// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an extended server's blob auditing policy.
 *
 * @summary creates or updates an extended server's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/ExtendedServerBlobAuditingCreateMax.json
 */
async function updateAServerExtendedBlobAuditingPolicyWithAllParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.extendedServerBlobAuditingPolicies.createOrUpdate(
    "blobauditingtest-4799",
    "blobauditingtest-6440",
    {
      auditActionsAndGroups: [
        "SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP",
        "FAILED_DATABASE_AUTHENTICATION_GROUP",
        "BATCH_COMPLETED_GROUP",
      ],
      isAzureMonitorTargetEnabled: true,
      isStorageSecondaryKeyInUse: false,
      predicateExpression: "object_name = 'SensitiveData'",
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
 * This sample demonstrates how to creates or updates an extended server's blob auditing policy.
 *
 * @summary creates or updates an extended server's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/ExtendedServerBlobAuditingCreateMin.json
 */
async function updateAServerExtendedBlobAuditingPolicyWithMinimalParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.extendedServerBlobAuditingPolicies.createOrUpdate(
    "blobauditingtest-4799",
    "blobauditingtest-6440",
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
  await updateAServerExtendedBlobAuditingPolicyWithAllParameters();
  await updateAServerExtendedBlobAuditingPolicyWithMinimalParameters();
}

main().catch(console.error);
