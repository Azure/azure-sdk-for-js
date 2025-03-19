// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to add App Components to an existing test.
 *
 * @summary Demonstrates how to add app components to an existing test.
 */

const AzureLoadTesting = require("@azure-rest/load-testing").default,
  { isUnexpected } = require("@azure-rest/load-testing");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  /**
   * The dataplane endpoint for the Azure Load Testing resource.
   * Refer to https://learn.microsoft.com/rest/api/loadtesting/data-plane-uri to understand how to obtain the data-plane endpoint.
   */
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";

  /** Microsoft Entra ID authentication */
  /**
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth
   */
  const credential = new DefaultAzureCredential();
  const testId = process.env["LOADTESTSERVICE_TESTID"] || ""; // TestId of a test already created.

  const SUBSCRIPTION_ID = process.env["SUBSCRIPTION_ID"] || "";

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, credential);

  const appComponentCreationResult = await client
    .path("/tests/{testId}/app-components", testId)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        components: {
          "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo":
            {
              resourceName: "App-Service-Sample-Demo",
              resourceType: "Microsoft.Web/sites",
            },
        },
      },
    });

  if (isUnexpected(appComponentCreationResult)) {
    throw appComponentCreationResult.body.error;
  }
}

main().catch(console.error);
