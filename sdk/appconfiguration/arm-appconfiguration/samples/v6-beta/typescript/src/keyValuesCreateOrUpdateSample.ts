// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead.
 *
 * @summary creates a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateKeyValue.json
 */
async function keyValuesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.keyValues.createOrUpdate(
    "myResourceGroup",
    "contoso",
    "myKey$myLabel",
    { tags: { tag1: "tagValue1", tag2: "tagValue2" }, value: "myValue" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await keyValuesCreateOrUpdate();
}

main().catch(console.error);
