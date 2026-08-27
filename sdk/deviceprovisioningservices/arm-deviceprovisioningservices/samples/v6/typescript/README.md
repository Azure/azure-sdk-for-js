# @azure/arm-deviceprovisioningservices client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-deviceprovisioningservices in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [dpsCertificateCreateOrUpdateSample.ts][dpscertificatecreateorupdatesample]                                                     | add new certificate or update an existing certificate. x-ms-original-file: 2026-08-31/DPSCertificateCreateOrUpdate.json                                                                                                                                                                                                  |
| [dpsCertificateDeleteSample.ts][dpscertificatedeletesample]                                                                     | deletes the specified certificate associated with the Provisioning Service x-ms-original-file: 2026-08-31/DPSDeleteCertificate.json                                                                                                                                                                                      |
| [dpsCertificateGenerateVerificationCodeSample.ts][dpscertificategenerateverificationcodesample]                                 | generate verification code for Proof of Possession. x-ms-original-file: 2026-08-31/DPSGenerateVerificationCode.json                                                                                                                                                                                                      |
| [dpsCertificateGetSample.ts][dpscertificategetsample]                                                                           | get the certificate from the provisioning service. x-ms-original-file: 2026-08-31/DPSGetCertificate.json                                                                                                                                                                                                                 |
| [dpsCertificateListSample.ts][dpscertificatelistsample]                                                                         | get all the certificates tied to the provisioning service. x-ms-original-file: 2026-08-31/DPSGetCertificates.json                                                                                                                                                                                                        |
| [dpsCertificateVerifyCertificateSample.ts][dpscertificateverifycertificatesample]                                               | verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate. x-ms-original-file: 2026-08-31/DPSVerifyCertificate.json                                                                                                                                  |
| [iotDpsResourceCheckProvisioningServiceNameAvailabilitySample.ts][iotdpsresourcecheckprovisioningservicenameavailabilitysample] | check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable x-ms-original-file: 2026-08-31/DPSCheckNameAvailability.json                                                                                                                          |
| [iotDpsResourceCreateOrUpdatePrivateEndpointConnectionSample.ts][iotdpsresourcecreateorupdateprivateendpointconnectionsample]   | create or update the status of a private endpoint connection with the specified name x-ms-original-file: 2026-08-31/DPSCreateOrUpdatePrivateEndpointConnection.json                                                                                                                                                      |
| [iotDpsResourceCreateOrUpdateSample.ts][iotdpsresourcecreateorupdatesample]                                                     | create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service. x-ms-original-file: 2026-08-31/DPSCreate.json |
| [iotDpsResourceDeletePrivateEndpointConnectionSample.ts][iotdpsresourcedeleteprivateendpointconnectionsample]                   | delete private endpoint connection with the specified name x-ms-original-file: 2026-08-31/DPSDeletePrivateEndpointConnection.json                                                                                                                                                                                        |
| [iotDpsResourceDeleteSample.ts][iotdpsresourcedeletesample]                                                                     | deletes the Provisioning Service. x-ms-original-file: 2026-08-31/DPSDelete.json                                                                                                                                                                                                                                          |
| [iotDpsResourceGetOperationResultSample.ts][iotdpsresourcegetoperationresultsample]                                             | gets the status of a long running operation, such as create, update or delete a provisioning service. x-ms-original-file: 2026-08-31/DPSGetOperationResult.json                                                                                                                                                          |
| [iotDpsResourceGetPrivateEndpointConnectionSample.ts][iotdpsresourcegetprivateendpointconnectionsample]                         | get private endpoint connection properties x-ms-original-file: 2026-08-31/DPSGetPrivateEndpointConnection.json                                                                                                                                                                                                           |
| [iotDpsResourceGetPrivateLinkResourcesSample.ts][iotdpsresourcegetprivatelinkresourcessample]                                   | get the specified private link resource for the given provisioning service x-ms-original-file: 2026-08-31/DPSGetPrivateLinkResources.json                                                                                                                                                                                |
| [iotDpsResourceGetSample.ts][iotdpsresourcegetsample]                                                                           | get the metadata of the provisioning service without SAS keys. x-ms-original-file: 2026-08-31/DPSGet.json                                                                                                                                                                                                                |
| [iotDpsResourceListByResourceGroupSample.ts][iotdpsresourcelistbyresourcegroupsample]                                           | get a list of all provisioning services in the given resource group. x-ms-original-file: 2026-08-31/DPSListByResourceGroup.json                                                                                                                                                                                          |
| [iotDpsResourceListBySubscriptionSample.ts][iotdpsresourcelistbysubscriptionsample]                                             | list all the provisioning services for a given subscription id. x-ms-original-file: 2026-08-31/DPSListBySubscription.json                                                                                                                                                                                                |
| [iotDpsResourceListKeysForKeyNameSample.ts][iotdpsresourcelistkeysforkeynamesample]                                             | list primary and secondary keys for a specific key name x-ms-original-file: 2026-08-31/DPSGetKey.json                                                                                                                                                                                                                    |
| [iotDpsResourceListKeysSample.ts][iotdpsresourcelistkeyssample]                                                                 | list the primary and secondary keys for a provisioning service. x-ms-original-file: 2026-08-31/DPSListKeys.json                                                                                                                                                                                                          |
| [iotDpsResourceListPrivateEndpointConnectionsSample.ts][iotdpsresourcelistprivateendpointconnectionssample]                     | list private endpoint connection properties x-ms-original-file: 2026-08-31/DPSListPrivateEndpointConnections.json                                                                                                                                                                                                        |
| [iotDpsResourceListPrivateLinkResourcesSample.ts][iotdpsresourcelistprivatelinkresourcessample]                                 | list private link resources for the given provisioning service x-ms-original-file: 2026-08-31/DPSListPrivateLinkResources.json                                                                                                                                                                                           |
| [iotDpsResourceListValidSkusSample.ts][iotdpsresourcelistvalidskussample]                                                       | gets the list of valid SKUs and tiers for a provisioning service. x-ms-original-file: 2026-08-31/DPSGetValidSku.json                                                                                                                                                                                                     |
| [iotDpsResourceUpdateSample.ts][iotdpsresourceupdatesample]                                                                     | update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method x-ms-original-file: 2026-08-31/DPSPatch.json                                                                                                                                                                        |
| [operationsListSample.ts][operationslistsample]                                                                                 | list the operations for the provider x-ms-original-file: 2026-08-31/DPSOperations.json                                                                                                                                                                                                                                   |

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
node dist/dpsCertificateCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/dpsCertificateCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dpscertificatecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/dpsCertificateCreateOrUpdateSample.ts
[dpscertificatedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/dpsCertificateDeleteSample.ts
[dpscertificategenerateverificationcodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/dpsCertificateGenerateVerificationCodeSample.ts
[dpscertificategetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/dpsCertificateGetSample.ts
[dpscertificatelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/dpsCertificateListSample.ts
[dpscertificateverifycertificatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/dpsCertificateVerifyCertificateSample.ts
[iotdpsresourcecheckprovisioningservicenameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceCheckProvisioningServiceNameAvailabilitySample.ts
[iotdpsresourcecreateorupdateprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceCreateOrUpdatePrivateEndpointConnectionSample.ts
[iotdpsresourcecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceCreateOrUpdateSample.ts
[iotdpsresourcedeleteprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceDeletePrivateEndpointConnectionSample.ts
[iotdpsresourcedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceDeleteSample.ts
[iotdpsresourcegetoperationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceGetOperationResultSample.ts
[iotdpsresourcegetprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceGetPrivateEndpointConnectionSample.ts
[iotdpsresourcegetprivatelinkresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceGetPrivateLinkResourcesSample.ts
[iotdpsresourcegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceGetSample.ts
[iotdpsresourcelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceListByResourceGroupSample.ts
[iotdpsresourcelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceListBySubscriptionSample.ts
[iotdpsresourcelistkeysforkeynamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceListKeysForKeyNameSample.ts
[iotdpsresourcelistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceListKeysSample.ts
[iotdpsresourcelistprivateendpointconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceListPrivateEndpointConnectionsSample.ts
[iotdpsresourcelistprivatelinkresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceListPrivateLinkResourcesSample.ts
[iotdpsresourcelistvalidskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceListValidSkusSample.ts
[iotdpsresourceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/iotDpsResourceUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v6/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-deviceprovisioningservices
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
