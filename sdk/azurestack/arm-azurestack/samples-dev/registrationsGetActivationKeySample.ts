// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackManagementClient } from "@azure/arm-azurestack";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Returns Azure Stack Activation Key.
 *
 * @summary Returns Azure Stack Activation Key.
 * x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Registration/Post.json
 */
async function returnsAzureStackActivationKey(): Promise<void> {
  const subscriptionId = "dd8597b4-8739-4467-8b10-f8679f62bfbf";
  const resourceGroup = "azurestack";
  const registrationName = "testregistration";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackManagementClient(credential, subscriptionId);
  const result = await client.registrations.getActivationKey(resourceGroup, registrationName);
  console.log(result);
}

returnsAzureStackActivationKey().catch(console.error);
