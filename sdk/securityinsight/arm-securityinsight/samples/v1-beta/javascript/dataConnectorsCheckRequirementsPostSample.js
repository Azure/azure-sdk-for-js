// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsAzureActiveDirectory.json
 */
async function checkRequirementsForAadipAzureActiveDirectoryIdentityProtection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "AzureActiveDirectory",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsAzureActiveDirectoryNoAuthorization.json
 */
async function checkRequirementsForAadipAzureActiveDirectoryIdentityProtectionNoAuthorization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "AzureActiveDirectory",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsAzureActiveDirectoryNoLicense.json
 */
async function checkRequirementsForAadipAzureActiveDirectoryIdentityProtectionNoLicense() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "AzureActiveDirectory",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsAzureSecurityCenter.json
 */
async function checkRequirementsForASC() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "AzureSecurityCenter",
    subscriptionId: "c0688291-89d7-4bed-87a2-a7b1bff43f4c",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsDynamics365.json
 */
async function checkRequirementsForDynamics365() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "Dynamics365",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsIoT.json
 */
async function checkRequirementsForIoT() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "IOT",
    subscriptionId: "c0688291-89d7-4bed-87a2-a7b1bff43f4c",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsMdatp.json
 */
async function checkRequirementsForMdatp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "MicrosoftCloudAppSecurity",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsMicrosoftCloudAppSecurity.json
 */
async function checkRequirementsForMcas() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "MicrosoftCloudAppSecurity",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsMicrosoftPurviewInformationProtection.json
 */
async function checkRequirementsForMicrosoftPurviewInformationProtection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "MicrosoftPurviewInformationProtection",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsMicrosoftThreatIntelligence.json
 */
async function checkRequirementsForMicrosoftThreatIntelligence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "MicrosoftThreatIntelligence",
    tenantId: "06b3ccb8-1384-4bcc-aec7-852f6d57161b",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsMicrosoftThreatProtection.json
 */
async function checkRequirementsForMicrosoftThreatProtection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "MicrosoftThreatProtection",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsOffice365Project.json
 */
async function checkRequirementsForOffice365Project() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "Office365Project",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsOfficeATP.json
 */
async function checkRequirementsForOfficeATP() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "OfficeATP",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsOfficeIRM.json
 */
async function checkRequirementsForOfficeIRM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "OfficeIRM",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsOfficePowerBI.json
 */
async function checkRequirementsForOfficePowerBI() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "OfficePowerBI",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsPurviewAudit.json
 */
async function checkRequirementsForPurviewAudit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "PurviewAudit",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsThreatIntelligence.json
 */
async function checkRequirementsForTI() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "ThreatIntelligence",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get requirements state for a data connector type.
 *
 * @summary get requirements state for a data connector type.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/CheckRequirementsThreatIntelligenceTaxii.json
 */
async function checkRequirementsForTITaxii() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectorsCheckRequirements.post("myRg", "myWorkspace", {
    kind: "ThreatIntelligenceTaxii",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8",
  });
  console.log(result);
}

async function main() {
  await checkRequirementsForAadipAzureActiveDirectoryIdentityProtection();
  await checkRequirementsForAadipAzureActiveDirectoryIdentityProtectionNoAuthorization();
  await checkRequirementsForAadipAzureActiveDirectoryIdentityProtectionNoLicense();
  await checkRequirementsForASC();
  await checkRequirementsForDynamics365();
  await checkRequirementsForIoT();
  await checkRequirementsForMdatp();
  await checkRequirementsForMcas();
  await checkRequirementsForMicrosoftPurviewInformationProtection();
  await checkRequirementsForMicrosoftThreatIntelligence();
  await checkRequirementsForMicrosoftThreatProtection();
  await checkRequirementsForOffice365Project();
  await checkRequirementsForOfficeATP();
  await checkRequirementsForOfficeIRM();
  await checkRequirementsForOfficePowerBI();
  await checkRequirementsForPurviewAudit();
  await checkRequirementsForTI();
  await checkRequirementsForTITaxii();
}

main().catch(console.error);
