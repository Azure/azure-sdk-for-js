// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CreateAndAssociatePLFilterCreateOptionalParams} from "@azure/arm-elastic";
import {
  MicrosoftElastic,
} from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create and associate a PL filter with your Elastic monitor resource to control and manage network traffic.
 *
 * @summary Create and associate a PL filter with your Elastic monitor resource to control and manage network traffic.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/PrivateLinkTrafficFilters_Create.json
 */
async function createAndAssociatePlFilterCreate(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const privateEndpointGuid = "fdb54d3b-e85e-4d08-8958-0d2f7g523df9";
  const privateEndpointName = "myPrivateEndpoint";
  const options: CreateAndAssociatePLFilterCreateOptionalParams = {
    privateEndpointGuid,
    privateEndpointName,
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.createAndAssociatePLFilter.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAndAssociatePlFilterCreate();
}

main().catch(console.error);
