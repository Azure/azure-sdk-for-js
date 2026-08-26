# @azure/arm-deviceprovisioningservices client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-deviceprovisioningservices in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [dpsCertificateCreateOrUpdateSample.js][dpscertificatecreateorupdatesample]                                                     | add new certificate or update an existing certificate. x-ms-original-file: 2026-08-31/DPSCertificateCreateOrUpdate.json                                                                                                                                                                                                  |
| [dpsCertificateDeleteSample.js][dpscertificatedeletesample]                                                                     | deletes the specified certificate associated with the Provisioning Service x-ms-original-file: 2026-08-31/DPSDeleteCertificate.json                                                                                                                                                                                      |
| [dpsCertificateGenerateVerificationCodeSample.js][dpscertificategenerateverificationcodesample]                                 | generate verification code for Proof of Possession. x-ms-original-file: 2026-08-31/DPSGenerateVerificationCode.json                                                                                                                                                                                                      |
| [dpsCertificateGetSample.js][dpscertificategetsample]                                                                           | get the certificate from the provisioning service. x-ms-original-file: 2026-08-31/DPSGetCertificate.json                                                                                                                                                                                                                 |
| [dpsCertificateListSample.js][dpscertificatelistsample]                                                                         | get all the certificates tied to the provisioning service. x-ms-original-file: 2026-08-31/DPSGetCertificates.json                                                                                                                                                                                                        |
| [dpsCertificateVerifyCertificateSample.js][dpscertificateverifycertificatesample]                                               | verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate. x-ms-original-file: 2026-08-31/DPSVerifyCertificate.json                                                                                                                                  |
| [iotDpsResourceCheckProvisioningServiceNameAvailabilitySample.js][iotdpsresourcecheckprovisioningservicenameavailabilitysample] | check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable x-ms-original-file: 2026-08-31/DPSCheckNameAvailability.json                                                                                                                          |
| [iotDpsResourceCreateOrUpdatePrivateEndpointConnectionSample.js][iotdpsresourcecreateorupdateprivateendpointconnectionsample]   | create or update the status of a private endpoint connection with the specified name x-ms-original-file: 2026-08-31/DPSCreateOrUpdatePrivateEndpointConnection.json                                                                                                                                                      |
| [iotDpsResourceCreateOrUpdateSample.js][iotdpsresourcecreateorupdatesample]                                                     | create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service. x-ms-original-file: 2026-08-31/DPSCreate.json |
| [iotDpsResourceDeletePrivateEndpointConnectionSample.js][iotdpsresourcedeleteprivateendpointconnectionsample]                   | delete private endpoint connection with the specified name x-ms-original-file: 2026-08-31/DPSDeletePrivateEndpointConnection.json                                                                                                                                                                                        |
| [iotDpsResourceDeleteSample.js][iotdpsresourcedeletesample]                                                                     | deletes the Provisioning Service. x-ms-original-file: 2026-08-31/DPSDelete.json                                                                                                                                                                                                                                          |
| [iotDpsResourceGetOperationResultSample.js][iotdpsresourcegetoperationresultsample]                                             | gets the status of a long running operation, such as create, update or delete a provisioning service. x-ms-original-file: 2026-08-31/DPSGetOperationResult.json                                                                                                                                                          |
| [iotDpsResourceGetPrivateEndpointConnectionSample.js][iotdpsresourcegetprivateendpointconnectionsample]                         | get private endpoint connection properties x-ms-original-file: 2026-08-31/DPSGetPrivateEndpointConnection.json                                                                                                                                                                                                           |
| [iotDpsResourceGetPrivateLinkResourcesSample.js][iotdpsresourcegetprivatelinkresourcessample]                                   | get the specified private link resource for the given provisioning service x-ms-original-file: 2026-08-31/DPSGetPrivateLinkResources.json                                                                                                                                                                                |
| [iotDpsResourceGetSample.js][iotdpsresourcegetsample]                                                                           | get the metadata of the provisioning service without SAS keys. x-ms-original-file: 2026-08-31/DPSGet.json                                                                                                                                                                                                                |
| [iotDpsResourceListByResourceGroupSample.js][iotdpsresourcelistbyresourcegroupsample]                                           | get a list of all provisioning services in the given resource group. x-ms-original-file: 2026-08-31/DPSListByResourceGroup.json                                                                                                                                                                                          |
| [iotDpsResourceListBySubscriptionSample.js][iotdpsresourcelistbysubscriptionsample]                                             | list all the provisioning services for a given subscription id. x-ms-original-file: 2026-08-31/DPSListBySubscription.json                                                                                                                                                                                                |
| [iotDpsResourceListKeysForKeyNameSample.js][iotdpsresourcelistkeysforkeynamesample]                                             | list primary and secondary keys for a specific key name x-ms-original-file: 2026-08-31/DPSGetKey.json                                                                                                                                                                                                                    |
| [iotDpsResourceListKeysSample.js][iotdpsresourcelistkeyssample]                                                                 | list the primary and secondary keys for a provisioning service. x-ms-original-file: 2026-08-31/DPSListKeys.json                                                                                                                                                                                                          |
| [iotDpsResourceListPrivateEndpointConnectionsSample.js][iotdpsresourcelistprivateendpointconnectionssample]                     | list private endpoint connection properties x-ms-original-file: 2026-08-31/DPSListPrivateEndpointConnections.json                                                                                                                                                                                                        |
| [iotDpsResourceListPrivateLinkResourcesSample.js][iotdpsresourcelistprivatelinkresourcessample]                                 | list private link resources for the given provisioning service x-ms-original-file: 2026-08-31/DPSListPrivateLinkResources.json                                                                                                                                                                                           |
| [iotDpsResourceListValidSkusSample.js][iotdpsresourcelistvalidskussample]                                                       | gets the list of valid SKUs and tiers for a provisioning service. x-ms-original-file: 2026-08-31/DPSGetValidSku.json                                                                                                                                                                                                     |
| [iotDpsResourceUpdateSample.js][iotdpsresourceupdatesample]                                                                     | update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method x-ms-original-file: 2026-08-31/DPSPatch.json                                                                                                                                                                        |
| [operationsListSample.js][operationslistsample]                                                                                 | list the operations for the provider x-ms-original-file: 2026-08-31/DPSOperations.json                                                                                                                                                                                                                                   |

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
node dpsCertificateCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dpsCertificateCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dpscertificatecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/dpsCertificateCreateOrUpdateSample.js
[dpscertificatedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/dpsCertificateDeleteSample.js
[dpscertificategenerateverificationcodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/dpsCertificateGenerateVerificationCodeSample.js
[dpscertificategetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/dpsCertificateGetSample.js
[dpscertificatelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/dpsCertificateListSample.js
[dpscertificateverifycertificatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/dpsCertificateVerifyCertificateSample.js
[iotdpsresourcecheckprovisioningservicenameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceCheckProvisioningServiceNameAvailabilitySample.js
[iotdpsresourcecreateorupdateprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceCreateOrUpdatePrivateEndpointConnectionSample.js
[iotdpsresourcecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceCreateOrUpdateSample.js
[iotdpsresourcedeleteprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceDeletePrivateEndpointConnectionSample.js
[iotdpsresourcedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceDeleteSample.js
[iotdpsresourcegetoperationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceGetOperationResultSample.js
[iotdpsresourcegetprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceGetPrivateEndpointConnectionSample.js
[iotdpsresourcegetprivatelinkresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceGetPrivateLinkResourcesSample.js
[iotdpsresourcegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceGetSample.js
[iotdpsresourcelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceListByResourceGroupSample.js
[iotdpsresourcelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceListBySubscriptionSample.js
[iotdpsresourcelistkeysforkeynamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceListKeysForKeyNameSample.js
[iotdpsresourcelistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceListKeysSample.js
[iotdpsresourcelistprivateendpointconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceListPrivateEndpointConnectionsSample.js
[iotdpsresourcelistprivatelinkresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceListPrivateLinkResourcesSample.js
[iotdpsresourcelistvalidskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceListValidSkusSample.js
[iotdpsresourceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/iotDpsResourceUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v1/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-deviceprovisioningservices
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/README.md
