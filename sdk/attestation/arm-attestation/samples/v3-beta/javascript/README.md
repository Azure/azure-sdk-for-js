# @azure/arm-attestation client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-attestation in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [attestationProvidersCreateSample.js][attestationproviderscreatesample]                             | creates or updates an Attestation Provider. x-ms-original-file: 2021-06-01/Create_AttestationProvider.json                                                                              |
| [attestationProvidersDeleteSample.js][attestationprovidersdeletesample]                             | delete Attestation Service. x-ms-original-file: 2021-06-01/Delete_AttestationProvider.json                                                                                              |
| [attestationProvidersGetDefaultByLocationSample.js][attestationprovidersgetdefaultbylocationsample] | get the default provider by location. x-ms-original-file: 2021-06-01/Get_DefaultProviderByLocation.json                                                                                 |
| [attestationProvidersGetSample.js][attestationprovidersgetsample]                                   | get the status of Attestation Provider. x-ms-original-file: 2021-06-01/Get_AttestationProvider.json                                                                                     |
| [attestationProvidersListByResourceGroupSample.js][attestationproviderslistbyresourcegroupsample]   | returns attestation providers list in a resource group. x-ms-original-file: 2021-06-01/Get_AttestationProvidersListByResourceGroup.json                                                 |
| [attestationProvidersListDefaultSample.js][attestationproviderslistdefaultsample]                   | get the default provider x-ms-original-file: 2021-06-01/Get_DefaultProviders.json                                                                                                       |
| [attestationProvidersListSample.js][attestationproviderslistsample]                                 | returns a list of attestation providers in a subscription. x-ms-original-file: 2021-06-01/Get_AttestationProvidersList.json                                                             |
| [attestationProvidersUpdateSample.js][attestationprovidersupdatesample]                             | updates the Attestation Provider. x-ms-original-file: 2021-06-01/Update_AttestationProvider.json                                                                                        |
| [operationsListSample.js][operationslistsample]                                                     | list the operations for the provider x-ms-original-file: 2021-06-01/Operations_List.json                                                                                                |
| [privateEndpointConnectionsCreateSample.js][privateendpointconnectionscreatesample]                 | update the state of specified private endpoint connection associated with the attestation provider. x-ms-original-file: 2021-06-01/AttestationProviderPutPrivateEndpointConnection.json |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                 | deletes the specified private endpoint connection associated with the attestation provider. x-ms-original-file: 2021-06-01/AttestationProviderDeletePrivateEndpointConnection.json      |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                       | gets the specified private endpoint connection associated with the attestation provider. x-ms-original-file: 2021-06-01/AttestationProviderGetPrivateEndpointConnection.json            |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]                     | list all the private endpoint connections associated with the attestation provider. x-ms-original-file: 2021-06-01/AttestationProviderListPrivateEndpointConnections.json               |
| [privateLinkResourcesListByProviderSample.js][privatelinkresourceslistbyprovidersample]             | gets the private link resources supported for the attestation provider. x-ms-original-file: 2021-06-01/AttestationProviderListPrivateLinkResources.json                                 |

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
node attestationProvidersCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node attestationProvidersCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[attestationproviderscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/attestationProvidersCreateSample.js
[attestationprovidersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/attestationProvidersDeleteSample.js
[attestationprovidersgetdefaultbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/attestationProvidersGetDefaultByLocationSample.js
[attestationprovidersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/attestationProvidersGetSample.js
[attestationproviderslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/attestationProvidersListByResourceGroupSample.js
[attestationproviderslistdefaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/attestationProvidersListDefaultSample.js
[attestationproviderslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/attestationProvidersListSample.js
[attestationprovidersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/attestationProvidersUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/operationsListSample.js
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/privateEndpointConnectionsCreateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/privateEndpointConnectionsListSample.js
[privatelinkresourceslistbyprovidersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/javascript/privateLinkResourcesListByProviderSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-attestation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/attestation/arm-attestation/README.md
