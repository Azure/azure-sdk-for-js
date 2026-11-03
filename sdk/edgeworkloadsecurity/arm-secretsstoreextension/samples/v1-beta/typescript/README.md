# @azure/arm-secretsstoreextension client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-secretsstoreextension in some common scenarios.

| **File Name**                                                                                                                 | **Description**                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureKeyVaultSecretProviderClassesCreateOrUpdateSample.ts][azurekeyvaultsecretproviderclassescreateorupdatesample]           | creates, or updates, an AzureKeyVaultSecretProviderClass instance. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_CreateOrUpdate_MaximumSet_Gen.json                     |
| [azureKeyVaultSecretProviderClassesDeleteSample.ts][azurekeyvaultsecretproviderclassesdeletesample]                           | deletes an AzureKeyVaultSecretProviderClass instance. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_Delete_MaximumSet_Gen.json                                          |
| [azureKeyVaultSecretProviderClassesGetSample.ts][azurekeyvaultsecretproviderclassesgetsample]                                 | gets the properties of an AzureKeyVaultSecretProviderClass instance. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_Get_MaximumSet_Gen.json                              |
| [azureKeyVaultSecretProviderClassesListByResourceGroupSample.ts][azurekeyvaultsecretproviderclasseslistbyresourcegroupsample] | lists the AzureKeyVaultSecretProviderClass instances within a resource group. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_ListByResourceGroup_MaximumSet_Gen.json     |
| [azureKeyVaultSecretProviderClassesListBySubscriptionSample.ts][azurekeyvaultsecretproviderclasseslistbysubscriptionsample]   | lists the AzureKeyVaultSecretProviderClass instances within an Azure subscription. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_ListBySubscription_MaximumSet_Gen.json |
| [azureKeyVaultSecretProviderClassesUpdateSample.ts][azurekeyvaultsecretproviderclassesupdatesample]                           | updates an AzureKeyVaultSecretProviderClass instance. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_Update_MaximumSet_Gen.json                                          |
| [operationsListSample.ts][operationslistsample]                                                                               | list the operations for the provider x-ms-original-file: 2026-09-25-preview/Operations_List_MaximumSet_Gen.json                                                                                     |
| [secretSyncsCreateOrUpdateSample.ts][secretsyncscreateorupdatesample]                                                         | creates new or updates a SecretSync instance. x-ms-original-file: 2026-09-25-preview/SecretSyncs_CreateOrUpdate_MaximumSet_Gen.json                                                                 |
| [secretSyncsDeleteSample.ts][secretsyncsdeletesample]                                                                         | deletes a SecretSync instance. x-ms-original-file: 2026-09-25-preview/SecretSyncs_Delete_MaximumSet_Gen.json                                                                                        |
| [secretSyncsGetSample.ts][secretsyncsgetsample]                                                                               | gets the properties of a SecretSync instance. x-ms-original-file: 2026-09-25-preview/SecretSyncs_Get_MaximumSet_Gen.json                                                                            |
| [secretSyncsListByResourceGroupSample.ts][secretsyncslistbyresourcegroupsample]                                               | lists the SecretSync instances within a resource group. x-ms-original-file: 2026-09-25-preview/SecretSyncs_ListByResourceGroup_MaximumSet_Gen.json                                                  |
| [secretSyncsListBySubscriptionSample.ts][secretsyncslistbysubscriptionsample]                                                 | lists the SecretSync instances within an Azure subscription. x-ms-original-file: 2026-09-25-preview/SecretSyncs_ListBySubscription_MaximumSet_Gen.json                                              |
| [secretSyncsUpdateSample.ts][secretsyncsupdatesample]                                                                         | updates a SecretSync instance. x-ms-original-file: 2026-09-25-preview/SecretSyncs_Update_MaximumSet_Gen.json                                                                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node dist/azureKeyVaultSecretProviderClassesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/azureKeyVaultSecretProviderClassesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azurekeyvaultsecretproviderclassescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/azureKeyVaultSecretProviderClassesCreateOrUpdateSample.ts
[azurekeyvaultsecretproviderclassesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/azureKeyVaultSecretProviderClassesDeleteSample.ts
[azurekeyvaultsecretproviderclassesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/azureKeyVaultSecretProviderClassesGetSample.ts
[azurekeyvaultsecretproviderclasseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/azureKeyVaultSecretProviderClassesListByResourceGroupSample.ts
[azurekeyvaultsecretproviderclasseslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/azureKeyVaultSecretProviderClassesListBySubscriptionSample.ts
[azurekeyvaultsecretproviderclassesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/azureKeyVaultSecretProviderClassesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/operationsListSample.ts
[secretsyncscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/secretSyncsCreateOrUpdateSample.ts
[secretsyncsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/secretSyncsDeleteSample.ts
[secretsyncsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/secretSyncsGetSample.ts
[secretsyncslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/secretSyncsListByResourceGroupSample.ts
[secretsyncslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/secretSyncsListBySubscriptionSample.ts
[secretsyncsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/typescript/src/secretSyncsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-secretsstoreextension?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
