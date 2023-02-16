// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * This sample illustrates the lifecycle of a digital twin using a scenario that shows how to:
 * - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
 * - create digital twin based on a model
 * - get digital twin
 * - update digital twin using JSON patch
 * - delete digital twin
 *
 * @summary demonstrates the lifecycle (create, get, update, delete) of a digital twin
 */

import { DefaultAzureCredential } from "@azure/identity";
import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { inspect } from "util";
import { v4 } from "uuid";
import buildingTwin from "./dtdl/digitalTwins/buildingTwin.json";
import building from "./dtdl/models/building.json";

// For the purpose of this example we will create temporary digital twin using random Ids.
// We have to make sure these Ids are unique within the DT instance so we use generated UUIDs.
async function main() {
  // AZURE_DIGITALTWINS_URL: The URL to your Azure Digital Twins instance
  const url = process.env.AZURE_DIGITALTWINS_URL;
  if (url === undefined) {
    throw new Error("Required environment variable AZURE_DIGITALTWINS_URL is not set.");
  }

  // DefaultAzureCredential is provided by @azure/identity. It supports
  // different authentication mechanisms and determines the appropriate
  // credential type based of the environment it is executing in. See
  // https://www.npmjs.com/package/@azure/identity for more information on
  // authenticating with DefaultAzureCredential or other implementations of
  // TokenCredential.
  const credential = new DefaultAzureCredential();
  const serviceClient = new DigitalTwinsClient(url, credential);

  // Create model first
  const newModels = [building];
  const model = await serviceClient.createModels(newModels);
  console.log(`Created Model:`);
  console.log(inspect(model));

  // Create digital twin based on the created model
  const digitalTwinId = `digitalTwin-${v4()}`;
  const newTwin = JSON.stringify(buildingTwin);
  const createdTwin = await serviceClient.upsertDigitalTwin(digitalTwinId, newTwin);
  console.log(`Created Digital Twin:`);
  console.log(inspect(createdTwin));

  // Get digital twin
  const getTwin = await serviceClient.getDigitalTwin(digitalTwinId);
  console.log(`Get Digital Twin:`);
  console.log(inspect(getTwin));

  // Update digital twin
  const twinPatch = {
    op: "replace",
    path: "/AverageTemperature",
    value: 42,
  };
  const updatedTwin = await serviceClient.updateDigitalTwin(digitalTwinId, [twinPatch]);
  console.log(`Updated Digital Twin:`);
  console.log(inspect(updatedTwin));

  // Delete digital twin
  const response = await serviceClient.deleteDigitalTwin(digitalTwinId);
  console.log(`Delete response:`);
  console.log(inspect(response));
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
