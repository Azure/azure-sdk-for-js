// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CreateTenantRequestBody,
  B2CTenantsCreateOptionalParams,
} from "@azure/arm-azureadexternalidentities";
import { ExternalIdentitiesConfigurationClient } from "@azure/arm-azureadexternalidentities";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Initiates an async request to create both the Azure AD B2C tenant and the corresponding Azure resource linked to a subscription.
 *
 * @summary Initiates an async request to create both the Azure AD B2C tenant and the corresponding Azure resource linked to a subscription.
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/createTenant.json
 */
async function createTenant(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "contosoResourceGroup";
  const resourceName = "contoso.onmicrosoft.com";
  const createTenantRequestBody: CreateTenantRequestBody = {
    countryCode: "US",
    displayName: "Contoso",
    location: "United States",
    sku: { name: "Standard", tier: "A0" },
  };
  const options: B2CTenantsCreateOptionalParams = { createTenantRequestBody };
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(credential, subscriptionId);
  const result = await client.b2CTenants.beginCreateAndWait(
    resourceGroupName,
    resourceName,
    options,
  );
  console.log(result);
}

createTenant().catch(console.error);
