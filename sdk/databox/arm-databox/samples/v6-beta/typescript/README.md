# @azure/arm-databox client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-databox in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [jobsBookShipmentPickUpSample.ts][jobsbookshipmentpickupsample]                                       | book shipment pick up. x-ms-original-file: 2025-07-01/BookShipmentPickupPost.json                                                                                                                             |
| [jobsCancelSample.ts][jobscancelsample]                                                               | cancelJob. x-ms-original-file: 2025-07-01/JobsCancelPost.json                                                                                                                                                 |
| [jobsCreateSample.ts][jobscreatesample]                                                               | creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API. x-ms-original-file: 2025-07-01/JobsCreate.json           |
| [jobsDeleteSample.ts][jobsdeletesample]                                                               | deletes a job. x-ms-original-file: 2025-07-01/JobsDelete.json                                                                                                                                                 |
| [jobsGetSample.ts][jobsgetsample]                                                                     | gets information about the specified job. x-ms-original-file: 2025-07-01/JobsGet.json                                                                                                                         |
| [jobsListByResourceGroupSample.ts][jobslistbyresourcegroupsample]                                     | lists all the jobs available under the given resource group. x-ms-original-file: 2025-07-01/JobsListByResourceGroup.json                                                                                      |
| [jobsListCredentialsSample.ts][jobslistcredentialssample]                                             | this method gets the unencrypted secrets related to the job. x-ms-original-file: 2025-07-01/JobsListCredentials.json                                                                                          |
| [jobsListSample.ts][jobslistsample]                                                                   | lists all the jobs available under the subscription. x-ms-original-file: 2025-07-01/JobsList.json                                                                                                             |
| [jobsMarkDevicesShippedSample.ts][jobsmarkdevicesshippedsample]                                       | request to mark devices for a given job as shipped x-ms-original-file: 2025-07-01/MarkDevicesShipped.json                                                                                                     |
| [jobsUpdateSample.ts][jobsupdatesample]                                                               | updates the properties of an existing job. x-ms-original-file: 2025-07-01/JobsPatch.json                                                                                                                      |
| [mitigateSample.ts][mitigatesample]                                                                   | request to mitigate for a given job x-ms-original-file: 2025-07-01/JobMitigate.json                                                                                                                           |
| [operationsListSample.ts][operationslistsample]                                                       | list the operations for the provider x-ms-original-file: 2025-07-01/OperationsGet.json                                                                                                                        |
| [serviceListAvailableSkusByResourceGroupSample.ts][servicelistavailableskusbyresourcegroupsample]     | this method provides the list of available skus for the given subscription, resource group and location. x-ms-original-file: 2025-07-01/AvailableSkusPost.json                                                |
| [serviceRegionConfigurationByResourceGroupSample.ts][serviceregionconfigurationbyresourcegroupsample] | this API provides configuration details specific to given region/location at Resource group level. x-ms-original-file: 2025-07-01/RegionConfigurationByResourceGroup.json                                     |
| [serviceRegionConfigurationSample.ts][serviceregionconfigurationsample]                               | this API provides configuration details specific to given region/location at Subscription level. x-ms-original-file: 2025-07-01/RegionConfiguration.json                                                      |
| [serviceValidateAddressSample.ts][servicevalidateaddresssample]                                       | [DEPRECATED NOTICE: This operation will soon be removed]. This method validates the customer shipping address and provide alternate addresses if any. x-ms-original-file: 2025-07-01/ValidateAddressPost.json |
| [serviceValidateInputsByResourceGroupSample.ts][servicevalidateinputsbyresourcegroupsample]           | this method does all necessary pre-job creation validation under resource group. x-ms-original-file: 2025-07-01/ValidateInputsByResourceGroup.json                                                            |
| [serviceValidateInputsSample.ts][servicevalidateinputssample]                                         | this method does all necessary pre-job creation validation under subscription. x-ms-original-file: 2025-07-01/ValidateInputs.json                                                                             |

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
node dist/jobsBookShipmentPickUpSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/jobsBookShipmentPickUpSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[jobsbookshipmentpickupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/jobsBookShipmentPickUpSample.ts
[jobscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/jobsCancelSample.ts
[jobscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/jobsCreateSample.ts
[jobsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/jobsDeleteSample.ts
[jobsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/jobsGetSample.ts
[jobslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/jobsListByResourceGroupSample.ts
[jobslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/jobsListCredentialsSample.ts
[jobslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/jobsListSample.ts
[jobsmarkdevicesshippedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/jobsMarkDevicesShippedSample.ts
[jobsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/jobsUpdateSample.ts
[mitigatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/mitigateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/operationsListSample.ts
[servicelistavailableskusbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/serviceListAvailableSkusByResourceGroupSample.ts
[serviceregionconfigurationbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/serviceRegionConfigurationByResourceGroupSample.ts
[serviceregionconfigurationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/serviceRegionConfigurationSample.ts
[servicevalidateaddresssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/serviceValidateAddressSample.ts
[servicevalidateinputsbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/serviceValidateInputsByResourceGroupSample.ts
[servicevalidateinputssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v6-beta/typescript/src/serviceValidateInputsSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-databox?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/databox/arm-databox/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
