// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reconcile the NSP configuration for an account.
 *
 * @summary reconcile the NSP configuration for an account.
 * x-ms-original-file: 2026-01-15-preview/ReconcileNetworkSecurityPerimeterConfigurations.json
 */
async function reconcileNetworkSecurityPerimeterConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.reconcile(
    "resourceGroupName",
    "accountName",
    "NSPConfigurationName",
  );
  console.log(result);
}

async function main() {
  await reconcileNetworkSecurityPerimeterConfigurations();
}

main().catch(console.error);
