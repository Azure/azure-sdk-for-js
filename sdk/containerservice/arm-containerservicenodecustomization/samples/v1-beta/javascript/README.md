# @azure/arm-containerservicenodecustomization client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-containerservicenodecustomization in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [nodeCustomizationsCreateOrUpdateSample.js][nodecustomizationscreateorupdatesample]           | create or update a node customization resource. This will create a new version. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_CreateOrUpdate.json                                 |
| [nodeCustomizationsDeleteSample.js][nodecustomizationsdeletesample]                           | delete a node customization. This operation will be blocked if the resource is in use. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Delete.json                                  |
| [nodeCustomizationsDeleteVersionSample.js][nodecustomizationsdeleteversionsample]             | delete a node customization version. This operation will be blocked if the node customization version is in use. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_DeleteVersion.json |
| [nodeCustomizationsGetSample.js][nodecustomizationsgetsample]                                 | get a node customization at the latest version. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Get.json                                                                            |
| [nodeCustomizationsGetVersionSample.js][nodecustomizationsgetversionsample]                   | get a node customization at a particular version. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_GetVersion.json                                                                   |
| [nodeCustomizationsListByResourceGroupSample.js][nodecustomizationslistbyresourcegroupsample] | list the node customizations in a resource group at the latest version. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListByResourceGroup.json                                    |
| [nodeCustomizationsListBySubscriptionSample.js][nodecustomizationslistbysubscriptionsample]   | list the node customizations in a subscription at the latest version. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListBySubscription.json                                       |
| [nodeCustomizationsListVersionsSample.js][nodecustomizationslistversionssample]               | list all versions of a node customization. x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListVersions.json                                                                        |
| [nodeCustomizationsUpdateSample.js][nodecustomizationsupdatesample]                           | update a NodeCustomization x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Update.json                                                                                              |
| [operationsListSample.js][operationslistsample]                                               | list the operations for the provider x-ms-original-file: 2025-09-02-preview/Operations_List.json                                                                                              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node nodeCustomizationsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node nodeCustomizationsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[nodecustomizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/javascript/nodeCustomizationsCreateOrUpdateSample.js
[nodecustomizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/javascript/nodeCustomizationsDeleteSample.js
[nodecustomizationsdeleteversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/javascript/nodeCustomizationsDeleteVersionSample.js
[nodecustomizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/javascript/nodeCustomizationsGetSample.js
[nodecustomizationsgetversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/javascript/nodeCustomizationsGetVersionSample.js
[nodecustomizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/javascript/nodeCustomizationsListByResourceGroupSample.js
[nodecustomizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/javascript/nodeCustomizationsListBySubscriptionSample.js
[nodecustomizationslistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/javascript/nodeCustomizationsListVersionsSample.js
[nodecustomizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/javascript/nodeCustomizationsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicenodecustomization/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerservicenodecustomization?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicenodecustomization/README.md
