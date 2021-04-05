# Azure Azure Digital Twins Core client library for JavaScript

This package contains an isomorphic SDK for Azure Digital Twins API to provide access to the Azure Digital Twins service for managing twins, models, relationships, etc.

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher
- Browser JavaScript

### Prerequisites

- An [Azure Digital Twins instance](https://docs.microsoft.com/azure/digital-twins/how-to-set-up-instance-portal).

### Install the `@azure/digital-twins-core` package

Install the Digital Twins Core client library for JavaScript with `npm`:

```bash
npm install @azure/digital-twins-core
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

#### CORS

Azure Digital Twins doesn't currently support Cross-Origin Resource Sharing (CORS). As a result, this library cannot be used to make direct calls to the template service from a browser. Please refer to [this document](https://github.com/Azure/azure-sdk-for-js/blob/master/samples/cors/ts/README.md) for guidance.

## Key concepts

### Azure Digital Twins

Azure Digital Twins is an Azure IoT service that creates comprehensive models of the physical environment. It can create spatial intelligence graphs to model the relationships and interactions between people, spaces, and devices.
You can learn more about Azure Digital Twins by visiting [Azure Digital Twins Documentation](https://docs.microsoft.com/azure/digital-twins/)

### `DigitalTwinsClient`

`DigitalTwinsClient` is the client object that users of this library use to manage their Azure Digital Twins instance.

## Examples

### JavaScript example for authentication, client creation, and performing various operations on a Digital Twins instance

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

async function main() {
  const modelId = `dtmi:model_example;1`;
  const componentId = `dtmi:component_example;1`;
  const digitalTwinId = `digitalTwin-example`;

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
    $dtId: digitalTwinId,
    $metadata: {
      $model: modelId
    },
    Prop1: 42,
    Component1: {
      $metadata: {},
      ComponentProp1: "value1"
    }
  };

  const url = "<URL to Azure Digital Twins instance>";

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
    value: "value2"
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
```

### Additional Examples

Additional examples can be found in the
[samples directory](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/digitaltwins/digital-twins-core/samples).

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/digitaltwins/digital-twins-core/samples) directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
