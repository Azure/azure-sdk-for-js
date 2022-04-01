# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [configurationsCreateInResourceGroupSample.js][configurationscreateinresourcegroupsample] | Create/Overwrite Azure Advisor configuration. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/CreateConfiguration.json                                                                                                                                                                           |
| [configurationsCreateInSubscriptionSample.js][configurationscreateinsubscriptionsample]   | Create/Overwrite Azure Advisor configuration and also delete all configurations of contained resource groups. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/CreateConfiguration.json                                                                                                           |
| [configurationsListByResourceGroupSample.js][configurationslistbyresourcegroupsample]     | Retrieve Azure Advisor configurations. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListConfigurations.json                                                                                                                                                                                   |
| [configurationsListBySubscriptionSample.js][configurationslistbysubscriptionsample]       | Retrieve Azure Advisor configurations and also retrieve configurations of contained resource groups. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListConfigurations.json                                                                                                                     |
| [recommendationMetadataGetSample.js][recommendationmetadatagetsample]                     | Gets the metadata entity. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GetRecommendationMetadataEntity.json                                                                                                                                                                                   |
| [recommendationMetadataListSample.js][recommendationmetadatalistsample]                   | Gets the list of metadata entities. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListRecommendationMetadata.json                                                                                                                                                                              |
| [recommendationsGenerateSample.js][recommendationsgeneratesample]                         | Initiates the recommendation generation or computation process for a subscription. This operation is asynchronous. The generated recommendations are stored in a cache in the Advisor service. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GenerateRecommendations.json                      |
| [recommendationsGetGenerateStatusSample.js][recommendationsgetgeneratestatussample]       | Retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/EmptyResponse.json      |
| [recommendationsGetSample.js][recommendationsgetsample]                                   | Obtains details of a cached recommendation. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GetRecommendationDetail.json                                                                                                                                                                         |
| [recommendationsListSample.js][recommendationslistsample]                                 | Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListRecommendations.json                                                                                   |
| [suppressionsCreateSample.js][suppressionscreatesample]                                   | Enables the snoozed or dismissed attribute of a recommendation. The snoozed or dismissed attribute is referred to as a suppression. Use this API to create or update the snoozed or dismissed status of a recommendation. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/CreateSuppression.json |
| [suppressionsDeleteSample.js][suppressionsdeletesample]                                   | Enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/DeleteSuppression.json                                                                  |
| [suppressionsGetSample.js][suppressionsgetsample]                                         | Obtains the details of a suppression. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GetSuppressionDetail.json                                                                                                                                                                                  |
| [suppressionsListSample.js][suppressionslistsample]                                       | Retrieves the list of snoozed or dismissed suppressions for a subscription. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListSuppressions.json                                                        |

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
node configurationsCreateInResourceGroupSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node configurationsCreateInResourceGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[configurationscreateinresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/configurationsCreateInResourceGroupSample.js
[configurationscreateinsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/configurationsCreateInSubscriptionSample.js
[configurationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/configurationsListByResourceGroupSample.js
[configurationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/configurationsListBySubscriptionSample.js
[recommendationmetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/recommendationMetadataGetSample.js
[recommendationmetadatalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/recommendationMetadataListSample.js
[recommendationsgeneratesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/recommendationsGenerateSample.js
[recommendationsgetgeneratestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/recommendationsGetGenerateStatusSample.js
[recommendationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/recommendationsGetSample.js
[recommendationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/recommendationsListSample.js
[suppressionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/suppressionsCreateSample.js
[suppressionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/suppressionsDeleteSample.js
[suppressionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/suppressionsGetSample.js
[suppressionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v3/javascript/suppressionsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-advisor?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/advisor/arm-advisor/README.md
