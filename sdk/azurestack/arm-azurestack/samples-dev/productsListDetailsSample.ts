// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the extended properties of a product.
 *
 * @summary Returns the extended properties of a product.
 * x-ms-original-file: specification/azurestack/resource-manager/Microsoft.AzureStack/preview/2020-06-01-preview/examples/Product/Post.json
 */

import { AzureStackManagementClient } from "@azure/arm-azurestack";
import { DefaultAzureCredential } from "@azure/identity";

async function returnsTheExtendedPropertiesOfAProduct(): Promise<void> {
  const subscriptionId = "dd8597b4-8739-4467-8b10-f8679f62bfbf";
  const resourceGroup = "azurestack";
  const registrationName = "testregistration";
  const productName = "Microsoft.OSTCExtensions.VMAccessForLinux.1.4.7.1";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackManagementClient(credential, subscriptionId);
  const result = await client.products.listDetails(resourceGroup, registrationName, productName);
  console.log(result);
}

returnsTheExtendedPropertiesOfAProduct().catch(console.error);
