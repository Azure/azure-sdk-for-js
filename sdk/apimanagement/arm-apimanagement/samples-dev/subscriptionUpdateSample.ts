// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SubscriptionUpdateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the details of a subscription specified by its identifier.
 *
 * @summary Updates the details of a subscription specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateSubscription.json
 */
async function apiManagementUpdateSubscription(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const sid = "testsub";
  const ifMatch = "*";
  const parameters: SubscriptionUpdateParameters = { displayName: "testsub" };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.subscription.update(
    resourceGroupName,
    serviceName,
    sid,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateSubscription();
}

main().catch(console.error);
