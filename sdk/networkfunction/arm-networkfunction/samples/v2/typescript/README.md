# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureTrafficCollectorsByResourceGroupListSample.ts][azuretrafficcollectorsbyresourcegrouplistsample] | Return list of Azure Traffic Collectors in a Resource Group x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorsByResourceGroupList.json |
| [azureTrafficCollectorsBySubscriptionListSample.ts][azuretrafficcollectorsbysubscriptionlistsample]   | Return list of Azure Traffic Collectors in a subscription x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorsBySubscriptionList.json    |
| [azureTrafficCollectorsCreateOrUpdateSample.ts][azuretrafficcollectorscreateorupdatesample]           | Creates or updates a Azure Traffic Collector resource x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorCreate.json                     |
| [azureTrafficCollectorsDeleteSample.ts][azuretrafficcollectorsdeletesample]                           | Deletes a specified Azure Traffic Collector resource. x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorDelete.json                     |
| [azureTrafficCollectorsGetSample.ts][azuretrafficcollectorsgetsample]                                 | Gets the specified Azure Traffic Collector in a specified resource group x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorGet.json     |
| [azureTrafficCollectorsUpdateTagsSample.ts][azuretrafficcollectorsupdatetagssample]                   | Updates the specified Azure Traffic Collector tags. x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorUpdateTags.json                   |
| [collectorPoliciesCreateOrUpdateSample.ts][collectorpoliciescreateorupdatesample]                     | Creates or updates a Collector Policy resource x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPolicyCreate.json                                  |
| [collectorPoliciesDeleteSample.ts][collectorpoliciesdeletesample]                                     | Deletes a specified Collector Policy resource. x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPolicyDelete.json                                  |
| [collectorPoliciesGetSample.ts][collectorpoliciesgetsample]                                           | Gets the collector policy in a specified Traffic Collector x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPolicyGet.json                         |
| [collectorPoliciesListSample.ts][collectorpolicieslistsample]                                         | Return list of Collector policies in a Azure Traffic Collector x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPoliciesList.json                  |
| [collectorPoliciesUpdateTagsSample.ts][collectorpoliciesupdatetagssample]                             | Updates the specified Collector Policy tags. x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPolicyUpdateTags.json                                |
| [networkFunctionListOperationsSample.ts][networkfunctionlistoperationssample]                         | Lists all of the available NetworkFunction Rest API operations. x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/OperationsList.json                        |

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
node dist/azureTrafficCollectorsByResourceGroupListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/azureTrafficCollectorsByResourceGroupListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azuretrafficcollectorsbyresourcegrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/azureTrafficCollectorsByResourceGroupListSample.ts
[azuretrafficcollectorsbysubscriptionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/azureTrafficCollectorsBySubscriptionListSample.ts
[azuretrafficcollectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/azureTrafficCollectorsCreateOrUpdateSample.ts
[azuretrafficcollectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/azureTrafficCollectorsDeleteSample.ts
[azuretrafficcollectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/azureTrafficCollectorsGetSample.ts
[azuretrafficcollectorsupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/azureTrafficCollectorsUpdateTagsSample.ts
[collectorpoliciescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/collectorPoliciesCreateOrUpdateSample.ts
[collectorpoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/collectorPoliciesDeleteSample.ts
[collectorpoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/collectorPoliciesGetSample.ts
[collectorpolicieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/collectorPoliciesListSample.ts
[collectorpoliciesupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/collectorPoliciesUpdateTagsSample.ts
[networkfunctionlistoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/networkfunction/arm-networkfunction/samples/v2/typescript/src/networkFunctionListOperationsSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-networkfunction?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/networkfunction/arm-networkfunction/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
