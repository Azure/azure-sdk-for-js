# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [configurationsCreateInResourceGroupSample.ts][configurationscreateinresourcegroupsample] | Create/Overwrite Azure Advisor configuration. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/CreateConfiguration.json                                                                                                                                                                           |
| [configurationsCreateInSubscriptionSample.ts][configurationscreateinsubscriptionsample]   | Create/Overwrite Azure Advisor configuration and also delete all configurations of contained resource groups. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/CreateConfiguration.json                                                                                                           |
| [configurationsListByResourceGroupSample.ts][configurationslistbyresourcegroupsample]     | Retrieve Azure Advisor configurations. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListConfigurations.json                                                                                                                                                                                   |
| [configurationsListBySubscriptionSample.ts][configurationslistbysubscriptionsample]       | Retrieve Azure Advisor configurations and also retrieve configurations of contained resource groups. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListConfigurations.json                                                                                                                     |
| [recommendationMetadataGetSample.ts][recommendationmetadatagetsample]                     | Gets the metadata entity. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GetRecommendationMetadataEntity.json                                                                                                                                                                                   |
| [recommendationMetadataListSample.ts][recommendationmetadatalistsample]                   | Gets the list of metadata entities. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListRecommendationMetadata.json                                                                                                                                                                              |
| [recommendationsGenerateSample.ts][recommendationsgeneratesample]                         | Initiates the recommendation generation or computation process for a subscription. This operation is asynchronous. The generated recommendations are stored in a cache in the Advisor service. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GenerateRecommendations.json                      |
| [recommendationsGetGenerateStatusSample.ts][recommendationsgetgeneratestatussample]       | Retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/EmptyResponse.json      |
| [recommendationsGetSample.ts][recommendationsgetsample]                                   | Obtains details of a cached recommendation. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GetRecommendationDetail.json                                                                                                                                                                         |
| [recommendationsListSample.ts][recommendationslistsample]                                 | Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListRecommendations.json                                                                                   |
| [suppressionsCreateSample.ts][suppressionscreatesample]                                   | Enables the snoozed or dismissed attribute of a recommendation. The snoozed or dismissed attribute is referred to as a suppression. Use this API to create or update the snoozed or dismissed status of a recommendation. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/CreateSuppression.json |
| [suppressionsDeleteSample.ts][suppressionsdeletesample]                                   | Enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/DeleteSuppression.json                                                                  |
| [suppressionsGetSample.ts][suppressionsgetsample]                                         | Obtains the details of a suppression. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GetSuppressionDetail.json                                                                                                                                                                                  |
| [suppressionsListSample.ts][suppressionslistsample]                                       | Retrieves the list of snoozed or dismissed suppressions for a subscription. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListSuppressions.json                                                        |

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
node dist/configurationsCreateInResourceGroupSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/configurationsCreateInResourceGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[configurationscreateinresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/configurationsCreateInResourceGroupSample.ts
[configurationscreateinsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/configurationsCreateInSubscriptionSample.ts
[configurationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/configurationsListByResourceGroupSample.ts
[configurationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/configurationsListBySubscriptionSample.ts
[recommendationmetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/recommendationMetadataGetSample.ts
[recommendationmetadatalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/recommendationMetadataListSample.ts
[recommendationsgeneratesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/recommendationsGenerateSample.ts
[recommendationsgetgeneratestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/recommendationsGetGenerateStatusSample.ts
[recommendationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/recommendationsGetSample.ts
[recommendationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/recommendationsListSample.ts
[suppressionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/suppressionsCreateSample.ts
[suppressionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/suppressionsDeleteSample.ts
[suppressionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/suppressionsGetSample.ts
[suppressionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/typescript/src/suppressionsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-advisor?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/advisor/arm-advisor/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
