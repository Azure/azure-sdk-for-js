# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsCreateOrUpdateSample.js][endpointscreateorupdatesample]                                         | Create or update the endpoint to the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsPutCustom.json                                           |
| [endpointsDeleteSample.js][endpointsdeletesample]                                                         | Deletes the endpoint access to the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsDeleteDefault.json                                         |
| [endpointsGetSample.js][endpointsgetsample]                                                               | Gets the endpoint to the resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsGetCustom.json                                                              |
| [endpointsListCredentialsSample.js][endpointslistcredentialssample]                                       | Gets the endpoint access credentials to the resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsPostListCredentials.json                                 |
| [endpointsListIngressGatewayCredentialsSample.js][endpointslistingressgatewaycredentialssample]           | Gets the ingress gateway endpoint credentials x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsPostListIngressGatewayCredentials.json                           |
| [endpointsListManagedProxyDetailsSample.js][endpointslistmanagedproxydetailssample]                       | Fetches the managed proxy details x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsPostListManagedProxyDetails.json                                             |
| [endpointsListSample.js][endpointslistsample]                                                             | List of endpoints to the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsList.json                                                            |
| [endpointsUpdateSample.js][endpointsupdatesample]                                                         | Update the endpoint to the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsPatchDefault.json                                                  |
| [operationsListSample.js][operationslistsample]                                                           | Lists the available Hybrid Connectivity REST API operations. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/OperationsList.json                                        |
| [serviceConfigurationsCreateOrupdateSample.js][serviceconfigurationscreateorupdatesample]                 | Create or update a service in serviceConfiguration for the endpoint resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/ServiceConfigurationsPutSSH.json          |
| [serviceConfigurationsDeleteSample.js][serviceconfigurationsdeletesample]                                 | Deletes the service details to the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/ServiceConfigurationsDeleteSSH.json                                 |
| [serviceConfigurationsGetSample.js][serviceconfigurationsgetsample]                                       | Gets the details about the service to the resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/ServiceConfigurationsGetSSH.json                                    |
| [serviceConfigurationsListByEndpointResourceSample.js][serviceconfigurationslistbyendpointresourcesample] | API to enumerate registered services in service configurations under a Endpoint Resource x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/ServiceConfigurationsList.json |
| [serviceConfigurationsUpdateSample.js][serviceconfigurationsupdatesample]                                 | Update the service details in the service configurations of the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/ServiceConfigurationsPatchSSH.json     |

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
node endpointsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node endpointsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/endpointsCreateOrUpdateSample.js
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/endpointsDeleteSample.js
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/endpointsGetSample.js
[endpointslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/endpointsListCredentialsSample.js
[endpointslistingressgatewaycredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/endpointsListIngressGatewayCredentialsSample.js
[endpointslistmanagedproxydetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/endpointsListManagedProxyDetailsSample.js
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/endpointsListSample.js
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/endpointsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/operationsListSample.js
[serviceconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/serviceConfigurationsCreateOrupdateSample.js
[serviceconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/serviceConfigurationsDeleteSample.js
[serviceconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/serviceConfigurationsGetSample.js
[serviceconfigurationslistbyendpointresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/serviceConfigurationsListByEndpointResourceSample.js
[serviceconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/javascript/serviceConfigurationsUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-hybridconnectivity?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridconnectivity/arm-hybridconnectivity/README.md
