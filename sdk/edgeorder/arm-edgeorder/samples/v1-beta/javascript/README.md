# @azure/arm-edgeorder client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-edgeorder in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [addressesCreateSample.js][addressescreatesample]                                                                           | create a new address with the specified parameters. Existing address cannot be updated with this API and should instead be updated with the Update address API. x-ms-original-file: 2024-02-01/CreateAddress.json |
| [addressesDeleteSample.js][addressesdeletesample]                                                                           | delete an address. x-ms-original-file: 2024-02-01/DeleteAddressByName.json                                                                                                                                        |
| [addressesGetSample.js][addressesgetsample]                                                                                 | get information about the specified address. x-ms-original-file: 2024-02-01/GetAddressByName.json                                                                                                                 |
| [addressesListByResourceGroupSample.js][addresseslistbyresourcegroupsample]                                                 | list all the addresses available under the given resource group. x-ms-original-file: 2024-02-01/ListAddressesAtResourceGroupLevel.json                                                                            |
| [addressesListBySubscriptionSample.js][addresseslistbysubscriptionsample]                                                   | list all the addresses available under the subscription. x-ms-original-file: 2024-02-01/ListAddressesAtSubscriptionLevel.json                                                                                     |
| [addressesUpdateSample.js][addressesupdatesample]                                                                           | update the properties of an existing address. x-ms-original-file: 2024-02-01/UpdateAddress.json                                                                                                                   |
| [operationsListSample.js][operationslistsample]                                                                             | list the operations for the provider x-ms-original-file: 2024-02-01/ListOperations.json                                                                                                                           |
| [orderItemsCancelSample.js][orderitemscancelsample]                                                                         | cancel order item. x-ms-original-file: 2024-02-01/CancelOrderItem.json                                                                                                                                            |
| [orderItemsCreateSample.js][orderitemscreatesample]                                                                         | create an order item. Existing order item cannot be updated with this api and should instead be updated with the Update order item API. x-ms-original-file: 2024-02-01/CreateOrderItem.json                       |
| [orderItemsDeleteSample.js][orderitemsdeletesample]                                                                         | delete an order item. x-ms-original-file: 2024-02-01/DeleteOrderItemByName.json                                                                                                                                   |
| [orderItemsGetSample.js][orderitemsgetsample]                                                                               | get an order item. x-ms-original-file: 2024-02-01/GetOrderItemByName.json                                                                                                                                         |
| [orderItemsListByResourceGroupSample.js][orderitemslistbyresourcegroupsample]                                               | list order items at resource group level. x-ms-original-file: 2024-02-01/ListOrderItemsAtResourceGroupLevel.json                                                                                                  |
| [orderItemsListBySubscriptionSample.js][orderitemslistbysubscriptionsample]                                                 | list order items at subscription level. x-ms-original-file: 2024-02-01/ListOrderItemsAtSubscriptionLevel.json                                                                                                     |
| [orderItemsReturnSample.js][orderitemsreturnsample]                                                                         | return order item. x-ms-original-file: 2024-02-01/ReturnOrderItem.json                                                                                                                                            |
| [orderItemsUpdateSample.js][orderitemsupdatesample]                                                                         | update the properties of an existing order item. x-ms-original-file: 2024-02-01/UpdateOrderItem.json                                                                                                              |
| [ordersGetSample.js][ordersgetsample]                                                                                       | get an order. x-ms-original-file: 2024-02-01/GetOrderByName.json                                                                                                                                                  |
| [ordersListByResourceGroupSample.js][orderslistbyresourcegroupsample]                                                       | list orders at resource group level. x-ms-original-file: 2024-02-01/ListOrderAtResourceGroupLevel.json                                                                                                            |
| [ordersListBySubscriptionSample.js][orderslistbysubscriptionsample]                                                         | list orders at subscription level. x-ms-original-file: 2024-02-01/ListOrderAtSubscriptionLevel.json                                                                                                               |
| [productsAndConfigurationsListConfigurationsSample.js][productsandconfigurationslistconfigurationssample]                   | list configurations for the given product family, product line and product for the given subscription. x-ms-original-file: 2024-02-01/ListConfigurations.json                                                     |
| [productsAndConfigurationsListProductFamiliesMetadataSample.js][productsandconfigurationslistproductfamiliesmetadatasample] | list product families metadata for the given subscription. x-ms-original-file: 2024-02-01/ListProductFamiliesMetadata.json                                                                                        |
| [productsAndConfigurationsListProductFamiliesSample.js][productsandconfigurationslistproductfamiliessample]                 | list product families for the given subscription. x-ms-original-file: 2024-02-01/ListProductFamilies.json                                                                                                         |

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
node addressesCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node addressesCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[addressescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/addressesCreateSample.js
[addressesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/addressesDeleteSample.js
[addressesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/addressesGetSample.js
[addresseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/addressesListByResourceGroupSample.js
[addresseslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/addressesListBySubscriptionSample.js
[addressesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/addressesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/operationsListSample.js
[orderitemscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/orderItemsCancelSample.js
[orderitemscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/orderItemsCreateSample.js
[orderitemsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/orderItemsDeleteSample.js
[orderitemsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/orderItemsGetSample.js
[orderitemslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/orderItemsListByResourceGroupSample.js
[orderitemslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/orderItemsListBySubscriptionSample.js
[orderitemsreturnsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/orderItemsReturnSample.js
[orderitemsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/orderItemsUpdateSample.js
[ordersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/ordersGetSample.js
[orderslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/ordersListByResourceGroupSample.js
[orderslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/ordersListBySubscriptionSample.js
[productsandconfigurationslistconfigurationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/productsAndConfigurationsListConfigurationsSample.js
[productsandconfigurationslistproductfamiliesmetadatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/productsAndConfigurationsListProductFamiliesMetadataSample.js
[productsandconfigurationslistproductfamiliessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeorder/arm-edgeorder/samples/v1-beta/javascript/productsAndConfigurationsListProductFamiliesSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-edgeorder?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/edgeorder/arm-edgeorder/README.md
