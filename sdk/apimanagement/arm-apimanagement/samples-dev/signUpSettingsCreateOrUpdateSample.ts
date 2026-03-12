// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or Update Sign-Up settings.
 *
 * @summary Create or Update Sign-Up settings.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementPortalSettingsPutSignUp.json
 */

import {
  PortalSignupSettings,
  SignUpSettingsCreateOrUpdateOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementPortalSettingsUpdateSignUp(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const ifMatch = "*";
  const parameters: PortalSignupSettings = {
    enabled: true,
    termsOfService: {
      consentRequired: true,
      enabled: true,
      text: "Terms of service text.",
    },
  };
  const options: SignUpSettingsCreateOrUpdateOptionalParams = { ifMatch };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.signUpSettings.createOrUpdate(
    resourceGroupName,
    serviceName,
    parameters,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementPortalSettingsUpdateSignUp();
}

main().catch(console.error);
