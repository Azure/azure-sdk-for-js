// Copyright (c) Microsoft.
// Licensed under the MIT License. See LICENSE file in the project root for full license information.

/**
 * This sample creates all the models in \DTDL\Models folder in the ADT service instance
 * and creates the corresponding twins in \DTDL\DigitalTwins folder
 * The Diagram for the Hospital model looks like this:
 * +------------+
 * |  Building  +-----isEquippedWith-----+
 * +------------+                        |
 *       |                               v
 *      has                           +-----+
 *       |                            | HVAC|
 *       v                            +-----+
 * +------------+                        |
 * |   Floor    +<--controlsTemperature--+
 * +------------+
 *       |
 *    contains
 *       |
 *       v
 * +------------+                 +-----------------+
 * |   Room     |-with component->| WifiAccessPoint |
 * +------------+                 +-----------------+
 *
 * Scenario example of how to:
 * - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
 * - create models from file
 * - get created models by modelIds one by one
 * - get all models by listing them using the pagianted API
 * - delete the created eventRoutes
 * - delete the created relationships
 * - delete the created digital twins
 * - decommission the created models
 * - delete the created models
 *
 * @summary Demonstrates a scenario with models, digital twins, event routes, and relationships using the DTDL examples found in the DTDL folder.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { v4 } from "uuid";
import { inspect } from "util";

import buildingTwin from "./dtdl/digitalTwins/buildingTwin.json";
import floorTwin from "./dtdl/digitalTwins/floorTwin.json";
import hvacTwin from "./dtdl/digitalTwins/hvacTwin.json";
import roomTwin from "./dtdl/digitalTwins/roomTwin.json";

import building from "./dtdl/models/building.json";
import floor from "./dtdl/models/floor.json";
import room from "./dtdl/models/room.json";
import wifi from "./dtdl/models/wifi.json";
import hvac from "./dtdl/models/hvac.json";

import hospitalRelationships from "./dtdl/relationships/hospitalRelationships.json";

async function main() {
  // AZURE_DIGITALTWINS_URL: The URL to your Azure Digital Twins instance
  const url = process.env.AZURE_DIGITALTWINS_URL;
  if (url === undefined) {
    throw new Error("Required environment variable AZURE_DIGITALTWINS_URL is not set.");
  }

  // AZURE_EVENT_HUB_ENDPOINT_NAME: The endpoint name of your Azure Event Hub
  let eventHubEndpointName: string;
  if (process.env.AZURE_EVENT_HUB_ENDPOINT_NAME) {
    eventHubEndpointName = process.env.AZURE_EVENT_HUB_ENDPOINT_NAME;
  } else {
    throw new Error("Required environment variable AZURE_EVENT_HUB_ENDPOINT_NAME is not set.");
  }

  // DefaultAzureCredential is provided by @azure/identity. It supports
  // different authentication mechanisms and determines the appropriate
  // credential type based of the environment it is executing in. See
  // https://www.npmjs.com/package/@azure/identity for more information on
  // authenticating with DefaultAzureCredential or other implementations of
  // TokenCredential.
  const credential = new DefaultAzureCredential();
  const serviceClient = new DigitalTwinsClient(url, credential);

  // Create models
  const newModels = [wifi, room, floor, building, hvac];
  const createdModels = await serviceClient.createModels(newModels);
  console.log(createdModels);

  // List models
  const models = serviceClient.listModels();
  for await (const model of models) {
    console.log(`Model: ${inspect(model)}`);
  }

  // Create digital twins
  const buildingTwinId = "BuildingTwin";
  const floorTwinId = "FloorTwin";
  const hvacTwinId = "HVACTwin";
  const roomTwinId = "RoomTwin";

  const createdBuildingTwin = await serviceClient.upsertDigitalTwin(
    buildingTwinId,
    JSON.stringify(buildingTwin),
  );
  console.log(`BuildingTwin:`);
  console.log(inspect(createdBuildingTwin));

  const createdFloorTwin = await serviceClient.upsertDigitalTwin(
    floorTwinId,
    JSON.stringify(floorTwin),
  );
  console.log(`FloorTwin:`);
  console.log(inspect(createdFloorTwin));

  const createdHVACTwin = await serviceClient.upsertDigitalTwin(
    hvacTwinId,
    JSON.stringify(hvacTwin),
  );
  console.log(`HVACTwin:`);
  console.log(inspect(createdHVACTwin));

  const createdRoomTwin = await serviceClient.upsertDigitalTwin(
    roomTwinId,
    JSON.stringify(roomTwin),
  );
  console.log(`RoomTwin:`);
  console.log(inspect(createdRoomTwin));

  // Create relationships
  for (const relationship of hospitalRelationships) {
    await serviceClient.upsertRelationship(
      relationship["$sourceId"],
      relationship["$relationshipId"],
      relationship,
    );
  }

  // Create event route
  const eventRouteId = `eventRoute-${v4()}`;
  const eventFilter =
    "$eventType = 'DigitalTwinTelemetryMessages' or $eventType = 'DigitalTwinLifecycleNotification'";
  const response = await serviceClient.upsertEventRoute(
    eventRouteId,
    eventHubEndpointName,
    eventFilter,
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
      relationship["$relationshipId"],
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
