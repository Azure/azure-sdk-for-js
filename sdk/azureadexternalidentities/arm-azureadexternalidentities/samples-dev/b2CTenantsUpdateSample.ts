// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the Azure AD B2C tenant resource.
 *
 * @summary Update the Azure AD B2C tenant resource.
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/updateTenant.json
 */

import type {
  B2CTenantUpdateRequest,
  B2CTenantsUpdateOptionalParams,
} from "@azure/arm-azureadexternalidentities";
import { ExternalIdentitiesConfigurationClient } from "@azure/arm-azureadexternalidentities";
import { DefaultAzureCredential } from "@azure/identity";

async function updateTenant(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "contosoResourceGroup";
  const resourceName = "contoso.onmicrosoft.com";
  const updateTenantRequestBody: B2CTenantUpdateRequest = {
    billingConfig: { billingType: "MAU" },
    sku: { name: "PremiumP1" },
    tags: { key: "value" },
  };
  const options: B2CTenantsUpdateOptionalParams = { updateTenantRequestBody };
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(credential, subscriptionId);
  const result = await client.b2CTenants.update(resourceGroupName, resourceName, options);
  console.log(result);
}

updateTenant().catch(console.error);
