# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [deleteDnsForwardingRuleset.js][deletednsforwardingruleset]                                               | Deletes a DNS forwarding ruleset. WARNING: This operation cannot be undone. All forwarding rules within the ruleset will be deleted. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_Delete.json |
| [deleteDnsResolver.js][deletednsresolver]                                                                 | Deletes a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_Delete.json                                                                             |
| [deleteForwardingRuleInADnsForwardingRuleset.js][deleteforwardingruleinadnsforwardingruleset]             | Deletes a forwarding rule in a DNS forwarding ruleset. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/ForwardingRule_Delete.json                                           |
| [deleteInboundEndpointForDnsResolver.js][deleteinboundendpointfordnsresolver]                             | Deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/InboundEndpoint_Delete.json                                                 |
| [deleteOutboundEndpointForDnsResolver.js][deleteoutboundendpointfordnsresolver]                           | Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/OutboundEndpoint_Delete.json                                               |
| [deleteVirtualNetworkLinkToADnsForwardingRuleset.js][deletevirtualnetworklinktoadnsforwardingruleset]     | Deletes a virtual network link to a DNS forwarding ruleset. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/VirtualNetworkLink_Delete.json                                  |
| [listDnsForwardingRulesetsByResourceGroup.js][listdnsforwardingrulesetsbyresourcegroup]                   | Lists DNS forwarding rulesets within a resource group. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_ListByResourceGroup.json                                                                  |
| [listDnsForwardingRulesetsBySubscription.js][listdnsforwardingrulesetsbysubscription]                     | Lists DNS forwarding rulesets in all resource groups of a subscription. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_ListBySubscription.json                                                  |
| [listDnsForwardingRulesetsByVirtualNetwork.js][listdnsforwardingrulesetsbyvirtualnetwork]                 | Lists DNS forwarding ruleset resource IDs attached to a virtual network. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_ListByVirtualNetwork.json                                               |
| [listDnsResolversByResourceGroup.js][listdnsresolversbyresourcegroup]                                     | Lists DNS resolvers within a resource group. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_ListByResourceGroup.json                                                                                     |
| [listDnsResolversBySubscription.js][listdnsresolversbysubscription]                                       | Lists DNS resolvers in all resource groups of a subscription. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_ListBySubscription.json                                                                     |
| [listDnsResolversByVirtualNetwork.js][listdnsresolversbyvirtualnetwork]                                   | Lists DNS resolver resource IDs linked to a virtual network. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_ListByVirtualNetwork.json                                                                    |
| [listForwardingRulesInADnsForwardingRuleset.js][listforwardingrulesinadnsforwardingruleset]               | Lists forwarding rules in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/ForwardingRule_List.json                                                                                          |
| [listInboundEndpointsByDnsResolver.js][listinboundendpointsbydnsresolver]                                 | Lists inbound endpoints for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/InboundEndpoint_List.json                                                                                                 |
| [listOutboundEndpointsByDnsResolver.js][listoutboundendpointsbydnsresolver]                               | Lists outbound endpoints for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/OutboundEndpoint_List.json                                                                                               |
| [listVirtualNetworkLinksToADnsForwardingRuleset.js][listvirtualnetworklinkstoadnsforwardingruleset]       | Lists virtual network links to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/VirtualNetworkLink_List.json                                                                                 |
| [retrieveDnsForwardingRuleset.js][retrievednsforwardingruleset]                                           | Gets a DNS forwarding ruleset properties. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_Get.json                                                                                               |
| [retrieveDnsResolver.js][retrievednsresolver]                                                             | Gets properties of a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_Get.json                                                                                                               |
| [retrieveForwardingRuleInADnsForwardingRuleset.js][retrieveforwardingruleinadnsforwardingruleset]         | Gets properties of a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/ForwardingRule_Get.json                                                                             |
| [retrieveInboundEndpointForDnsResolver.js][retrieveinboundendpointfordnsresolver]                         | Gets properties of an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/InboundEndpoint_Get.json                                                                                   |
| [retrieveOutboundEndpointForDnsResolver.js][retrieveoutboundendpointfordnsresolver]                       | Gets properties of an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/OutboundEndpoint_Get.json                                                                                 |
| [retrieveVirtualNetworkLinkToADnsForwardingRuleset.js][retrievevirtualnetworklinktoadnsforwardingruleset] | Gets properties of a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/VirtualNetworkLink_Get.json                                                                    |
| [updateDnsForwardingRuleset.js][updatednsforwardingruleset]                                               | Updates a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_Patch.json                                                                                                     |
| [updateDnsResolver.js][updatednsresolver]                                                                 | Updates a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_Patch.json                                                                                                                        |
| [updateForwardingRuleInADnsForwardingRuleset.js][updateforwardingruleinadnsforwardingruleset]             | Updates a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/ForwardingRule_Patch.json                                                                                      |
| [updateInboundEndpointForDnsResolver.js][updateinboundendpointfordnsresolver]                             | Updates an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/InboundEndpoint_Patch.json                                                                                            |
| [updateOutboundEndpointForDnsResolver.js][updateoutboundendpointfordnsresolver]                           | Updates an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/OutboundEndpoint_Patch.json                                                                                          |
| [updateVirtualNetworkLinkToADnsForwardingRuleset.js][updatevirtualnetworklinktoadnsforwardingruleset]     | Updates a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/VirtualNetworkLink_Patch.json                                                                             |
| [upsertDnsForwardingRuleset.js][upsertdnsforwardingruleset]                                               | Creates or updates a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_Put.json                                                                                            |
| [upsertDnsResolver.js][upsertdnsresolver]                                                                 | Creates or updates a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_Put.json                                                                                                               |
| [upsertForwardingRuleInADnsForwardingRuleset.js][upsertforwardingruleinadnsforwardingruleset]             | Creates or updates a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/ForwardingRule_Put.json                                                                             |
| [upsertInboundEndpointForDnsResolver.js][upsertinboundendpointfordnsresolver]                             | Creates or updates an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/InboundEndpoint_Put.json                                                                                   |
| [upsertOutboundEndpointForDnsResolver.js][upsertoutboundendpointfordnsresolver]                           | Creates or updates an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/OutboundEndpoint_Put.json                                                                                 |
| [upsertVirtualNetworkLinkToADnsForwardingRuleset.js][upsertvirtualnetworklinktoadnsforwardingruleset]     | Creates or updates a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/VirtualNetworkLink_Put.json                                                                    |

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
node deleteDnsForwardingRuleset.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node deleteDnsForwardingRuleset.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deletednsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/deleteDnsForwardingRuleset.js
[deletednsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/deleteDnsResolver.js
[deleteforwardingruleinadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/deleteForwardingRuleInADnsForwardingRuleset.js
[deleteinboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/deleteInboundEndpointForDnsResolver.js
[deleteoutboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/deleteOutboundEndpointForDnsResolver.js
[deletevirtualnetworklinktoadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/deleteVirtualNetworkLinkToADnsForwardingRuleset.js
[listdnsforwardingrulesetsbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/listDnsForwardingRulesetsByResourceGroup.js
[listdnsforwardingrulesetsbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/listDnsForwardingRulesetsBySubscription.js
[listdnsforwardingrulesetsbyvirtualnetwork]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/listDnsForwardingRulesetsByVirtualNetwork.js
[listdnsresolversbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/listDnsResolversByResourceGroup.js
[listdnsresolversbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/listDnsResolversBySubscription.js
[listdnsresolversbyvirtualnetwork]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/listDnsResolversByVirtualNetwork.js
[listforwardingrulesinadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/listForwardingRulesInADnsForwardingRuleset.js
[listinboundendpointsbydnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/listInboundEndpointsByDnsResolver.js
[listoutboundendpointsbydnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/listOutboundEndpointsByDnsResolver.js
[listvirtualnetworklinkstoadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/listVirtualNetworkLinksToADnsForwardingRuleset.js
[retrievednsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/retrieveDnsForwardingRuleset.js
[retrievednsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/retrieveDnsResolver.js
[retrieveforwardingruleinadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/retrieveForwardingRuleInADnsForwardingRuleset.js
[retrieveinboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/retrieveInboundEndpointForDnsResolver.js
[retrieveoutboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/retrieveOutboundEndpointForDnsResolver.js
[retrievevirtualnetworklinktoadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/retrieveVirtualNetworkLinkToADnsForwardingRuleset.js
[updatednsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/updateDnsForwardingRuleset.js
[updatednsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/updateDnsResolver.js
[updateforwardingruleinadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/updateForwardingRuleInADnsForwardingRuleset.js
[updateinboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/updateInboundEndpointForDnsResolver.js
[updateoutboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/updateOutboundEndpointForDnsResolver.js
[updatevirtualnetworklinktoadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/updateVirtualNetworkLinkToADnsForwardingRuleset.js
[upsertdnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/upsertDnsForwardingRuleset.js
[upsertdnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/upsertDnsResolver.js
[upsertforwardingruleinadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/upsertForwardingRuleInADnsForwardingRuleset.js
[upsertinboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/upsertInboundEndpointForDnsResolver.js
[upsertoutboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/upsertOutboundEndpointForDnsResolver.js
[upsertvirtualnetworklinktoadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/javascript/upsertVirtualNetworkLinkToADnsForwardingRuleset.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-dnsresolver?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dnsresolver/arm-dnsresolver/README.md
