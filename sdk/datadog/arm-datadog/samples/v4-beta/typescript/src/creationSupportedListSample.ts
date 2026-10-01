// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to informs if the current subscription is being already monitored for selected Datadog organization.
 *
 * @summary informs if the current subscription is being already monitored for selected Datadog organization.
 * x-ms-original-file: 2025-12-26-preview/CreationSupported_List.json
 */
async function creationSupportedList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.creationSupported.list("00000000-0000-0000-0000")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await creationSupportedList();
}

main().catch(console.error);
