// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a list of all relevant applications over a subscription level scope
 *
 * @summary Get a list of all relevant applications over a subscription level scope
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-07-01-preview/examples/Applications/ListBySubscriptionApplications_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listApplicationsSecurityBySubscriptionLevelScope(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applications.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listApplicationsSecurityBySubscriptionLevelScope();
}

main().catch(console.error);
