// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PortalDelegationSettings,
  DelegationSettingsCreateOrUpdateOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or Update Delegation settings.
 *
 * @summary Create or Update Delegation settings.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementPortalSettingsPutDelegation.json
 */
async function apiManagementPortalSettingsUpdateDelegation(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const ifMatch = "*";
  const parameters: PortalDelegationSettings = {
    subscriptions: { enabled: true },
    url: "http://contoso.com/delegation",
    userRegistration: { enabled: true },
    validationKey: "<validationKey>",
  };
  const options: DelegationSettingsCreateOrUpdateOptionalParams = { ifMatch };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.delegationSettings.createOrUpdate(
    resourceGroupName,
    serviceName,
    parameters,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementPortalSettingsUpdateDelegation();
}

main().catch(console.error);
