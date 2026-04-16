# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureTrafficCollectorsByResourceGroupListSample.js][azuretrafficcollectorsbyresourcegrouplistsample] | Return list of Azure Traffic Collectors in a Resource Group x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorsByResourceGroupList.json |
| [azureTrafficCollectorsBySubscriptionListSample.js][azuretrafficcollectorsbysubscriptionlistsample]   | Return list of Azure Traffic Collectors in a subscription x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorsBySubscriptionList.json    |
| [azureTrafficCollectorsCreateOrUpdateSample.js][azuretrafficcollectorscreateorupdatesample]           | Creates or updates a Azure Traffic Collector resource x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorCreate.json                     |
| [azureTrafficCollectorsDeleteSample.js][azuretrafficcollectorsdeletesample]                           | Deletes a specified Azure Traffic Collector resource. x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorDelete.json                     |
| [azureTrafficCollectorsGetSample.js][azuretrafficcollectorsgetsample]                                 | Gets the specified Azure Traffic Collector in a specified resource group x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorGet.json     |
| [azureTrafficCollectorsUpdateTagsSample.js][azuretrafficcollectorsupdatetagssample]                   | Updates the specified Azure Traffic Collector tags. x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorUpdateTags.json                   |
| [collectorPoliciesCreateOrUpdateSample.js][collectorpoliciescreateorupdatesample]                     | Creates or updates a Collector Policy resource x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPolicyCreate.json                                  |
| [collectorPoliciesDeleteSample.js][collectorpoliciesdeletesample]                                     | Deletes a specified Collector Policy resource. x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPolicyDelete.json                                  |
| [collectorPoliciesGetSample.js][collectorpoliciesgetsample]                                           | Gets the collector policy in a specified Traffic Collector x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPolicyGet.json                         |
| [collectorPoliciesListSample.js][collectorpolicieslistsample]                                         | Return list of Collector policies in a Azure Traffic Collector x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPoliciesList.json                  |
| [collectorPoliciesUpdateTagsSample.js][collectorpoliciesupdatetagssample]                             | Updates the specified Collector Policy tags. x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPolicyUpdateTags.json                                |
| [networkFunctionListOperationsSample.js][networkfunctionlistoperationssample]                         | Lists all of the available NetworkFunction Rest API operations. x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/OperationsList.json                        |

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
node azureTrafficCollectorsByResourceGroupListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node azureTrafficCollectorsByResourceGroupListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azuretrafficcollectorsbyresourcegrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/azureTrafficCollectorsByResourceGroupListSample.js
[azuretrafficcollectorsbysubscriptionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/azureTrafficCollectorsBySubscriptionListSample.js
[azuretrafficcollectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/azureTrafficCollectorsCreateOrUpdateSample.js
[azuretrafficcollectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/azureTrafficCollectorsDeleteSample.js
[azuretrafficcollectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/azureTrafficCollectorsGetSample.js
[azuretrafficcollectorsupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/azureTrafficCollectorsUpdateTagsSample.js
[collectorpoliciescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/collectorPoliciesCreateOrUpdateSample.js
[collectorpoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/collectorPoliciesDeleteSample.js
[collectorpoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/collectorPoliciesGetSample.js
[collectorpolicieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/collectorPoliciesListSample.js
[collectorpoliciesupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/collectorPoliciesUpdateTagsSample.js
[networkfunctionlistoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/javascript/networkFunctionListOperationsSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-networkfunction?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/networkfunction/arm-networkfunction/README.md
