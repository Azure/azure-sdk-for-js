// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the list of snoozed or dismissed suppressions for a subscription. The snoozed or dismissed attribute of a recommendation is referred to as a suppression.
 *
 * @summary Retrieves the list of snoozed or dismissed suppressions for a subscription. The snoozed or dismissed attribute of a recommendation is referred to as a suppression.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListSuppressions.json
 */
async function listSuppressions(): Promise<void> {
  const subscriptionId = process.env["ADVISOR_SUBSCRIPTION_ID"] || "subscriptionId1";
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.suppressions.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listSuppressions();
}

main().catch(console.error);
