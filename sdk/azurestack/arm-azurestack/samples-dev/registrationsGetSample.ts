// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the properties of an Azure Stack registration.
 *
 * @summary Returns the properties of an Azure Stack registration.
 * x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Registration/Get.json
 */

import { AzureStackManagementClient } from "@azure/arm-azurestack";
import { DefaultAzureCredential } from "@azure/identity";

async function returnsThePropertiesOfAnAzureStackRegistration(): Promise<void> {
  const subscriptionId = "dd8597b4-8739-4467-8b10-f8679f62bfbf";
  const resourceGroup = "azurestack";
  const registrationName = "testregistration";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackManagementClient(credential, subscriptionId);
  const result = await client.registrations.get(resourceGroup, registrationName);
  console.log(result);
}

returnsThePropertiesOfAnAzureStackRegistration().catch(console.error);
