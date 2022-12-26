# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [roleAssignmentsCreateByIdSample.js][roleassignmentscreatebyidsample]                     | Creates a role assignment by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-04-01-preview/examples/PutRoleAssignmentById.json                         |
| [roleAssignmentsCreateSample.js][roleassignmentscreatesample]                             | Create a role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-04-01-preview/examples/PutRoleAssignment.json                                    |
| [roleAssignmentsDeleteByIdSample.js][roleassignmentsdeletebyidsample]                     | Delete a role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-04-01-preview/examples/DeleteRoleAssignmentById.json                             |
| [roleAssignmentsDeleteSample.js][roleassignmentsdeletesample]                             | Delete a role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-04-01-preview/examples/DeleteRoleAssignmentByName.json                           |
| [roleAssignmentsGetByIdSample.js][roleassignmentsgetbyidsample]                           | Gets a role assignment by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-04-01-preview/examples/GetRoleAssignmentById.json                            |
| [roleAssignmentsGetSample.js][roleassignmentsgetsample]                                   | Get the specified role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-04-01-preview/examples/GetRoleAssignmentByName.json                     |
| [roleAssignmentsListForResourceGroupSample.js][roleassignmentslistforresourcegroupsample] | List role assignments for a resource group. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-04-01-preview/examples/GetRoleAssignmentsForResourceGroup.json |
| [roleAssignmentsListForResourceSample.js][roleassignmentslistforresourcesample]           | List role assignments for a resource. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-04-01-preview/examples/GetRoleAssignmentsForResource.json            |
| [roleAssignmentsListForScopeSample.js][roleassignmentslistforscopesample]                 | Gets role assignments for a scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-04-01-preview/examples/GetRoleAssignmentByScope.json                    |
| [roleAssignmentsListSample.js][roleassignmentslistsample]                                 | Gets all role assignments for the subscription. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-04-01-preview/examples/GetAllRoleAssignments.json          |

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
node roleAssignmentsCreateByIdSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env AUTHORIZATION_SUBSCRIPTION_ID="<authorization subscription id>" node roleAssignmentsCreateByIdSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[roleassignmentscreatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/javascript/roleAssignmentsCreateByIdSample.js
[roleassignmentscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/javascript/roleAssignmentsCreateSample.js
[roleassignmentsdeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/javascript/roleAssignmentsDeleteByIdSample.js
[roleassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/javascript/roleAssignmentsDeleteSample.js
[roleassignmentsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/javascript/roleAssignmentsGetByIdSample.js
[roleassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/javascript/roleAssignmentsGetSample.js
[roleassignmentslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/javascript/roleAssignmentsListForResourceGroupSample.js
[roleassignmentslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/javascript/roleAssignmentsListForResourceSample.js
[roleassignmentslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/javascript/roleAssignmentsListForScopeSample.js
[roleassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/javascript/roleAssignmentsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-authorization?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/authorization/arm-authorization/README.md
