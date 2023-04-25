# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dnsForwardingRulesetsCreateOrUpdateSample.js][dnsforwardingrulesetscreateorupdatesample]             | Creates or updates a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_Put.json                                                                                            |
| [dnsForwardingRulesetsDeleteSample.js][dnsforwardingrulesetsdeletesample]                             | Deletes a DNS forwarding ruleset. WARNING: This operation cannot be undone. All forwarding rules within the ruleset will be deleted. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_Delete.json |
| [dnsForwardingRulesetsGetSample.js][dnsforwardingrulesetsgetsample]                                   | Gets a DNS forwarding ruleset properties. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_Get.json                                                                                               |
| [dnsForwardingRulesetsListByResourceGroupSample.js][dnsforwardingrulesetslistbyresourcegroupsample]   | Lists DNS forwarding rulesets within a resource group. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_ListByResourceGroup.json                                                                  |
| [dnsForwardingRulesetsListByVirtualNetworkSample.js][dnsforwardingrulesetslistbyvirtualnetworksample] | Lists DNS forwarding ruleset resource IDs attached to a virtual network. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_ListByVirtualNetwork.json                                               |
| [dnsForwardingRulesetsListSample.js][dnsforwardingrulesetslistsample]                                 | Lists DNS forwarding rulesets in all resource groups of a subscription. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_ListBySubscription.json                                                  |
| [dnsForwardingRulesetsUpdateSample.js][dnsforwardingrulesetsupdatesample]                             | Updates a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_Patch.json                                                                                                     |
| [dnsResolversCreateOrUpdateSample.js][dnsresolverscreateorupdatesample]                               | Creates or updates a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_Put.json                                                                                                               |
| [dnsResolversDeleteSample.js][dnsresolversdeletesample]                                               | Deletes a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_Delete.json                                                                             |
| [dnsResolversGetSample.js][dnsresolversgetsample]                                                     | Gets properties of a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_Get.json                                                                                                               |
| [dnsResolversListByResourceGroupSample.js][dnsresolverslistbyresourcegroupsample]                     | Lists DNS resolvers within a resource group. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_ListByResourceGroup.json                                                                                     |
| [dnsResolversListByVirtualNetworkSample.js][dnsresolverslistbyvirtualnetworksample]                   | Lists DNS resolver resource IDs linked to a virtual network. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_ListByVirtualNetwork.json                                                                    |
| [dnsResolversListSample.js][dnsresolverslistsample]                                                   | Lists DNS resolvers in all resource groups of a subscription. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_ListBySubscription.json                                                                     |
| [dnsResolversUpdateSample.js][dnsresolversupdatesample]                                               | Updates a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_Patch.json                                                                                                                        |
| [forwardingRulesCreateOrUpdateSample.js][forwardingrulescreateorupdatesample]                         | Creates or updates a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/ForwardingRule_Put.json                                                                             |
| [forwardingRulesDeleteSample.js][forwardingrulesdeletesample]                                         | Deletes a forwarding rule in a DNS forwarding ruleset. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/ForwardingRule_Delete.json                                           |
| [forwardingRulesGetSample.js][forwardingrulesgetsample]                                               | Gets properties of a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/ForwardingRule_Get.json                                                                             |
| [forwardingRulesListSample.js][forwardingruleslistsample]                                             | Lists forwarding rules in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/ForwardingRule_List.json                                                                                          |
| [forwardingRulesUpdateSample.js][forwardingrulesupdatesample]                                         | Updates a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/ForwardingRule_Patch.json                                                                                      |
| [inboundEndpointsCreateOrUpdateSample.js][inboundendpointscreateorupdatesample]                       | Creates or updates an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/InboundEndpoint_Put.json                                                                                   |
| [inboundEndpointsDeleteSample.js][inboundendpointsdeletesample]                                       | Deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/InboundEndpoint_Delete.json                                                 |
| [inboundEndpointsGetSample.js][inboundendpointsgetsample]                                             | Gets properties of an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/InboundEndpoint_Get.json                                                                                   |
| [inboundEndpointsListSample.js][inboundendpointslistsample]                                           | Lists inbound endpoints for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/InboundEndpoint_List.json                                                                                                 |
| [inboundEndpointsUpdateSample.js][inboundendpointsupdatesample]                                       | Updates an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/InboundEndpoint_Patch.json                                                                                            |
| [outboundEndpointsCreateOrUpdateSample.js][outboundendpointscreateorupdatesample]                     | Creates or updates an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/OutboundEndpoint_Put.json                                                                                 |
| [outboundEndpointsDeleteSample.js][outboundendpointsdeletesample]                                     | Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/OutboundEndpoint_Delete.json                                               |
| [outboundEndpointsGetSample.js][outboundendpointsgetsample]                                           | Gets properties of an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/OutboundEndpoint_Get.json                                                                                 |
| [outboundEndpointsListSample.js][outboundendpointslistsample]                                         | Lists outbound endpoints for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/OutboundEndpoint_List.json                                                                                               |
| [outboundEndpointsUpdateSample.js][outboundendpointsupdatesample]                                     | Updates an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/OutboundEndpoint_Patch.json                                                                                          |
| [virtualNetworkLinksCreateOrUpdateSample.js][virtualnetworklinkscreateorupdatesample]                 | Creates or updates a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/VirtualNetworkLink_Put.json                                                                    |
| [virtualNetworkLinksDeleteSample.js][virtualnetworklinksdeletesample]                                 | Deletes a virtual network link to a DNS forwarding ruleset. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/VirtualNetworkLink_Delete.json                                  |
| [virtualNetworkLinksGetSample.js][virtualnetworklinksgetsample]                                       | Gets properties of a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/VirtualNetworkLink_Get.json                                                                    |
| [virtualNetworkLinksListSample.js][virtualnetworklinkslistsample]                                     | Lists virtual network links to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/VirtualNetworkLink_List.json                                                                                 |
| [virtualNetworkLinksUpdateSample.js][virtualnetworklinksupdatesample]                                 | Updates a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/VirtualNetworkLink_Patch.json                                                                             |

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
node dnsForwardingRulesetsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env DNSRESOLVER_SUBSCRIPTION_ID="<dnsresolver subscription id>" DNSRESOLVER_RESOURCE_GROUP="<dnsresolver resource group>" node dnsForwardingRulesetsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dnsforwardingrulesetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsForwardingRulesetsCreateOrUpdateSample.js
[dnsforwardingrulesetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsForwardingRulesetsDeleteSample.js
[dnsforwardingrulesetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsForwardingRulesetsGetSample.js
[dnsforwardingrulesetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsForwardingRulesetsListByResourceGroupSample.js
[dnsforwardingrulesetslistbyvirtualnetworksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsForwardingRulesetsListByVirtualNetworkSample.js
[dnsforwardingrulesetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsForwardingRulesetsListSample.js
[dnsforwardingrulesetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsForwardingRulesetsUpdateSample.js
[dnsresolverscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsResolversCreateOrUpdateSample.js
[dnsresolversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsResolversDeleteSample.js
[dnsresolversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsResolversGetSample.js
[dnsresolverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsResolversListByResourceGroupSample.js
[dnsresolverslistbyvirtualnetworksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsResolversListByVirtualNetworkSample.js
[dnsresolverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsResolversListSample.js
[dnsresolversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/dnsResolversUpdateSample.js
[forwardingrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/forwardingRulesCreateOrUpdateSample.js
[forwardingrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/forwardingRulesDeleteSample.js
[forwardingrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/forwardingRulesGetSample.js
[forwardingruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/forwardingRulesListSample.js
[forwardingrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/forwardingRulesUpdateSample.js
[inboundendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/inboundEndpointsCreateOrUpdateSample.js
[inboundendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/inboundEndpointsDeleteSample.js
[inboundendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/inboundEndpointsGetSample.js
[inboundendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/inboundEndpointsListSample.js
[inboundendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/inboundEndpointsUpdateSample.js
[outboundendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/outboundEndpointsCreateOrUpdateSample.js
[outboundendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/outboundEndpointsDeleteSample.js
[outboundendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/outboundEndpointsGetSample.js
[outboundendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/outboundEndpointsListSample.js
[outboundendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/outboundEndpointsUpdateSample.js
[virtualnetworklinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/virtualNetworkLinksCreateOrUpdateSample.js
[virtualnetworklinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/virtualNetworkLinksDeleteSample.js
[virtualnetworklinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/virtualNetworkLinksGetSample.js
[virtualnetworklinkslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/virtualNetworkLinksListSample.js
[virtualnetworklinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/javascript/virtualNetworkLinksUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-dnsresolver?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dnsresolver/arm-dnsresolver/README.md
