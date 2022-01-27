# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dpsCheckName.ts][dpscheckname]                                                       | Check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSCheckNameAvailability.json                                                                                                                          |
| [dpsCreate.ts][dpscreate]                                                             | Create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSCreate.json |
| [dpsCreateOrUpdateCertificate.ts][dpscreateorupdatecertificate]                       | Add new certificate or update an existing certificate. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSCertificateCreateOrUpdate.json                                                                                                                                                                                                  |
| [dpsDelete.ts][dpsdelete]                                                             | Deletes the Provisioning Service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSDelete.json                                                                                                                                                                                                                                          |
| [dpsDeleteCertificate.ts][dpsdeletecertificate]                                       | Deletes the specified certificate associated with the Provisioning Service x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSDeleteCertificate.json                                                                                                                                                                                      |
| [dpsGenerateVerificationCode.ts][dpsgenerateverificationcode]                         | Generate verification code for Proof of Possession. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGenerateVerificationCode.json                                                                                                                                                                                                      |
| [dpsGet.ts][dpsget]                                                                   | Get the metadata of the provisioning service without SAS keys. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGet.json                                                                                                                                                                                                                |
| [dpsGetCertificate.ts][dpsgetcertificate]                                             | Get the certificate from the provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetCertificate.json                                                                                                                                                                                                                 |
| [dpsGetCertificates.ts][dpsgetcertificates]                                           | Get all the certificates tied to the provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetCertificates.json                                                                                                                                                                                                        |
| [dpsGetKey.ts][dpsgetkey]                                                             | List primary and secondary keys for a specific key name x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetKey.json                                                                                                                                                                                                                    |
| [dpsGetOperationResult.ts][dpsgetoperationresult]                                     | Gets the status of a long running operation, such as create, update or delete a provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetOperationResult.json                                                                                                                                                          |
| [dpsGetValidSku.ts][dpsgetvalidsku]                                                   | Gets the list of valid SKUs and tiers for a provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetValidSku.json                                                                                                                                                                                                     |
| [dpsListByResourceGroup.ts][dpslistbyresourcegroup]                                   | Get a list of all provisioning services in the given resource group. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSListByResourceGroup.json                                                                                                                                                                                          |
| [dpsListBySubscription.ts][dpslistbysubscription]                                     | List all the provisioning services for a given subscription id. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSListBySubscription.json                                                                                                                                                                                                |
| [dpsListKeys.ts][dpslistkeys]                                                         | List the primary and secondary keys for a provisioning service. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSListKeys.json                                                                                                                                                                                                          |
| [dpsOperations.ts][dpsoperations]                                                     | Lists all of the available Microsoft.Devices REST API operations. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSOperations.json                                                                                                                                                                                                      |
| [dpsPatch.ts][dpspatch]                                                               | Update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSPatch.json                                                                                                                                                                        |
| [dpsVerifyCertificate.ts][dpsverifycertificate]                                       | Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate. x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSVerifyCertificate.json                                                                                                                                  |
| [privateEndpointConnectionCreateOrUpdate.ts][privateendpointconnectioncreateorupdate] | Create or update the status of a private endpoint connection with the specified name x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSCreateOrUpdatePrivateEndpointConnection.json                                                                                                                                                      |
| [privateEndpointConnectionDelete.ts][privateendpointconnectiondelete]                 | Delete private endpoint connection with the specified name x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSDeletePrivateEndpointConnection.json                                                                                                                                                                                        |
| [privateEndpointConnectionGet.ts][privateendpointconnectionget]                       | Get private endpoint connection properties x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetPrivateEndpointConnection.json                                                                                                                                                                                                           |
| [privateEndpointConnectionsList.ts][privateendpointconnectionslist]                   | List private endpoint connection properties x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSListPrivateEndpointConnections.json                                                                                                                                                                                                        |
| [privateLinkResourcesList.ts][privatelinkresourceslist]                               | Get the specified private link resource for the given provisioning service x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2021-10-15/examples/DPSGetPrivateLinkResources.json                                                                                                                                                                                |

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
node dist/dpsCheckName.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/dpsCheckName.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dpscheckname]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsCheckName.ts
[dpscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsCreate.ts
[dpscreateorupdatecertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsCreateOrUpdateCertificate.ts
[dpsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsDelete.ts
[dpsdeletecertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsDeleteCertificate.ts
[dpsgenerateverificationcode]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsGenerateVerificationCode.ts
[dpsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsGet.ts
[dpsgetcertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsGetCertificate.ts
[dpsgetcertificates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsGetCertificates.ts
[dpsgetkey]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsGetKey.ts
[dpsgetoperationresult]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsGetOperationResult.ts
[dpsgetvalidsku]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsGetValidSku.ts
[dpslistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsListByResourceGroup.ts
[dpslistbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsListBySubscription.ts
[dpslistkeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsListKeys.ts
[dpsoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsOperations.ts
[dpspatch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsPatch.ts
[dpsverifycertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/dpsVerifyCertificate.ts
[privateendpointconnectioncreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/privateEndpointConnectionCreateOrUpdate.ts
[privateendpointconnectiondelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/privateEndpointConnectionDelete.ts
[privateendpointconnectionget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/privateEndpointConnectionGet.ts
[privateendpointconnectionslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/privateEndpointConnectionsList.ts
[privatelinkresourceslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/samples/v4/typescript/src/privateLinkResourcesList.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-deviceprovisioningservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceprovisioningservices/arm-deviceprovisioningservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
