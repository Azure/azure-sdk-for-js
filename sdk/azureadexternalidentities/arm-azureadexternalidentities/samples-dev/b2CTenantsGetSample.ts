// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the Azure AD B2C tenant resource.
 *
 * @summary Get the Azure AD B2C tenant resource.
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/getTenant.json
 */

import { ExternalIdentitiesConfigurationClient } from "@azure/arm-azureadexternalidentities";
import { DefaultAzureCredential } from "@azure/identity";

async function getTenant(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "contosoResourceGroup";
  const resourceName = "contoso.onmicrosoft.com";
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(credential, subscriptionId);
  const result = await client.b2CTenants.get(resourceGroupName, resourceName);
  console.log(result);
}

getTenant().catch(console.error);
