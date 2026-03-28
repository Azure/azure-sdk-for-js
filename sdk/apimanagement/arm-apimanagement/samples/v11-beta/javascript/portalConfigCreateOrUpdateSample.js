// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the developer portal configuration.
 *
 * @summary create or update the developer portal configuration.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreatePortalConfig.json
 */
async function apiManagementCreatePortalConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.portalConfig.createOrUpdate("rg1", "apimService1", "default", "*", {
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

async function main() {
  await apiManagementCreatePortalConfig();
}

main().catch(console.error);
