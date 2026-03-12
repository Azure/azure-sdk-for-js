// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the alert rule template.
 *
 * @summary Gets the alert rule template.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/alertRuleTemplates/GetAlertRuleTemplateById.json
 */

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAlertRuleTemplateById(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const alertRuleTemplateId = "65360bb0-8986-4ade-a89d-af3cf44d28aa";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRuleTemplates.get(
    resourceGroupName,
    workspaceName,
    alertRuleTemplateId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAlertRuleTemplateById();
}

main().catch(console.error);
