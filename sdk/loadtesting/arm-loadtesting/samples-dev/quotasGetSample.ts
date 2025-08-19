// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the available quota for a quota bucket per region per subscription.
 *
 * @summary Get the available quota for a quota bucket per region per subscription.
 * x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/Quotas_Get.json
 */

import { LoadTestClient } from "@azure/arm-loadtesting";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function quotasGet(): Promise<void> {
  const subscriptionId =
    process.env["LOADTESTSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "westus";
  const quotaBucketName = "testQuotaBucket";
  const credential = new DefaultAzureCredential();
  const client = new LoadTestClient(credential, subscriptionId);
  const result = await client.quotas.get(location, quotaBucketName);
  console.log(result);
}

async function main(): Promise<void> {
  await quotasGet();
}

main().catch(console.error);
