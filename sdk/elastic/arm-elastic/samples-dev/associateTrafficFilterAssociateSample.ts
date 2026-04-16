// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AssociateTrafficFilterAssociateOptionalParams} from "@azure/arm-elastic";
import {
  MicrosoftElastic,
} from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Associate a traffic filter with your Elastic monitor resource to control and manage network traffic.
 *
 * @summary Associate a traffic filter with your Elastic monitor resource to control and manage network traffic.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/AssociateTrafficFilter_Update.json
 */
async function associateTrafficFilterAssociate(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const rulesetId = "31d91b5afb6f4c2eaaf104c97b1991dd";
  const options: AssociateTrafficFilterAssociateOptionalParams = { rulesetId };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.associateTrafficFilter.beginAssociateAndWait(
    resourceGroupName,
    monitorName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await associateTrafficFilterAssociate();
}

main().catch(console.error);
