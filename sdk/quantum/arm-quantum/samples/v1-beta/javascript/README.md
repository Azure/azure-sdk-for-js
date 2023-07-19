# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [offeringsListSample.js][offeringslistsample]                                   | Returns the list of all provider offerings available for the given location. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2022-01-10-preview/examples/offeringsList.json |
| [operationsListSample.js][operationslistsample]                                 | Returns list of operations. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2022-01-10-preview/examples/operations.json                                                     |
| [workspaceCheckNameAvailabilitySample.js][workspacechecknameavailabilitysample] | Check the availability of the resource name. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2022-01-10-preview/examples/quantumWorkspacesCheckNameAvailability.json        |
| [workspacesCreateOrUpdateSample.js][workspacescreateorupdatesample]             | Creates or updates a workspace resource. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2022-01-10-preview/examples/quantumWorkspacesPut.json                              |
| [workspacesDeleteSample.js][workspacesdeletesample]                             | Deletes a Workspace resource. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2022-01-10-preview/examples/quantumWorkspacesDelete.json                                      |
| [workspacesGetSample.js][workspacesgetsample]                                   | Returns the Workspace resource associated with the given name. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2022-01-10-preview/examples/quantumWorkspacesGet.json        |
| [workspacesListByResourceGroupSample.js][workspaceslistbyresourcegroupsample]   | Gets the list of Workspaces within a resource group. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2022-01-10-preview/examples/quantumWorkspacesListResourceGroup.json    |
| [workspacesListBySubscriptionSample.js][workspaceslistbysubscriptionsample]     | Gets the list of Workspaces within a Subscription. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2022-01-10-preview/examples/quantumWorkspacesListSubscription.json       |
| [workspacesUpdateTagsSample.js][workspacesupdatetagssample]                     | Updates an existing workspace's tags. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2022-01-10-preview/examples/quantumWorkspacesPatch.json                               |

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
node offeringsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env QUANTUM_SUBSCRIPTION_ID="<quantum subscription id>" node offeringsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[offeringslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/javascript/offeringsListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/javascript/operationsListSample.js
[workspacechecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/javascript/workspaceCheckNameAvailabilitySample.js
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/javascript/workspacesCreateOrUpdateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/javascript/workspacesDeleteSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/javascript/workspacesGetSample.js
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/javascript/workspacesListByResourceGroupSample.js
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/javascript/workspacesListBySubscriptionSample.js
[workspacesupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/javascript/workspacesUpdateTagsSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-quantum?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/quantum/arm-quantum/README.md
