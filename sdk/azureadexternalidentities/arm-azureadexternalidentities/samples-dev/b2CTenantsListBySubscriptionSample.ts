// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get all the Azure AD B2C tenant resources in a subscription.
 *
 * @summary Get all the Azure AD B2C tenant resources in a subscription.
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/listTenantsBySubscription.json
 */

import { ExternalIdentitiesConfigurationClient } from "@azure/arm-azureadexternalidentities";
import { DefaultAzureCredential } from "@azure/identity";

async function b2CTenantsListBySubscription(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.b2CTenants.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

b2CTenantsListBySubscription().catch(console.error);
