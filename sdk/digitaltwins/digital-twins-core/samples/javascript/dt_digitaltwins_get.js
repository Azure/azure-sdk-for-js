// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

// Simple example of how to:
// - get digital twin
//
// Preconditions:
// - Environment variables have to be set
// - DigitalTwins enabled device must exist on the ADT hub
//
// For the purpose of this example we will create temporary digital twin using random Ids.
// We have to make sure these Ids are unique within the DT instance so we use generated UUIDs.
async function main() {
  // - AZURE_DIGITALTWINS_URL: The tenant ID in Azure Active Directory
  const url = process.env.AZURE_DIGITALTWINS_URL;

  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const serviceClient = new DigitalTwinsClient(url, credential);

  // Get digital twin
  const digitalTwintId = "BuildingTwin"; // from the samples: BuildingTwin, FloorTwin, HVACTwin, RoomTwin
  const digitalTwin = await serviceClient.getDigitalTwin(digitalTwintId);
  console.log(`DigitalTwin:`);
  console.log(inspect(digitalTwin));
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
