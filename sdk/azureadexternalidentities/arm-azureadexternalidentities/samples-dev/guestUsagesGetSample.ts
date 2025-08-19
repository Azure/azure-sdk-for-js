// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a Guest Usages resource for the Microsoft.AzureActiveDirectory resource provider
 *
 * @summary Gets a Guest Usages resource for the Microsoft.AzureActiveDirectory resource provider
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/GuestUsagesGet.json
 */

import { ExternalIdentitiesConfigurationClient } from "@azure/arm-azureadexternalidentities";
import { DefaultAzureCredential } from "@azure/identity";

async function guestUsagesGet(): Promise<void> {
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName = "contosoResourceGroup";
  const resourceName = "contoso.onmicrosoft.com";
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(credential, subscriptionId);
  const result = await client.guestUsages.get(resourceGroupName, resourceName);
  console.log(result);
}

guestUsagesGet().catch(console.error);
