// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the Dsc node configurations by node configuration.
 *
 * @summary retrieve the Dsc node configurations by node configuration.
 * x-ms-original-file: 2024-10-23/getDscNodeConfiguration.json
 */
async function getADSCNodeConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscNodeConfigurationOperations.get(
    "rg",
    "myAutomationAccount33",
    "SetupServer.localhost",
  );
  console.log(result);
}

async function main() {
  await getADSCNodeConfiguration();
}

main().catch(console.error);
