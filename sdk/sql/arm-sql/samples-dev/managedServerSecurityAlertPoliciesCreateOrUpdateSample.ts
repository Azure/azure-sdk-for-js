// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a threat detection policy.
 *
 * @summary creates or updates a threat detection policy.
 * x-ms-original-file: 2025-02-01-preview/ManagedServerSecurityAlertCreateMax.json
 */
async function updateAManagedServerThreatDetectionPolicyWithAllParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedServerSecurityAlertPolicies.createOrUpdate(
    "securityalert-4799",
    "securityalert-6440",
    "Default",
    {
      disabledAlerts: ["Access_Anomaly", "Usage_Anomaly"],
      emailAccountAdmins: true,
      emailAddresses: ["testSecurityAlert@microsoft.com"],
      retentionDays: 5,
      state: "Enabled",
      storageAccountAccessKey:
        "sdlfkjabc+sdlfkjsdlkfsjdfLDKFTERLKFDFKLjsdfksjdflsdkfD2342309432849328476458/3RSD==",
      storageEndpoint: "https://mystorage.blob.core.windows.net",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a threat detection policy.
 *
 * @summary creates or updates a threat detection policy.
 * x-ms-original-file: 2025-02-01-preview/ManagedServerSecurityAlertCreateMin.json
 */
async function updateAManagedServerThreatDetectionPolicyWithMinimalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedServerSecurityAlertPolicies.createOrUpdate(
    "securityalert-4799",
    "securityalert-6440",
    "Default",
    { state: "Enabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAManagedServerThreatDetectionPolicyWithAllParameters();
  await updateAManagedServerThreatDetectionPolicyWithMinimalParameters();
}

main().catch(console.error);
