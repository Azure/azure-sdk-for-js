// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get information about a Automanage best practice
 *
 * @summary Get information about a Automanage best practice
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/getBestPractice.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAnAutomanageBestPractice(): Promise<void> {
  const subscriptionId =
    process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const bestPracticeName = "azureBestPracticesProduction";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const result = await client.bestPractices.get(bestPracticeName);
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAutomanageBestPractice();
}

main().catch(console.error);
