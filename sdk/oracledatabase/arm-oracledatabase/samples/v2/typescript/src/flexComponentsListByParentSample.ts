// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list FlexComponent resources by SubscriptionLocationResource
 *
 * @summary list FlexComponent resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-03-01/FlexComponents_ListByParent_MaximumSet_Gen.json
 */
async function flexComponentsListByParentMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.flexComponents.listByParent("eastus", {
    shape: "Exadata.X11M",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await flexComponentsListByParentMaximumSet();
}

main().catch(console.error);
