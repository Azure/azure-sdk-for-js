# @azure/arm-lambdatesthyperexecute client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-lambdatesthyperexecute in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                            |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.js][operationslistsample]                                     | list the operations for the provider x-ms-original-file: 2024-02-01/Operations_List_MaximumSet_Gen.json                                    |
| [organizationsCreateOrUpdateSample.js][organizationscreateorupdatesample]           | create a OrganizationResource x-ms-original-file: 2024-02-01/Organizations_CreateOrUpdate_MaximumSet_Gen.json                              |
| [organizationsDeleteSample.js][organizationsdeletesample]                           | delete a OrganizationResource x-ms-original-file: 2024-02-01/Organizations_Delete_MaximumSet_Gen.json                                      |
| [organizationsGetSample.js][organizationsgetsample]                                 | get a OrganizationResource x-ms-original-file: 2024-02-01/Organizations_Get_MaximumSet_Gen.json                                            |
| [organizationsListByResourceGroupSample.js][organizationslistbyresourcegroupsample] | list OrganizationResource resources by resource group x-ms-original-file: 2024-02-01/Organizations_ListByResourceGroup_MaximumSet_Gen.json |
| [organizationsListBySubscriptionSample.js][organizationslistbysubscriptionsample]   | list OrganizationResource resources by subscription ID x-ms-original-file: 2024-02-01/Organizations_ListBySubscription_MaximumSet_Gen.json |
| [organizationsUpdateSample.js][organizationsupdatesample]                           | update a OrganizationResource x-ms-original-file: 2024-02-01/Organizations_Update_MaximumSet_Gen.json                                      |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/javascript/operationsListSample.js
[organizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/javascript/organizationsCreateOrUpdateSample.js
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/javascript/organizationsDeleteSample.js
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/javascript/organizationsGetSample.js
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/javascript/organizationsListByResourceGroupSample.js
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/javascript/organizationsListBySubscriptionSample.js
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/javascript/organizationsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-lambdatesthyperexecute?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/README.md
