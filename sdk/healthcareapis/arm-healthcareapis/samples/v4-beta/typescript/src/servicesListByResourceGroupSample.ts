// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all the service instances in a resource group.
 *
 * @summary get all the service instances in a resource group.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceListByResourceGroup.json
 */
async function listAllServicesInResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.listByResourceGroup("rgname")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllServicesInResourceGroup();
}

main().catch(console.error);
