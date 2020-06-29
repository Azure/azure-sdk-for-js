// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digitaltwins");
const { v4 } = require("uuid");
const { buildingTwin } = require("../dtdl/digitalTwins/buildingTwin.ts");
const { building } = require("../dtdl/models/building.ts");

// Scenario example of how to:
// - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
// - create digital twin based on a model
// - get digital twin
// - update digital twin using JSON patch
// - delete digital twin
//
// Preconditions:
// - Environment variables have to be set
// - DigitalTwins enabled device must exist on the ADT hub
//
// For the purpose of this example we will create temporary digital twin using random Ids.
// We have to make sure these Ids are unique within the DT instance so we use generated UUIDs.
async function main() {
  // - AZURE_URL: The tenant ID in Azure Active Directory
  const url = process.env.AZURE_URL;

  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const serviceClient = new DigitalTwinsClient(url, credential);

  // Create model first
  const newModels = [building];
  const model = await serviceClient.createModels(newModels);
  console.log(`Model: ${model.body}`);

  // Create digital twin based on the created model
  const digitalTwinId = "digitalTwin-" + v4();
  const newTwin = buildingTwin;
  const createdTwin = await serviceClient.upsertDigitalTwin(
    digitalTwinId,
    newTwin,
    (enableUpdate = true)
  );
  console.log(createdTwin.body);

  // Get digital twin
  const twin = await serviceClient.getDigitalTwin(digitalTwinId);
  console.log(`DigitalTwin's etag: ${twin.eTag}`);
  console.log(`DigitalTwin: ${twin.body}`);

  // Update digital twin
  const twinPatch = {
    AverageTemperature: 42
  };
  const updatedTwin = await serviceClient.updateDigitalTwin(digitalTwinId, twinPatch);
  console.log(`Updated digitalTwin's etag: ${updatedTwin.eTag}`);
  console.log(`Updated digitalTwin: ${updatedTwin.body}`);

  // Delete digital twin
  const response = await serviceClient.deleteDigitalTwin(digitalTwinId);
  console.log(response);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
