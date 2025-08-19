// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List the operations for Dynatrace.Observability
 *
 * @summary List the operations for Dynatrace.Observability
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Operations_List_MaximumSet_Gen.json
 */

import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operationsListMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List the operations for Dynatrace.Observability
 *
 * @summary List the operations for Dynatrace.Observability
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Operations_List_MinimumSet_Gen.json
 */
async function operationsListMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsListMaximumSetGen();
  await operationsListMinimumSetGen();
}

main().catch(console.error);
