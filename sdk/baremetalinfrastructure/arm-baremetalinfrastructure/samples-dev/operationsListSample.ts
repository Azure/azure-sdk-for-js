// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of AzureBareMetal management operations.
 *
 * @summary Gets a list of AzureBareMetal management operations.
 * x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalOperations_List.json
 */

import { BareMetalInfrastructureClient } from "@azure/arm-baremetalinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllManagementOperationsSupportedByTheAzureBareMetalRp(): Promise<void> {
  const subscriptionId =
    process.env["BAREMETALINFRASTRUCTURE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BareMetalInfrastructureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllManagementOperationsSupportedByTheAzureBareMetalRp();
}

main().catch(console.error);
