// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CreateAndAssociateIPFilterCreateOptionalParams} from "@azure/arm-elastic";
import {
  MicrosoftElastic,
} from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create and associate an IP filter with your Elastic monitor resource to control and manage network traffic.
 *
 * @summary Create and associate an IP filter with your Elastic monitor resource to control and manage network traffic.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/IPTrafficFilter_Create.json
 */
async function createAndAssociateIPFilterCreate(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const ips = "192.168.131.0, 192.168.132.6/22";
  const options: CreateAndAssociateIPFilterCreateOptionalParams = { ips };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.createAndAssociateIPFilter.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAndAssociateIPFilterCreate();
}

main().catch(console.error);
