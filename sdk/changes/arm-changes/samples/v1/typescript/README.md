# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                             | **Description**                                                                                                                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [changesGetSample.ts][changesgetsample]   | Obtains the specified change resource for the target resource x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2022-05-01/examples/GetChange.json                      |
| [changesListSample.ts][changeslistsample] | Obtains a list of change resources from the past 14 days for the target resource x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2022-05-01/examples/ListChanges.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/changesGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/changesGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[changesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/changes/arm-changes/samples/v1/typescript/src/changesGetSample.ts
[changeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/changes/arm-changes/samples/v1/typescript/src/changesListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-changes?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/changes/arm-changes/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
