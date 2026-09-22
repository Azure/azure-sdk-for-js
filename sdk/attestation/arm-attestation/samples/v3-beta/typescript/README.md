# @azure/arm-attestation client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-attestation in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [attestationProvidersCreateSample.ts][attestationproviderscreatesample]                             | creates or updates an Attestation Provider. x-ms-original-file: 2021-06-01/Create_AttestationProvider.json                                                                              |
| [attestationProvidersDeleteSample.ts][attestationprovidersdeletesample]                             | delete Attestation Service. x-ms-original-file: 2021-06-01/Delete_AttestationProvider.json                                                                                              |
| [attestationProvidersGetDefaultByLocationSample.ts][attestationprovidersgetdefaultbylocationsample] | get the default provider by location. x-ms-original-file: 2021-06-01/Get_DefaultProviderByLocation.json                                                                                 |
| [attestationProvidersGetSample.ts][attestationprovidersgetsample]                                   | get the status of Attestation Provider. x-ms-original-file: 2021-06-01/Get_AttestationProvider.json                                                                                     |
| [attestationProvidersListByResourceGroupSample.ts][attestationproviderslistbyresourcegroupsample]   | returns attestation providers list in a resource group. x-ms-original-file: 2021-06-01/Get_AttestationProvidersListByResourceGroup.json                                                 |
| [attestationProvidersListDefaultSample.ts][attestationproviderslistdefaultsample]                   | get the default provider x-ms-original-file: 2021-06-01/Get_DefaultProviders.json                                                                                                       |
| [attestationProvidersListSample.ts][attestationproviderslistsample]                                 | returns a list of attestation providers in a subscription. x-ms-original-file: 2021-06-01/Get_AttestationProvidersList.json                                                             |
| [attestationProvidersUpdateSample.ts][attestationprovidersupdatesample]                             | updates the Attestation Provider. x-ms-original-file: 2021-06-01/Update_AttestationProvider.json                                                                                        |
| [operationsListSample.ts][operationslistsample]                                                     | list the operations for the provider x-ms-original-file: 2021-06-01/Operations_List.json                                                                                                |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]                 | update the state of specified private endpoint connection associated with the attestation provider. x-ms-original-file: 2021-06-01/AttestationProviderPutPrivateEndpointConnection.json |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                 | deletes the specified private endpoint connection associated with the attestation provider. x-ms-original-file: 2021-06-01/AttestationProviderDeletePrivateEndpointConnection.json      |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                       | gets the specified private endpoint connection associated with the attestation provider. x-ms-original-file: 2021-06-01/AttestationProviderGetPrivateEndpointConnection.json            |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                     | list all the private endpoint connections associated with the attestation provider. x-ms-original-file: 2021-06-01/AttestationProviderListPrivateEndpointConnections.json               |
| [privateLinkResourcesListByProviderSample.ts][privatelinkresourceslistbyprovidersample]             | gets the private link resources supported for the attestation provider. x-ms-original-file: 2021-06-01/AttestationProviderListPrivateLinkResources.json                                 |

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
node dist/attestationProvidersCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/attestationProvidersCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[attestationproviderscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/attestationProvidersCreateSample.ts
[attestationprovidersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/attestationProvidersDeleteSample.ts
[attestationprovidersgetdefaultbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/attestationProvidersGetDefaultByLocationSample.ts
[attestationprovidersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/attestationProvidersGetSample.ts
[attestationproviderslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/attestationProvidersListByResourceGroupSample.ts
[attestationproviderslistdefaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/attestationProvidersListDefaultSample.ts
[attestationproviderslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/attestationProvidersListSample.ts
[attestationprovidersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/attestationProvidersUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourceslistbyprovidersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/arm-attestation/samples/v3-beta/typescript/src/privateLinkResourcesListByProviderSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-attestation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/attestation/arm-attestation/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
