// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Sign-Up settings.
 *
 * @summary update Sign-Up settings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPortalSettingsUpdateSignUp.json
 */
async function apiManagementPortalSettingsUpdateSignUp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.signUpSettings.update("rg1", "apimService1", "*", {
    enabled: true,
    termsOfService: { consentRequired: true, enabled: true, text: "Terms of service text." },
  });
}

async function main() {
  await apiManagementPortalSettingsUpdateSignUp();
}

main().catch(console.error);
