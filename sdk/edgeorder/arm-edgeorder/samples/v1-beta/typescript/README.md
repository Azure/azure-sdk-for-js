# @azure/arm-edgeorder client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-edgeorder in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [addressesCreateSample.ts][addressescreatesample]                                                                           | create a new address with the specified parameters. Existing address cannot be updated with this API and should instead be updated with the Update address API. x-ms-original-file: 2024-02-01/CreateAddress.json |
| [addressesDeleteSample.ts][addressesdeletesample]                                                                           | delete an address. x-ms-original-file: 2024-02-01/DeleteAddressByName.json                                                                                                                                        |
| [addressesGetSample.ts][addressesgetsample]                                                                                 | get information about the specified address. x-ms-original-file: 2024-02-01/GetAddressByName.json                                                                                                                 |
| [addressesListByResourceGroupSample.ts][addresseslistbyresourcegroupsample]                                                 | list all the addresses available under the given resource group. x-ms-original-file: 2024-02-01/ListAddressesAtResourceGroupLevel.json                                                                            |
| [addressesListBySubscriptionSample.ts][addresseslistbysubscriptionsample]                                                   | list all the addresses available under the subscription. x-ms-original-file: 2024-02-01/ListAddressesAtSubscriptionLevel.json                                                                                     |
| [addressesUpdateSample.ts][addressesupdatesample]                                                                           | update the properties of an existing address. x-ms-original-file: 2024-02-01/UpdateAddress.json                                                                                                                   |
| [operationsListSample.ts][operationslistsample]                                                                             | list the operations for the provider x-ms-original-file: 2024-02-01/ListOperations.json                                                                                                                           |
| [orderItemsCancelSample.ts][orderitemscancelsample]                                                                         | cancel order item. x-ms-original-file: 2024-02-01/CancelOrderItem.json                                                                                                                                            |
| [orderItemsCreateSample.ts][orderitemscreatesample]                                                                         | create an order item. Existing order item cannot be updated with this api and should instead be updated with the Update order item API. x-ms-original-file: 2024-02-01/CreateOrderItem.json                       |
| [orderItemsDeleteSample.ts][orderitemsdeletesample]                                                                         | delete an order item. x-ms-original-file: 2024-02-01/DeleteOrderItemByName.json                                                                                                                                   |
| [orderItemsGetSample.ts][orderitemsgetsample]                                                                               | get an order item. x-ms-original-file: 2024-02-01/GetOrderItemByName.json                                                                                                                                         |
| [orderItemsListByResourceGroupSample.ts][orderitemslistbyresourcegroupsample]                                               | list order items at resource group level. x-ms-original-file: 2024-02-01/ListOrderItemsAtResourceGroupLevel.json                                                                                                  |
| [orderItemsListBySubscriptionSample.ts][orderitemslistbysubscriptionsample]                                                 | list order items at subscription level. x-ms-original-file: 2024-02-01/ListOrderItemsAtSubscriptionLevel.json                                                                                                     |
| [orderItemsReturnSample.ts][orderitemsreturnsample]                                                                         | return order item. x-ms-original-file: 2024-02-01/ReturnOrderItem.json                                                                                                                                            |
| [orderItemsUpdateSample.ts][orderitemsupdatesample]                                                                         | update the properties of an existing order item. x-ms-original-file: 2024-02-01/UpdateOrderItem.json                                                                                                              |
| [ordersGetSample.ts][ordersgetsample]                                                                                       | get an order. x-ms-original-file: 2024-02-01/GetOrderByName.json                                                                                                                                                  |
| [ordersListByResourceGroupSample.ts][orderslistbyresourcegroupsample]                                                       | list orders at resource group level. x-ms-original-file: 2024-02-01/ListOrderAtResourceGroupLevel.json                                                                                                            |
| [ordersListBySubscriptionSample.ts][orderslistbysubscriptionsample]                                                         | list orders at subscription level. x-ms-original-file: 2024-02-01/ListOrderAtSubscriptionLevel.json                                                                                                               |
| [productsAndConfigurationsListConfigurationsSample.ts][productsandconfigurationslistconfigurationssample]                   | list configurations for the given product family, product line and product for the given subscription. x-ms-original-file: 2024-02-01/ListConfigurations.json                                                     |
| [productsAndConfigurationsListProductFamiliesMetadataSample.ts][productsandconfigurationslistproductfamiliesmetadatasample] | list product families metadata for the given subscription. x-ms-original-file: 2024-02-01/ListProductFamiliesMetadata.json                                                                                        |
| [productsAndConfigurationsListProductFamiliesSample.ts][productsandconfigurationslistproductfamiliessample]                 | list product families for the given subscription. x-ms-original-file: 2024-02-01/ListProductFamilies.json                                                                                                         |

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
node dist/addressesCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/addressesCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[addressescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/addressesCreateSample.ts
[addressesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/addressesDeleteSample.ts
[addressesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/addressesGetSample.ts
[addresseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/addressesListByResourceGroupSample.ts
[addresseslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/addressesListBySubscriptionSample.ts
[addressesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/addressesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/operationsListSample.ts
[orderitemscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/orderItemsCancelSample.ts
[orderitemscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/orderItemsCreateSample.ts
[orderitemsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/orderItemsDeleteSample.ts
[orderitemsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/orderItemsGetSample.ts
[orderitemslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/orderItemsListByResourceGroupSample.ts
[orderitemslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/orderItemsListBySubscriptionSample.ts
[orderitemsreturnsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/orderItemsReturnSample.ts
[orderitemsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/orderItemsUpdateSample.ts
[ordersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/ordersGetSample.ts
[orderslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/ordersListByResourceGroupSample.ts
[orderslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/ordersListBySubscriptionSample.ts
[productsandconfigurationslistconfigurationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/productsAndConfigurationsListConfigurationsSample.ts
[productsandconfigurationslistproductfamiliesmetadatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/productsAndConfigurationsListProductFamiliesMetadataSample.ts
[productsandconfigurationslistproductfamiliessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/typescript/src/productsAndConfigurationsListProductFamiliesSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-edgeorder?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/edgeorder/arm-edgeorder/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
