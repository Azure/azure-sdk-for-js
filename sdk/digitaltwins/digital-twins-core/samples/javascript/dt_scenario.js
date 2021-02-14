// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { v4 } = require("uuid");

const { buildingTwin } = require("../dtdl/digitalTwins/buildingTwin.ts");
const { floorTwin } = require("../dtdl/digitalTwins/floorTwin.ts");
const { hvacTwin } = require("../dtdl/digitalTwins/hvacTwin.ts");
const { roomTwin } = require("../dtdl/digitalTwins/roomTwin.ts");

const { building } = require("../dtdl/models/building.ts");
const { floor } = require("../dtdl/models/floor.ts");
const { room } = require("../dtdl/models/room.ts");
const { wifi } = require("../dtdl/models/wifi.ts");

const { hospitalRelationships } = require("../dtdl/relationships/hospitalRelationships.ts");

const { inspect } = require("util");

// <summary>
// This sample creates all the models in \DTDL\Models folder in the ADT service instance
// and creates the corresponding twins in \DTDL\DigitalTwins folder
// The Diagram for the Hospital model looks like this:
//
//     +------------+
//     |  Building  +-----isEquippedWith-----+
//     +------------+                        |
//           |                               v
//          has                           +-----+
//           |                            | HVAC|
//           v                            +-----+
//     +------------+                        |
//     |   Floor    +<--controlsTemperature--+
//     +------------+
//           |
//        contains
//           |
//           v
//     +------------+                 +-----------------+
//     |   Room     |-with component->| WifiAccessPoint |
//     +------------+                 +-----------------+
// </summary>

// Scenario example of how to:
// - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
// - create models from file
// - get created models by modelIds one by one
// - get all models by listing them using the pagianted API
// - delete the created eventRoutes
// - delete the created relationships
// - delete the created digital twins
// - decomission the created models
// - delete the created models
//
// Preconditions:
// - Environment variables have to be set
// - DigitalTwins enabled device must exist on the ADT hub
//
// For the purpose of this example we will create temporary model and a temporay component model using random Ids.
// We have to make sure these model Ids are unique within the DT instance so we use generated UUIDs.
async function main() {
  // - AZURE_URL: The tenant ID in Azure Active Directory
  const url = process.env.AZURE_URL;

  // - AZURE_EVENT_HUB_ENDPOINT_NAME
  const eventHubEndpointName = process.env.AZURE_EVENT_HUB_ENDPOINT_NAME;

  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const serviceClient = new DigitalTwinsClient(url, credential);

  // Create models
  const newModels = [wifi, room, floor, building];
  const createdModels = await serviceClient.createModels(newModels);
  console.log(createdModels);

  // List models
  const models = serviceClient.listModels();
  for await (const model of models) {
    console.log(`Model: ${model}`);
  }

  // Create digital twins
  const buildingTwinId = "BuildingTwin";
  const floorTwinId = "FloorTwin";
  const hvacTwinId = "HVACTwin";
  const roomTwinId = "RoomTwin";

  const createdBuildingTwin = await serviceClient.upsertDigitalTwin(buildingTwinId, buildingTwin);
  console.log(`BuildingTwin:`);
  console.log(inspect(createdBuildingTwin));

  const createdFloorTwin = await serviceClient.upsertDigitalTwin(floorTwinId, floorTwin);
  console.log(`FloorTwin:`);
  console.log(inspect(createdFloorTwin));

  const createdHVACTwin = await serviceClient.upsertDigitalTwin(hvacTwinId, hvacTwin);
  console.log(`HVACTwin:`);
  console.log(inspect(createdHVACTwin));

  const createdRoomTwin = await serviceClient.upsertDigitalTwin(roomTwinId, roomTwin);
  console.log(`RoomTwin:`);
  console.log(inspect(createdRoomTwin));

  // Create relationships
  for (const relationship of hospitalRelationships) {
    await serviceClient.upsertRelationship(
      relationship["$sourceId"],
      relationship["$relationshipId"],
      relationship
    );
  }

  // Create event route
  const eventRouteId = `eventRoute-${v4()}`;
  const eventFilter =
    "$eventType = 'DigitalTwinTelemetryMessages' or $eventType = 'DigitalTwinLifecycleNotification'";
  const response = await serviceClient.upsertEventRoute(
    eventRouteId,
    eventHubEndpointName,
    eventFilter
  );
  console.log(`Upsert Event Route response:`);
  console.log(inspect(response));

  // Get event route
  const createdEventRoute = await serviceClient.getEventRoute(eventRouteId);
  console.log(`Created Event Route:`);
  console.log(inspect(createdEventRoute));

  // Clean up
  await serviceClient.deleteEventRoute(eventRouteId);

  for (const relationship of hospitalRelationships) {
    await serviceClient.deleteRelationship(
      relationship["$sourceId"],
      relationship["$relationshipId"]
    );
  }

  await serviceClient.deleteDigitalTwin(buildingTwinId);
  await serviceClient.deleteDigitalTwin(floorTwinId);
  await serviceClient.deleteDigitalTwin(hvacTwinId);
  await serviceClient.deleteDigitalTwin(roomTwinId);

  await serviceClient.decomissionModel(building["@id"]);
  await serviceClient.decomissionModel(floor["@id"]);
  await serviceClient.decomissionModel(room["@id"]);
  await serviceClient.decomissionModel(wifi["@id"]);

  await serviceClient.deleteModel(building["@id"]);
  await serviceClient.deleteModel(floor["@id"]);
  await serviceClient.deleteModel(room["@id"]);
  await serviceClient.deleteModel(wifi["@id"]);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
