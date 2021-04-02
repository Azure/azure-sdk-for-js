// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { v4 } = require("uuid");
const { inspect } = require("util");

// Scenario example of how to:
// - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
// - create model, component and twin
// - create digital twin based on the model
// - update component
// - get component
// - delete twin
// - decomission and delete model, component
//
// Preconditions:
// - Environment variables have to be set
// - DigitalTwins enabled device must exist on the ADT hub
//
// For the purpose of this example we will create temporary digital twin using random Ids.
// We have to make sure these model Ids are unique within the DT instance so we use generated UUIDs.
async function main() {
  const modelId = `model-${v4()}`;
  const componentId = `component-${v4()}`;
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
        schema: "string"
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
        schema: "double"
      },
      {
        "@type": "Component",
        name: "Component1",
        schema: componentId
      }
    ]
  };

  const temporaryTwin = {
    "@id": digitalTwinId,
    $metadata: {
      "@model": modelId
    },
    Prop1: 42,
    Component1: {
      $metadata: {},
      ComponentProp1: "value1"
    }
  };

  // - AZURE_DIGITALTWINS_URL: The tenant ID in Azure Active Directory
  const url = process.env.AZURE_DIGITALTWINS_URL;

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

  // Create digital twin
  const createdTwin = await serviceClient.upsertDigitalTwin(digitalTwinId, temporaryTwin, {
    enableUpdate: true
  });
  console.log(`Created Digital Twin:`);
  console.log(inspect(createdTwin));

  // Update component
  const componentPath = "Component1";
  const options = {
    patchDocument: {
      ComponentProp1: "value2"
    }
  };
  const response = await serviceClient.updateComponent(digitalTwinId, componentPath, options);
  console.log(`Update Component response:`);
  console.log(inspect(response));

  // Get component
  const getComponent = await serviceClient.getComponent(digitalTwinId, componentPath);
  console.log(`Get Component:`);
  console.log(inspect(getComponent));

  // Delete digital twin
  response = await serviceClient.deleteDigitalTwin(digitalTwinId);
  console.log(`Delete response:`);
  console.log(inspect(response));

  // Decomission models
  response = await serviceClient.decomissionModel(modelId);
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
