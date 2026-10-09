# @azure/arm-verifiedid client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-verifiedid in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                        |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [authoritiesCreateOrUpdateSample.js][authoritiescreateorupdatesample]           | create a Authority x-ms-original-file: 2024-01-26-preview/Authorities_CreateOrUpdate.json                              |
| [authoritiesDeleteSample.js][authoritiesdeletesample]                           | delete a Authority x-ms-original-file: 2024-01-26-preview/Authorities_Delete.json                                      |
| [authoritiesGetSample.js][authoritiesgetsample]                                 | get a Authority x-ms-original-file: 2024-01-26-preview/Authorities_Get.json                                            |
| [authoritiesListByResourceGroupSample.js][authoritieslistbyresourcegroupsample] | list Authority resources by resource group x-ms-original-file: 2024-01-26-preview/Authorities_ListByResourceGroup.json |
| [authoritiesListBySubscriptionSample.js][authoritieslistbysubscriptionsample]   | list Authority resources by subscription ID x-ms-original-file: 2024-01-26-preview/Authorities_ListBySubscription.json |
| [authoritiesUpdateSample.js][authoritiesupdatesample]                           | update a Authority x-ms-original-file: 2024-01-26-preview/Authorities_Update.json                                      |
| [operationsListSample.js][operationslistsample]                                 | list the operations for the provider x-ms-original-file: 2024-01-26-preview/Operations_List.json                       |

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
node authoritiesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node authoritiesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[authoritiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/verifiedid/arm-verifiedid/samples/v1-beta/javascript/authoritiesCreateOrUpdateSample.js
[authoritiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/verifiedid/arm-verifiedid/samples/v1-beta/javascript/authoritiesDeleteSample.js
[authoritiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/verifiedid/arm-verifiedid/samples/v1-beta/javascript/authoritiesGetSample.js
[authoritieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/verifiedid/arm-verifiedid/samples/v1-beta/javascript/authoritiesListByResourceGroupSample.js
[authoritieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/verifiedid/arm-verifiedid/samples/v1-beta/javascript/authoritiesListBySubscriptionSample.js
[authoritiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/verifiedid/arm-verifiedid/samples/v1-beta/javascript/authoritiesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/verifiedid/arm-verifiedid/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-verifiedid?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/verifiedid/arm-verifiedid/README.md
