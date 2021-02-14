// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { v4 } = require("uuid");
const { inspect } = require("util");

// Scenario example of how to:
// - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
// - create two models, one model and one component model
// - get created models by modelIds one by one
// - list all models by listing them using the paginated API
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
  const modelId = `model-${v4()}`;
  const componentId = `component-${v4()}`;

  const temporaryComponent = {
    "@id": componentId,
    "@type": "Interface",
    "@context": "dtmi:dtdl:context;2",
    displayName: "Component1",
    contents: [
      {
        "@type": "Property",
        name: "ComponentProp1",
        schema: "string"
      },
      {
        "@type": "Telemetry",
        name: "ComponentTelemetry1",
        schema: "integer"
      }
    ]
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
        schema: "string"
      },
      {
        "@type": "Component",
        name: "Component1",
        schema: componentId
      },
      {
        "@type": "Telemetry",
        name: "Telemetry1",
        schema: "integer"
      }
    ]
  };

  // - AZURE_URL: The tenant ID in Azure Active Directory
  const url = process.env.AZURE_URL;

  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
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

  // Decomission models
  const response = await serviceClient.decomissionModel(modelId);
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
