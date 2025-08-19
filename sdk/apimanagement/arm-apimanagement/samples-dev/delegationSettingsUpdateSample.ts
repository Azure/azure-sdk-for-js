// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update Delegation settings.
 *
 * @summary Update Delegation settings.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementPortalSettingsUpdateDelegation.json
 */

import {
  PortalDelegationSettings,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

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
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.delegationSettings.update(
    resourceGroupName,
    serviceName,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementPortalSettingsUpdateDelegation();
}

main().catch(console.error);
