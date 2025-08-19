// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve a list of Automanage best practices versions
 *
 * @summary Retrieve a list of Automanage best practices versions
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/listBestPracticesVersionsByTenant.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAutomanageBestPracticesVersions(): Promise<void> {
  const subscriptionId =
    process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const bestPracticeName = "azureBestPracticesProduction";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bestPracticesVersions.listByTenant(bestPracticeName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAutomanageBestPracticesVersions();
}

main().catch(console.error);
