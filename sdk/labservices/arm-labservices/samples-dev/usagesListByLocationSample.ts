// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns list of usage per SKU family for the specified subscription in the specified region.
 *
 * @summary Returns list of usage per SKU family for the specified subscription in the specified region.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/Usages/getUsages.json
 */

import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listUsages(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const location = "eastus2";
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listByLocation(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listUsages();
}

main().catch(console.error);
