// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a database's security alert policy.
 *
 * @summary creates or updates a database's security alert policy.
 * x-ms-original-file: 2025-02-01-preview/DatabaseSecurityAlertCreateMax.json
 */
async function updateADatabaseThreatDetectionPolicyWithAllParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseSecurityAlertPolicies.createOrUpdate(
    "securityalert-4799",
    "securityalert-6440",
    "testdb",
    "Default",
    {
      disabledAlerts: ["Sql_Injection", "Usage_Anomaly"],
      emailAccountAdmins: true,
      emailAddresses: ["test@microsoft.com", "user@microsoft.com"],
      retentionDays: 6,
      state: "Enabled",
      storageAccountAccessKey:
        "sdlfkjabc+sdlfkjsdlkfsjdfLDKFTERLKFDFKLjsdfksjdflsdkfD2342309432849328476458/3RSD==",
      storageEndpoint: "https://mystorage.blob.core.windows.net",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a database's security alert policy.
 *
 * @summary creates or updates a database's security alert policy.
 * x-ms-original-file: 2025-02-01-preview/DatabaseSecurityAlertCreateMin.json
 */
async function updateADatabaseThreatDetectionPolicyWithMinimalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseSecurityAlertPolicies.createOrUpdate(
    "securityalert-4799",
    "securityalert-6440",
    "testdb",
    "Default",
    { state: "Enabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateADatabaseThreatDetectionPolicyWithAllParameters();
  await updateADatabaseThreatDetectionPolicyWithMinimalParameters();
}

main().catch(console.error);
