# @azure/arm-containerservicenodecustomization client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-containerservicenodecustomization in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [nodeCustomizationsCreateOrUpdateSample.ts][nodecustomizationscreateorupdatesample]           | create or update a node customization resource. This will create a new version. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_CreateOrUpdate.json                                 |
| [nodeCustomizationsDeleteSample.ts][nodecustomizationsdeletesample]                           | delete a node customization. This operation will be blocked if the resource is in use. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Delete.json                                  |
| [nodeCustomizationsDeleteVersionSample.ts][nodecustomizationsdeleteversionsample]             | delete a node customization version. This operation will be blocked if the node customization version is in use. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_DeleteVersion.json |
| [nodeCustomizationsGetSample.ts][nodecustomizationsgetsample]                                 | get a node customization at the latest version. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Get.json                                                                            |
| [nodeCustomizationsGetVersionSample.ts][nodecustomizationsgetversionsample]                   | get a node customization at a particular version. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_GetVersion.json                                                                   |
| [nodeCustomizationsListByResourceGroupSample.ts][nodecustomizationslistbyresourcegroupsample] | list the node customizations in a resource group at the latest version. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListByResourceGroup.json                                    |
| [nodeCustomizationsListBySubscriptionSample.ts][nodecustomizationslistbysubscriptionsample]   | list the node customizations in a subscription at the latest version. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListBySubscription.json                                       |
| [nodeCustomizationsListVersionsSample.ts][nodecustomizationslistversionssample]               | list all versions of a node customization. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListVersions.json                                                                        |
| [nodeCustomizationsUpdateSample.ts][nodecustomizationsupdatesample]                           | update a NodeCustomization x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Update.json                                                                                              |
| [operationsListSample.ts][operationslistsample]                                               | list the operations for the provider x-ms-original-file: 2025-09-02-preview/Operations_List.json                                                                                              |

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
node dist/nodeCustomizationsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/nodeCustomizationsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[nodecustomizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/typescript/src/nodeCustomizationsCreateOrUpdateSample.ts
[nodecustomizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/typescript/src/nodeCustomizationsDeleteSample.ts
[nodecustomizationsdeleteversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/typescript/src/nodeCustomizationsDeleteVersionSample.ts
[nodecustomizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/typescript/src/nodeCustomizationsGetSample.ts
[nodecustomizationsgetversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/typescript/src/nodeCustomizationsGetVersionSample.ts
[nodecustomizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/typescript/src/nodeCustomizationsListByResourceGroupSample.ts
[nodecustomizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/typescript/src/nodeCustomizationsListBySubscriptionSample.ts
[nodecustomizationslistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/typescript/src/nodeCustomizationsListVersionsSample.ts
[nodecustomizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/typescript/src/nodeCustomizationsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerservicenodecustomization?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicenodecustomization/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
