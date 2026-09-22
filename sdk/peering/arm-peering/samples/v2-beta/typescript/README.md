# @azure/arm-peering client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-peering in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cdnPeeringPrefixesListSample.ts][cdnpeeringprefixeslistsample]                                         | lists all of the advertised prefixes for the specified peering location x-ms-original-file: 2025-05-01/ListCdnPeeringPrefixes.json                                                                             |
| [checkServiceProviderAvailabilitySample.ts][checkserviceprovideravailabilitysample]                     | checks if the peering service provider is present within 1000 miles of customer's location x-ms-original-file: 2025-05-01/CheckServiceProviderAvailability.json                                                |
| [connectionMonitorTestsCreateOrUpdateSample.ts][connectionmonitortestscreateorupdatesample]             | creates or updates a connection monitor test with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/CreateOrUpdateConnectionMonitorTest.json |
| [connectionMonitorTestsDeleteSample.ts][connectionmonitortestsdeletesample]                             | deletes an existing connection monitor test with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/DeleteConnectionMonitorTest.json          |
| [connectionMonitorTestsGetSample.ts][connectionmonitortestsgetsample]                                   | gets an existing connection monitor test with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/GetConnectionMonitorTest.json                |
| [connectionMonitorTestsListByPeeringServiceSample.ts][connectionmonitortestslistbypeeringservicesample] | lists all connection monitor tests under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/ListConnectionMonitorTestsByPeeringService.json                            |
| [legacyPeeringsListSample.ts][legacypeeringslistsample]                                                 | lists all of the legacy peerings under the given subscription matching the specified kind and location. x-ms-original-file: 2025-05-01/ListLegacyPeerings.json                                                 |
| [lookingGlassInvokeSample.ts][lookingglassinvokesample]                                                 | run looking glass functionality x-ms-original-file: 2025-05-01/LookingGlassInvokeCommand.json                                                                                                                  |
| [operationsListSample.ts][operationslistsample]                                                         | list the operations for the provider x-ms-original-file: 2025-05-01/ListPeeringOperations.json                                                                                                                 |
| [peerAsnsCreateOrUpdateSample.ts][peerasnscreateorupdatesample]                                         | creates a new peer ASN or updates an existing peer ASN with the specified name under the given subscription. x-ms-original-file: 2025-05-01/CreatePeerAsn.json                                                 |
| [peerAsnsDeleteSample.ts][peerasnsdeletesample]                                                         | deletes an existing peer ASN with the specified name under the given subscription. x-ms-original-file: 2025-05-01/DeletePeerAsn.json                                                                           |
| [peerAsnsGetSample.ts][peerasnsgetsample]                                                               | gets the peer ASN with the specified name under the given subscription. x-ms-original-file: 2025-05-01/GetPeerAsn.json                                                                                         |
| [peerAsnsListBySubscriptionSample.ts][peerasnslistbysubscriptionsample]                                 | lists all of the peer ASNs under the given subscription. x-ms-original-file: 2025-05-01/ListPeerAsnsBySubscription.json                                                                                        |
| [peeringLocationsListSample.ts][peeringlocationslistsample]                                             | lists all of the available peering locations for the specified kind of peering. x-ms-original-file: 2025-05-01/ListDirectPeeringLocations.json                                                                 |
| [peeringServiceCountriesListSample.ts][peeringservicecountrieslistsample]                               | lists all of the available countries for peering service. x-ms-original-file: 2025-05-01/ListPeeringServiceCountriesBySubscription.json                                                                        |
| [peeringServiceLocationsListSample.ts][peeringservicelocationslistsample]                               | lists all of the available locations for peering service. x-ms-original-file: 2025-05-01/ListPeeringServiceLocationsBySubscription.json                                                                        |
| [peeringServiceProvidersListSample.ts][peeringserviceproviderslistsample]                               | lists all of the available peering service locations for the specified kind of peering. x-ms-original-file: 2025-05-01/ListPeeringServiceProviders.json                                                        |
| [peeringServicesCreateOrUpdateSample.ts][peeringservicescreateorupdatesample]                           | creates a new peering service or updates an existing peering with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/CreatePeeringService.json                 |
| [peeringServicesDeleteSample.ts][peeringservicesdeletesample]                                           | deletes an existing peering service with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/DeletePeeringService.json                                          |
| [peeringServicesGetSample.ts][peeringservicesgetsample]                                                 | gets an existing peering service with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/GetPeeringService.json                                                |
| [peeringServicesInitializeConnectionMonitorSample.ts][peeringservicesinitializeconnectionmonitorsample] | initialize Peering Service for Connection Monitor functionality x-ms-original-file: 2025-05-01/InitializeConnectionMonitor.json                                                                                |
| [peeringServicesListByResourceGroupSample.ts][peeringserviceslistbyresourcegroupsample]                 | lists all of the peering services under the given subscription and resource group. x-ms-original-file: 2025-05-01/ListPeeringServicesByResourceGroup.json                                                      |
| [peeringServicesListBySubscriptionSample.ts][peeringserviceslistbysubscriptionsample]                   | lists all of the peerings under the given subscription. x-ms-original-file: 2025-05-01/ListPeeringServicesBySubscription.json                                                                                  |
| [peeringServicesUpdateSample.ts][peeringservicesupdatesample]                                           | updates tags for a peering service with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/UpdatePeeringServiceTags.json                                       |
| [peeringsCreateOrUpdateSample.ts][peeringscreateorupdatesample]                                         | creates a new peering or updates an existing peering with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/CreateDirectPeering.json                          |
| [peeringsDeleteSample.ts][peeringsdeletesample]                                                         | deletes an existing peering with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/DeletePeering.json                                                         |
| [peeringsGetSample.ts][peeringsgetsample]                                                               | gets an existing peering with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/GetPeering.json                                                               |
| [peeringsListByResourceGroupSample.ts][peeringslistbyresourcegroupsample]                               | lists all of the peerings under the given subscription and resource group. x-ms-original-file: 2025-05-01/ListPeeringsByResourceGroup.json                                                                     |
| [peeringsListBySubscriptionSample.ts][peeringslistbysubscriptionsample]                                 | lists all of the peerings under the given subscription. x-ms-original-file: 2025-05-01/ListPeeringsBySubscription.json                                                                                         |
| [peeringsUpdateSample.ts][peeringsupdatesample]                                                         | updates tags for a peering with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/UpdatePeeringTags.json                                                      |
| [prefixesCreateOrUpdateSample.ts][prefixescreateorupdatesample]                                         | creates a new prefix with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/CreatePeeringServicePrefix.json                                  |
| [prefixesDeleteSample.ts][prefixesdeletesample]                                                         | deletes an existing prefix with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/DeletePeeringServicePrefix.json                            |
| [prefixesGetSample.ts][prefixesgetsample]                                                               | gets an existing prefix with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/GetPeeringServicePrefix.json                                  |
| [prefixesListByPeeringServiceSample.ts][prefixeslistbypeeringservicesample]                             | lists all prefixes under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/ListPrefixesByPeeringService.json                                                          |
| [receivedRoutesListByPeeringSample.ts][receivedrouteslistbypeeringsample]                               | lists the prefixes received over the specified peering under the given subscription and resource group. x-ms-original-file: 2025-05-01/GetPeeringReceivedRoutes.json                                           |
| [registeredAsnsCreateOrUpdateSample.ts][registeredasnscreateorupdatesample]                             | creates a new registered ASN with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/CreateRegisteredAsn.json                                         |
| [registeredAsnsDeleteSample.ts][registeredasnsdeletesample]                                             | deletes an existing registered ASN with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/DeleteRegisteredAsn.json                                   |
| [registeredAsnsGetSample.ts][registeredasnsgetsample]                                                   | gets an existing registered ASN with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/GetRegisteredAsn.json                                         |
| [registeredAsnsListByPeeringSample.ts][registeredasnslistbypeeringsample]                               | lists all registered ASNs under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/ListRegisteredAsnsByPeering.json                                                            |
| [registeredPrefixesCreateOrUpdateSample.ts][registeredprefixescreateorupdatesample]                     | creates a new registered prefix with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/CreateRegisteredPrefix.json                                   |
| [registeredPrefixesDeleteSample.ts][registeredprefixesdeletesample]                                     | deletes an existing registered prefix with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/DeleteRegisteredPrefix.json                             |
| [registeredPrefixesGetSample.ts][registeredprefixesgetsample]                                           | gets an existing registered prefix with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/GetRegisteredPrefix.json                                   |
| [registeredPrefixesListByPeeringSample.ts][registeredprefixeslistbypeeringsample]                       | lists all registered prefixes under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/ListRegisteredPrefixesByPeering.json                                                    |
| [registeredPrefixesValidateSample.ts][registeredprefixesvalidatesample]                                 | validates an existing registered prefix with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/ValidateRegisteredPrefix.json                         |
| [rpUnbilledPrefixesListSample.ts][rpunbilledprefixeslistsample]                                         | lists all of the RP unbilled prefixes for the specified peering x-ms-original-file: 2025-05-01/ListRpUnbilledPrefixes.json                                                                                     |

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
node dist/cdnPeeringPrefixesListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/cdnPeeringPrefixesListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cdnpeeringprefixeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/cdnPeeringPrefixesListSample.ts
[checkserviceprovideravailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/checkServiceProviderAvailabilitySample.ts
[connectionmonitortestscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/connectionMonitorTestsCreateOrUpdateSample.ts
[connectionmonitortestsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/connectionMonitorTestsDeleteSample.ts
[connectionmonitortestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/connectionMonitorTestsGetSample.ts
[connectionmonitortestslistbypeeringservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/connectionMonitorTestsListByPeeringServiceSample.ts
[legacypeeringslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/legacyPeeringsListSample.ts
[lookingglassinvokesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/lookingGlassInvokeSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/operationsListSample.ts
[peerasnscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peerAsnsCreateOrUpdateSample.ts
[peerasnsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peerAsnsDeleteSample.ts
[peerasnsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peerAsnsGetSample.ts
[peerasnslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peerAsnsListBySubscriptionSample.ts
[peeringlocationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringLocationsListSample.ts
[peeringservicecountrieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringServiceCountriesListSample.ts
[peeringservicelocationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringServiceLocationsListSample.ts
[peeringserviceproviderslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringServiceProvidersListSample.ts
[peeringservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringServicesCreateOrUpdateSample.ts
[peeringservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringServicesDeleteSample.ts
[peeringservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringServicesGetSample.ts
[peeringservicesinitializeconnectionmonitorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringServicesInitializeConnectionMonitorSample.ts
[peeringserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringServicesListByResourceGroupSample.ts
[peeringserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringServicesListBySubscriptionSample.ts
[peeringservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringServicesUpdateSample.ts
[peeringscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringsCreateOrUpdateSample.ts
[peeringsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringsDeleteSample.ts
[peeringsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringsGetSample.ts
[peeringslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringsListByResourceGroupSample.ts
[peeringslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringsListBySubscriptionSample.ts
[peeringsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/peeringsUpdateSample.ts
[prefixescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/prefixesCreateOrUpdateSample.ts
[prefixesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/prefixesDeleteSample.ts
[prefixesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/prefixesGetSample.ts
[prefixeslistbypeeringservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/prefixesListByPeeringServiceSample.ts
[receivedrouteslistbypeeringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/receivedRoutesListByPeeringSample.ts
[registeredasnscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/registeredAsnsCreateOrUpdateSample.ts
[registeredasnsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/registeredAsnsDeleteSample.ts
[registeredasnsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/registeredAsnsGetSample.ts
[registeredasnslistbypeeringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/registeredAsnsListByPeeringSample.ts
[registeredprefixescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/registeredPrefixesCreateOrUpdateSample.ts
[registeredprefixesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/registeredPrefixesDeleteSample.ts
[registeredprefixesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/registeredPrefixesGetSample.ts
[registeredprefixeslistbypeeringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/registeredPrefixesListByPeeringSample.ts
[registeredprefixesvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/registeredPrefixesValidateSample.ts
[rpunbilledprefixeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/typescript/src/rpUnbilledPrefixesListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-peering?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/peering/arm-peering/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
