// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a Dev Box definition.
 *
 * @summary Creates or updates a Dev Box definition.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/DevBoxDefinitions_Create.json
 */

import type { DevBoxDefinition } from "@azure/arm-devcenter";
import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function devBoxDefinitionsCreate(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const devCenterName = "Contoso";
  const devBoxDefinitionName = "WebDevBox";
  const body: DevBoxDefinition = {
    hibernateSupport: "Enabled",
    imageReference: {
      id: "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/Example/providers/Microsoft.DevCenter/devcenters/Contoso/galleries/contosogallery/images/exampleImage/version/1.0.0",
    },
    location: "centralus",
    sku: { name: "Preview" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devBoxDefinitions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    devCenterName,
    devBoxDefinitionName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await devBoxDefinitionsCreate();
}

main().catch(console.error);
