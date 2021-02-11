// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

// Simple example of how to:
// - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
// - publish telemetry message
//
// Preconditions:
// - Environment variables have to be set
// - DigitalTwins enabled device must exist on the ADT hub
async function main() {
  // - AZURE_DIGITALTWINS_URL: The tenant ID in Azure Active Directory
  const url = process.env.AZURE_DIGITALTWINS_URL;

  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const serviceClient = new DigitalTwinsClient(url, credential);

  // Publish telemetry message
  const digitalTwinId = "<DIGITAL TWIN ID>"; // from the samples: BuildingTwin, FloorTwin, HVACTwin, RoomTwin
  const telemetryPayload = '{"Telemetry1": 5}';
  const response = await serviceClient.publishTelemetry(digitalTwinId, telemetryPayload);
  console.log(`Publis Component Telemetry response:`);
  console.log(inspect(response));
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
