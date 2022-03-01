# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [deleteDnsForwardingRuleset.ts][deletednsforwardingruleset]                                               | Deletes a DNS forwarding ruleset. WARNING: This operation cannot be undone. All forwarding rules within the ruleset will be deleted. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_Delete.json |
| [deleteDnsResolver.ts][deletednsresolver]                                                                 | Deletes a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_Delete.json                                                                             |
| [deleteForwardingRuleInADnsForwardingRuleset.ts][deleteforwardingruleinadnsforwardingruleset]             | Deletes a forwarding rule in a DNS forwarding ruleset. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/ForwardingRule_Delete.json                                           |
| [deleteInboundEndpointForDnsResolver.ts][deleteinboundendpointfordnsresolver]                             | Deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/InboundEndpoint_Delete.json                                                 |
| [deleteOutboundEndpointForDnsResolver.ts][deleteoutboundendpointfordnsresolver]                           | Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/OutboundEndpoint_Delete.json                                               |
| [deleteVirtualNetworkLinkToADnsForwardingRuleset.ts][deletevirtualnetworklinktoadnsforwardingruleset]     | Deletes a virtual network link to a DNS forwarding ruleset. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/VirtualNetworkLink_Delete.json                                  |
| [listDnsForwardingRulesetsByResourceGroup.ts][listdnsforwardingrulesetsbyresourcegroup]                   | Lists DNS forwarding rulesets within a resource group. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_ListByResourceGroup.json                                                                  |
| [listDnsForwardingRulesetsBySubscription.ts][listdnsforwardingrulesetsbysubscription]                     | Lists DNS forwarding rulesets in all resource groups of a subscription. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_ListBySubscription.json                                                  |
| [listDnsForwardingRulesetsByVirtualNetwork.ts][listdnsforwardingrulesetsbyvirtualnetwork]                 | Lists DNS forwarding ruleset resource IDs attached to a virtual network. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_ListByVirtualNetwork.json                                               |
| [listDnsResolversByResourceGroup.ts][listdnsresolversbyresourcegroup]                                     | Lists DNS resolvers within a resource group. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_ListByResourceGroup.json                                                                                     |
| [listDnsResolversBySubscription.ts][listdnsresolversbysubscription]                                       | Lists DNS resolvers in all resource groups of a subscription. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_ListBySubscription.json                                                                     |
| [listDnsResolversByVirtualNetwork.ts][listdnsresolversbyvirtualnetwork]                                   | Lists DNS resolver resource IDs linked to a virtual network. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_ListByVirtualNetwork.json                                                                    |
| [listForwardingRulesInADnsForwardingRuleset.ts][listforwardingrulesinadnsforwardingruleset]               | Lists forwarding rules in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/ForwardingRule_List.json                                                                                          |
| [listInboundEndpointsByDnsResolver.ts][listinboundendpointsbydnsresolver]                                 | Lists inbound endpoints for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/InboundEndpoint_List.json                                                                                                 |
| [listOutboundEndpointsByDnsResolver.ts][listoutboundendpointsbydnsresolver]                               | Lists outbound endpoints for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/OutboundEndpoint_List.json                                                                                               |
| [listVirtualNetworkLinksToADnsForwardingRuleset.ts][listvirtualnetworklinkstoadnsforwardingruleset]       | Lists virtual network links to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/VirtualNetworkLink_List.json                                                                                 |
| [retrieveDnsForwardingRuleset.ts][retrievednsforwardingruleset]                                           | Gets a DNS forwarding ruleset properties. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_Get.json                                                                                               |
| [retrieveDnsResolver.ts][retrievednsresolver]                                                             | Gets properties of a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_Get.json                                                                                                               |
| [retrieveForwardingRuleInADnsForwardingRuleset.ts][retrieveforwardingruleinadnsforwardingruleset]         | Gets properties of a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/ForwardingRule_Get.json                                                                             |
| [retrieveInboundEndpointForDnsResolver.ts][retrieveinboundendpointfordnsresolver]                         | Gets properties of an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/InboundEndpoint_Get.json                                                                                   |
| [retrieveOutboundEndpointForDnsResolver.ts][retrieveoutboundendpointfordnsresolver]                       | Gets properties of an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/OutboundEndpoint_Get.json                                                                                 |
| [retrieveVirtualNetworkLinkToADnsForwardingRuleset.ts][retrievevirtualnetworklinktoadnsforwardingruleset] | Gets properties of a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/VirtualNetworkLink_Get.json                                                                    |
| [updateDnsForwardingRuleset.ts][updatednsforwardingruleset]                                               | Updates a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_Patch.json                                                                                                     |
| [updateDnsResolver.ts][updatednsresolver]                                                                 | Updates a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_Patch.json                                                                                                                        |
| [updateForwardingRuleInADnsForwardingRuleset.ts][updateforwardingruleinadnsforwardingruleset]             | Updates a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/ForwardingRule_Patch.json                                                                                      |
| [updateInboundEndpointForDnsResolver.ts][updateinboundendpointfordnsresolver]                             | Updates an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/InboundEndpoint_Patch.json                                                                                            |
| [updateOutboundEndpointForDnsResolver.ts][updateoutboundendpointfordnsresolver]                           | Updates an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/OutboundEndpoint_Patch.json                                                                                          |
| [updateVirtualNetworkLinkToADnsForwardingRuleset.ts][updatevirtualnetworklinktoadnsforwardingruleset]     | Updates a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/VirtualNetworkLink_Patch.json                                                                             |
| [upsertDnsForwardingRuleset.ts][upsertdnsforwardingruleset]                                               | Creates or updates a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsForwardingRuleset_Put.json                                                                                            |
| [upsertDnsResolver.ts][upsertdnsresolver]                                                                 | Creates or updates a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/DnsResolver_Put.json                                                                                                               |
| [upsertForwardingRuleInADnsForwardingRuleset.ts][upsertforwardingruleinadnsforwardingruleset]             | Creates or updates a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/ForwardingRule_Put.json                                                                             |
| [upsertInboundEndpointForDnsResolver.ts][upsertinboundendpointfordnsresolver]                             | Creates or updates an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/InboundEndpoint_Put.json                                                                                   |
| [upsertOutboundEndpointForDnsResolver.ts][upsertoutboundendpointfordnsresolver]                           | Creates or updates an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/OutboundEndpoint_Put.json                                                                                 |
| [upsertVirtualNetworkLinkToADnsForwardingRuleset.ts][upsertvirtualnetworklinktoadnsforwardingruleset]     | Creates or updates a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2020-04-01-preview/examples/VirtualNetworkLink_Put.json                                                                    |

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
node dist/deleteDnsForwardingRuleset.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/deleteDnsForwardingRuleset.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deletednsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/deleteDnsForwardingRuleset.ts
[deletednsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/deleteDnsResolver.ts
[deleteforwardingruleinadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/deleteForwardingRuleInADnsForwardingRuleset.ts
[deleteinboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/deleteInboundEndpointForDnsResolver.ts
[deleteoutboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/deleteOutboundEndpointForDnsResolver.ts
[deletevirtualnetworklinktoadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/deleteVirtualNetworkLinkToADnsForwardingRuleset.ts
[listdnsforwardingrulesetsbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/listDnsForwardingRulesetsByResourceGroup.ts
[listdnsforwardingrulesetsbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/listDnsForwardingRulesetsBySubscription.ts
[listdnsforwardingrulesetsbyvirtualnetwork]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/listDnsForwardingRulesetsByVirtualNetwork.ts
[listdnsresolversbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/listDnsResolversByResourceGroup.ts
[listdnsresolversbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/listDnsResolversBySubscription.ts
[listdnsresolversbyvirtualnetwork]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/listDnsResolversByVirtualNetwork.ts
[listforwardingrulesinadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/listForwardingRulesInADnsForwardingRuleset.ts
[listinboundendpointsbydnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/listInboundEndpointsByDnsResolver.ts
[listoutboundendpointsbydnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/listOutboundEndpointsByDnsResolver.ts
[listvirtualnetworklinkstoadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/listVirtualNetworkLinksToADnsForwardingRuleset.ts
[retrievednsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/retrieveDnsForwardingRuleset.ts
[retrievednsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/retrieveDnsResolver.ts
[retrieveforwardingruleinadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/retrieveForwardingRuleInADnsForwardingRuleset.ts
[retrieveinboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/retrieveInboundEndpointForDnsResolver.ts
[retrieveoutboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/retrieveOutboundEndpointForDnsResolver.ts
[retrievevirtualnetworklinktoadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/retrieveVirtualNetworkLinkToADnsForwardingRuleset.ts
[updatednsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/updateDnsForwardingRuleset.ts
[updatednsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/updateDnsResolver.ts
[updateforwardingruleinadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/updateForwardingRuleInADnsForwardingRuleset.ts
[updateinboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/updateInboundEndpointForDnsResolver.ts
[updateoutboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/updateOutboundEndpointForDnsResolver.ts
[updatevirtualnetworklinktoadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/updateVirtualNetworkLinkToADnsForwardingRuleset.ts
[upsertdnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/upsertDnsForwardingRuleset.ts
[upsertdnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/upsertDnsResolver.ts
[upsertforwardingruleinadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/upsertForwardingRuleInADnsForwardingRuleset.ts
[upsertinboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/upsertInboundEndpointForDnsResolver.ts
[upsertoutboundendpointfordnsresolver]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/upsertOutboundEndpointForDnsResolver.ts
[upsertvirtualnetworklinktoadnsforwardingruleset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1-beta/typescript/src/upsertVirtualNetworkLinkToADnsForwardingRuleset.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-dnsresolver?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dnsresolver/arm-dnsresolver/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
