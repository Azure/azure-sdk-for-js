# Azure App Service rest client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure App Service rest in some common scenarios.

| **File Name**                                                                                                                                 | **Description**                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [appServiceEnvironmentsGetInboundNetworkDependenciesEndpointsSample.ts][appserviceenvironmentsgetinboundnetworkdependenciesendpointssample]   | Description for Get the network endpoints of all inbound dependencies of an App Service Environment. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/GetInboundNetworkDependenciesEndpoints.json   |
| [appServiceEnvironmentsGetOutboundNetworkDependenciesEndpointsSample.ts][appserviceenvironmentsgetoutboundnetworkdependenciesendpointssample] | Description for Get the network endpoints of all outbound dependencies of an App Service Environment. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/GetOutboundNetworkDependenciesEndpoints.json |
| [appServicePlansCreateOrUpdateSample.ts][appserviceplanscreateorupdatesample]                                                                 | Description for Creates or updates an App Service Plan. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/CreateOrUpdateAppServicePlan.json                                                          |
| [appServicePlansDeleteSample.ts][appserviceplansdeletesample]                                                                                 | Description for Delete an App Service plan. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/DeleteAppServicePlan.json                                                                              |
| [appServicePlansGetSample.ts][appserviceplansgetsample]                                                                                       | Description for Get an App Service plan. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/GetAppServicePlan.json                                                                                    |
| [appServicePlansListByResourceGroupSample.ts][appserviceplanslistbyresourcegroupsample]                                                       | Description for Get all App Service plans in a resource group. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/ListAppServicePlansByResourceGroup.json                                             |
| [appServicePlansListSample.ts][appserviceplanslistsample]                                                                                     | Description for Get all App Service plans for a subscription. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/ListAppServicePlans.json                                                             |
| [appServicePlansUpdateSample.ts][appserviceplansupdatesample]                                                                                 | Description for Creates or updates an App Service Plan. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/PatchAppServicePlan.json                                                                   |

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
node dist/appServiceEnvironmentsGetInboundNetworkDependenciesEndpointsSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env SUBSCRIPTION_ID="<subscription id>" node dist/appServiceEnvironmentsGetInboundNetworkDependenciesEndpointsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[appserviceenvironmentsgetinboundnetworkdependenciesendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/typescript/src/appServiceEnvironmentsGetInboundNetworkDependenciesEndpointsSample.ts
[appserviceenvironmentsgetoutboundnetworkdependenciesendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/typescript/src/appServiceEnvironmentsGetOutboundNetworkDependenciesEndpointsSample.ts
[appserviceplanscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/typescript/src/appServicePlansCreateOrUpdateSample.ts
[appserviceplansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/typescript/src/appServicePlansDeleteSample.ts
[appserviceplansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/typescript/src/appServicePlansGetSample.ts
[appserviceplanslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/typescript/src/appServicePlansListByResourceGroupSample.ts
[appserviceplanslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/typescript/src/appServicePlansListSample.ts
[appserviceplansupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/typescript/src/appServicePlansUpdateSample.ts
[apiref]: https://docs.microsoft.com/rest/api/appservice
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appservice/arm-appservice-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
