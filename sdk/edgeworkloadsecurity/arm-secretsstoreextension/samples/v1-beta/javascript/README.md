# @azure/arm-secretsstoreextension client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-secretsstoreextension in some common scenarios.

| **File Name**                                                                                                                 | **Description**                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureKeyVaultSecretProviderClassesCreateOrUpdateSample.js][azurekeyvaultsecretproviderclassescreateorupdatesample]           | creates, or updates, an AzureKeyVaultSecretProviderClass instance. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_CreateOrUpdate_MaximumSet_Gen.json                     |
| [azureKeyVaultSecretProviderClassesDeleteSample.js][azurekeyvaultsecretproviderclassesdeletesample]                           | deletes an AzureKeyVaultSecretProviderClass instance. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_Delete_MaximumSet_Gen.json                                          |
| [azureKeyVaultSecretProviderClassesGetSample.js][azurekeyvaultsecretproviderclassesgetsample]                                 | gets the properties of an AzureKeyVaultSecretProviderClass instance. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_Get_MaximumSet_Gen.json                              |
| [azureKeyVaultSecretProviderClassesListByResourceGroupSample.js][azurekeyvaultsecretproviderclasseslistbyresourcegroupsample] | lists the AzureKeyVaultSecretProviderClass instances within a resource group. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_ListByResourceGroup_MaximumSet_Gen.json     |
| [azureKeyVaultSecretProviderClassesListBySubscriptionSample.js][azurekeyvaultsecretproviderclasseslistbysubscriptionsample]   | lists the AzureKeyVaultSecretProviderClass instances within an Azure subscription. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_ListBySubscription_MaximumSet_Gen.json |
| [azureKeyVaultSecretProviderClassesUpdateSample.js][azurekeyvaultsecretproviderclassesupdatesample]                           | updates an AzureKeyVaultSecretProviderClass instance. x-ms-original-file: 2026-09-25-preview/AzureKeyVaultSecretProviderClasses_Update_MaximumSet_Gen.json                                          |
| [operationsListSample.js][operationslistsample]                                                                               | list the operations for the provider x-ms-original-file: 2026-09-25-preview/Operations_List_MaximumSet_Gen.json                                                                                     |
| [secretSyncsCreateOrUpdateSample.js][secretsyncscreateorupdatesample]                                                         | creates new or updates a SecretSync instance. x-ms-original-file: 2026-09-25-preview/SecretSyncs_CreateOrUpdate_MaximumSet_Gen.json                                                                 |
| [secretSyncsDeleteSample.js][secretsyncsdeletesample]                                                                         | deletes a SecretSync instance. x-ms-original-file: 2026-09-25-preview/SecretSyncs_Delete_MaximumSet_Gen.json                                                                                        |
| [secretSyncsGetSample.js][secretsyncsgetsample]                                                                               | gets the properties of a SecretSync instance. x-ms-original-file: 2026-09-25-preview/SecretSyncs_Get_MaximumSet_Gen.json                                                                            |
| [secretSyncsListByResourceGroupSample.js][secretsyncslistbyresourcegroupsample]                                               | lists the SecretSync instances within a resource group. x-ms-original-file: 2026-09-25-preview/SecretSyncs_ListByResourceGroup_MaximumSet_Gen.json                                                  |
| [secretSyncsListBySubscriptionSample.js][secretsyncslistbysubscriptionsample]                                                 | lists the SecretSync instances within an Azure subscription. x-ms-original-file: 2026-09-25-preview/SecretSyncs_ListBySubscription_MaximumSet_Gen.json                                              |
| [secretSyncsUpdateSample.js][secretsyncsupdatesample]                                                                         | updates a SecretSync instance. x-ms-original-file: 2026-09-25-preview/SecretSyncs_Update_MaximumSet_Gen.json                                                                                        |

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
node azureKeyVaultSecretProviderClassesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node azureKeyVaultSecretProviderClassesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azurekeyvaultsecretproviderclassescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/azureKeyVaultSecretProviderClassesCreateOrUpdateSample.js
[azurekeyvaultsecretproviderclassesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/azureKeyVaultSecretProviderClassesDeleteSample.js
[azurekeyvaultsecretproviderclassesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/azureKeyVaultSecretProviderClassesGetSample.js
[azurekeyvaultsecretproviderclasseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/azureKeyVaultSecretProviderClassesListByResourceGroupSample.js
[azurekeyvaultsecretproviderclasseslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/azureKeyVaultSecretProviderClassesListBySubscriptionSample.js
[azurekeyvaultsecretproviderclassesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/azureKeyVaultSecretProviderClassesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/operationsListSample.js
[secretsyncscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/secretSyncsCreateOrUpdateSample.js
[secretsyncsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/secretSyncsDeleteSample.js
[secretsyncsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/secretSyncsGetSample.js
[secretsyncslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/secretSyncsListByResourceGroupSample.js
[secretsyncslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/secretSyncsListBySubscriptionSample.js
[secretsyncsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/samples/v1-beta/javascript/secretSyncsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-secretsstoreextension?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/edgeworkloadsecurity/arm-secretsstoreextension/README.md
