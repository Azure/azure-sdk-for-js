// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Reconcile the NSP configuration for an account.
 *
 * @summary Reconcile the NSP configuration for an account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ReconcileNetworkSecurityPerimeterConfigurations.json
 */
async function reconcileNetworkSecurityPerimeterConfigurations() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const nspConfigurationName = "NSPConfigurationName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.beginReconcileAndWait(
    resourceGroupName,
    accountName,
    nspConfigurationName,
  );
  console.log(result);
}

async function main() {
  await reconcileNetworkSecurityPerimeterConfigurations();
}

main().catch(console.error);
