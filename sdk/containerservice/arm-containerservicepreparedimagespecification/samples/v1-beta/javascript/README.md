# @azure/arm-containerservicepreparedimagespecification client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-containerservicepreparedimagespecification in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                                 | list the operations for the provider x-ms-original-file: 2026-02-02-preview/Operations_List.json                                                                                                                                                                                      |
| [preparedImageSpecificationsCreateOrUpdateSample.js][preparedimagespecificationscreateorupdatesample]           | create or update a prepared image specification resource with a client-provided version. Created versions are immutable; provide a different properties.version value to create a new version. x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_CreateOrUpdate.json |
| [preparedImageSpecificationsDeleteSample.js][preparedimagespecificationsdeletesample]                           | delete a prepared image specification. This operation will be blocked if the resource is in use. x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_Delete.json                                                                                                       |
| [preparedImageSpecificationsDeleteVersionSample.js][preparedimagespecificationsdeleteversionsample]             | delete a prepared image specification version. This operation will be blocked if the prepared image specification version is in use. x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_DeleteVersion.json                                                            |
| [preparedImageSpecificationsGetSample.js][preparedimagespecificationsgetsample]                                 | get a prepared image specification at the latest version. x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_Get.json                                                                                                                                                 |
| [preparedImageSpecificationsGetVersionSample.js][preparedimagespecificationsgetversionsample]                   | get a prepared image specification at a particular version. x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_GetVersion.json                                                                                                                                        |
| [preparedImageSpecificationsListByResourceGroupSample.js][preparedimagespecificationslistbyresourcegroupsample] | list the prepared image specifications in a resource group at the latest version. x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_ListByResourceGroup.json                                                                                                         |
| [preparedImageSpecificationsListBySubscriptionSample.js][preparedimagespecificationslistbysubscriptionsample]   | list the prepared image specifications in a subscription at the latest version. x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_ListBySubscription.json                                                                                                            |
| [preparedImageSpecificationsListVersionsSample.js][preparedimagespecificationslistversionssample]               | list all versions of a prepared image specification. x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_ListVersions.json                                                                                                                                             |
| [preparedImageSpecificationsUpdateSample.js][preparedimagespecificationsupdatesample]                           | update the tags of a prepared image specification. x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_Update.json                                                                                                                                                     |

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
node operationsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicepreparedimagespecification/samples/v1-beta/javascript/operationsListSample.js
[preparedimagespecificationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicepreparedimagespecification/samples/v1-beta/javascript/preparedImageSpecificationsCreateOrUpdateSample.js
[preparedimagespecificationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicepreparedimagespecification/samples/v1-beta/javascript/preparedImageSpecificationsDeleteSample.js
[preparedimagespecificationsdeleteversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicepreparedimagespecification/samples/v1-beta/javascript/preparedImageSpecificationsDeleteVersionSample.js
[preparedimagespecificationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicepreparedimagespecification/samples/v1-beta/javascript/preparedImageSpecificationsGetSample.js
[preparedimagespecificationsgetversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicepreparedimagespecification/samples/v1-beta/javascript/preparedImageSpecificationsGetVersionSample.js
[preparedimagespecificationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicepreparedimagespecification/samples/v1-beta/javascript/preparedImageSpecificationsListByResourceGroupSample.js
[preparedimagespecificationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicepreparedimagespecification/samples/v1-beta/javascript/preparedImageSpecificationsListBySubscriptionSample.js
[preparedimagespecificationslistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicepreparedimagespecification/samples/v1-beta/javascript/preparedImageSpecificationsListVersionsSample.js
[preparedimagespecificationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerservice/arm-containerservicepreparedimagespecification/samples/v1-beta/javascript/preparedImageSpecificationsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerservicepreparedimagespecification?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicepreparedimagespecification/README.md
