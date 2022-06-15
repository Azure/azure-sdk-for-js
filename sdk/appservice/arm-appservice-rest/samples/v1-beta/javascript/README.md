# Azure App Service rest client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure App Service rest in some common scenarios.

| **File Name**                                                                                                                                 | **Description**                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [appServiceEnvironmentsGetInboundNetworkDependenciesEndpointsSample.js][appserviceenvironmentsgetinboundnetworkdependenciesendpointssample]   | Description for Get the network endpoints of all inbound dependencies of an App Service Environment. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/GetInboundNetworkDependenciesEndpoints.json   |
| [appServiceEnvironmentsGetOutboundNetworkDependenciesEndpointsSample.js][appserviceenvironmentsgetoutboundnetworkdependenciesendpointssample] | Description for Get the network endpoints of all outbound dependencies of an App Service Environment. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/GetOutboundNetworkDependenciesEndpoints.json |
| [appServicePlansCreateOrUpdateSample.js][appserviceplanscreateorupdatesample]                                                                 | Description for Creates or updates an App Service Plan. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/CreateOrUpdateAppServicePlan.json                                                          |
| [appServicePlansDeleteSample.js][appserviceplansdeletesample]                                                                                 | Description for Delete an App Service plan. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/DeleteAppServicePlan.json                                                                              |
| [appServicePlansGetSample.js][appserviceplansgetsample]                                                                                       | Description for Get an App Service plan. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/GetAppServicePlan.json                                                                                    |
| [appServicePlansListByResourceGroupSample.js][appserviceplanslistbyresourcegroupsample]                                                       | Description for Get all App Service plans in a resource group. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/ListAppServicePlansByResourceGroup.json                                             |
| [appServicePlansListSample.js][appserviceplanslistsample]                                                                                     | Description for Get all App Service plans for a subscription. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/ListAppServicePlans.json                                                             |
| [appServicePlansUpdateSample.js][appserviceplansupdatesample]                                                                                 | Description for Creates or updates an App Service Plan. x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/PatchAppServicePlan.json                                                                   |

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
node appServiceEnvironmentsGetInboundNetworkDependenciesEndpointsSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env SUBSCRIPTION_ID="<subscription id>" node appServiceEnvironmentsGetInboundNetworkDependenciesEndpointsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[appserviceenvironmentsgetinboundnetworkdependenciesendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/javascript/appServiceEnvironmentsGetInboundNetworkDependenciesEndpointsSample.js
[appserviceenvironmentsgetoutboundnetworkdependenciesendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/javascript/appServiceEnvironmentsGetOutboundNetworkDependenciesEndpointsSample.js
[appserviceplanscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/javascript/appServicePlansCreateOrUpdateSample.js
[appserviceplansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/javascript/appServicePlansDeleteSample.js
[appserviceplansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/javascript/appServicePlansGetSample.js
[appserviceplanslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/javascript/appServicePlansListByResourceGroupSample.js
[appserviceplanslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/javascript/appServicePlansListSample.js
[appserviceplansupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appservice/arm-appservice-rest/samples/v1-beta/javascript/appServicePlansUpdateSample.js
[apiref]: https://docs.microsoft.com/rest/api/appservice
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appservice/arm-appservice-rest/README.md
