// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete the office365 consent.
 *
 * @summary Delete the office365 consent.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/officeConsents/DeleteOfficeConsents.json
 */

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAnOfficeConsent(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const consentId = "04e5fd05-ff86-4b97-b8d2-1c20933cb46c";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.officeConsents.delete(resourceGroupName, workspaceName, consentId);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAnOfficeConsent();
}

main().catch(console.error);
