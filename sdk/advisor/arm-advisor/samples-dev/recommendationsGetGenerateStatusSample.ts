// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header.
 *
 * @summary Retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/EmptyResponse.json
 */
async function getGenerateStatus(): Promise<void> {
  const subscriptionId = process.env["ADVISOR_SUBSCRIPTION_ID"] || "subscriptionId";
  const operationId = "operationGUID";
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.recommendations.getGenerateStatus(operationId);
  console.log(result);
}

async function main(): Promise<void> {
  await getGenerateStatus();
}

main().catch(console.error);
