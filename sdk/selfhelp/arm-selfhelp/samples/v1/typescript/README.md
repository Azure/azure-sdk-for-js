# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [diagnosticsCheckNameAvailabilitySample.ts][diagnosticschecknameavailabilitysample] | This API is used to check the uniqueness of a resource name used for a diagnostic check. x-ms-original-file: specification/help/resource-manager/Microsoft.Help/stable/2023-06-01/examples/CheckNameAvailabilityForDiagnosticWhenNameIsAvailable.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [diagnosticsCreateSample.ts][diagnosticscreatesample]                               | Diagnostics tells you precisely the root cause of the issue and how to address it. You can get diagnostics once you discover and identify the relevant solution for your Azure issue.<br/><br/> You can create diagnostics using the ‘solutionId’ from Solution Discovery API response and ‘additionalParameters’ <br/><br/> <b>Note: </b>‘requiredParameterSets’ from Solutions Discovery API response must be passed via ‘additionalParameters’ as an input to Diagnostics API x-ms-original-file: specification/help/resource-manager/Microsoft.Help/stable/2023-06-01/examples/CreateDiagnosticForKeyVaultResource.json                                                                                                                                                                               |
| [diagnosticsGetSample.ts][diagnosticsgetsample]                                     | Get the diagnostics using the 'diagnosticsResourceName' you chose while creating the diagnostic. x-ms-original-file: specification/help/resource-manager/Microsoft.Help/stable/2023-06-01/examples/GetDiagnosticForKeyVaultResource.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [discoverySolutionListSample.ts][discoverysolutionlistsample]                       | Solutions Discovery is the initial point of entry within Help API, which helps you identify the relevant solutions for your Azure issue.<br/><br/> You can discover solutions using resourceUri OR resourceUri + problemClassificationId.<br/><br/>We will do our best in returning relevant diagnostics for your Azure issue.<br/><br/> Get the problemClassificationId(s) using this [reference](https://learn.microsoft.com/rest/api/support/problem-classifications/list?tabs=HTTP).<br/><br/> <b>Note: </b> ‘requiredParameterSets’ from Solutions Discovery API response must be passed via ‘additionalParameters’ as an input to Diagnostics API. x-ms-original-file: specification/help/resource-manager/Microsoft.Help/stable/2023-06-01/examples/ListDiscoverySolutionsForKeyVaultResource.json |
| [operationsListSample.ts][operationslistsample]                                     | Returns list of operations. x-ms-original-file: specification/help/resource-manager/Microsoft.Help/stable/2023-06-01/examples/ListOperations.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

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
node dist/diagnosticsCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/diagnosticsCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[diagnosticschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/selfhelp/arm-selfhelp/samples/v1/typescript/src/diagnosticsCheckNameAvailabilitySample.ts
[diagnosticscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/selfhelp/arm-selfhelp/samples/v1/typescript/src/diagnosticsCreateSample.ts
[diagnosticsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/selfhelp/arm-selfhelp/samples/v1/typescript/src/diagnosticsGetSample.ts
[discoverysolutionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/selfhelp/arm-selfhelp/samples/v1/typescript/src/discoverySolutionListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/selfhelp/arm-selfhelp/samples/v1/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-selfhelp?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/selfhelp/arm-selfhelp/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
