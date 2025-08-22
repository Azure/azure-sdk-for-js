// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the AppComplianceAutomation webhook list.
 *
 * @summary Get the AppComplianceAutomation webhook list.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Webhook_List.json
 */

import type { WebhookListOptionalParams } from "@azure/arm-appcomplianceautomation";
import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webhookList(): Promise<void> {
  const skipToken = "1";
  const top = 100;
  const reportName = "testReportName";
  const options: WebhookListOptionalParams = { skipToken, top };
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const resArray = new Array();
  for await (const item of client.webhook.list(reportName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await webhookList();
}

main().catch(console.error);
