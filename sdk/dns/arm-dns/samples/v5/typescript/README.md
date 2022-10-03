# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dnsResourceReferenceGetByTargetResourcesSample.ts][dnsresourcereferencegetbytargetresourcessample] | Returns the DNS records specified by the referencing targetResourceIds. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/GetDnsResourceReference.json                            |
| [recordSetsCreateOrUpdateSample.ts][recordsetscreateorupdatesample]                                 | Creates or updates a record set within a DNS zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/CreateOrUpdateARecordset.json                                                |
| [recordSetsDeleteSample.ts][recordsetsdeletesample]                                                 | Deletes a record set from a DNS zone. This operation cannot be undone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/DeleteARecordset.json                                    |
| [recordSetsGetSample.ts][recordsetsgetsample]                                                       | Gets a record set. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/GetARecordset.json                                                                                           |
| [recordSetsListAllByDnsZoneSample.ts][recordsetslistallbydnszonesample]                             | Lists all record sets in a DNS zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/ListRecordSetsByZone.json                                                                  |
| [recordSetsListByDnsZoneSample.ts][recordsetslistbydnszonesample]                                   | Lists all record sets in a DNS zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/ListRecordSetsByZone.json                                                                  |
| [recordSetsListByTypeSample.ts][recordsetslistbytypesample]                                         | Lists the record sets of a specified type in a DNS zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/ListARecordset.json                                                    |
| [recordSetsUpdateSample.ts][recordsetsupdatesample]                                                 | Updates a record set within a DNS zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/PatchARecordset.json                                                                    |
| [zonesCreateOrUpdateSample.ts][zonescreateorupdatesample]                                           | Creates or updates a DNS zone. Does not modify DNS records within the zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/CreateOrUpdateZone.json                             |
| [zonesDeleteSample.ts][zonesdeletesample]                                                           | Deletes a DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/DeleteZone.json |
| [zonesGetSample.ts][zonesgetsample]                                                                 | Gets a DNS zone. Retrieves the zone properties, but not the record sets within the zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/GetZone.json                           |
| [zonesListByResourceGroupSample.ts][zoneslistbyresourcegroupsample]                                 | Lists the DNS zones within a resource group. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/ListZonesByResourceGroup.json                                                      |
| [zonesListSample.ts][zoneslistsample]                                                               | Lists the DNS zones in all resource groups in a subscription. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/ListZonesBySubscription.json                                      |
| [zonesUpdateSample.ts][zonesupdatesample]                                                           | Updates a DNS zone. Does not modify DNS records within the zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/PatchZone.json                                                 |

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
node dist/dnsResourceReferenceGetByTargetResourcesSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/dnsResourceReferenceGetByTargetResourcesSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dnsresourcereferencegetbytargetresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/dnsResourceReferenceGetByTargetResourcesSample.ts
[recordsetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/recordSetsCreateOrUpdateSample.ts
[recordsetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/recordSetsDeleteSample.ts
[recordsetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/recordSetsGetSample.ts
[recordsetslistallbydnszonesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/recordSetsListAllByDnsZoneSample.ts
[recordsetslistbydnszonesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/recordSetsListByDnsZoneSample.ts
[recordsetslistbytypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/recordSetsListByTypeSample.ts
[recordsetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/recordSetsUpdateSample.ts
[zonescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/zonesCreateOrUpdateSample.ts
[zonesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/zonesDeleteSample.ts
[zonesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/zonesGetSample.ts
[zoneslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/zonesListByResourceGroupSample.ts
[zoneslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/zonesListSample.ts
[zonesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/typescript/src/zonesUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-dns?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dns/arm-dns/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
