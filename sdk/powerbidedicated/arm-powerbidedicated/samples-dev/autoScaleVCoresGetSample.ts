// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets details about the specified auto scale v-core.
 *
 * @summary Gets details about the specified auto scale v-core.
 * x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/getAutoScaleVCore.json
 */

import { PowerBIDedicated } from "@azure/arm-powerbidedicated";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDetailsOfAnAutoScaleVCore(): Promise<void> {
  const subscriptionId =
    process.env["POWERBIDEDICATED_SUBSCRIPTION_ID"] || "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const resourceGroupName = process.env["POWERBIDEDICATED_RESOURCE_GROUP"] || "TestRG";
  const vcoreName = "testvcore";
  const credential = new DefaultAzureCredential();
  const client = new PowerBIDedicated(credential, subscriptionId);
  const result = await client.autoScaleVCores.get(resourceGroupName, vcoreName);
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfAnAutoScaleVCore();
}

main().catch(console.error);
