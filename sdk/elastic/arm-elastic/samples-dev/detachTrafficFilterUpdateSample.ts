// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Detach traffic filter for the given deployment.
 *
 * @summary Detach traffic filter for the given deployment.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/DetachTrafficFilters_Update.json
 */

import type { DetachTrafficFilterUpdateOptionalParams } from "@azure/arm-elastic";
import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function detachTrafficFilterUpdate(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const rulesetId = "31d91b5afb6f4c2eaaf104c97b1991dd";
  const options: DetachTrafficFilterUpdateOptionalParams = { rulesetId };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.detachTrafficFilter.beginUpdateAndWait(
    resourceGroupName,
    monitorName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await detachTrafficFilterUpdate();
}

main().catch(console.error);
