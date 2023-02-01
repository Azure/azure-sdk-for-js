# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                 | **Description**                                                                                                                                                                                                            |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationListSample.js][operationlistsample] | List all the operations. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/GetOperations.json                                                   |
| [partnerCreateSample.js][partnercreatesample] | Create a management partner for the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/PutPartnerDetails.json             |
| [partnerDeleteSample.js][partnerdeletesample] | Delete the management partner for the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/DeletePartnerDetails.json        |
| [partnerGetSample.js][partnergetsample]       | Get the management partner using the partnerId, objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/GetPartnerDetails.json |
| [partnerUpdateSample.js][partnerupdatesample] | Update the management partner for the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/PatchPartnerDetails.json         |
| [partnersGetSample.js][partnersgetsample]     | Get the management partner using the objectId and tenantId. x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/GetPartnerDetailsNoPartnerId.json |

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
node operationListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node operationListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v3/javascript/operationListSample.js
[partnercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v3/javascript/partnerCreateSample.js
[partnerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v3/javascript/partnerDeleteSample.js
[partnergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v3/javascript/partnerGetSample.js
[partnerupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v3/javascript/partnerUpdateSample.js
[partnersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementpartner/arm-managementpartner/samples/v3/javascript/partnersGetSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-managementpartner?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/managementpartner/arm-managementpartner/README.md
