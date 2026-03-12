// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks the availability and validity of a domain name for the tenant.
 *
 * @summary Checks the availability and validity of a domain name for the tenant.
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/checkNameAvailability-available.json
 */

import type {
  CheckNameAvailabilityRequestBody,
  B2CTenantsCheckNameAvailabilityOptionalParams,
} from "@azure/arm-azureadexternalidentities";
import { ExternalIdentitiesConfigurationClient } from "@azure/arm-azureadexternalidentities";
import { DefaultAzureCredential } from "@azure/identity";

async function checkNameAvailabilityAvailable(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const checkNameAvailabilityRequestBody: CheckNameAvailabilityRequestBody = {
    name: "constoso.onmicrosoft.com",
    countryCode: "US",
  };
  const options: B2CTenantsCheckNameAvailabilityOptionalParams = {
    checkNameAvailabilityRequestBody,
  };
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(credential, subscriptionId);
  const result = await client.b2CTenants.checkNameAvailability(options);
  console.log(result);
}

checkNameAvailabilityAvailable().catch(console.error);

/**
 * This sample demonstrates how to Checks the availability and validity of a domain name for the tenant.
 *
 * @summary Checks the availability and validity of a domain name for the tenant.
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/checkNameAvailability-taken.json
 */
async function checkNameAvailabilityTaken(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const checkNameAvailabilityRequestBody: CheckNameAvailabilityRequestBody = {
    name: "constoso.onmicrosoft.com",
    countryCode: "US",
  };
  const options: B2CTenantsCheckNameAvailabilityOptionalParams = {
    checkNameAvailabilityRequestBody,
  };
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(credential, subscriptionId);
  const result = await client.b2CTenants.checkNameAvailability(options);
  console.log(result);
}

checkNameAvailabilityTaken().catch(console.error);
