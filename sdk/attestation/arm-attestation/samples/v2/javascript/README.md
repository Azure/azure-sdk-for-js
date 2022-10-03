# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [attestationProvidersCreateSample.js][attestationproviderscreatesample]                             | Creates a new Attestation Provider. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Create_AttestationProvider.json                                                                                      |
| [attestationProvidersDeleteSample.js][attestationprovidersdeletesample]                             | Delete Attestation Service. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Delete_AttestationProvider.json                                                                                              |
| [attestationProvidersGetDefaultByLocationSample.js][attestationprovidersgetdefaultbylocationsample] | Get the default provider by location. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Get_DefaultProviderByLocation.json                                                                                 |
| [attestationProvidersGetSample.js][attestationprovidersgetsample]                                   | Get the status of Attestation Provider. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Get_AttestationProvider.json                                                                                     |
| [attestationProvidersListByResourceGroupSample.js][attestationproviderslistbyresourcegroupsample]   | Returns attestation providers list in a resource group. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Get_AttestationProvidersListByResourceGroup.json                                                 |
| [attestationProvidersListDefaultSample.js][attestationproviderslistdefaultsample]                   | Get the default provider x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Get_DefaultProviders.json                                                                                                       |
| [attestationProvidersListSample.js][attestationproviderslistsample]                                 | Returns a list of attestation providers in a subscription. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Get_AttestationProvidersList.json                                                             |
| [attestationProvidersUpdateSample.js][attestationprovidersupdatesample]                             | Updates the Attestation Provider. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Update_AttestationProvider.json                                                                                        |
| [operationsListSample.js][operationslistsample]                                                     | Lists all of the available Azure attestation operations. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Operations_List.json                                                                            |
| [privateEndpointConnectionsCreateSample.js][privateendpointconnectionscreatesample]                 | Update the state of specified private endpoint connection associated with the attestation provider. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/AttestationProviderPutPrivateEndpointConnection.json |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                 | Deletes the specified private endpoint connection associated with the attestation provider. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/AttestationProviderDeletePrivateEndpointConnection.json      |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                       | Gets the specified private endpoint connection associated with the attestation provider. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/AttestationProviderGetPrivateEndpointConnection.json            |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]                     | List all the private endpoint connections associated with the attestation provider. x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/AttestationProviderListPrivateEndpointConnections.json               |

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
node attestationProvidersCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node attestationProvidersCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[attestationproviderscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/attestationProvidersCreateSample.js
[attestationprovidersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/attestationProvidersDeleteSample.js
[attestationprovidersgetdefaultbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/attestationProvidersGetDefaultByLocationSample.js
[attestationprovidersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/attestationProvidersGetSample.js
[attestationproviderslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/attestationProvidersListByResourceGroupSample.js
[attestationproviderslistdefaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/attestationProvidersListDefaultSample.js
[attestationproviderslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/attestationProvidersListSample.js
[attestationprovidersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/attestationProvidersUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/operationsListSample.js
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/privateEndpointConnectionsCreateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v2/javascript/privateEndpointConnectionsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-attestation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/attestation/arm-attestation/README.md
