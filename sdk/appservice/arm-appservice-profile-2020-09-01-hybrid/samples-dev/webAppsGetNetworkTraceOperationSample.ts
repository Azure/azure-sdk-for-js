// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a named operation for a network trace capturing (or deployment slot, if specified).
 *
 * @summary Gets a named operation for a network trace capturing (or deployment slot, if specified).
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2018-02-01/examples/GetWebSiteNetworkTraceOperation.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getTheCurrentStatusOfANetworkTraceOperationForASite(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "SampleApp";
  const operationId = "c291433b-53ad-4c49-8cae-0a293eae1c6d";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getNetworkTraceOperation(
    resourceGroupName,
    name,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheCurrentStatusOfANetworkTraceOperationForASite();
}

main().catch(console.error);
