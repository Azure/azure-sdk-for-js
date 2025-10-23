# @azure/arm-weightsandbiases client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-weightsandbiases in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                    |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [instancesCreateOrUpdateSample.js][instancescreateorupdatesample]           | create a InstanceResource x-ms-original-file: 2024-09-18/Instances_CreateOrUpdate_MaximumSet_Gen.json                              |
| [instancesDeleteSample.js][instancesdeletesample]                           | delete a InstanceResource x-ms-original-file: 2024-09-18/Instances_Delete_MaximumSet_Gen.json                                      |
| [instancesGetSample.js][instancesgetsample]                                 | get a InstanceResource x-ms-original-file: 2024-09-18/Instances_Get_MaximumSet_Gen.json                                            |
| [instancesListByResourceGroupSample.js][instanceslistbyresourcegroupsample] | list InstanceResource resources by resource group x-ms-original-file: 2024-09-18/Instances_ListByResourceGroup_MaximumSet_Gen.json |
| [instancesListBySubscriptionSample.js][instanceslistbysubscriptionsample]   | list InstanceResource resources by subscription ID x-ms-original-file: 2024-09-18/Instances_ListBySubscription_MaximumSet_Gen.json |
| [instancesUpdateSample.js][instancesupdatesample]                           | update a InstanceResource x-ms-original-file: 2024-09-18/Instances_Update_MaximumSet_Gen.json                                      |
| [operationsListSample.js][operationslistsample]                             | list the operations for the provider x-ms-original-file: 2024-09-18/Operations_List_MaximumSet_Gen.json                            |

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
node instancesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node instancesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[instancescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/liftrweightsandbiases/arm-weightsandbiases/samples/v1/javascript/instancesCreateOrUpdateSample.js
[instancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/liftrweightsandbiases/arm-weightsandbiases/samples/v1/javascript/instancesDeleteSample.js
[instancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/liftrweightsandbiases/arm-weightsandbiases/samples/v1/javascript/instancesGetSample.js
[instanceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/liftrweightsandbiases/arm-weightsandbiases/samples/v1/javascript/instancesListByResourceGroupSample.js
[instanceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/liftrweightsandbiases/arm-weightsandbiases/samples/v1/javascript/instancesListBySubscriptionSample.js
[instancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/liftrweightsandbiases/arm-weightsandbiases/samples/v1/javascript/instancesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/liftrweightsandbiases/arm-weightsandbiases/samples/v1/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-weightsandbiases?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/liftrweightsandbiases/arm-weightsandbiases/README.md
