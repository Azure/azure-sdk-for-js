# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [privateZonesCreateOrUpdateSample.js][privatezonescreateorupdatesample]               | Creates or updates a Private DNS zone. Does not modify Links to virtual networks or DNS records within the zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZonePut.json                                                                                                                                           |
| [privateZonesDeleteSample.js][privatezonesdeletesample]                               | Deletes a Private DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone. Private DNS zone cannot be deleted unless all virtual network links to it are removed. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZoneDelete.json                                          |
| [privateZonesGetSample.js][privatezonesgetsample]                                     | Gets a Private DNS zone. Retrieves the zone properties, but not the virtual networks links or the record sets within the zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZoneGet.json                                                                                                                             |
| [privateZonesListByResourceGroupSample.js][privatezoneslistbyresourcegroupsample]     | Lists the Private DNS zones within a resource group. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZoneListInResourceGroup.json                                                                                                                                                                                       |
| [privateZonesListSample.js][privatezoneslistsample]                                   | Lists the Private DNS zones in all resource groups in a subscription. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZoneListInSubscription.json                                                                                                                                                                       |
| [privateZonesUpdateSample.js][privatezonesupdatesample]                               | Updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZonePatch.json                                                                                                                                                        |
| [recordSetsCreateOrUpdateSample.js][recordsetscreateorupdatesample]                   | Creates or updates a record set within a Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetAPut.json                                                                                                                                                                                                  |
| [recordSetsDeleteSample.js][recordsetsdeletesample]                                   | Deletes a record set from a Private DNS zone. This operation cannot be undone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetADelete.json                                                                                                                                                                           |
| [recordSetsGetSample.js][recordsetsgetsample]                                         | Gets a record set. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetAGet.json                                                                                                                                                                                                                                          |
| [recordSetsListByTypeSample.js][recordsetslistbytypesample]                           | Lists the record sets of a specified type in a Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetAList.json                                                                                                                                                                                           |
| [recordSetsListSample.js][recordsetslistsample]                                       | Lists all record sets in a Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetALLList.json                                                                                                                                                                                                             |
| [recordSetsUpdateSample.js][recordsetsupdatesample]                                   | Updates a record set within a Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetAPatch.json                                                                                                                                                                                                           |
| [virtualNetworkLinksCreateOrUpdateSample.js][virtualnetworklinkscreateorupdatesample] | Creates or updates a virtual network link to the specified Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/VirtualNetworkLinkPut.json                                                                                                                                                                        |
| [virtualNetworkLinksDeleteSample.js][virtualnetworklinksdeletesample]                 | Deletes a virtual network link to the specified Private DNS zone. WARNING: In case of a registration virtual network, all auto-registered DNS records in the zone for the virtual network will also be deleted. This operation cannot be undone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/VirtualNetworkLinkDelete.json |
| [virtualNetworkLinksGetSample.js][virtualnetworklinksgetsample]                       | Gets a virtual network link to the specified Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/VirtualNetworkLinkGet.json                                                                                                                                                                                      |
| [virtualNetworkLinksListSample.js][virtualnetworklinkslistsample]                     | Lists the virtual network links to the specified Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/VirtualNetworkLinkList.json                                                                                                                                                                                 |
| [virtualNetworkLinksUpdateSample.js][virtualnetworklinksupdatesample]                 | Updates a virtual network link to the specified Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/VirtualNetworkLinkPatch.json                                                                                                                                                                                 |

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
node privateZonesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env PRIVATEDNS_SUBSCRIPTION_ID="<privatedns subscription id>" PRIVATEDNS_RESOURCE_GROUP="<privatedns resource group>" node privateZonesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[privatezonescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/privateZonesCreateOrUpdateSample.js
[privatezonesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/privateZonesDeleteSample.js
[privatezonesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/privateZonesGetSample.js
[privatezoneslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/privateZonesListByResourceGroupSample.js
[privatezoneslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/privateZonesListSample.js
[privatezonesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/privateZonesUpdateSample.js
[recordsetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/recordSetsCreateOrUpdateSample.js
[recordsetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/recordSetsDeleteSample.js
[recordsetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/recordSetsGetSample.js
[recordsetslistbytypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/recordSetsListByTypeSample.js
[recordsetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/recordSetsListSample.js
[recordsetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/recordSetsUpdateSample.js
[virtualnetworklinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/virtualNetworkLinksCreateOrUpdateSample.js
[virtualnetworklinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/virtualNetworkLinksDeleteSample.js
[virtualnetworklinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/virtualNetworkLinksGetSample.js
[virtualnetworklinkslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/virtualNetworkLinksListSample.js
[virtualnetworklinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/javascript/virtualNetworkLinksUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-privatedns?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/privatedns/arm-privatedns/README.md
