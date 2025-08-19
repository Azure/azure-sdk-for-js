// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists loadtests resources in a subscription.
 *
 * @summary Lists loadtests resources in a subscription.
 * x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_ListBySubscription.json
 */

import { LoadTestClient } from "@azure/arm-loadtesting";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function loadTestsListBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["LOADTESTSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new LoadTestClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadTests.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await loadTestsListBySubscription();
}

main().catch(console.error);
