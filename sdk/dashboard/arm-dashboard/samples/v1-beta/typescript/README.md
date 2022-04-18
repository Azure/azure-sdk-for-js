# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [grafanaCreateSample.ts][grafanacreatesample]                           | Create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/preview/2021-09-01-preview/examples/Grafana_Create.json |
| [grafanaDeleteSample.ts][grafanadeletesample]                           | Delete a workspace for Grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/preview/2021-09-01-preview/examples/Grafana_Delete.json                                                                                                          |
| [grafanaGetSample.ts][grafanagetsample]                                 | Get the properties of a specific workspace for Grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/preview/2021-09-01-preview/examples/Grafana_Get.json                                                                                     |
| [grafanaListByResourceGroupSample.ts][grafanalistbyresourcegroupsample] | List all resources of workspaces for Grafana under the specified resource group. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/preview/2021-09-01-preview/examples/Grafana_ListByResourceGroup.json                                                     |
| [grafanaListSample.ts][grafanalistsample]                               | List all resources of workspaces for Grafana under the specified subscription. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/preview/2021-09-01-preview/examples/Grafana_List.json                                                                      |
| [grafanaUpdateSample.ts][grafanaupdatesample]                           | Update a workspace for Grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/preview/2021-09-01-preview/examples/Grafana_Update.json                                                                                                          |
| [operationsListSample.ts][operationslistsample]                         | List all available API operations provided by Microsoft.Dashboard. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/preview/2021-09-01-preview/examples/Operations_List.json                                                                               |

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
node dist/grafanaCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/grafanaCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[grafanacreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1-beta/typescript/src/grafanaCreateSample.ts
[grafanadeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1-beta/typescript/src/grafanaDeleteSample.ts
[grafanagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1-beta/typescript/src/grafanaGetSample.ts
[grafanalistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1-beta/typescript/src/grafanaListByResourceGroupSample.ts
[grafanalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1-beta/typescript/src/grafanaListSample.ts
[grafanaupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1-beta/typescript/src/grafanaUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-dashboard?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dashboard/arm-dashboard/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
