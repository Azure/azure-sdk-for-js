// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to configures single-sign-on for this resource.
 *
 * @summary configures single-sign-on for this resource.
 * x-ms-original-file: 2025-12-26-preview/SingleSignOnConfigurations_CreateOrUpdate.json
 */
async function singleSignOnConfigurationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.singleSignOnConfigurations.createOrUpdate(
    "myResourceGroup",
    "myMonitor",
    "default",
    {
      body: {
        properties: {
          enterpriseAppId: "00000000-0000-0000-0000-000000000000",
          singleSignOnState: "Enable",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await singleSignOnConfigurationsCreateOrUpdate();
}

main().catch(console.error);
