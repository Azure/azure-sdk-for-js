# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                                                     | **Description**                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateSample.ts][accountscreatesample]                                                                                                   | Creates or updates Account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Accounts/Accounts_Create.json                                                                                                                                                                          |
| [accountsDeleteSample.ts][accountsdeletesample]                                                                                                   | Deletes account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Accounts/Accounts_Delete.json                                                                                                                                                                                     |
| [accountsGetSample.ts][accountsgetsample]                                                                                                         | Returns account details for the given account name. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Accounts/Accounts_Get.json                                                                                                                                                     |
| [accountsHeadSample.ts][accountsheadsample]                                                                                                       | Checks whether account exists. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Accounts/Accounts_Head.json                                                                                                                                                                         |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample]                                                                         | Returns list of Accounts. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Accounts/Accounts_List.json                                                                                                                                                                              |
| [accountsListBySubscriptionSample.ts][accountslistbysubscriptionsample]                                                                           | Returns list of Accounts. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Accounts/Accounts_List.json                                                                                                                                                                              |
| [accountsUpdateSample.ts][accountsupdatesample]                                                                                                   | Updates account's patchable properties x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Accounts/Accounts_Update.json                                                                                                                                                               |
| [checkNameAvailabilitySample.ts][checknameavailabilitysample]                                                                                     | Checks ADU resource name availability. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/CheckNameAvailability_AlreadyExists.json                                                                                                                                                    |
| [instancesCreateSample.ts][instancescreatesample]                                                                                                 | Creates or updates instance. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Instances/Instances_Create.json                                                                                                                                                                       |
| [instancesDeleteSample.ts][instancesdeletesample]                                                                                                 | Deletes instance. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Instances/Instances_Delete.json                                                                                                                                                                                  |
| [instancesGetSample.ts][instancesgetsample]                                                                                                       | Returns instance details for the given instance and account name. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Instances/Instances_Get.json                                                                                                                                     |
| [instancesHeadSample.ts][instancesheadsample]                                                                                                     | Checks whether instance exists. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Instances/Instances_Head.json                                                                                                                                                                      |
| [instancesListByAccountSample.ts][instanceslistbyaccountsample]                                                                                   | Returns instances for the given account name. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Instances/Instances_ListByAccount.json                                                                                                                                               |
| [instancesUpdateSample.ts][instancesupdatesample]                                                                                                 | Updates instance's tags. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Instances/Instances_Update.json                                                                                                                                                                           |
| [operationsListSample.ts][operationslistsample]                                                                                                   | Returns list of operations for Microsoft.DeviceUpdate resource provider. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/Operations_List.json                                                                                                                                      |
| [privateEndpointConnectionProxiesCreateOrUpdateSample.ts][privateendpointconnectionproxiescreateorupdatesample]                                   | (INTERNAL - DO NOT USE) Creates or updates the specified private endpoint connection proxy resource associated with the device update account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_CreateOrUpdate.json |
| [privateEndpointConnectionProxiesDeleteSample.ts][privateendpointconnectionproxiesdeletesample]                                                   | (INTERNAL - DO NOT USE) Deletes the specified private endpoint connection proxy associated with the device update account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_Delete.json                             |
| [privateEndpointConnectionProxiesGetSample.ts][privateendpointconnectionproxiesgetsample]                                                         | (INTERNAL - DO NOT USE) Get the specified private endpoint connection proxy associated with the device update account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_Get.json                                    |
| [privateEndpointConnectionProxiesListByAccountSample.ts][privateendpointconnectionproxieslistbyaccountsample]                                     | (INTERNAL - DO NOT USE) List all private endpoint connection proxies in a device update account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_ListByAccount.json                                                |
| [privateEndpointConnectionProxiesUpdatePrivateEndpointPropertiesSample.ts][privateendpointconnectionproxiesupdateprivateendpointpropertiessample] | (INTERNAL - DO NOT USE) Updates a private endpoint inside the private endpoint connection proxy object. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_PrivateEndpointUpdate.json                                 |
| [privateEndpointConnectionProxiesValidateSample.ts][privateendpointconnectionproxiesvalidatesample]                                               | (INTERNAL - DO NOT USE) Validates a private endpoint connection proxy object. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_Validate.json                                                                        |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]                                               | Update the state of specified private endpoint connection associated with the device update account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateEndpointConnections/PrivateEndpointConnection_CreateOrUpdate.json                                                      |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                                               | Deletes the specified private endpoint connection associated with the device update account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateEndpointConnections/PrivateEndpointConnection_Delete.json                                                                      |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                                                     | Get the specified private endpoint connection associated with the device update account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateEndpointConnections/PrivateEndpointConnection_Get.json                                                                             |
| [privateEndpointConnectionsListByAccountSample.ts][privateendpointconnectionslistbyaccountsample]                                                 | List all private endpoint connections in a device update account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateEndpointConnections/PrivateEndpointConnection_ListByAccount.json                                                                                          |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                                                                 | Get the specified private link resource associated with the device update account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateLinkResources/PrivateLinkResources_Get.json                                                                                              |
| [privateLinkResourcesListByAccountSample.ts][privatelinkresourceslistbyaccountsample]                                                             | List all private link resources in a device update account. x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/preview/2022-04-01-preview/examples/PrivateLinkResources/PrivateLinkResources_ListByAccount.json                                                                                                           |

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
node dist/accountsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/accountsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/accountsCreateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/accountsGetSample.ts
[accountsheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/accountsHeadSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/accountsListByResourceGroupSample.ts
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/accountsListBySubscriptionSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/accountsUpdateSample.ts
[checknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/checkNameAvailabilitySample.ts
[instancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/instancesCreateSample.ts
[instancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/instancesDeleteSample.ts
[instancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/instancesGetSample.ts
[instancesheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/instancesHeadSample.ts
[instanceslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/instancesListByAccountSample.ts
[instancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/instancesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionproxiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateEndpointConnectionProxiesCreateOrUpdateSample.ts
[privateendpointconnectionproxiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateEndpointConnectionProxiesDeleteSample.ts
[privateendpointconnectionproxiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateEndpointConnectionProxiesGetSample.ts
[privateendpointconnectionproxieslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateEndpointConnectionProxiesListByAccountSample.ts
[privateendpointconnectionproxiesupdateprivateendpointpropertiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateEndpointConnectionProxiesUpdatePrivateEndpointPropertiesSample.ts
[privateendpointconnectionproxiesvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateEndpointConnectionProxiesValidateSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateEndpointConnectionsListByAccountSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/arm-deviceupdate/samples/v1-beta/typescript/src/privateLinkResourcesListByAccountSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-deviceupdate?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceupdate/arm-deviceupdate/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
