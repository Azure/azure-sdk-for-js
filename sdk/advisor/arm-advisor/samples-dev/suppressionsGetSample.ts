// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Obtains the details of a suppression.
 *
 * @summary Obtains the details of a suppression.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GetSuppressionDetail.json
 */

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSuppressionDetail(): Promise<void> {
  const resourceUri = "resourceUri";
  const recommendationId = "recommendationId";
  const name = "suppressionName1";
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.suppressions.get(resourceUri, recommendationId, name);
  console.log(result);
}

async function main(): Promise<void> {
  await getSuppressionDetail();
}

main().catch(console.error);
