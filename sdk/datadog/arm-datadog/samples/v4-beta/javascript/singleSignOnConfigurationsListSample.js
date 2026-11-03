// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the single sign-on configurations for a given monitor resource.
 *
 * @summary list the single sign-on configurations for a given monitor resource.
 * x-ms-original-file: 2025-12-26-preview/SingleSignOnConfigurations_List.json
 */
async function singleSignOnConfigurationsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.singleSignOnConfigurations.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await singleSignOnConfigurationsList();
}

main().catch(console.error);
