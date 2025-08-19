// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BareMetalInfrastructureClient } from "@azure/arm-baremetalinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to shutdown an Azure Bare Metal Instance
 *
 * @summary The operation to shutdown an Azure Bare Metal Instance
 * x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalInstances_Shutdown.json
 */
async function shutdownAnAzureBareMetalInstance(): Promise<void> {
  const subscriptionId =
    process.env["BAREMETALINFRASTRUCTURE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["BAREMETALINFRASTRUCTURE_RESOURCE_GROUP"] || "myResourceGroup";
  const azureBareMetalInstanceName = "myABMInstance";
  const credential = new DefaultAzureCredential();
  const client = new BareMetalInfrastructureClient(credential, subscriptionId);
  const result = await client.azureBareMetalInstances.beginShutdownAndWait(
    resourceGroupName,
    azureBareMetalInstanceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await shutdownAnAzureBareMetalInstance();
}

main().catch(console.error);
