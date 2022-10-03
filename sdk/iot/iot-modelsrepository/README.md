# Azure IoT Models Repository client library for JavaScript

This package contains an isomorphic Client Library for Azure IoT Models Repository in JavaScript. Use the Azure IoT Models Repository library for JavaScript to pull DTDL files from remote endpoints.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iot/iot-modelsrepository)
- [Package (npm)](https://www.npmjs.com/package/@azure/iot-modelsrepository/)
- Samples

## Getting started

## Key concepts

The Azure IoT Models Repository library for JavaScript provides functionality for working with the [Azure IoT PlugAndPlay Models Repository](https://devicemodels.azure.com/). It does not provide full CRUD operations, simply the ability to get models from the Models Repository or any other URL endpoints. It does not require any authentication.

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### How to Install

The preferred way to install the Azure IoT Models Repository client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```
npm install @azure/iot-modelsrepository
```

## Examples

### Initializing the Models Repository Client

```ts
// When no URI is provided for instantiation, the Azure IoT Models Repository global endpoint
// https://devicemodels.azure.com/ is used and the model dependency resolution
// configuration is set to TryFromExpanded.
const { ModelsRepositoryClient } = require("@azure/iot-modelsrepository");

const client = new ModelsRepositoryClient();
console.log(`Initialized client point to global endpoint: ${client.repositoryLocation}`);
```

```ts
// The client will also work with a local filesystem URI. This example shows initalization
// with a local URI and disabling model dependency resolution.
const client = new ModelsRepositoryClient({
  repositoryLocation: "file:///path/to/repository/",
  dependencyResolution: "disabled",
});
console.log(`Initialized client pointing to local path: ${client.repositoryLocation}`);
```

### Publish Models

Publishing models to the models repository requires [exercising](https://docs.microsoft.com/azure/iot-pnp/concepts-model-repository#publish-a-model) common GitHub workflows.

### Get Models

After publishing, your model(s) will be available for consumption from the global repository endpoint. The following snippet shows how to retrieve the corresponding JSON-LD content.

```ts
// Global endpoint client
const client = new ModelsRepositoryClient();

// The output of getModels() will include at least the definition for the target dtmi.
// If the model dependency resolution configuration is not disabled, then models in which the
// target dtmi depends on will also be included in the returned object (mapping dtmis to model objects).
const dtmi = "dtmi:com:example:TemperatureController;1";
const models = await client.getModels(dtmi, { dependencyResolution: "tryFromExpanded" });

// In this case the above dtmi has 2 model dependencies.
// dtmi:com:example:Thermostat;1 and dtmi:azure:DeviceManagement:DeviceInformation;1
console.log(`${dtmi} resolved in ${Object.keys(models).length} interfaces.`);
```

GitHub pull-request workflows are a core aspect of the IoT Models Repository service. To submit models, the user is expected to fork and clone the global [models repository project](https://github.com/Azure/iot-plugandplay-models) then iterate against the local copy. Changes would then be pushed to the fork (ideally in a new branch) and a PR created against the global repository.

To support this workflow and similar use cases, the client supports initialization with a local file-system URI. You can use this for example, to test and ensure newly added models to the locally cloned models repository are in their proper locations.

```ts
// Local sample repository client
const client = new ModelsRepositoryClient(`file:///path/to/repository/`);

// The output of getModels() will include at least the definition for the target dtmi.
// If the model dependency resolution configuration is not disabled, then models in which the
// target dtmi depends on will also be included in the returned IDictionary<string, string>.
const dtmi = "dtmi:com:example:TemperatureController;1";
const models = await client.getModels(dtmi);

// In this case the above dtmi has 2 model dependencies.
// dtmi:com:example:Thermostat;1 and dtmi:azure:DeviceManagement:DeviceInformation;1
console.log(`${dtmi} resolved in ${models.keys().length} interfaces.`);
```

You are also able to get definitions for multiple root models at a time by leveraging the `GetModels` overload.

```ts
// Global endpoint client
const client = new ModelsRepositoryClient();

const dtmis = [
  "dtmi:com:example:TemperatureController;1",
  "dtmi:com:example:azuresphere:sampledevice;1",
];
const models = await client.getModels(dtmis);

// In this case the dtmi "dtmi:com:example:TemperatureController;1" has 2 model dependencies
// and the dtmi "dtmi:com:example:azuresphere:sampledevice;1" has no additional dependencies.
// The returned IDictionary will include 4 models.
console.log(`${dtmis.toString()} resolved in ${models.keys().length} interfaces.`);
```

### Digital Twins Model Parser Integration

_When the Digital Twins Model Parser is completed, we will update you with information on how to integrate this client._

### DtmiConventions utility functions

The IoT Models Repository applies a set of conventions for organizing digital twin models. This package exposes two auxiliary functions related to `DtmiConventions`, `getModelUri` and `isValidDtmi`. These same functions are used throughout the client.

```ts
// This snippet shows how to validate a given DTMI string is well-formed.

// Returns true
isValidDtmi("dtmi:com:example:Thermostat;1");

// Returns false
isValidDtmi("dtmi:com:example:Thermostat");
```

```ts
// This snippet shows obtaining a fully qualified path to a model file.

// Local repository example
const localRepositoryUri: string = "file:///path/to/repository/";
const fullyQualifiedModelPath: string = getModelUri(
  "dtmi:com:example:Thermostat;1",
  localRepositoryUri
);

// Prints '/path/to/repository/dtmi/com/example/thermostat-1.json'
console.log(fullyQualifiedModelPath);

// Remote repository example
const remoteRepositoryUri: string = "https://contoso.com/models/";
const fullyQualifiedModelPath: string = GetModelUri(
  "dtmi:com:example:Thermostat;1",
  remoteRepositoryUri
);

// Prints 'https://contoso.com/models/dtmi/com/example/thermostat-1.json'
console.log(fullyQualifiedModelPath);
```

---

## Troubleshooting

- If you run into an error, first make sure the model you are access exists at the location you are attempting to get it from.

## Next steps

- Review the [DTDL Spec](https://docs.microsoft.com/azure/iot-pnp/concepts-model-parser).
- Understand the [Device Models Repository](https://devicemodels.azure.com/).
- Code a IoT Plug and Play 'Device' using the [Azure IoT SDK for Node](https://github.com/Azure/azure-iot-sdk-node/tree/master/device/samples#plug-and-play-examples).

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
