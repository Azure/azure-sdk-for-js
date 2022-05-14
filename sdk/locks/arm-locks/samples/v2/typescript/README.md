# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [authorizationOperationsListSample.ts][authorizationoperationslistsample]                                             | Lists all of the available Microsoft.Authorization REST API operations. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ListProviderOperations.json                                                                                                                                                                                                                                                              |
| [managementLocksCreateOrUpdateAtResourceGroupLevelSample.ts][managementlockscreateorupdateatresourcegrouplevelsample] | When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_CreateOrUpdateAtResourceGroupLevel.json |
| [managementLocksCreateOrUpdateAtResourceLevelSample.ts][managementlockscreateorupdateatresourcelevelsample]           | When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_CreateOrUpdateAtResourceLevel.json      |
| [managementLocksCreateOrUpdateAtSubscriptionLevelSample.ts][managementlockscreateorupdateatsubscriptionlevelsample]   | When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_CreateOrUpdateAtSubscriptionLevel.json  |
| [managementLocksCreateOrUpdateByScopeSample.ts][managementlockscreateorupdatebyscopesample]                           | Create or update a management lock by scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_CreateOrUpdateAtScope.json                                                                                                                                                                                                                                                                          |
| [managementLocksDeleteAtResourceGroupLevelSample.ts][managementlocksdeleteatresourcegrouplevelsample]                 | To delete management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_DeleteAtResourceGroupLevel.json                                                                                             |
| [managementLocksDeleteAtResourceLevelSample.ts][managementlocksdeleteatresourcelevelsample]                           | To delete management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_DeleteAtResourceLevel.json                                                                                                  |
| [managementLocksDeleteAtSubscriptionLevelSample.ts][managementlocksdeleteatsubscriptionlevelsample]                   | To delete management locks, you must have access to Microsoft.Authorization/_ or Microsoft.Authorization/locks/_ actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_DeleteAtSubscriptionLevel.json                                                                                              |
| [managementLocksDeleteByScopeSample.ts][managementlocksdeletebyscopesample]                                           | Delete a management lock by scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_DeleteAtScope.json                                                                                                                                                                                                                                                                                            |
| [managementLocksGetAtResourceGroupLevelSample.ts][managementlocksgetatresourcegrouplevelsample]                       | Gets a management lock at the resource group level. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_GetAtResourceGroupLevel.json                                                                                                                                                                                                                                                                 |
| [managementLocksGetAtResourceLevelSample.ts][managementlocksgetatresourcelevelsample]                                 | Get the management lock of a resource or any level below resource. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_GetAtResourceLevel.json                                                                                                                                                                                                                                                       |
| [managementLocksGetAtSubscriptionLevelSample.ts][managementlocksgetatsubscriptionlevelsample]                         | Gets a management lock at the subscription level. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_GetAtSubscriptionLevel.json                                                                                                                                                                                                                                                                    |
| [managementLocksGetByScopeSample.ts][managementlocksgetbyscopesample]                                                 | Get a management lock by scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_GetAtScope.json                                                                                                                                                                                                                                                                                                  |
| [managementLocksListAtResourceGroupLevelSample.ts][managementlockslistatresourcegrouplevelsample]                     | Gets all the management locks for a resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_ListAtResourceGroupLevel.json                                                                                                                                                                                                                                                                |
| [managementLocksListAtResourceLevelSample.ts][managementlockslistatresourcelevelsample]                               | Gets all the management locks for a resource or any level below resource. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_ListAtResourceLevel.json                                                                                                                                                                                                                                               |
| [managementLocksListAtSubscriptionLevelSample.ts][managementlockslistatsubscriptionlevelsample]                       | Gets all the management locks for a subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_ListAtSubscriptionLevel.json                                                                                                                                                                                                                                                                   |
| [managementLocksListByScopeSample.ts][managementlockslistbyscopesample]                                               | Gets all the management locks for a scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_ListAtScope.json                                                                                                                                                                                                                                                                                      |

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
node dist/authorizationOperationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/authorizationOperationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[authorizationoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/authorizationOperationsListSample.ts
[managementlockscreateorupdateatresourcegrouplevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksCreateOrUpdateAtResourceGroupLevelSample.ts
[managementlockscreateorupdateatresourcelevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksCreateOrUpdateAtResourceLevelSample.ts
[managementlockscreateorupdateatsubscriptionlevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksCreateOrUpdateAtSubscriptionLevelSample.ts
[managementlockscreateorupdatebyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksCreateOrUpdateByScopeSample.ts
[managementlocksdeleteatresourcegrouplevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksDeleteAtResourceGroupLevelSample.ts
[managementlocksdeleteatresourcelevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksDeleteAtResourceLevelSample.ts
[managementlocksdeleteatsubscriptionlevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksDeleteAtSubscriptionLevelSample.ts
[managementlocksdeletebyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksDeleteByScopeSample.ts
[managementlocksgetatresourcegrouplevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksGetAtResourceGroupLevelSample.ts
[managementlocksgetatresourcelevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksGetAtResourceLevelSample.ts
[managementlocksgetatsubscriptionlevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksGetAtSubscriptionLevelSample.ts
[managementlocksgetbyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksGetByScopeSample.ts
[managementlockslistatresourcegrouplevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksListAtResourceGroupLevelSample.ts
[managementlockslistatresourcelevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksListAtResourceLevelSample.ts
[managementlockslistatsubscriptionlevelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksListAtSubscriptionLevelSample.ts
[managementlockslistbyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/locks/arm-locks/samples/v2/typescript/src/managementLocksListByScopeSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-locks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/locks/arm-locks/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
