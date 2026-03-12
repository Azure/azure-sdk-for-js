// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AuthenticationSetting resources by HealthModel
 *
 * @summary list AuthenticationSetting resources by HealthModel
 * x-ms-original-file: 2025-05-01-preview/AuthenticationSettings_ListByHealthModel.json
 */
async function authenticationSettingsListByHealthModel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authenticationSettings.listByHealthModel(
    "my-resource-group",
    "my-health-model",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await authenticationSettingsListByHealthModel();
}

main().catch(console.error);
