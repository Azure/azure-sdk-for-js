// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified NSP configurations for an account.
 *
 * @summary gets the specified NSP configurations for an account.
 * x-ms-original-file: 2026-01-15-preview/GetNetworkSecurityPerimeterConfigurations.json
 */
async function getNetworkSecurityPerimeterConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "resourceGroupName",
    "accountName",
    "NSPConfigurationName",
  );
  console.log(result);
}

async function main() {
  await getNetworkSecurityPerimeterConfigurations();
}

main().catch(console.error);
