# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [jobsBookShipmentPickUpSample.js][jobsbookshipmentpickupsample]                                       | Book shipment pick up. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/BookShipmentPickupPost.json                                                                                                                             |
| [jobsCancelSample.js][jobscancelsample]                                                               | CancelJob. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/JobsCancelPost.json                                                                                                                                                 |
| [jobsCreateSample.js][jobscreatesample]                                                               | Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/JobsCreate.json           |
| [jobsDeleteSample.js][jobsdeletesample]                                                               | Deletes a job. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/JobsDelete.json                                                                                                                                                 |
| [jobsGetSample.js][jobsgetsample]                                                                     | Gets information about the specified job. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/JobsGet.json                                                                                                                         |
| [jobsListByResourceGroupSample.js][jobslistbyresourcegroupsample]                                     | Lists all the jobs available under the given resource group. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/JobsListByResourceGroup.json                                                                                      |
| [jobsListCredentialsSample.js][jobslistcredentialssample]                                             | This method gets the unencrypted secrets related to the job. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/JobsListCredentials.json                                                                                          |
| [jobsListSample.js][jobslistsample]                                                                   | Lists all the jobs available under the subscription. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/JobsList.json                                                                                                             |
| [jobsMarkDevicesShippedSample.js][jobsmarkdevicesshippedsample]                                       | Request to mark devices for a given job as shipped x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/MarkDevicesShipped.json                                                                                                     |
| [jobsUpdateSample.js][jobsupdatesample]                                                               | Updates the properties of an existing job. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/JobsPatch.json                                                                                                                      |
| [mitigateSample.js][mitigatesample]                                                                   | Request to mitigate for a given job x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/JobMitigate.json                                                                                                                           |
| [operationsListSample.js][operationslistsample]                                                       | This method gets all the operations. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/OperationsGet.json                                                                                                                        |
| [serviceListAvailableSkusByResourceGroupSample.js][servicelistavailableskusbyresourcegroupsample]     | This method provides the list of available skus for the given subscription, resource group and location. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/AvailableSkusPost.json                                                |
| [serviceRegionConfigurationByResourceGroupSample.js][serviceregionconfigurationbyresourcegroupsample] | This API provides configuration details specific to given region/location at Resource group level. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/RegionConfigurationByResourceGroup.json                                     |
| [serviceRegionConfigurationSample.js][serviceregionconfigurationsample]                               | This API provides configuration details specific to given region/location at Subscription level. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/RegionConfiguration.json                                                      |
| [serviceValidateAddressSample.js][servicevalidateaddresssample]                                       | [DEPRECATED NOTICE: This operation will soon be removed]. This method validates the customer shipping address and provide alternate addresses if any. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/ValidateAddressPost.json |
| [serviceValidateInputsByResourceGroupSample.js][servicevalidateinputsbyresourcegroupsample]           | This method does all necessary pre-job creation validation under resource group. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/ValidateInputsByResourceGroup.json                                                            |
| [serviceValidateInputsSample.js][servicevalidateinputssample]                                         | This method does all necessary pre-job creation validation under subscription. x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2022-12-01/examples/ValidateInputs.json                                                                             |

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
node jobsBookShipmentPickUpSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env DATABOX_SUBSCRIPTION_ID="<databox subscription id>" DATABOX_RESOURCE_GROUP="<databox resource group>" node jobsBookShipmentPickUpSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[jobsbookshipmentpickupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/jobsBookShipmentPickUpSample.js
[jobscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/jobsCancelSample.js
[jobscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/jobsCreateSample.js
[jobsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/jobsDeleteSample.js
[jobsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/jobsGetSample.js
[jobslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/jobsListByResourceGroupSample.js
[jobslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/jobsListCredentialsSample.js
[jobslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/jobsListSample.js
[jobsmarkdevicesshippedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/jobsMarkDevicesShippedSample.js
[jobsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/jobsUpdateSample.js
[mitigatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/mitigateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/operationsListSample.js
[servicelistavailableskusbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/serviceListAvailableSkusByResourceGroupSample.js
[serviceregionconfigurationbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/serviceRegionConfigurationByResourceGroupSample.js
[serviceregionconfigurationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/serviceRegionConfigurationSample.js
[servicevalidateaddresssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/serviceValidateAddressSample.js
[servicevalidateinputsbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/serviceValidateInputsByResourceGroupSample.js
[servicevalidateinputssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databox/arm-databox/samples/v5/javascript/serviceValidateInputsSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-databox?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/databox/arm-databox/README.md
