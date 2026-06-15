// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetAPIPolling.json
 */
async function getAAPIPollingDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "316ec55e-7138-4d63-ab18-90c8a60fd1c8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetAmazonWebServicesCloudTrailById.json
 */
async function getAnAwsCloudTrailDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "c345bf40-8509-4ed2-b947-50cb773aaf04",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetAmazonWebServicesS3ById.json
 */
async function getAnAwsS3DataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "afef3743-0c88-469c-84ff-ca2e87dc1e48",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetAzureActiveDirectoryById.json
 */
async function getAnAadipAzureActiveDirectoryIdentityProtectionDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "f0cd27d2-5f03-4c06-ba31-d2dc82dcb51d",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetAzureAdvancedThreatProtectionById.json
 */
async function getAnAatpDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "07e42cb3-e658-4e90-801c-efa0f29d3d44",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetAzureSecurityCenterById.json
 */
async function getAASCDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "763f9fa1-c2d3-4fa2-93e9-bccd4899aa12",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetDynamics365DataConnectorById.json
 */
async function getADynamics365DataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "c2541efb-c9a6-47fe-9501-87d1017d1512",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetGenericUI.json
 */
async function getAGenericUIDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "316ec55e-7138-4d63-ab18-90c8a60fd1c8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetGoogleCloudPlatformById.json
 */
async function getAGCPDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "GCP_fce27b90-d6f5-4d30-991a-af509a2b50a1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetIoTById.json
 */
async function getAIoTDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "d2e5dc7a-f3a2-429d-954b-939fa8c2932e",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetMicrosoftCloudAppSecurityById.json
 */
async function getAMcasDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "b96d014d-b5c2-4a01-9aba-a8058f629d42",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetMicrosoftDefenderAdvancedThreatProtectionById.json
 */
async function getAMdatpDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "06b3ccb8-1384-4bcc-aec7-852f6d57161b",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetMicrosoftInsiderRiskManagementById.json
 */
async function getAnOfficeIRMDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "3d3e955e-33eb-401d-89a7-251c81ddd660",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetMicrosoftPurviewInformationProtectionDataConnetorById.json
 */
async function getAMicrosoftPurviewInformationProtectionDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetMicrosoftThreatIntelligenceById.json
 */
async function getAMicrosoftThreatIntelligenceDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "c345bf40-8509-4ed2-b947-50cb773aaf04",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetMicrosoftThreatProtectionById.json
 */
async function getAMicrosoftThreatProtectionDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "c345bf40-8509-4ed2-b947-50cb773aaf04",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetOffice365AdvancedThreatProtectionById.json
 */
async function getAnOfficeATPDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "3d3e955e-33eb-401d-89a7-251c81ddd660",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetOffice365ProjectDataConnetorById.json
 */
async function getAnOffice365ProjectDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetOfficeDataConnetorById.json
 */
async function getAnOffice365DataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetOfficePowerBIDataConnetorById.json
 */
async function getAnOffice365PowerBIDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetPremiumMicrosoftDefenderForThreatIntelligenceById.json
 */
async function getAPremiumMicrosoftDefenderForThreatIntelligenceDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b66e5c69-e2eb-422a-81c3-002de57059f3";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "8c569548-a86c-4fb4-8ae4-d1e35a6146f8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetPurviewAuditDataConnectorById.json
 */
async function getAPurviewAuditDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetRestApiPollerById.json
 */
async function getARestApiPollerDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "RestApiPoller_fce27b90-d6f5-4d30-991a-af509a2b50a1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetThreatIntelligenceById.json
 */
async function getATIDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "c345bf40-8509-4ed2-b947-50cb773aaf04",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a data connector.
 *
 * @summary gets a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/GetThreatIntelligenceTaxiiById.json
 */
async function getATITaxiiDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.get(
    "myRg",
    "myWorkspace",
    "c39bb458-02a7-4b3f-b0c8-71a1d2692652",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAAPIPollingDataConnector();
  await getAnAwsCloudTrailDataConnector();
  await getAnAwsS3DataConnector();
  await getAnAadipAzureActiveDirectoryIdentityProtectionDataConnector();
  await getAnAatpDataConnector();
  await getAASCDataConnector();
  await getADynamics365DataConnector();
  await getAGenericUIDataConnector();
  await getAGCPDataConnector();
  await getAIoTDataConnector();
  await getAMcasDataConnector();
  await getAMdatpDataConnector();
  await getAnOfficeIRMDataConnector();
  await getAMicrosoftPurviewInformationProtectionDataConnector();
  await getAMicrosoftThreatIntelligenceDataConnector();
  await getAMicrosoftThreatProtectionDataConnector();
  await getAnOfficeATPDataConnector();
  await getAnOffice365ProjectDataConnector();
  await getAnOffice365DataConnector();
  await getAnOffice365PowerBIDataConnector();
  await getAPremiumMicrosoftDefenderForThreatIntelligenceDataConnector();
  await getAPurviewAuditDataConnector();
  await getARestApiPollerDataConnector();
  await getATIDataConnector();
  await getATITaxiiDataConnector();
}

main().catch(console.error);
