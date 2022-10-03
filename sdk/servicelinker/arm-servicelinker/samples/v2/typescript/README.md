# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                                                                                                |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [linkerCreateOrUpdateSample.ts][linkercreateorupdatesample]         | Create or update linker resource. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/PutLink.json                             |
| [linkerDeleteSample.ts][linkerdeletesample]                         | Delete a link. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/DeleteLink.json                                             |
| [linkerGetSample.ts][linkergetsample]                               | Returns Linker resource for a given name. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/Link.json                        |
| [linkerListConfigurationsSample.ts][linkerlistconfigurationssample] | list source configurations for a linker. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/GetConfigurations.json            |
| [linkerListSample.ts][linkerlistsample]                             | Returns list of Linkers which connects to the resource. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/LinkList.json      |
| [linkerUpdateSample.ts][linkerupdatesample]                         | Operation to update an existing link. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/PatchLink.json                       |
| [linkerValidateSample.ts][linkervalidatesample]                     | Validate a link. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/ValidateLinkSuccess.json                                  |
| [operationsListSample.ts][operationslistsample]                     | Lists the available ServiceLinker REST API operations. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/OperationsList.json |

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
node dist/linkerCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/linkerCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[linkercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v2/typescript/src/linkerCreateOrUpdateSample.ts
[linkerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v2/typescript/src/linkerDeleteSample.ts
[linkergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v2/typescript/src/linkerGetSample.ts
[linkerlistconfigurationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v2/typescript/src/linkerListConfigurationsSample.ts
[linkerlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v2/typescript/src/linkerListSample.ts
[linkerupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v2/typescript/src/linkerUpdateSample.ts
[linkervalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v2/typescript/src/linkerValidateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v2/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-servicelinker?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicelinker/arm-servicelinker/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
