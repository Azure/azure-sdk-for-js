# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                   | **Description**                                                                                                                                                                                                            |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deletePartnerDetails.ts][deletepartnerdetails] | Delete the management partner for the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/DeletePartnerDetails.json        |
| [getOperations.ts][getoperations]               | List all the operations. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/GetOperations.json                                                   |
| [getPartnerDetails.ts][getpartnerdetails]       | Get the management partner using the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/GetPartnerDetailsNoPartnerId.json |
| [operationListSample.ts][operationlistsample]   | List all the operations. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/GetOperations.json                                                   |
| [partnerCreateSample.ts][partnercreatesample]   | Create a management partner for the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/PutPartnerDetails.json             |
| [partnerDeleteSample.ts][partnerdeletesample]   | Delete the management partner for the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/DeletePartnerDetails.json        |
| [partnerGetSample.ts][partnergetsample]         | Get the management partner using the partnerId, objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/GetPartnerDetails.json |
| [partnerUpdateSample.ts][partnerupdatesample]   | Update the management partner for the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/PatchPartnerDetails.json         |
| [partnersGetSample.ts][partnersgetsample]       | Get the management partner using the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/GetPartnerDetailsNoPartnerId.json |
| [patchPartnerDetails.ts][patchpartnerdetails]   | Update the management partner for the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/PatchPartnerDetails.json         |
| [putPartnerDetails.ts][putpartnerdetails]       | Create a management partner for the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/PutPartnerDetails.json             |

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
node dist/deletePartnerDetails.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/deletePartnerDetails.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deletepartnerdetails]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/deletePartnerDetails.ts
[getoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/getOperations.ts
[getpartnerdetails]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/getPartnerDetails.ts
[operationlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/operationListSample.ts
[partnercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/partnerCreateSample.ts
[partnerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/partnerDeleteSample.ts
[partnergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/partnerGetSample.ts
[partnerupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/partnerUpdateSample.ts
[partnersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/partnersGetSample.ts
[patchpartnerdetails]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/patchPartnerDetails.ts
[putpartnerdetails]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v2/typescript/src/putPartnerDetails.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-managementpartner?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/managementpartner/arm-managementpartner/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
