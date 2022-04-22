# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dnsResourceReferenceGetByTargetResourcesSample.js][dnsresourcereferencegetbytargetresourcessample] | Returns the DNS records specified by the referencing targetResourceIds. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/GetDnsResourceReference.json                            |
| [recordSetsCreateOrUpdateSample.js][recordsetscreateorupdatesample]                                 | Creates or updates a record set within a DNS zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/CreateOrUpdateARecordset.json                                                |
| [recordSetsDeleteSample.js][recordsetsdeletesample]                                                 | Deletes a record set from a DNS zone. This operation cannot be undone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/DeleteARecordset.json                                    |
| [recordSetsGetSample.js][recordsetsgetsample]                                                       | Gets a record set. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/GetARecordset.json                                                                                           |
| [recordSetsListAllByDnsZoneSample.js][recordsetslistallbydnszonesample]                             | Lists all record sets in a DNS zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/ListRecordSetsByZone.json                                                                  |
| [recordSetsListByDnsZoneSample.js][recordsetslistbydnszonesample]                                   | Lists all record sets in a DNS zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/ListRecordSetsByZone.json                                                                  |
| [recordSetsListByTypeSample.js][recordsetslistbytypesample]                                         | Lists the record sets of a specified type in a DNS zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/ListARecordset.json                                                    |
| [recordSetsUpdateSample.js][recordsetsupdatesample]                                                 | Updates a record set within a DNS zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/PatchARecordset.json                                                                    |
| [zonesCreateOrUpdateSample.js][zonescreateorupdatesample]                                           | Creates or updates a DNS zone. Does not modify DNS records within the zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/CreateOrUpdateZone.json                             |
| [zonesDeleteSample.js][zonesdeletesample]                                                           | Deletes a DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/DeleteZone.json |
| [zonesGetSample.js][zonesgetsample]                                                                 | Gets a DNS zone. Retrieves the zone properties, but not the record sets within the zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/GetZone.json                           |
| [zonesListByResourceGroupSample.js][zoneslistbyresourcegroupsample]                                 | Lists the DNS zones within a resource group. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/ListZonesByResourceGroup.json                                                      |
| [zonesListSample.js][zoneslistsample]                                                               | Lists the DNS zones in all resource groups in a subscription. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/ListZonesBySubscription.json                                      |
| [zonesUpdateSample.js][zonesupdatesample]                                                           | Updates a DNS zone. Does not modify DNS records within the zone. x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/stable/2018-05-01/examples/PatchZone.json                                                 |

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
node dnsResourceReferenceGetByTargetResourcesSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dnsResourceReferenceGetByTargetResourcesSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dnsresourcereferencegetbytargetresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/dnsResourceReferenceGetByTargetResourcesSample.js
[recordsetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/recordSetsCreateOrUpdateSample.js
[recordsetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/recordSetsDeleteSample.js
[recordsetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/recordSetsGetSample.js
[recordsetslistallbydnszonesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/recordSetsListAllByDnsZoneSample.js
[recordsetslistbydnszonesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/recordSetsListByDnsZoneSample.js
[recordsetslistbytypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/recordSetsListByTypeSample.js
[recordsetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/recordSetsUpdateSample.js
[zonescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/zonesCreateOrUpdateSample.js
[zonesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/zonesDeleteSample.js
[zonesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/zonesGetSample.js
[zoneslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/zonesListByResourceGroupSample.js
[zoneslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/zonesListSample.js
[zonesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v5/javascript/zonesUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-dns?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dns/arm-dns/README.md
