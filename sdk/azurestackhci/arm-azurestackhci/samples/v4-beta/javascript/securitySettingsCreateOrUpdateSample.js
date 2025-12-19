// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a security setting
 *
 * @summary create a security setting
 * x-ms-original-file: 2025-12-01-preview/PutSecuritySettings.json
 */
async function createSecuritySettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.securitySettings.createOrUpdate("test-rg", "myCluster", "default", {
    securedCoreComplianceAssignment: "Audit",
    smbEncryptionForIntraClusterTrafficComplianceAssignment: "Audit",
    wdacComplianceAssignment: "ApplyAndAutoCorrect",
  });
  console.log(result);
}

async function main() {
  await createSecuritySettings();
}

main().catch(console.error);
