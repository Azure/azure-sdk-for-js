// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list DiscoveryRule resources by HealthModel
 *
 * @summary list DiscoveryRule resources by HealthModel
 * x-ms-original-file: 2025-05-01-preview/DiscoveryRules_ListByHealthModel.json
 */

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

async function discoveryRulesListByHealthModel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.discoveryRules.listByHealthModel(
    "my-resource-group",
    "my-health-model",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await discoveryRulesListByHealthModel();
}

main().catch(console.error);
