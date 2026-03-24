// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the data connector.
 *
 * @summary delete the data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DeleteAPIPolling.json
 */
async function deleteAAPIPollingDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.delete("myRg", "myWorkspace", "316ec55e-7138-4d63-ab18-90c8a60fd1c8");
}

/**
 * This sample demonstrates how to delete the data connector.
 *
 * @summary delete the data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DeleteGenericUI.json
 */
async function deleteAGenericUIDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.delete("myRg", "myWorkspace", "316ec55e-7138-4d63-ab18-90c8a60fd1c8");
}

/**
 * This sample demonstrates how to delete the data connector.
 *
 * @summary delete the data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DeleteGoogleCloudPlatform.json
 */
async function deleteAGCPDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.delete(
    "myRg",
    "myWorkspace",
    "GCP_fce27b90-d6f5-4d30-991a-af509a2b50a1",
  );
}

/**
 * This sample demonstrates how to delete the data connector.
 *
 * @summary delete the data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DeleteMicrosoftPurviewInformationProtectionDataConnetor.json
 */
async function deleteAnMicrosoftPurviewInformationProtectionDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.delete("myRg", "myWorkspace", "73e01a99-5cd7-4139-a149-9f2736ff2ab5");
}

/**
 * This sample demonstrates how to delete the data connector.
 *
 * @summary delete the data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DeleteMicrosoftThreatIntelligenceDataConnector.json
 */
async function deleteAnMicrosoftThreatIntelligenceDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.delete("myRg", "myWorkspace", "c345bf40-8509-4ed2-b947-50cb773aaf04");
}

/**
 * This sample demonstrates how to delete the data connector.
 *
 * @summary delete the data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DeleteOffice365ProjectDataConnetor.json
 */
async function deleteAnOffice365ProjectDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.delete("myRg", "myWorkspace", "73e01a99-5cd7-4139-a149-9f2736ff2ab5");
}

/**
 * This sample demonstrates how to delete the data connector.
 *
 * @summary delete the data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DeleteOfficeDataConnetor.json
 */
async function deleteAnOffice365DataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.delete("myRg", "myWorkspace", "73e01a99-5cd7-4139-a149-9f2736ff2ab5");
}

/**
 * This sample demonstrates how to delete the data connector.
 *
 * @summary delete the data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DeleteOfficePowerBIDataConnetor.json
 */
async function deleteAnOfficePowerBIDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.delete("myRg", "myWorkspace", "73e01a99-5cd7-4139-a149-9f2736ff2ab5");
}

/**
 * This sample demonstrates how to delete the data connector.
 *
 * @summary delete the data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DeletePremiumMicrosoftDefenderForThreatIntelligenceDataConnector.json
 */
async function deletesAPremiumMicrosoftDefenderForThreatIntelligenceDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b66e5c69-e2eb-422a-81c3-002de57059f3";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.delete("myRg", "myWorkspace", "8c569548-a86c-4fb4-8ae4-d1e35a6146f8");
}

/**
 * This sample demonstrates how to delete the data connector.
 *
 * @summary delete the data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DeletePurviewAuditDataConnector.json
 */
async function deleteAPurviewAuditDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.delete("myRg", "myWorkspace", "73e01a99-5cd7-4139-a149-9f2736ff2ab5");
}

async function main(): Promise<void> {
  await deleteAAPIPollingDataConnector();
  await deleteAGenericUIDataConnector();
  await deleteAGCPDataConnector();
  await deleteAnMicrosoftPurviewInformationProtectionDataConnector();
  await deleteAnMicrosoftThreatIntelligenceDataConnector();
  await deleteAnOffice365ProjectDataConnector();
  await deleteAnOffice365DataConnector();
  await deleteAnOfficePowerBIDataConnector();
  await deletesAPremiumMicrosoftDefenderForThreatIntelligenceDataConnector();
  await deleteAPurviewAuditDataConnector();
}

main().catch(console.error);
