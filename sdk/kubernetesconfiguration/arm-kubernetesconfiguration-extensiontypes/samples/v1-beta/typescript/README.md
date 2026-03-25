# @azure/arm-kubernetesconfiguration-extensiontypes client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-kubernetesconfiguration-extensiontypes in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                        |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [extensionTypesClusterGetVersionSample.ts][extensiontypesclustergetversionsample]             | get details of a version for an Extension Type installable to the cluster. x-ms-original-file: 2024-11-01-preview/GetExtensionTypeVersion.json         |
| [extensionTypesGetSample.ts][extensiontypesgetsample]                                         | get an Extension Type installable to the cluster based region and type for the cluster. x-ms-original-file: 2024-11-01-preview/GetExtensionType.json   |
| [extensionTypesGetVersionSample.ts][extensiontypesgetversionsample]                           | get details of a version for an extension type and location x-ms-original-file: 2024-11-01-preview/GetExtensionTypeVersionByLocation.json              |
| [extensionTypesListClusterListVersionsSample.ts][extensiontypeslistclusterlistversionssample] | list the version for an Extension Type installable to the cluster. x-ms-original-file: 2024-11-01-preview/ListExtensionTypeVersions.json               |
| [extensionTypesListLocationListSample.ts][extensiontypeslistlocationlistsample]               | list all Extension Types for the location. x-ms-original-file: 2024-11-01-preview/ListExtensionTypesByLocation.json                                    |
| [extensionTypesListSample.ts][extensiontypeslistsample]                                       | list installable Extension Types for the cluster based region and type for the cluster. x-ms-original-file: 2024-11-01-preview/ListExtensionTypes.json |
| [extensionTypesListVersionsSample.ts][extensiontypeslistversionssample]                       | list the versions for an extension type and location. x-ms-original-file: 2024-11-01-preview/ListExtensionTypeVersionsByLocation.json                  |
| [extensionTypesLocationGetSample.ts][extensiontypeslocationgetsample]                         | get an extension type for the location. x-ms-original-file: 2024-11-01-preview/GetExtensionTypeByLocation.json                                         |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/extensionTypesClusterGetVersionSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/extensionTypesClusterGetVersionSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[extensiontypesclustergetversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/typescript/src/extensionTypesClusterGetVersionSample.ts
[extensiontypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/typescript/src/extensionTypesGetSample.ts
[extensiontypesgetversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/typescript/src/extensionTypesGetVersionSample.ts
[extensiontypeslistclusterlistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/typescript/src/extensionTypesListClusterListVersionsSample.ts
[extensiontypeslistlocationlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/typescript/src/extensionTypesListLocationListSample.ts
[extensiontypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/typescript/src/extensionTypesListSample.ts
[extensiontypeslistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/typescript/src/extensionTypesListVersionsSample.ts
[extensiontypeslocationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/typescript/src/extensionTypesLocationGetSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-kubernetesconfiguration-extensiontypes?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
