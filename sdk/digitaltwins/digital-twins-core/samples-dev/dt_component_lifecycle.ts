// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * This sample illustrates the lifecycle of a component using a scenario that shows how to:
 * - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
 * - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
 * - create model, component and twin
 * - create digital twin based on the model
 * - update component
 * - get component
 * - delete twin
 * - decommission and delete model, component
 *
 * @summary demonstrates the lifecycle (create, update, get, decommission, delete) of a component
 */

import { DefaultAzureCredential } from "@azure/identity";
import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { v4 } from "uuid";
import { inspect } from "util";

// For the purpose of this example we will create temporary digital twin using random Ids.
// We have to make sure these model Ids are unique within the DT instance so we use generated UUIDs.
async function main() {
  const modelId = `dtmi:model_${v4().split("-").join("")};1`;
  const componentId = `dtmi:component_${v4().split("-").join("")};1`;
  const digitalTwinId = `digitalTwin-${v4()}`;

  const temporaryComponent = {
    "@id": componentId,
    "@type": "Interface",
    "@context": "dtmi:dtdl:context;2",
    displayName: "Component1",
    contents: [
      {
        "@type": "Property",
        name: "ComponentProp1",
        schema: "string",
      },
    ],
  };

  const temporaryModel = {
    "@id": modelId,
    "@type": "Interface",
    "@context": "dtmi:dtdl:context;2",
    displayName: "TempModel",
    contents: [
      {
        "@type": "Property",
        name: "Prop1",
        schema: "double",
      },
      {
        "@type": "Component",
        name: "Component1",
        schema: componentId,
      },
    ],
  };

  const temporaryTwin = {
    $dtId: digitalTwinId,
    $metadata: {
      $model: modelId,
    },
    Prop1: 42,
    Component1: {
      $metadata: {},
      ComponentProp1: "value1",
    },
  };

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

  // Create models
  const newModels = [temporaryComponent, temporaryModel];
  const models = await serviceClient.createModels(newModels);
  console.log(`Created Models:`);
  console.log(inspect(models));

  // Create digital twin
  const createdTwin = await serviceClient.upsertDigitalTwin(
    digitalTwinId,
    JSON.stringify(temporaryTwin)
  );
  console.log(`Created Digital Twin:`);
  console.log(inspect(createdTwin));

  // Update component
  const componentPath = "Component1";
  const patch = {
    op: "replace",
    path: "/ComponentProp1",
    value: "value2",
  };
  const updateComponentResponse = await serviceClient.updateComponent(
    digitalTwinId,
    componentPath,
    [patch]
  );
  console.log(`Update Component response:`);
  console.log(inspect(updateComponentResponse));

  // Get component
  const getComponent = await serviceClient.getComponent(digitalTwinId, componentPath);
  console.log(`Get Component:`);
  console.log(inspect(getComponent));

  // Delete digital twin
  const deleteDigitalTwinResponse = await serviceClient.deleteDigitalTwin(digitalTwinId);
  console.log(`Delete response:`);
  console.log(inspect(deleteDigitalTwinResponse));

  // Decommission models
  let decomissionModelResponse = await serviceClient.decomissionModel(modelId);
  console.log(`Decomission Model response:`);
  console.log(inspect(decomissionModelResponse));
  decomissionModelResponse = await serviceClient.decomissionModel(componentId);
  console.log(`Decomission Component Model response:`);
  console.log(inspect(decomissionModelResponse));

  // Delete models
  let deleteModelResponse = await serviceClient.deleteModel(modelId);
  console.log(`Delete Model response:`);
  console.log(inspect(deleteModelResponse));

  deleteModelResponse = await serviceClient.deleteModel(componentId);
  console.log(`Delete Component Model response:`);
  console.log(inspect(deleteModelResponse));
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
