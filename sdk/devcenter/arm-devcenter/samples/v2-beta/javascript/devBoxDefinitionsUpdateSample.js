// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to partially updates a Dev Box definition.
 *
 * @summary partially updates a Dev Box definition.
 * x-ms-original-file: 2026-01-01-preview/DevBoxDefinitions_Patch.json
 */
async function devBoxDefinitionsPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devBoxDefinitions.update("rg1", "Contoso", "WebDevBox", {
    imageReference: {
      id: "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/Example/providers/Microsoft.DevCenter/devcenters/Contoso/galleries/contosogallery/images/exampleImage/version/2.0.0",
    },
  });
  console.log(result);
}

async function main() {
  await devBoxDefinitionsPatch();
}

main().catch(console.error);
