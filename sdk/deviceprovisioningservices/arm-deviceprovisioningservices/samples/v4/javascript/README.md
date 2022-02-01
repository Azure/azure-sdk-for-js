# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dpsCheckName.js][dpscheckname]                                                       | Check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSCheckNameAvailability.json                                                                                                                          |
| [dpsCreate.js][dpscreate]                                                             | Create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSCreate.json |
| [dpsCreateOrUpdateCertificate.js][dpscreateorupdatecertificate]                       | Add new certificate or update an existing certificate. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSCertificateCreateOrUpdate.json                                                                                                                                                                                                  |
| [dpsDelete.js][dpsdelete]                                                             | Deletes the Provisioning Service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSDelete.json                                                                                                                                                                                                                                          |
| [dpsDeleteCertificate.js][dpsdeletecertificate]                                       | Deletes the specified certificate associated with the Provisioning Service x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSDeleteCertificate.json                                                                                                                                                                                      |
| [dpsGenerateVerificationCode.js][dpsgenerateverificationcode]                         | Generate verification code for Proof of Possession. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGenerateVerificationCode.json                                                                                                                                                                                                      |
| [dpsGet.js][dpsget]                                                                   | Get the metadata of the provisioning service without SAS keys. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGet.json                                                                                                                                                                                                                |
| [dpsGetCertificate.js][dpsgetcertificate]                                             | Get the certificate from the provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetCertificate.json                                                                                                                                                                                                                 |
| [dpsGetCertificates.js][dpsgetcertificates]                                           | Get all the certificates tied to the provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetCertificates.json                                                                                                                                                                                                        |
| [dpsGetKey.js][dpsgetkey]                                                             | List primary and secondary keys for a specific key name x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetKey.json                                                                                                                                                                                                                    |
| [dpsGetOperationResult.js][dpsgetoperationresult]                                     | Gets the status of a long running operation, such as create, update or delete a provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetOperationResult.json                                                                                                                                                          |
| [dpsGetValidSku.js][dpsgetvalidsku]                                                   | Gets the list of valid SKUs and tiers for a provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetValidSku.json                                                                                                                                                                                                     |
| [dpsListByResourceGroup.js][dpslistbyresourcegroup]                                   | Get a list of all provisioning services in the given resource group. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSListByResourceGroup.json                                                                                                                                                                                          |
| [dpsListBySubscription.js][dpslistbysubscription]                                     | List all the provisioning services for a given subscription id. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSListBySubscription.json                                                                                                                                                                                                |
| [dpsListKeys.js][dpslistkeys]                                                         | List the primary and secondary keys for a provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSListKeys.json                                                                                                                                                                                                          |
| [dpsOperations.js][dpsoperations]                                                     | Lists all of the available Microsoft.Devices REST API operations. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSOperations.json                                                                                                                                                                                                      |
| [dpsPatch.js][dpspatch]                                                               | Update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSPatch.json                                                                                                                                                                        |
| [dpsVerifyCertificate.js][dpsverifycertificate]                                       | Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSVerifyCertificate.json                                                                                                                                  |
| [privateEndpointConnectionCreateOrUpdate.js][privateendpointconnectioncreateorupdate] | Create or update the status of a private endpoint connection with the specified name x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSCreateOrUpdatePrivateEndpointConnection.json                                                                                                                                                      |
| [privateEndpointConnectionDelete.js][privateendpointconnectiondelete]                 | Delete private endpoint connection with the specified name x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSDeletePrivateEndpointConnection.json                                                                                                                                                                                        |
| [privateEndpointConnectionGet.js][privateendpointconnectionget]                       | Get private endpoint connection properties x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetPrivateEndpointConnection.json                                                                                                                                                                                                           |
| [privateEndpointConnectionsList.js][privateendpointconnectionslist]                   | List private endpoint connection properties x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSListPrivateEndpointConnections.json                                                                                                                                                                                                        |
| [privateLinkResourcesList.js][privatelinkresourceslist]                               | Get the specified private link resource for the given provisioning service x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetPrivateLinkResources.json                                                                                                                                                                                |

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
node dpsCheckName.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dpsCheckName.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dpscheckname]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsCheckName.js
[dpscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsCreate.js
[dpscreateorupdatecertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsCreateOrUpdateCertificate.js
[dpsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsDelete.js
[dpsdeletecertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsDeleteCertificate.js
[dpsgenerateverificationcode]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsGenerateVerificationCode.js
[dpsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsGet.js
[dpsgetcertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsGetCertificate.js
[dpsgetcertificates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsGetCertificates.js
[dpsgetkey]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsGetKey.js
[dpsgetoperationresult]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsGetOperationResult.js
[dpsgetvalidsku]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsGetValidSku.js
[dpslistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsListByResourceGroup.js
[dpslistbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsListBySubscription.js
[dpslistkeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsListKeys.js
[dpsoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsOperations.js
[dpspatch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsPatch.js
[dpsverifycertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/dpsVerifyCertificate.js
[privateendpointconnectioncreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/privateEndpointConnectionCreateOrUpdate.js
[privateendpointconnectiondelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/privateEndpointConnectionDelete.js
[privateendpointconnectionget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/privateEndpointConnectionGet.js
[privateendpointconnectionslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/privateEndpointConnectionsList.js
[privatelinkresourceslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/javascript/privateLinkResourcesList.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-deviceprovisioningservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/README.md
