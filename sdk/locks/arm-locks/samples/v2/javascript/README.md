# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [authorizationOperationsListSample.js][authorizationoperationslistsample]                                             | Lists all of the available Microsoft.Authorization REST API operations. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ListProviderOperations.json                                                                                                                                                                                                                                                              |
| [managementLocksCreateOrUpdateAtResourceGroupLevelSample.js][managementlockscreateorupdateatresourcegrouplevelsample] | When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_CreateOrUpdateAtResourceGroupLevel.json |
| [managementLocksCreateOrUpdateAtResourceLevelSample.js][managementlockscreateorupdateatresourcelevelsample]           | When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_CreateOrUpdateAtResourceLevel.json      |
| [managementLocksCreateOrUpdateAtSubscriptionLevelSample.js][managementlockscreateorupdateatsubscriptionlevelsample]   | When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_CreateOrUpdateAtSubscriptionLevel.json  |
| [managementLocksCreateOrUpdateByScopeSample.js][managementlockscreateorupdatebyscopesample]                           | Create or update a management lock by scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_CreateOrUpdateAtScope.json                                                                                                                                                                                                                                                                          |
| [managementLocksDeleteAtResourceGroupLevelSample.js][managementlocksdeleteatresourcegrouplevelsample]                 | To delete management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_DeleteAtResourceGroupLevel.json                                                                                             |
| [managementLocksDeleteAtResourceLevelSample.js][managementlocksdeleteatresourcelevelsample]                           | To delete management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_DeleteAtResourceLevel.json                                                                                                  |
| [managementLocksDeleteAtSubscriptionLevelSample.js][managementlocksdeleteatsubscriptionlevelsample]                   | To delete management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_DeleteAtSubscriptionLevel.json                                                                                              |
| [managementLocksDeleteByScopeSample.js][managementlocksdeletebyscopesample]                                           | Delete a management lock by scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_DeleteAtScope.json                                                                                                                                                                                                                                                                                            |
| [managementLocksGetAtResourceGroupLevelSample.js][managementlocksgetatresourcegrouplevelsample]                       | Gets a management lock at the resource group level. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_GetAtResourceGroupLevel.json                                                                                                                                                                                                                                                                 |
| [managementLocksGetAtResourceLevelSample.js][managementlocksgetatresourcelevelsample]                                 | Get the management lock of a resource or any level below resource. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_GetAtResourceLevel.json                                                                                                                                                                                                                                                       |
| [managementLocksGetAtSubscriptionLevelSample.js][managementlocksgetatsubscriptionlevelsample]                         | Gets a management lock at the subscription level. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_GetAtSubscriptionLevel.json                                                                                                                                                                                                                                                                    |
| [managementLocksGetByScopeSample.js][managementlocksgetbyscopesample]                                                 | Get a management lock by scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_GetAtScope.json                                                                                                                                                                                                                                                                                                  |
| [managementLocksListAtResourceGroupLevelSample.js][managementlockslistatresourcegrouplevelsample]                     | Gets all the management locks for a resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_ListAtResourceGroupLevel.json                                                                                                                                                                                                                                                                |
| [managementLocksListAtResourceLevelSample.js][managementlockslistatresourcelevelsample]                               | Gets all the management locks for a resource or any level below resource. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_ListAtResourceLevel.json                                                                                                                                                                                                                                               |
| [managementLocksListAtSubscriptionLevelSample.js][managementlockslistatsubscriptionlevelsample]                       | Gets all the management locks for a subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_ListAtSubscriptionLevel.json                                                                                                                                                                                                                                                                   |
| [managementLocksListByScopeSample.js][managementlockslistbyscopesample]                                               | Gets all the management locks for a scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_ListAtScope.json                                                                                                                                                                                                                                                                                      |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node authorizationOperationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node authorizationOperationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[authorizationoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/authorizationOperationsListSample.js
[managementlockscreateorupdateatresourcegrouplevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksCreateOrUpdateAtResourceGroupLevelSample.js
[managementlockscreateorupdateatresourcelevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksCreateOrUpdateAtResourceLevelSample.js
[managementlockscreateorupdateatsubscriptionlevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksCreateOrUpdateAtSubscriptionLevelSample.js
[managementlockscreateorupdatebyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksCreateOrUpdateByScopeSample.js
[managementlocksdeleteatresourcegrouplevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksDeleteAtResourceGroupLevelSample.js
[managementlocksdeleteatresourcelevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksDeleteAtResourceLevelSample.js
[managementlocksdeleteatsubscriptionlevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksDeleteAtSubscriptionLevelSample.js
[managementlocksdeletebyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksDeleteByScopeSample.js
[managementlocksgetatresourcegrouplevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksGetAtResourceGroupLevelSample.js
[managementlocksgetatresourcelevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksGetAtResourceLevelSample.js
[managementlocksgetatsubscriptionlevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksGetAtSubscriptionLevelSample.js
[managementlocksgetbyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksGetByScopeSample.js
[managementlockslistatresourcegrouplevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksListAtResourceGroupLevelSample.js
[managementlockslistatresourcelevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksListAtResourceLevelSample.js
[managementlockslistatsubscriptionlevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksListAtSubscriptionLevelSample.js
[managementlockslistbyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/javascript/managementLocksListByScopeSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-locks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/locks/arm-locks/README.md
