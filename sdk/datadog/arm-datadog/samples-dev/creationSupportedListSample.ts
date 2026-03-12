// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Informs if the current subscription is being already monitored for selected Datadog organization.
 *
 * @summary Informs if the current subscription is being already monitored for selected Datadog organization.
 * x-ms-original-file: specification/datadog/resource-manager/Microsoft.Datadog/stable/2023-01-01/examples/CreationSupported_List.json
 */

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function creationSupportedList(): Promise<void> {
  const subscriptionId =
    process.env["DATADOG_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const datadogOrganizationId = "00000000-0000-0000-0000";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.creationSupported.list(datadogOrganizationId)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await creationSupportedList();
}

main().catch(console.error);
