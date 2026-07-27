// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the office365 consent.
 *
 * @summary delete the office365 consent.
 * x-ms-original-file: 2025-07-01-preview/officeConsents/DeleteOfficeConsents.json
 */
async function deleteAnOfficeConsent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.officeConsents.delete("myRg", "myWorkspace", "04e5fd05-ff86-4b97-b8d2-1c20933cb46c");
}

async function main() {
  await deleteAnOfficeConsent();
}

main().catch(console.error);
