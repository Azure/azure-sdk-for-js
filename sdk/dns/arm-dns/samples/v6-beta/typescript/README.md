# @azure/arm-dns client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-dns in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dnsResourceReferenceGetByTargetResourcesSample.ts][dnsresourcereferencegetbytargetresourcessample] | returns the DNS records specified by the referencing targetResourceIds. x-ms-original-file: 2023-07-01-preview/GetDnsResourceReference.json                                                                                        |
| [dnssecConfigsCreateOrUpdateSample.ts][dnssecconfigscreateorupdatesample]                           | creates or updates the DNSSEC configuration on a DNS zone. x-ms-original-file: 2023-07-01-preview/CreateOrUpdateDnssecConfig.json                                                                                                  |
| [dnssecConfigsDeleteSample.ts][dnssecconfigsdeletesample]                                           | deletes the DNSSEC configuration on a DNS zone. This operation cannot be undone. x-ms-original-file: 2023-07-01-preview/DeleteDnssecConfig.json                                                                                    |
| [dnssecConfigsGetSample.ts][dnssecconfigsgetsample]                                                 | gets the DNSSEC configuration. x-ms-original-file: 2023-07-01-preview/GetDnssecConfig.json                                                                                                                                         |
| [dnssecConfigsListByDnsZoneSample.ts][dnssecconfigslistbydnszonesample]                             | lists the DNSSEC configurations in a DNS zone. x-ms-original-file: 2023-07-01-preview/ListDnssecConfigsByZone.json                                                                                                                 |
| [recordSetsCreateOrUpdateSample.ts][recordsetscreateorupdatesample]                                 | creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created). x-ms-original-file: 2023-07-01-preview/CreateOrUpdateAAAARecordset.json |
| [recordSetsDeleteSample.ts][recordsetsdeletesample]                                                 | deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted). x-ms-original-file: 2023-07-01-preview/DeleteAAAARecordset.json  |
| [recordSetsGetSample.ts][recordsetsgetsample]                                                       | gets a record set. x-ms-original-file: 2023-07-01-preview/GetAAAARecordset.json                                                                                                                                                    |
| [recordSetsListAllByDnsZoneSample.ts][recordsetslistallbydnszonesample]                             | lists all record sets in a DNS zone. x-ms-original-file: 2023-07-01-preview/ListAllRecordSetsByZone.json                                                                                                                           |
| [recordSetsListByDnsZoneSample.ts][recordsetslistbydnszonesample]                                   | lists all record sets in a DNS zone. x-ms-original-file: 2023-07-01-preview/ListRecordSetsByZone.json                                                                                                                              |
| [recordSetsListByTypeSample.ts][recordsetslistbytypesample]                                         | lists the record sets of a specified type in a DNS zone. x-ms-original-file: 2023-07-01-preview/ListAAAARecordset.json                                                                                                             |
| [recordSetsUpdateSample.ts][recordsetsupdatesample]                                                 | updates a record set within a DNS zone. x-ms-original-file: 2023-07-01-preview/PatchAAAARecordset.json                                                                                                                             |
| [zonesCreateOrUpdateSample.ts][zonescreateorupdatesample]                                           | creates or updates a DNS zone. Does not modify DNS records within the zone. x-ms-original-file: 2023-07-01-preview/CreateOrUpdateZone.json                                                                                         |
| [zonesDeleteSample.ts][zonesdeletesample]                                                           | deletes a DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone. x-ms-original-file: 2023-07-01-preview/DeleteZone.json                                                             |
| [zonesGetSample.ts][zonesgetsample]                                                                 | gets a DNS zone. Retrieves the zone properties, but not the record sets within the zone. x-ms-original-file: 2023-07-01-preview/GetZone.json                                                                                       |
| [zonesListByResourceGroupSample.ts][zoneslistbyresourcegroupsample]                                 | lists the DNS zones within a resource group. x-ms-original-file: 2023-07-01-preview/ListZonesByResourceGroup.json                                                                                                                  |
| [zonesListSample.ts][zoneslistsample]                                                               | lists the DNS zones in all resource groups in a subscription. x-ms-original-file: 2023-07-01-preview/ListZonesBySubscription.json                                                                                                  |
| [zonesUpdateSample.ts][zonesupdatesample]                                                           | updates a DNS zone. Does not modify DNS records within the zone. x-ms-original-file: 2023-07-01-preview/PatchZone.json                                                                                                             |

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
node dist/dnsResourceReferenceGetByTargetResourcesSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/dnsResourceReferenceGetByTargetResourcesSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dnsresourcereferencegetbytargetresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/dnsResourceReferenceGetByTargetResourcesSample.ts
[dnssecconfigscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/dnssecConfigsCreateOrUpdateSample.ts
[dnssecconfigsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/dnssecConfigsDeleteSample.ts
[dnssecconfigsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/dnssecConfigsGetSample.ts
[dnssecconfigslistbydnszonesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/dnssecConfigsListByDnsZoneSample.ts
[recordsetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/recordSetsCreateOrUpdateSample.ts
[recordsetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/recordSetsDeleteSample.ts
[recordsetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/recordSetsGetSample.ts
[recordsetslistallbydnszonesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/recordSetsListAllByDnsZoneSample.ts
[recordsetslistbydnszonesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/recordSetsListByDnsZoneSample.ts
[recordsetslistbytypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/recordSetsListByTypeSample.ts
[recordsetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/recordSetsUpdateSample.ts
[zonescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/zonesCreateOrUpdateSample.ts
[zonesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/zonesDeleteSample.ts
[zonesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/zonesGetSample.ts
[zoneslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/zonesListByResourceGroupSample.ts
[zoneslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/zonesListSample.ts
[zonesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dns/arm-dns/samples/v6-beta/typescript/src/zonesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-dns?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dns/arm-dns/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
