// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified NSP configurations for an account.
 *
 * @summary Gets the specified NSP configurations for an account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/GetNetworkSecurityPerimeterConfigurations.json
 */
async function getNetworkSecurityPerimeterConfigurations(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const nspConfigurationName = "NSPConfigurationName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.networkSecurityPerimeterConfigurations.get(
    resourceGroupName,
    accountName,
    nspConfigurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkSecurityPerimeterConfigurations();
}

main().catch(console.error);
