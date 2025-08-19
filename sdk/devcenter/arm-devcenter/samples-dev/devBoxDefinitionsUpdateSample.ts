// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevBoxDefinitionUpdate } from "@azure/arm-devcenter";
import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Partially updates a Dev Box definition.
 *
 * @summary Partially updates a Dev Box definition.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/DevBoxDefinitions_Patch.json
 */
async function devBoxDefinitionsPatch(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const devCenterName = "Contoso";
  const devBoxDefinitionName = "WebDevBox";
  const body: DevBoxDefinitionUpdate = {
    imageReference: {
      id: "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/Example/providers/Microsoft.DevCenter/devcenters/Contoso/galleries/contosogallery/images/exampleImage/version/2.0.0",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devBoxDefinitions.beginUpdateAndWait(
    resourceGroupName,
    devCenterName,
    devBoxDefinitionName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await devBoxDefinitionsPatch();
}

main().catch(console.error);
