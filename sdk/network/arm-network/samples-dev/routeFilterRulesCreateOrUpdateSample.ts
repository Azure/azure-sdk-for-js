// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a route in the specified route filter.
 *
 * @summary Creates or updates a route in the specified route filter.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/RouteFilterRuleCreate.json
 */

import type { RouteFilterRule} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function routeFilterRuleCreate(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const routeFilterName = "filterName";
  const ruleName = "ruleName";
  const routeFilterRuleParameters: RouteFilterRule = {
    access: "Allow",
    communities: ["12076:5030", "12076:5040"],
    routeFilterRuleType: "Community",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeFilterRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    routeFilterName,
    ruleName,
    routeFilterRuleParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await routeFilterRuleCreate();
}

main().catch(console.error);
