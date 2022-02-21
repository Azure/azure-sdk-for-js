# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [activateContainerAppRevision.ts][activatecontainerapprevision]                                       | Activates a revision for a Container App x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Revisions_Activate.json                                              |
| [analyzeCustomHostname.ts][analyzecustomhostname]                                                     | Analyzes a custom hostname for a Container App x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_ListCustomHostNameAnalysis.json                  |
| [createEnvironments.ts][createenvironments]                                                           | Creates or updates a Managed Environment used to host container apps. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_CreateOrUpdate.json |
| [createOrUpdateCertificate.ts][createorupdatecertificate]                                             | Create or Update a Certificate. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Certificate_CreateOrUpdate.json                                               |
| [createOrUpdateContainerApp.ts][createorupdatecontainerapp]                                           | Description for Create or update a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_CreateOrUpdate.json                           |
| [createOrUpdateContainerAppAuthConfig.ts][createorupdatecontainerappauthconfig]                       | Description for Create or update the AuthConfig for a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/AuthConfigs_CreateOrUpdate.json          |
| [createOrUpdateContainerAppSourceControl.ts][createorupdatecontainerappsourcecontrol]                 | Description for Create or update the SourceControl for a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/SourceControls_CreateOrUpdate.json    |
| [createOrUpdateDaprComponent.ts][createorupdatedaprcomponent]                                         | Creates or updates a Dapr Component in a Managed Environment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/DaprComponents_CreateOrUpdate.json              |
| [createOrUpdateEnvironmentsStorage.ts][createorupdateenvironmentsstorage]                             | Create or update storage for a managedEnvironment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironmentsStorages_CreateOrUpdate.json            |
| [deactivateContainerAppRevision.ts][deactivatecontainerapprevision]                                   | Deactivates a revision for a Container App x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Revisions_Deactivate.json                                          |
| [deleteCertificate.ts][deletecertificate]                                                             | Deletes the specified Certificate. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Certificate_Delete.json                                                    |
| [deleteContainerApp.ts][deletecontainerapp]                                                           | Description for Delete a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_Delete.json                                             |
| [deleteContainerAppAuthConfig.ts][deletecontainerappauthconfig]                                       | Description for Delete a Container App AuthConfig. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/AuthConfigs_Delete.json                                    |
| [deleteContainerAppSourceControl.ts][deletecontainerappsourcecontrol]                                 | Description for Delete a Container App SourceControl. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/SourceControls_Delete.json                              |
| [deleteDaprComponent.ts][deletedaprcomponent]                                                         | Delete a Dapr Component from a Managed Environment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/DaprComponents_Delete.json                                |
| [deleteEnvironmentByName.ts][deleteenvironmentbyname]                                                 | Delete a Managed Environment if it does not have any container apps. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_Delete.json          |
| [getAEnvironmentsStoragePropertiesBySubscription.ts][getaenvironmentsstoragepropertiesbysubscription] | Get storage for a managedEnvironment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironmentsStorages_Get.json                                    |
| [getCertificate.ts][getcertificate]                                                                   | Get the specified Certificate. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Certificate_Get.json                                                           |
| [getContainerApp.ts][getcontainerapp]                                                                 | Get the properties of a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_Get.json                                                 |
| [getContainerAppAuthConfig.ts][getcontainerappauthconfig]                                             | Get a AuthConfig of a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/AuthConfigs_Get.json                                                     |
| [getContainerAppRevision.ts][getcontainerapprevision]                                                 | Get a revision of a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Revisions_Get.json                                                         |
| [getContainerAppRevisionReplica.ts][getcontainerapprevisionreplica]                                   | Get a replica for a Container App Revision. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Replicas_Get.json                                                 |
| [getContainerAppSourceControl.ts][getcontainerappsourcecontrol]                                       | Get a SourceControl of a Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/SourceControls_Get.json                                               |
| [getDaprComponent.ts][getdaprcomponent]                                                               | Get a dapr component. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/DaprComponents_Get.json                                                                 |
| [getEnvironmentsByName.ts][getenvironmentsbyname]                                                     | Get the properties of a Managed Environment used to host container apps. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_Get.json         |
| [listAllOperations.ts][listalloperations]                                                             | Lists all of the available RP operations. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Operations_List.json                                                |
| [listAppSourceControls.ts][listappsourcecontrols]                                                     | Get the Container App SourceControls in a given resource group. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/SourceControls_ListByContainer.json           |
| [listAuthConfigsByContainerApps.ts][listauthconfigsbycontainerapps]                                   | Get the Container App AuthConfigs in a given resource group. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/AuthConfigs_ListByContainer.json                 |
| [listCertificatesByManagedEnvironment.ts][listcertificatesbymanagedenvironment]                       | Get the Certificates in a given managed environment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Certificates_ListByManagedEnvironment.json               |
| [listContainerAppReplicas.ts][listcontainerappreplicas]                                               | List replicas for a Container App Revision. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Replicas_List.json                                                |
| [listContainerAppRevisions.ts][listcontainerapprevisions]                                             | Get the Revisions for a given Container App. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Revisions_List.json                                              |
| [listContainerAppsByResourceGroup.ts][listcontainerappsbyresourcegroup]                               | Get the Container Apps in a given resource group. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_ListByResourceGroup.json                      |
| [listContainerAppsBySubscription.ts][listcontainerappsbysubscription]                                 | Get the Container Apps in a given subscription. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_ListBySubscription.json                         |
| [listContainerAppsSecrets.ts][listcontainerappssecrets]                                               | List secrets for a container app x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_ListSecrets.json                                               |
| [listDaprComponents.ts][listdaprcomponents]                                                           | Get the Dapr Components for a managed environment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/DaprComponents_List.json                                   |
| [listEnvironmentsByResourceGroup.ts][listenvironmentsbyresourcegroup]                                 | Get all the Managed Environments in a resource group. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_ListByResourceGroup.json            |
| [listEnvironmentsBySubscription.ts][listenvironmentsbysubscription]                                   | Get all Managed Environments for a subscription. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_ListBySubscription.json                  |
| [listEnvironmentsStoragesBySubscription.ts][listenvironmentsstoragesbysubscription]                   | Delete storage for a managedEnvironment. x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironmentsStorages_Delete.json                              |
| [patchCertificate.ts][patchcertificate]                                                               | Patches a certificate. Currently only patching of tags is supported x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Certificates_Patch.json                   |
| [patchContainerApp.ts][patchcontainerapp]                                                             | Patches a Container App. Currently only patching of tags is supported x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ContainerApps_Patch.json                |
| [patchManagedEnvironment.ts][patchmanagedenvironment]                                                 | Patches a Managed Environment. Only patching of tags is supported currently x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/ManagedEnvironments_Patch.json    |
| [restartContainerAppRevision.ts][restartcontainerapprevision]                                         | Restarts a revision for a Container App x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2022-01-01-preview/examples/Revisions_Restart.json                                                |

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
node dist/activateContainerAppRevision.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/activateContainerAppRevision.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[activatecontainerapprevision]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/activateContainerAppRevision.ts
[analyzecustomhostname]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/analyzeCustomHostname.ts
[createenvironments]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/createEnvironments.ts
[createorupdatecertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/createOrUpdateCertificate.ts
[createorupdatecontainerapp]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/createOrUpdateContainerApp.ts
[createorupdatecontainerappauthconfig]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/createOrUpdateContainerAppAuthConfig.ts
[createorupdatecontainerappsourcecontrol]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/createOrUpdateContainerAppSourceControl.ts
[createorupdatedaprcomponent]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/createOrUpdateDaprComponent.ts
[createorupdateenvironmentsstorage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/createOrUpdateEnvironmentsStorage.ts
[deactivatecontainerapprevision]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/deactivateContainerAppRevision.ts
[deletecertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/deleteCertificate.ts
[deletecontainerapp]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/deleteContainerApp.ts
[deletecontainerappauthconfig]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/deleteContainerAppAuthConfig.ts
[deletecontainerappsourcecontrol]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/deleteContainerAppSourceControl.ts
[deletedaprcomponent]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/deleteDaprComponent.ts
[deleteenvironmentbyname]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/deleteEnvironmentByName.ts
[getaenvironmentsstoragepropertiesbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/getAEnvironmentsStoragePropertiesBySubscription.ts
[getcertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/getCertificate.ts
[getcontainerapp]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/getContainerApp.ts
[getcontainerappauthconfig]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/getContainerAppAuthConfig.ts
[getcontainerapprevision]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/getContainerAppRevision.ts
[getcontainerapprevisionreplica]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/getContainerAppRevisionReplica.ts
[getcontainerappsourcecontrol]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/getContainerAppSourceControl.ts
[getdaprcomponent]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/getDaprComponent.ts
[getenvironmentsbyname]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/getEnvironmentsByName.ts
[listalloperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listAllOperations.ts
[listappsourcecontrols]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listAppSourceControls.ts
[listauthconfigsbycontainerapps]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listAuthConfigsByContainerApps.ts
[listcertificatesbymanagedenvironment]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listCertificatesByManagedEnvironment.ts
[listcontainerappreplicas]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listContainerAppReplicas.ts
[listcontainerapprevisions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listContainerAppRevisions.ts
[listcontainerappsbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listContainerAppsByResourceGroup.ts
[listcontainerappsbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listContainerAppsBySubscription.ts
[listcontainerappssecrets]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listContainerAppsSecrets.ts
[listdaprcomponents]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listDaprComponents.ts
[listenvironmentsbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listEnvironmentsByResourceGroup.ts
[listenvironmentsbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listEnvironmentsBySubscription.ts
[listenvironmentsstoragesbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/listEnvironmentsStoragesBySubscription.ts
[patchcertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/patchCertificate.ts
[patchcontainerapp]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/patchContainerApp.ts
[patchmanagedenvironment]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/patchManagedEnvironment.ts
[restartcontainerapprevision]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/app/arm-app/samples/v1-beta/typescript/src/restartContainerAppRevision.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-app?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/app/arm-app/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
