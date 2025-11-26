// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DetachAndDeleteTrafficFilterDeleteOptionalParams} from "@azure/arm-elastic";
import {
  MicrosoftElastic,
} from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Detach and delete an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities.
 *
 * @summary Detach and delete an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/DetachAndDeleteTrafficFilter_Delete.json
 */
async function detachAndDeleteTrafficFilterDelete(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const rulesetId = "31d91b5afb6f4c2eaaf104c97b1991dd";
  const options: DetachAndDeleteTrafficFilterDeleteOptionalParams = {
    rulesetId,
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.detachAndDeleteTrafficFilter.delete(
    resourceGroupName,
    monitorName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await detachAndDeleteTrafficFilterDelete();
}

main().catch(console.error);
