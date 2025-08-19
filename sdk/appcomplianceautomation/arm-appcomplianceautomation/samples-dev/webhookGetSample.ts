// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the AppComplianceAutomation webhook and its properties.
 *
 * @summary Get the AppComplianceAutomation webhook and its properties.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Webhook_Get.json
 */
async function webhookGet(): Promise<void> {
  const reportName = "testReportName";
  const webhookName = "testWebhookName";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.webhook.get(reportName, webhookName);
  console.log(result);
}

async function main(): Promise<void> {
  await webhookGet();
}

main().catch(console.error);
