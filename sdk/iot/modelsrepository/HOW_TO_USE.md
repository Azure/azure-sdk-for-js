<!-- The following YAML bit is needed by the docs system to publish the samples online. Uncomment/Update it when the samples can be published publically -->

<!-- ---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-template
urlFragment: template-typescript
--- -->

# Azure IoT Models Repository Samples

The Azure IoT Models Repository enables builders to manage and share digital twin models for global consumption. The models are [JSON-LD](https://json-ld.org/) documents defined using the Digital Twins Definition Language [(DTDL)](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md).

For more info about the Azure IoT Models Repository checkout the [docs](https://docs.microsoft.com/azure/iot-pnp/concepts-model-repository).


| **File Name**                       | **Description** |
| ----------------------------------- | --------------- |
| modelResolutionSample.ts | sample model getting |
| dtmiConventionsSample.ts | sample using dtmi conventions helpers |

## Introduction

You can explore the models repository APIs with the client library using the samples project.

The samples project demonstrates the following:

- Instantiate the client
- Get models and their dependencies from either a remote endpoint or local repository.
- Integration with the Digital Twins Model Parser

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Initializing the Models Repository Client

```ts
// When no URI is provided for instantiation, the Azure IoT Models Repository global endpoint
// https://devicemodels.azure.com/ is used and the model dependency resolution
// configuration is set to TryFromExpanded.
const client = new ModelsRepositoryClient();
console.log(`Initialized client point to global endpoint: ${client.repositoryLocation}`);
```
```ts
// The client will also work with a local filesystem URI. This example shows initalization
// with a local URI and disabling model dependency resolution.
const client = new ModelsRepositoryClient({repositoryLocation: 'file:///path/to/repository/', dependencyResolution: 'disabled'});
console.log(`Initialized client pointing to local path: ${client.repositoryLocation}`);
```

## Override options

If you need to override pipeline behavior, such as provide your own HttpClient instance, you can do that via constructor that takes a ModelsRepositoryClientOptions parameter. It provides an opportunity to override default behavior including:

- Overriding [transport](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/core/Azure.Core/samples/Pipeline.md)
- Enabling [diagnostics](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/core/Azure.Core/samples/Pipeline.md)
- Controlling [retry strategy](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/core/Azure.Core/samples/Pipeline.md)

## Publish Models

Publishing models to the models repository requires [exercising](https://docs.microsoft.com/azure/iot-pnp/concepts-model-repository#publish-a-model) common GitHub workflows.

## Get Models

After publishing, your model(s) will be available for consumption from the global repository endpoint. The following snippet shows how to retrieve the corresponding JSON-LD content.

```ts
// Global endpoint client
const client = new ModelsRepositoryClient();

// The output of getModels() will include at least the definition for the target dtmi.
// If the model dependency resolution configuration is not disabled, then models in which the
// target dtmi depends on will also be included in the returned object (mapping dtmis to model objects).
const dtmi = "dtmi:com:example:TemperatureController;1";
const models = await client.getModels(dtmi, {dependencyResolution: 'tryFromExpanded'});

// In this case the above dtmi has 2 model dependencies.
// dtmi:com:example:Thermostat;1 and dtmi:azure:DeviceManagement:DeviceInformation;1
console.log(`${dtmi} resolved in ${models.keys().length} interfaces.`);
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

const dtmis = ["dtmi:com:example:TemperatureController;1", "dtmi:com:example:azuresphere:sampledevice;1"];
const models = await client.getModels(dtmis);

// In this case the dtmi "dtmi:com:example:TemperatureController;1" has 2 model dependencies
// and the dtmi "dtmi:com:example:azuresphere:sampledevice;1" has no additional dependencies.
// The returned IDictionary will include 4 models.
console.log(`${dtmis.toString()} resolved in ${models.keys().length} interfaces.`);
```

## Digital Twins Model Parser Integration

*When the Digital Twins Model Parser is completed, we will update you with information on how to integrate this client.*

## DtmiConventions utility functions

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
const fullyQualifiedModelPath: string =
    getModelUri("dtmi:com:example:Thermostat;1", localRepositoryUri);

// Prints '/path/to/repository/dtmi/com/example/thermostat-1.json'
console.log(fullyQualifiedModelPath);

// Remote repository example
const remoteRepositoryUri: string = "https://contoso.com/models/";
const fullyQualifiedModelPath: string =
    GetModelUri("dtmi:com:example:Thermostat;1", remoteRepositoryUri);

// Prints 'https://contoso.com/models/dtmi/com/example/thermostat-1.json'
console.log(fullyQualifiedModelPath);
```
