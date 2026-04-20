# @azure/arm-msi client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-msi in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [federatedIdentityCredentialsCreateOrUpdateSample.js][federatedidentitycredentialscreateorupdatesample] | create or update a federated identity credential under the specified user assigned identity. x-ms-original-file: 2025-05-31-preview/FederatedIdentityCredentialCreate.json |
| [federatedIdentityCredentialsDeleteSample.js][federatedidentitycredentialsdeletesample]                 | deletes the federated identity credential. x-ms-original-file: 2025-05-31-preview/FederatedIdentityCredentialDelete.json                                                   |
| [federatedIdentityCredentialsGetSample.js][federatedidentitycredentialsgetsample]                       | gets the federated identity credential. x-ms-original-file: 2025-05-31-preview/FederatedIdentityCredentialGet.json                                                         |
| [federatedIdentityCredentialsListSample.js][federatedidentitycredentialslistsample]                     | lists all the federated identity credentials under the specified user assigned identity. x-ms-original-file: 2025-05-31-preview/FederatedIdentityCredentialList.json       |
| [operationsListSample.js][operationslistsample]                                                         | list the operations for the provider x-ms-original-file: 2025-05-31-preview/MsiOperationsList.json                                                                         |
| [systemAssignedIdentitiesGetByScopeSample.js][systemassignedidentitiesgetbyscopesample]                 | gets the systemAssignedIdentity available under the specified RP scope. x-ms-original-file: 2025-05-31-preview/SystemAssignedIdentityGet.json                              |
| [userAssignedIdentitiesCreateOrUpdateSample.js][userassignedidentitiescreateorupdatesample]             | create or update an identity in the specified subscription and resource group. x-ms-original-file: 2025-05-31-preview/IdentityCreate.json                                  |
| [userAssignedIdentitiesDeleteSample.js][userassignedidentitiesdeletesample]                             | deletes the identity. x-ms-original-file: 2025-05-31-preview/IdentityDelete.json                                                                                           |
| [userAssignedIdentitiesGetSample.js][userassignedidentitiesgetsample]                                   | gets the identity. x-ms-original-file: 2025-05-31-preview/IdentityGet.json                                                                                                 |
| [userAssignedIdentitiesListByResourceGroupSample.js][userassignedidentitieslistbyresourcegroupsample]   | lists all the userAssignedIdentities available under the specified ResourceGroup. x-ms-original-file: 2025-05-31-preview/IdentityListByResourceGroup.json                  |
| [userAssignedIdentitiesListBySubscriptionSample.js][userassignedidentitieslistbysubscriptionsample]     | lists all the userAssignedIdentities available under the specified subscription. x-ms-original-file: 2025-05-31-preview/IdentityListBySubscription.json                    |
| [userAssignedIdentitiesUpdateSample.js][userassignedidentitiesupdatesample]                             | update an identity in the specified subscription and resource group. x-ms-original-file: 2025-05-31-preview/IdentityUpdate.json                                            |

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
node federatedIdentityCredentialsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node federatedIdentityCredentialsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[federatedidentitycredentialscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/federatedIdentityCredentialsCreateOrUpdateSample.js
[federatedidentitycredentialsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/federatedIdentityCredentialsDeleteSample.js
[federatedidentitycredentialsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/federatedIdentityCredentialsGetSample.js
[federatedidentitycredentialslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/federatedIdentityCredentialsListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/operationsListSample.js
[systemassignedidentitiesgetbyscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/systemAssignedIdentitiesGetByScopeSample.js
[userassignedidentitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/userAssignedIdentitiesCreateOrUpdateSample.js
[userassignedidentitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/userAssignedIdentitiesDeleteSample.js
[userassignedidentitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/userAssignedIdentitiesGetSample.js
[userassignedidentitieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/userAssignedIdentitiesListByResourceGroupSample.js
[userassignedidentitieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/userAssignedIdentitiesListBySubscriptionSample.js
[userassignedidentitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/msi/arm-msi/samples/v3-beta/javascript/userAssignedIdentitiesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-msi?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/msi/arm-msi/README.md
