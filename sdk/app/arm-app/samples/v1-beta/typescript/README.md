# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [certificatesCreateOrUpdateSample.ts][certificatescreateorupdatesample]                                       | Create or Update a Certificate. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Certificate_CreateOrUpdate.json                                               |
| [certificatesDeleteSample.ts][certificatesdeletesample]                                                       | Deletes the specified Certificate. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Certificate_Delete.json                                                    |
| [certificatesGetSample.ts][certificatesgetsample]                                                             | Get the specified Certificate. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Certificate_Get.json                                                           |
| [certificatesListSample.ts][certificateslistsample]                                                           | Get the Certificates in a given managed environment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Certificates_ListByManagedEnvironment.json               |
| [certificatesUpdateSample.ts][certificatesupdatesample]                                                       | Patches a certificate. Currently only patching of tags is supported x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Certificates_Patch.json                   |
| [containerAppsAuthConfigsCreateOrUpdateSample.ts][containerappsauthconfigscreateorupdatesample]               | Description for Create or update the AuthConfig for a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/AuthConfigs_CreateOrUpdate.json          |
| [containerAppsAuthConfigsDeleteSample.ts][containerappsauthconfigsdeletesample]                               | Description for Delete a Container App AuthConfig. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/AuthConfigs_Delete.json                                    |
| [containerAppsAuthConfigsGetSample.ts][containerappsauthconfigsgetsample]                                     | Get a AuthConfig of a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/AuthConfigs_Get.json                                                     |
| [containerAppsAuthConfigsListByContainerAppSample.ts][containerappsauthconfigslistbycontainerappsample]       | Get the Container App AuthConfigs in a given resource group. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/AuthConfigs_ListByContainer.json                 |
| [containerAppsCreateOrUpdateSample.ts][containerappscreateorupdatesample]                                     | Description for Create or update a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_CreateOrUpdate.json                           |
| [containerAppsDeleteSample.ts][containerappsdeletesample]                                                     | Description for Delete a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_Delete.json                                             |
| [containerAppsGetSample.ts][containerappsgetsample]                                                           | Get the properties of a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_Get.json                                                 |
| [containerAppsListByResourceGroupSample.ts][containerappslistbyresourcegroupsample]                           | Get the Container Apps in a given resource group. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_ListByResourceGroup.json                      |
| [containerAppsListBySubscriptionSample.ts][containerappslistbysubscriptionsample]                             | Get the Container Apps in a given subscription. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_ListBySubscription.json                         |
| [containerAppsListCustomHostNameAnalysisSample.ts][containerappslistcustomhostnameanalysissample]             | Analyzes a custom hostname for a Container App x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_ListCustomHostNameAnalysis.json                  |
| [containerAppsListSecretsSample.ts][containerappslistsecretssample]                                           | List secrets for a container app x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_ListSecrets.json                                               |
| [containerAppsRevisionReplicasGetReplicaSample.ts][containerappsrevisionreplicasgetreplicasample]             | Get a replica for a Container App Revision. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Replicas_Get.json                                                 |
| [containerAppsRevisionReplicasListReplicasSample.ts][containerappsrevisionreplicaslistreplicassample]         | List replicas for a Container App Revision. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Replicas_List.json                                                |
| [containerAppsRevisionsActivateRevisionSample.ts][containerappsrevisionsactivaterevisionsample]               | Activates a revision for a Container App x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Revisions_Activate.json                                              |
| [containerAppsRevisionsDeactivateRevisionSample.ts][containerappsrevisionsdeactivaterevisionsample]           | Deactivates a revision for a Container App x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Revisions_Deactivate.json                                          |
| [containerAppsRevisionsGetRevisionSample.ts][containerappsrevisionsgetrevisionsample]                         | Get a revision of a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Revisions_Get.json                                                         |
| [containerAppsRevisionsListRevisionsSample.ts][containerappsrevisionslistrevisionssample]                     | Get the Revisions for a given Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Revisions_List.json                                              |
| [containerAppsRevisionsRestartRevisionSample.ts][containerappsrevisionsrestartrevisionsample]                 | Restarts a revision for a Container App x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Revisions_Restart.json                                                |
| [containerAppsSourceControlsCreateOrUpdateSample.ts][containerappssourcecontrolscreateorupdatesample]         | Description for Create or update the SourceControl for a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/SourceControls_CreateOrUpdate.json    |
| [containerAppsSourceControlsDeleteSample.ts][containerappssourcecontrolsdeletesample]                         | Description for Delete a Container App SourceControl. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/SourceControls_Delete.json                              |
| [containerAppsSourceControlsGetSample.ts][containerappssourcecontrolsgetsample]                               | Get a SourceControl of a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/SourceControls_Get.json                                               |
| [containerAppsSourceControlsListByContainerAppSample.ts][containerappssourcecontrolslistbycontainerappsample] | Get the Container App SourceControls in a given resource group. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/SourceControls_ListByContainer.json           |
| [containerAppsUpdateSample.ts][containerappsupdatesample]                                                     | Patches a Container App. Currently only patching of tags is supported x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_Patch.json                |
| [daprComponentsCreateOrUpdateSample.ts][daprcomponentscreateorupdatesample]                                   | Creates or updates a Dapr Component in a Managed Environment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/DaprComponents_CreateOrUpdate.json              |
| [daprComponentsDeleteSample.ts][daprcomponentsdeletesample]                                                   | Delete a Dapr Component from a Managed Environment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/DaprComponents_Delete.json                                |
| [daprComponentsGetSample.ts][daprcomponentsgetsample]                                                         | Get a dapr component. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/DaprComponents_Get.json                                                                 |
| [daprComponentsListSample.ts][daprcomponentslistsample]                                                       | Get the Dapr Components for a managed environment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/DaprComponents_List.json                                   |
| [managedEnvironmentsCreateOrUpdateSample.ts][managedenvironmentscreateorupdatesample]                         | Creates or updates a Managed Environment used to host container apps. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_CreateOrUpdate.json |
| [managedEnvironmentsDeleteSample.ts][managedenvironmentsdeletesample]                                         | Delete a Managed Environment if it does not have any container apps. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_Delete.json          |
| [managedEnvironmentsGetSample.ts][managedenvironmentsgetsample]                                               | Get the properties of a Managed Environment used to host container apps. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_Get.json         |
| [managedEnvironmentsListByResourceGroupSample.ts][managedenvironmentslistbyresourcegroupsample]               | Get all the Managed Environments in a resource group. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_ListByResourceGroup.json            |
| [managedEnvironmentsListBySubscriptionSample.ts][managedenvironmentslistbysubscriptionsample]                 | Get all Managed Environments for a subscription. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_ListBySubscription.json                  |
| [managedEnvironmentsStoragesCreateOrUpdateSample.ts][managedenvironmentsstoragescreateorupdatesample]         | Create or update storage for a managedEnvironment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironmentsStorages_CreateOrUpdate.json            |
| [managedEnvironmentsStoragesDeleteSample.ts][managedenvironmentsstoragesdeletesample]                         | Delete storage for a managedEnvironment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironmentsStorages_Delete.json                              |
| [managedEnvironmentsStoragesGetSample.ts][managedenvironmentsstoragesgetsample]                               | Get storage for a managedEnvironment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironmentsStorages_Get.json                                    |
| [managedEnvironmentsStoragesListSample.ts][managedenvironmentsstorageslistsample]                             | Get all storages for a managedEnvironment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironmentsStorages_List.json                              |
| [managedEnvironmentsUpdateSample.ts][managedenvironmentsupdatesample]                                         | Patches a Managed Environment. Only patching of tags is supported currently x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_Patch.json    |
| [operationsListSample.ts][operationslistsample]                                                               | Lists all of the available RP operations. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Operations_List.json                                                |

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
node dist/certificatesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/certificatesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[certificatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/certificatesCreateOrUpdateSample.ts
[certificatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/certificatesDeleteSample.ts
[certificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/certificatesGetSample.ts
[certificateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/certificatesListSample.ts
[certificatesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/certificatesUpdateSample.ts
[containerappsauthconfigscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsAuthConfigsCreateOrUpdateSample.ts
[containerappsauthconfigsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsAuthConfigsDeleteSample.ts
[containerappsauthconfigsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsAuthConfigsGetSample.ts
[containerappsauthconfigslistbycontainerappsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsAuthConfigsListByContainerAppSample.ts
[containerappscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsCreateOrUpdateSample.ts
[containerappsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsDeleteSample.ts
[containerappsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsGetSample.ts
[containerappslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsListByResourceGroupSample.ts
[containerappslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsListBySubscriptionSample.ts
[containerappslistcustomhostnameanalysissample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsListCustomHostNameAnalysisSample.ts
[containerappslistsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsListSecretsSample.ts
[containerappsrevisionreplicasgetreplicasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsRevisionReplicasGetReplicaSample.ts
[containerappsrevisionreplicaslistreplicassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsRevisionReplicasListReplicasSample.ts
[containerappsrevisionsactivaterevisionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsRevisionsActivateRevisionSample.ts
[containerappsrevisionsdeactivaterevisionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsRevisionsDeactivateRevisionSample.ts
[containerappsrevisionsgetrevisionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsRevisionsGetRevisionSample.ts
[containerappsrevisionslistrevisionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsRevisionsListRevisionsSample.ts
[containerappsrevisionsrestartrevisionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsRevisionsRestartRevisionSample.ts
[containerappssourcecontrolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsSourceControlsCreateOrUpdateSample.ts
[containerappssourcecontrolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsSourceControlsDeleteSample.ts
[containerappssourcecontrolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsSourceControlsGetSample.ts
[containerappssourcecontrolslistbycontainerappsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsSourceControlsListByContainerAppSample.ts
[containerappsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/containerAppsUpdateSample.ts
[daprcomponentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/daprComponentsCreateOrUpdateSample.ts
[daprcomponentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/daprComponentsDeleteSample.ts
[daprcomponentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/daprComponentsGetSample.ts
[daprcomponentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/daprComponentsListSample.ts
[managedenvironmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/managedEnvironmentsCreateOrUpdateSample.ts
[managedenvironmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/managedEnvironmentsDeleteSample.ts
[managedenvironmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/managedEnvironmentsGetSample.ts
[managedenvironmentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/managedEnvironmentsListByResourceGroupSample.ts
[managedenvironmentslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/managedEnvironmentsListBySubscriptionSample.ts
[managedenvironmentsstoragescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/managedEnvironmentsStoragesCreateOrUpdateSample.ts
[managedenvironmentsstoragesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/managedEnvironmentsStoragesDeleteSample.ts
[managedenvironmentsstoragesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/managedEnvironmentsStoragesGetSample.ts
[managedenvironmentsstorageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/managedEnvironmentsStoragesListSample.ts
[managedenvironmentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/managedEnvironmentsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-app?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/app/arm-app/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
