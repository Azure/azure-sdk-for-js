// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reinstate integration with your Datadog organization by choosing one of the available subscription plans.
 *
 * @summary reinstate integration with your Datadog organization by choosing one of the available subscription plans.
 * x-ms-original-file: 2025-12-26-preview/Organizations_Resubscribe.json
 */
async function organizationsResubscribe() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.organizations.resubscribe("myResourceGroup", "myMonitor", {
    body: {
      azureSubscriptionId: "subscriptionId",
      resourceGroup: "resourceGroup",
      sku: { name: "planName" },
    },
  });
  console.log(result);
}

async function main() {
  await organizationsResubscribe();
}

main().catch(console.error);
