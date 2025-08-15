// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackManagementClient } from "@azure/arm-azurestack";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Enables remote management for device under the Azure Stack registration.
 *
 * @summary Enables remote management for device under the Azure Stack registration.
 * x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/RemoteManagement/Post.json
 */
async function returnsEmptyResponseForSuccessfulAction(): Promise<void> {
  const subscriptionId = "dd8597b4-8739-4467-8b10-f8679f62bfbf";
  const resourceGroup = "azurestack";
  const registrationName = "testregistration";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackManagementClient(credential, subscriptionId);
  const result = await client.registrations.enableRemoteManagement(resourceGroup, registrationName);
  console.log(result);
}

returnsEmptyResponseForSuccessfulAction().catch(console.error);
