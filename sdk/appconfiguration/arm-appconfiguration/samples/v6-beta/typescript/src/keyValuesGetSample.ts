// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead.
 *
 * @summary gets the properties of the specified key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresGetKeyValue.json
 */
async function keyValuesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.keyValues.get("myResourceGroup", "contoso", "myKey$myLabel");
  console.log(result);
}

async function main(): Promise<void> {
  await keyValuesGet();
}

main().catch(console.error);
