// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression.
 *
 * @summary Enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/DeleteSuppression.json
 */
async function deleteSuppression(): Promise<void> {
  const resourceUri = "resourceUri";
  const recommendationId = "recommendationId";
  const name = "suppressionName1";
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.suppressions.delete(resourceUri, recommendationId, name);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteSuppression();
}

main().catch(console.error);
