# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [privateZonesCreateOrUpdateSample.ts][privatezonescreateorupdatesample]               | Creates or updates a Private DNS zone. Does not modify Links to virtual networks or DNS records within the zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZonePut.json                                                                                                                                           |
| [privateZonesDeleteSample.ts][privatezonesdeletesample]                               | Deletes a Private DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone. Private DNS zone cannot be deleted unless all virtual network links to it are removed. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZoneDelete.json                                          |
| [privateZonesGetSample.ts][privatezonesgetsample]                                     | Gets a Private DNS zone. Retrieves the zone properties, but not the virtual networks links or the record sets within the zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZoneGet.json                                                                                                                             |
| [privateZonesListByResourceGroupSample.ts][privatezoneslistbyresourcegroupsample]     | Lists the Private DNS zones within a resource group. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZoneListInResourceGroup.json                                                                                                                                                                                       |
| [privateZonesListSample.ts][privatezoneslistsample]                                   | Lists the Private DNS zones in all resource groups in a subscription. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZoneListInSubscription.json                                                                                                                                                                       |
| [privateZonesUpdateSample.ts][privatezonesupdatesample]                               | Updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZonePatch.json                                                                                                                                                        |
| [recordSetsCreateOrUpdateSample.ts][recordsetscreateorupdatesample]                   | Creates or updates a record set within a Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetAPut.json                                                                                                                                                                                                  |
| [recordSetsDeleteSample.ts][recordsetsdeletesample]                                   | Deletes a record set from a Private DNS zone. This operation cannot be undone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetADelete.json                                                                                                                                                                           |
| [recordSetsGetSample.ts][recordsetsgetsample]                                         | Gets a record set. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetAGet.json                                                                                                                                                                                                                                          |
| [recordSetsListByTypeSample.ts][recordsetslistbytypesample]                           | Lists the record sets of a specified type in a Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetAList.json                                                                                                                                                                                           |
| [recordSetsListSample.ts][recordsetslistsample]                                       | Lists all record sets in a Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetALLList.json                                                                                                                                                                                                             |
| [recordSetsUpdateSample.ts][recordsetsupdatesample]                                   | Updates a record set within a Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/RecordSetAPatch.json                                                                                                                                                                                                           |
| [virtualNetworkLinksCreateOrUpdateSample.ts][virtualnetworklinkscreateorupdatesample] | Creates or updates a virtual network link to the specified Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/VirtualNetworkLinkPut.json                                                                                                                                                                        |
| [virtualNetworkLinksDeleteSample.ts][virtualnetworklinksdeletesample]                 | Deletes a virtual network link to the specified Private DNS zone. WARNING: In case of a registration virtual network, all auto-registered DNS records in the zone for the virtual network will also be deleted. This operation cannot be undone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/VirtualNetworkLinkDelete.json |
| [virtualNetworkLinksGetSample.ts][virtualnetworklinksgetsample]                       | Gets a virtual network link to the specified Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/VirtualNetworkLinkGet.json                                                                                                                                                                                      |
| [virtualNetworkLinksListSample.ts][virtualnetworklinkslistsample]                     | Lists the virtual network links to the specified Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/VirtualNetworkLinkList.json                                                                                                                                                                                 |
| [virtualNetworkLinksUpdateSample.ts][virtualnetworklinksupdatesample]                 | Updates a virtual network link to the specified Private DNS zone. x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/VirtualNetworkLinkPatch.json                                                                                                                                                                                 |

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
node dist/privateZonesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env PRIVATEDNS_SUBSCRIPTION_ID="<privatedns subscription id>" PRIVATEDNS_RESOURCE_GROUP="<privatedns resource group>" node dist/privateZonesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[privatezonescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/privateZonesCreateOrUpdateSample.ts
[privatezonesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/privateZonesDeleteSample.ts
[privatezonesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/privateZonesGetSample.ts
[privatezoneslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/privateZonesListByResourceGroupSample.ts
[privatezoneslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/privateZonesListSample.ts
[privatezonesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/privateZonesUpdateSample.ts
[recordsetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/recordSetsCreateOrUpdateSample.ts
[recordsetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/recordSetsDeleteSample.ts
[recordsetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/recordSetsGetSample.ts
[recordsetslistbytypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/recordSetsListByTypeSample.ts
[recordsetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/recordSetsListSample.ts
[recordsetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/recordSetsUpdateSample.ts
[virtualnetworklinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/virtualNetworkLinksCreateOrUpdateSample.ts
[virtualnetworklinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/virtualNetworkLinksDeleteSample.ts
[virtualnetworklinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/virtualNetworkLinksGetSample.ts
[virtualnetworklinkslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/virtualNetworkLinksListSample.ts
[virtualnetworklinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v3/typescript/src/virtualNetworkLinksUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-privatedns?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/privatedns/arm-privatedns/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
