// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets Guest Usages resources under a resource group for the Microsoft.AzureActiveDirectory resource provider
 *
 * @summary Gets Guest Usages resources under a resource group for the Microsoft.AzureActiveDirectory resource provider
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/GuestUsagesResourceGroupGet.json
 */

import { ExternalIdentitiesConfigurationClient } from "@azure/arm-azureadexternalidentities";
import { DefaultAzureCredential } from "@azure/identity";

async function guestUsagesResourceGroupList(): Promise<void> {
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName = "contosoResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestUsages.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

guestUsagesResourceGroupList().catch(console.error);
