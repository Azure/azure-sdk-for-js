// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * This sample illustrates the lifecycle of a model using a scenario that shows how to:
 * - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
 * - create two models, one model and one component model
 * - get created models by modelIds one by one
 * - list all models by listing them using the paginated API
 * - decommission the created models
 * - delete the created models
 *
 * @summary demonstrates the lifecycle (create, get, list, decommission, delete) of a model
 */

import { DefaultAzureCredential } from "@azure/identity";
import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { inspect } from "util";
import { v4 } from "uuid";

// For the purpose of this example we will create temporary model and a temporary component model using random Ids.
// We have to make sure these model Ids are unique within the DT instance so we use generated UUIDs.
async function main() {
  const modelId = `dtmi:model_${v4().split("-").join("")};1`;
  const componentId = `dtmi:component_${v4().split("-").join("")};1`;

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
      {
        "@type": "Telemetry",
        name: "ComponentTelemetry1",
        schema: "integer",
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
        schema: "string",
      },
      {
        "@type": "Component",
        name: "Component1",
        schema: componentId,
      },
      {
        "@type": "Telemetry",
        name: "Telemetry1",
        schema: "integer",
      },
    ],
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

  // Get created model
  const getComponentModel = await serviceClient.getModel(componentId);
  console.log(`Get Component Models:`);
  console.log(inspect(getComponentModel));

  const getModel = await serviceClient.getModel(modelId);
  console.log(`Get Models:`);
  console.log(inspect(getModel));

  // List all models
  const listedModels = serviceClient.listModels();
  for await (const model of listedModels) {
    console.log(`Model:`);
    console.log(inspect(model));
  }

  // Decommission models
  let response = await serviceClient.decomissionModel(modelId);
  console.log(`Decomission Model response:`);
  console.log(inspect(response));

  response = await serviceClient.decomissionModel(componentId);
  console.log(`Decomission Component Model response:`);
  console.log(inspect(response));

  // Delete models
  response = await serviceClient.deleteModel(modelId);
  console.log(`Delete Model response:`);
  console.log(inspect(response));

  response = await serviceClient.deleteModel(componentId);
  console.log(`Delete Component Model response:`);
  console.log(inspect(response));
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
