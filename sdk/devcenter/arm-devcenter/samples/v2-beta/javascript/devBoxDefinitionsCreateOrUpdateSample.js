// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Dev Box definition.
 *
 * @summary creates or updates a Dev Box definition.
 * x-ms-original-file: 2026-01-01-preview/DevBoxDefinitions_Create.json
 */
async function devBoxDefinitionsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devBoxDefinitions.createOrUpdate("rg1", "Contoso", "WebDevBox", {
    location: "centralus",
    properties: {
      hibernateSupport: "Enabled",
      imageReference: {
        id: "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/Example/providers/Microsoft.DevCenter/devcenters/Contoso/galleries/contosogallery/images/exampleImage/versions/1.0.0",
      },
      sku: { name: "Preview" },
    },
  });
  console.log(result);
}

async function main() {
  await devBoxDefinitionsCreate();
}

main().catch(console.error);
