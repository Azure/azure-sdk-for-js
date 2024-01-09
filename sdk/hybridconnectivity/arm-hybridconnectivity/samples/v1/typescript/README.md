# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsCreateOrUpdateSample.ts][endpointscreateorupdatesample]                                         | Create or update the endpoint to the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsPutCustom.json                                           |
| [endpointsDeleteSample.ts][endpointsdeletesample]                                                         | Deletes the endpoint access to the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsDeleteDefault.json                                         |
| [endpointsGetSample.ts][endpointsgetsample]                                                               | Gets the endpoint to the resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsGetCustom.json                                                              |
| [endpointsListCredentialsSample.ts][endpointslistcredentialssample]                                       | Gets the endpoint access credentials to the resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsPostListCredentials.json                                 |
| [endpointsListIngressGatewayCredentialsSample.ts][endpointslistingressgatewaycredentialssample]           | Gets the ingress gateway endpoint credentials x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsPostListIngressGatewayCredentials.json                           |
| [endpointsListManagedProxyDetailsSample.ts][endpointslistmanagedproxydetailssample]                       | Fetches the managed proxy details x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsPostListManagedProxyDetails.json                                             |
| [endpointsListSample.ts][endpointslistsample]                                                             | List of endpoints to the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsList.json                                                            |
| [endpointsUpdateSample.ts][endpointsupdatesample]                                                         | Update the endpoint to the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsPatchDefault.json                                                  |
| [operationsListSample.ts][operationslistsample]                                                           | Lists the available Hybrid Connectivity REST API operations. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/OperationsList.json                                        |
| [serviceConfigurationsCreateOrupdateSample.ts][serviceconfigurationscreateorupdatesample]                 | Create or update a service in serviceConfiguration for the endpoint resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/ServiceConfigurationsPutSSH.json          |
| [serviceConfigurationsDeleteSample.ts][serviceconfigurationsdeletesample]                                 | Deletes the service details to the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/ServiceConfigurationsDeleteSSH.json                                 |
| [serviceConfigurationsGetSample.ts][serviceconfigurationsgetsample]                                       | Gets the details about the service to the resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/ServiceConfigurationsGetSSH.json                                    |
| [serviceConfigurationsListByEndpointResourceSample.ts][serviceconfigurationslistbyendpointresourcesample] | API to enumerate registered services in service configurations under a Endpoint Resource x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/ServiceConfigurationsList.json |
| [serviceConfigurationsUpdateSample.ts][serviceconfigurationsupdatesample]                                 | Update the service details in the service configurations of the target resource. x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/ServiceConfigurationsPatchSSH.json     |

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
node dist/endpointsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/endpointsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/endpointsCreateOrUpdateSample.ts
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/endpointsDeleteSample.ts
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/endpointsGetSample.ts
[endpointslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/endpointsListCredentialsSample.ts
[endpointslistingressgatewaycredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/endpointsListIngressGatewayCredentialsSample.ts
[endpointslistmanagedproxydetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/endpointsListManagedProxyDetailsSample.ts
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/endpointsListSample.ts
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/endpointsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/operationsListSample.ts
[serviceconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/serviceConfigurationsCreateOrupdateSample.ts
[serviceconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/serviceConfigurationsDeleteSample.ts
[serviceconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/serviceConfigurationsGetSample.ts
[serviceconfigurationslistbyendpointresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/serviceConfigurationsListByEndpointResourceSample.ts
[serviceconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v1/typescript/src/serviceConfigurationsUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-hybridconnectivity?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridconnectivity/arm-hybridconnectivity/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
