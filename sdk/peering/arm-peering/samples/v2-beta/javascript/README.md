# @azure/arm-peering client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-peering in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cdnPeeringPrefixesListSample.js][cdnpeeringprefixeslistsample]                                         | lists all of the advertised prefixes for the specified peering location x-ms-original-file: 2025-05-01/ListCdnPeeringPrefixes.json                                                                             |
| [checkServiceProviderAvailabilitySample.js][checkserviceprovideravailabilitysample]                     | checks if the peering service provider is present within 1000 miles of customer's location x-ms-original-file: 2025-05-01/CheckServiceProviderAvailability.json                                                |
| [connectionMonitorTestsCreateOrUpdateSample.js][connectionmonitortestscreateorupdatesample]             | creates or updates a connection monitor test with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/CreateOrUpdateConnectionMonitorTest.json |
| [connectionMonitorTestsDeleteSample.js][connectionmonitortestsdeletesample]                             | deletes an existing connection monitor test with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/DeleteConnectionMonitorTest.json          |
| [connectionMonitorTestsGetSample.js][connectionmonitortestsgetsample]                                   | gets an existing connection monitor test with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/GetConnectionMonitorTest.json                |
| [connectionMonitorTestsListByPeeringServiceSample.js][connectionmonitortestslistbypeeringservicesample] | lists all connection monitor tests under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/ListConnectionMonitorTestsByPeeringService.json                            |
| [legacyPeeringsListSample.js][legacypeeringslistsample]                                                 | lists all of the legacy peerings under the given subscription matching the specified kind and location. x-ms-original-file: 2025-05-01/ListLegacyPeerings.json                                                 |
| [lookingGlassInvokeSample.js][lookingglassinvokesample]                                                 | run looking glass functionality x-ms-original-file: 2025-05-01/LookingGlassInvokeCommand.json                                                                                                                  |
| [operationsListSample.js][operationslistsample]                                                         | list the operations for the provider x-ms-original-file: 2025-05-01/ListPeeringOperations.json                                                                                                                 |
| [peerAsnsCreateOrUpdateSample.js][peerasnscreateorupdatesample]                                         | creates a new peer ASN or updates an existing peer ASN with the specified name under the given subscription. x-ms-original-file: 2025-05-01/CreatePeerAsn.json                                                 |
| [peerAsnsDeleteSample.js][peerasnsdeletesample]                                                         | deletes an existing peer ASN with the specified name under the given subscription. x-ms-original-file: 2025-05-01/DeletePeerAsn.json                                                                           |
| [peerAsnsGetSample.js][peerasnsgetsample]                                                               | gets the peer ASN with the specified name under the given subscription. x-ms-original-file: 2025-05-01/GetPeerAsn.json                                                                                         |
| [peerAsnsListBySubscriptionSample.js][peerasnslistbysubscriptionsample]                                 | lists all of the peer ASNs under the given subscription. x-ms-original-file: 2025-05-01/ListPeerAsnsBySubscription.json                                                                                        |
| [peeringLocationsListSample.js][peeringlocationslistsample]                                             | lists all of the available peering locations for the specified kind of peering. x-ms-original-file: 2025-05-01/ListDirectPeeringLocations.json                                                                 |
| [peeringServiceCountriesListSample.js][peeringservicecountrieslistsample]                               | lists all of the available countries for peering service. x-ms-original-file: 2025-05-01/ListPeeringServiceCountriesBySubscription.json                                                                        |
| [peeringServiceLocationsListSample.js][peeringservicelocationslistsample]                               | lists all of the available locations for peering service. x-ms-original-file: 2025-05-01/ListPeeringServiceLocationsBySubscription.json                                                                        |
| [peeringServiceProvidersListSample.js][peeringserviceproviderslistsample]                               | lists all of the available peering service locations for the specified kind of peering. x-ms-original-file: 2025-05-01/ListPeeringServiceProviders.json                                                        |
| [peeringServicesCreateOrUpdateSample.js][peeringservicescreateorupdatesample]                           | creates a new peering service or updates an existing peering with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/CreatePeeringService.json                 |
| [peeringServicesDeleteSample.js][peeringservicesdeletesample]                                           | deletes an existing peering service with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/DeletePeeringService.json                                          |
| [peeringServicesGetSample.js][peeringservicesgetsample]                                                 | gets an existing peering service with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/GetPeeringService.json                                                |
| [peeringServicesInitializeConnectionMonitorSample.js][peeringservicesinitializeconnectionmonitorsample] | initialize Peering Service for Connection Monitor functionality x-ms-original-file: 2025-05-01/InitializeConnectionMonitor.json                                                                                |
| [peeringServicesListByResourceGroupSample.js][peeringserviceslistbyresourcegroupsample]                 | lists all of the peering services under the given subscription and resource group. x-ms-original-file: 2025-05-01/ListPeeringServicesByResourceGroup.json                                                      |
| [peeringServicesListBySubscriptionSample.js][peeringserviceslistbysubscriptionsample]                   | lists all of the peerings under the given subscription. x-ms-original-file: 2025-05-01/ListPeeringServicesBySubscription.json                                                                                  |
| [peeringServicesUpdateSample.js][peeringservicesupdatesample]                                           | updates tags for a peering service with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/UpdatePeeringServiceTags.json                                       |
| [peeringsCreateOrUpdateSample.js][peeringscreateorupdatesample]                                         | creates a new peering or updates an existing peering with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/CreateDirectPeering.json                          |
| [peeringsDeleteSample.js][peeringsdeletesample]                                                         | deletes an existing peering with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/DeletePeering.json                                                         |
| [peeringsGetSample.js][peeringsgetsample]                                                               | gets an existing peering with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/GetPeering.json                                                               |
| [peeringsListByResourceGroupSample.js][peeringslistbyresourcegroupsample]                               | lists all of the peerings under the given subscription and resource group. x-ms-original-file: 2025-05-01/ListPeeringsByResourceGroup.json                                                                     |
| [peeringsListBySubscriptionSample.js][peeringslistbysubscriptionsample]                                 | lists all of the peerings under the given subscription. x-ms-original-file: 2025-05-01/ListPeeringsBySubscription.json                                                                                         |
| [peeringsUpdateSample.js][peeringsupdatesample]                                                         | updates tags for a peering with the specified name under the given subscription and resource group. x-ms-original-file: 2025-05-01/UpdatePeeringTags.json                                                      |
| [prefixesCreateOrUpdateSample.js][prefixescreateorupdatesample]                                         | creates a new prefix with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/CreatePeeringServicePrefix.json                                  |
| [prefixesDeleteSample.js][prefixesdeletesample]                                                         | deletes an existing prefix with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/DeletePeeringServicePrefix.json                            |
| [prefixesGetSample.js][prefixesgetsample]                                                               | gets an existing prefix with the specified name under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/GetPeeringServicePrefix.json                                  |
| [prefixesListByPeeringServiceSample.js][prefixeslistbypeeringservicesample]                             | lists all prefixes under the given subscription, resource group and peering service. x-ms-original-file: 2025-05-01/ListPrefixesByPeeringService.json                                                          |
| [receivedRoutesListByPeeringSample.js][receivedrouteslistbypeeringsample]                               | lists the prefixes received over the specified peering under the given subscription and resource group. x-ms-original-file: 2025-05-01/GetPeeringReceivedRoutes.json                                           |
| [registeredAsnsCreateOrUpdateSample.js][registeredasnscreateorupdatesample]                             | creates a new registered ASN with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/CreateRegisteredAsn.json                                         |
| [registeredAsnsDeleteSample.js][registeredasnsdeletesample]                                             | deletes an existing registered ASN with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/DeleteRegisteredAsn.json                                   |
| [registeredAsnsGetSample.js][registeredasnsgetsample]                                                   | gets an existing registered ASN with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/GetRegisteredAsn.json                                         |
| [registeredAsnsListByPeeringSample.js][registeredasnslistbypeeringsample]                               | lists all registered ASNs under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/ListRegisteredAsnsByPeering.json                                                            |
| [registeredPrefixesCreateOrUpdateSample.js][registeredprefixescreateorupdatesample]                     | creates a new registered prefix with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/CreateRegisteredPrefix.json                                   |
| [registeredPrefixesDeleteSample.js][registeredprefixesdeletesample]                                     | deletes an existing registered prefix with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/DeleteRegisteredPrefix.json                             |
| [registeredPrefixesGetSample.js][registeredprefixesgetsample]                                           | gets an existing registered prefix with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/GetRegisteredPrefix.json                                   |
| [registeredPrefixesListByPeeringSample.js][registeredprefixeslistbypeeringsample]                       | lists all registered prefixes under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/ListRegisteredPrefixesByPeering.json                                                    |
| [registeredPrefixesValidateSample.js][registeredprefixesvalidatesample]                                 | validates an existing registered prefix with the specified name under the given subscription, resource group and peering. x-ms-original-file: 2025-05-01/ValidateRegisteredPrefix.json                         |
| [rpUnbilledPrefixesListSample.js][rpunbilledprefixeslistsample]                                         | lists all of the RP unbilled prefixes for the specified peering x-ms-original-file: 2025-05-01/ListRpUnbilledPrefixes.json                                                                                     |

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
node cdnPeeringPrefixesListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node cdnPeeringPrefixesListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cdnpeeringprefixeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/cdnPeeringPrefixesListSample.js
[checkserviceprovideravailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/checkServiceProviderAvailabilitySample.js
[connectionmonitortestscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/connectionMonitorTestsCreateOrUpdateSample.js
[connectionmonitortestsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/connectionMonitorTestsDeleteSample.js
[connectionmonitortestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/connectionMonitorTestsGetSample.js
[connectionmonitortestslistbypeeringservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/connectionMonitorTestsListByPeeringServiceSample.js
[legacypeeringslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/legacyPeeringsListSample.js
[lookingglassinvokesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/lookingGlassInvokeSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/operationsListSample.js
[peerasnscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peerAsnsCreateOrUpdateSample.js
[peerasnsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peerAsnsDeleteSample.js
[peerasnsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peerAsnsGetSample.js
[peerasnslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peerAsnsListBySubscriptionSample.js
[peeringlocationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringLocationsListSample.js
[peeringservicecountrieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringServiceCountriesListSample.js
[peeringservicelocationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringServiceLocationsListSample.js
[peeringserviceproviderslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringServiceProvidersListSample.js
[peeringservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringServicesCreateOrUpdateSample.js
[peeringservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringServicesDeleteSample.js
[peeringservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringServicesGetSample.js
[peeringservicesinitializeconnectionmonitorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringServicesInitializeConnectionMonitorSample.js
[peeringserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringServicesListByResourceGroupSample.js
[peeringserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringServicesListBySubscriptionSample.js
[peeringservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringServicesUpdateSample.js
[peeringscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringsCreateOrUpdateSample.js
[peeringsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringsDeleteSample.js
[peeringsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringsGetSample.js
[peeringslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringsListByResourceGroupSample.js
[peeringslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringsListBySubscriptionSample.js
[peeringsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/peeringsUpdateSample.js
[prefixescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/prefixesCreateOrUpdateSample.js
[prefixesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/prefixesDeleteSample.js
[prefixesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/prefixesGetSample.js
[prefixeslistbypeeringservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/prefixesListByPeeringServiceSample.js
[receivedrouteslistbypeeringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/receivedRoutesListByPeeringSample.js
[registeredasnscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/registeredAsnsCreateOrUpdateSample.js
[registeredasnsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/registeredAsnsDeleteSample.js
[registeredasnsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/registeredAsnsGetSample.js
[registeredasnslistbypeeringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/registeredAsnsListByPeeringSample.js
[registeredprefixescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/registeredPrefixesCreateOrUpdateSample.js
[registeredprefixesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/registeredPrefixesDeleteSample.js
[registeredprefixesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/registeredPrefixesGetSample.js
[registeredprefixeslistbypeeringsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/registeredPrefixesListByPeeringSample.js
[registeredprefixesvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/registeredPrefixesValidateSample.js
[rpunbilledprefixeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/peering/arm-peering/samples/v2-beta/javascript/rpUnbilledPrefixesListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-peering?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/peering/arm-peering/README.md
