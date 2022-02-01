# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessAPropertiesField.ts][accessapropertiesfield]                                     | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesPropertiesQuery.json  |
| [basicManagementGroupQuery.ts][basicmanagementgroupquery]                               | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesMgBasicQuery.json     |
| [basicQuery.ts][basicquery]                                                             | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesBasicQuery.json       |
| [basicTenantQuery.ts][basictenantquery]                                                 | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesTenantBasicQuery.json |
| [complexQuery.ts][complexquery]                                                         | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesComplexQuery.json     |
| [filterResources.ts][filterresources]                                                   | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesFilterQuery.json      |
| [firstPageQuery.ts][firstpagequery]                                                     | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesFirstPageQuery.json   |
| [nextPageQuery.ts][nextpagequery]                                                       | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesNextPageQuery.json    |
| [operationsList.ts][operationslist]                                                     | Lists all of the available REST API operations. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/OperationsList.json                                                         |
| [queryWithAFacetRequest.ts][querywithafacetrequest]                                     | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesFacetQuery.json       |
| [randomPageQuery.ts][randompagequery]                                                   | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesRandomPageQuery.json  |
| [resourceHistoryManagementGroupScopeQuery.ts][resourcehistorymanagementgroupscopequery] | List all snapshots of a resource for a given time interval. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesHistoryMgsGet.json                                     |
| [resourceHistoryQuery.ts][resourcehistoryquery]                                         | List all snapshots of a resource for a given time interval. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesHistoryGet.json                                        |
| [summarizeResourcesByLocation.ts][summarizeresourcesbylocation]                         | Queries the resources managed by Azure Resource Manager for scopes specified in the request. x-ms-original-file: specification/resourcegraph/resource-manager/Microsoft.ResourceGraph/preview/2021-06-01-preview/examples/ResourcesSummarizeQuery.json   |

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
node dist/accessAPropertiesField.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/accessAPropertiesField.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accessapropertiesfield]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/accessAPropertiesField.ts
[basicmanagementgroupquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/basicManagementGroupQuery.ts
[basicquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/basicQuery.ts
[basictenantquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/basicTenantQuery.ts
[complexquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/complexQuery.ts
[filterresources]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/filterResources.ts
[firstpagequery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/firstPageQuery.ts
[nextpagequery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/nextPageQuery.ts
[operationslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/operationsList.ts
[querywithafacetrequest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/queryWithAFacetRequest.ts
[randompagequery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/randomPageQuery.ts
[resourcehistorymanagementgroupscopequery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/resourceHistoryManagementGroupScopeQuery.ts
[resourcehistoryquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/resourceHistoryQuery.ts
[summarizeresourcesbylocation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcegraph/arm-resourcegraph/samples/v5-beta/typescript/src/summarizeResourcesByLocation.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-resourcegraph?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcegraph/arm-resourcegraph/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
