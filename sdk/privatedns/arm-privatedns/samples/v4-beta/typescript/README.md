# @azure/arm-privatedns client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-privatedns in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [privateZonesCreateOrUpdateSample.ts][privatezonescreateorupdatesample]               | creates or updates a Private DNS zone. Does not modify Links to virtual networks or DNS records within the zone. x-ms-original-file: 2024-06-01/PrivateZonePut.json                                                                                                                                           |
| [privateZonesDeleteSample.ts][privatezonesdeletesample]                               | deletes a Private DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone. Private DNS zone cannot be deleted unless all virtual network links to it are removed. x-ms-original-file: 2024-06-01/PrivateZoneDelete.json                                          |
| [privateZonesGetSample.ts][privatezonesgetsample]                                     | gets a Private DNS zone. Retrieves the zone properties, but not the virtual networks links or the record sets within the zone. x-ms-original-file: 2024-06-01/PrivateZoneGet.json                                                                                                                             |
| [privateZonesListByResourceGroupSample.ts][privatezoneslistbyresourcegroupsample]     | lists the Private DNS zones within a resource group. x-ms-original-file: 2024-06-01/PrivateZoneListInResourceGroup.json                                                                                                                                                                                       |
| [privateZonesListSample.ts][privatezoneslistsample]                                   | lists the Private DNS zones in all resource groups in a subscription. x-ms-original-file: 2024-06-01/PrivateZoneListInSubscription.json                                                                                                                                                                       |
| [privateZonesUpdateSample.ts][privatezonesupdatesample]                               | updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone. x-ms-original-file: 2024-06-01/PrivateZonePatch.json                                                                                                                                                        |
| [recordSetsCreateOrUpdateSample.ts][recordsetscreateorupdatesample]                   | creates or updates a record set within a Private DNS zone. x-ms-original-file: 2024-06-01/RecordSetAAAAPut.json                                                                                                                                                                                               |
| [recordSetsDeleteSample.ts][recordsetsdeletesample]                                   | deletes a record set from a Private DNS zone. This operation cannot be undone. x-ms-original-file: 2024-06-01/RecordSetAAAADelete.json                                                                                                                                                                        |
| [recordSetsGetSample.ts][recordsetsgetsample]                                         | gets a record set. x-ms-original-file: 2024-06-01/RecordSetAAAAGet.json                                                                                                                                                                                                                                       |
| [recordSetsListByTypeSample.ts][recordsetslistbytypesample]                           | lists the record sets of a specified type in a Private DNS zone. x-ms-original-file: 2024-06-01/RecordSetAAAAList.json                                                                                                                                                                                        |
| [recordSetsListSample.ts][recordsetslistsample]                                       | lists all record sets in a Private DNS zone. x-ms-original-file: 2024-06-01/RecordSetALLList.json                                                                                                                                                                                                             |
| [recordSetsUpdateSample.ts][recordsetsupdatesample]                                   | updates a record set within a Private DNS zone. x-ms-original-file: 2024-06-01/RecordSetAAAAPatch.json                                                                                                                                                                                                        |
| [virtualNetworkLinksCreateOrUpdateSample.ts][virtualnetworklinkscreateorupdatesample] | creates or updates a virtual network link to the specified Private DNS zone. x-ms-original-file: 2024-06-01/VirtualNetworkLinkPut.json                                                                                                                                                                        |
| [virtualNetworkLinksDeleteSample.ts][virtualnetworklinksdeletesample]                 | deletes a virtual network link to the specified Private DNS zone. WARNING: In case of a registration virtual network, all auto-registered DNS records in the zone for the virtual network will also be deleted. This operation cannot be undone. x-ms-original-file: 2024-06-01/VirtualNetworkLinkDelete.json |
| [virtualNetworkLinksGetSample.ts][virtualnetworklinksgetsample]                       | gets a virtual network link to the specified Private DNS zone. x-ms-original-file: 2024-06-01/VirtualNetworkLinkGet.json                                                                                                                                                                                      |
| [virtualNetworkLinksListSample.ts][virtualnetworklinkslistsample]                     | lists the virtual network links to the specified Private DNS zone. x-ms-original-file: 2024-06-01/VirtualNetworkLinkList.json                                                                                                                                                                                 |
| [virtualNetworkLinksUpdateSample.ts][virtualnetworklinksupdatesample]                 | updates a virtual network link to the specified Private DNS zone. x-ms-original-file: 2024-06-01/VirtualNetworkLinkPatch.json                                                                                                                                                                                 |

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
npx dev-tool run vendored cross-env  node dist/privateZonesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[privatezonescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/privateZonesCreateOrUpdateSample.ts
[privatezonesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/privateZonesDeleteSample.ts
[privatezonesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/privateZonesGetSample.ts
[privatezoneslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/privateZonesListByResourceGroupSample.ts
[privatezoneslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/privateZonesListSample.ts
[privatezonesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/privateZonesUpdateSample.ts
[recordsetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/recordSetsCreateOrUpdateSample.ts
[recordsetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/recordSetsDeleteSample.ts
[recordsetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/recordSetsGetSample.ts
[recordsetslistbytypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/recordSetsListByTypeSample.ts
[recordsetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/recordSetsListSample.ts
[recordsetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/recordSetsUpdateSample.ts
[virtualnetworklinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/virtualNetworkLinksCreateOrUpdateSample.ts
[virtualnetworklinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/virtualNetworkLinksDeleteSample.ts
[virtualnetworklinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/virtualNetworkLinksGetSample.ts
[virtualnetworklinkslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/virtualNetworkLinksListSample.ts
[virtualnetworklinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/privatedns/arm-privatedns/samples/v4-beta/typescript/src/virtualNetworkLinksUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-privatedns?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/privatedns/arm-privatedns/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
