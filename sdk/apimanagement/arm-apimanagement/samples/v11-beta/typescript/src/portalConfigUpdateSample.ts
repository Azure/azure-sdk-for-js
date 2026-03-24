// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the developer portal configuration.
 *
 * @summary update the developer portal configuration.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdatePortalConfig.json
 */
async function apiManagementUpdatePortalConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.portalConfig.update("rg1", "apimService1", "default", "*", {
    cors: { allowedOrigins: ["https://contoso.com"] },
    csp: {
      allowedSources: ["*.contoso.com"],
      mode: "reportOnly",
      reportUri: ["https://report.contoso.com"],
    },
    delegation: { delegateRegistration: false, delegateSubscription: false },
    enableBasicAuth: true,
    signin: { require: false },
    signup: {
      termsOfService: {
        requireConsent: false,
        text: "I agree to the service terms and conditions.",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdatePortalConfig();
}

main().catch(console.error);
