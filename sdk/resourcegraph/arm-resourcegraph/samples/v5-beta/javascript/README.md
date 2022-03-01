# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessAPropertiesField.js][accessapropertiesfield]                                     | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesPropertiesQuery.json  |
| [basicManagementGroupQuery.js][basicmanagementgroupquery]                               | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesMgBasicQuery.json     |
| [basicQuery.js][basicquery]                                                             | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesBasicQuery.json       |
| [basicTenantQuery.js][basictenantquery]                                                 | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesTenantBasicQuery.json |
| [complexQuery.js][complexquery]                                                         | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesComplexQuery.json     |
| [filterResources.js][filterresources]                                                   | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesFilterQuery.json      |
| [firstPageQuery.js][firstpagequery]                                                     | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesFirstPageQuery.json   |
| [nextPageQuery.js][nextpagequery]                                                       | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesNextPageQuery.json    |
| [operationsList.js][operationslist]                                                     | Lists all of the available REST API operations. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/OperationsList.json                                                         |
| [queryWithAFacetRequest.js][querywithafacetrequest]                                     | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesFacetQuery.json       |
| [randomPageQuery.js][randompagequery]                                                   | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesRandomPageQuery.json  |
| [resourceHistoryManagementGroupScopeQuery.js][resourcehistorymanagementgroupscopequery] | List all snapshots of a resource for a given time interval. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesHistoryMgsGet.json                                     |
| [resourceHistoryQuery.js][resourcehistoryquery]                                         | List all snapshots of a resource for a given time interval. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesHistoryGet.json                                        |
| [summarizeResourcesByLocation.js][summarizeresourcesbylocation]                         | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesSummarizeQuery.json   |

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
node accessAPropertiesField.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node accessAPropertiesField.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accessapropertiesfield]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/accessAPropertiesField.js
[basicmanagementgroupquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/basicManagementGroupQuery.js
[basicquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/basicQuery.js
[basictenantquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/basicTenantQuery.js
[complexquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/complexQuery.js
[filterresources]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/filterResources.js
[firstpagequery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/firstPageQuery.js
[nextpagequery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/nextPageQuery.js
[operationslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/operationsList.js
[querywithafacetrequest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/queryWithAFacetRequest.js
[randompagequery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/randomPageQuery.js
[resourcehistorymanagementgroupscopequery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/resourceHistoryManagementGroupScopeQuery.js
[resourcehistoryquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/resourceHistoryQuery.js
[summarizeresourcesbylocation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/javascript/summarizeResourcesByLocation.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-resourcegraph?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcegraph/arm-resourcegraph/README.md
