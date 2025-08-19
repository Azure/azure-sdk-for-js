// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a Visual Studio Team Services account resource.
 *
 * @summary Creates or updates a Visual Studio Team Services account resource.
 * x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/CreateResource.json
 */

import type { AccountResourceRequest } from "@azure/arm-visualstudio";
import { VisualStudioResourceProviderClient } from "@azure/arm-visualstudio";
import { DefaultAzureCredential } from "@azure/identity";

async function createAnAccountResource(): Promise<void> {
  const subscriptionId = "0de7f055-dbea-498d-8e9e-da287eedca90";
  const resourceGroupName = "VS-Example-Group";
  const resourceName = "Example";
  const body: AccountResourceRequest = {
    accountName: "Example",
    location: "Central US",
    operationType: "create",
    properties: {},
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new VisualStudioResourceProviderClient(credential, subscriptionId);
  const result = await client.accounts.createOrUpdate(resourceGroupName, resourceName, body);
  console.log(result);
}

createAnAccountResource().catch(console.error);
