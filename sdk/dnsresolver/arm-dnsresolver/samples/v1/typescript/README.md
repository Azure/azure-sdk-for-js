# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dnsForwardingRulesetsCreateOrUpdateSample.ts][dnsforwardingrulesetscreateorupdatesample]             | Creates or updates a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_Put.json                                                                                            |
| [dnsForwardingRulesetsDeleteSample.ts][dnsforwardingrulesetsdeletesample]                             | Deletes a DNS forwarding ruleset. WARNING: This operation cannot be undone. All forwarding rules within the ruleset will be deleted. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_Delete.json |
| [dnsForwardingRulesetsGetSample.ts][dnsforwardingrulesetsgetsample]                                   | Gets a DNS forwarding ruleset properties. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_Get.json                                                                                               |
| [dnsForwardingRulesetsListByResourceGroupSample.ts][dnsforwardingrulesetslistbyresourcegroupsample]   | Lists DNS forwarding rulesets within a resource group. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_ListByResourceGroup.json                                                                  |
| [dnsForwardingRulesetsListByVirtualNetworkSample.ts][dnsforwardingrulesetslistbyvirtualnetworksample] | Lists DNS forwarding ruleset resource IDs attached to a virtual network. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_ListByVirtualNetwork.json                                               |
| [dnsForwardingRulesetsListSample.ts][dnsforwardingrulesetslistsample]                                 | Lists DNS forwarding rulesets in all resource groups of a subscription. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_ListBySubscription.json                                                  |
| [dnsForwardingRulesetsUpdateSample.ts][dnsforwardingrulesetsupdatesample]                             | Updates a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsForwardingRuleset_Patch.json                                                                                                     |
| [dnsResolversCreateOrUpdateSample.ts][dnsresolverscreateorupdatesample]                               | Creates or updates a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_Put.json                                                                                                               |
| [dnsResolversDeleteSample.ts][dnsresolversdeletesample]                                               | Deletes a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_Delete.json                                                                             |
| [dnsResolversGetSample.ts][dnsresolversgetsample]                                                     | Gets properties of a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_Get.json                                                                                                               |
| [dnsResolversListByResourceGroupSample.ts][dnsresolverslistbyresourcegroupsample]                     | Lists DNS resolvers within a resource group. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_ListByResourceGroup.json                                                                                     |
| [dnsResolversListByVirtualNetworkSample.ts][dnsresolverslistbyvirtualnetworksample]                   | Lists DNS resolver resource IDs linked to a virtual network. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_ListByVirtualNetwork.json                                                                    |
| [dnsResolversListSample.ts][dnsresolverslistsample]                                                   | Lists DNS resolvers in all resource groups of a subscription. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_ListBySubscription.json                                                                     |
| [dnsResolversUpdateSample.ts][dnsresolversupdatesample]                                               | Updates a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/DnsResolver_Patch.json                                                                                                                        |
| [forwardingRulesCreateOrUpdateSample.ts][forwardingrulescreateorupdatesample]                         | Creates or updates a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/ForwardingRule_Put.json                                                                             |
| [forwardingRulesDeleteSample.ts][forwardingrulesdeletesample]                                         | Deletes a forwarding rule in a DNS forwarding ruleset. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/ForwardingRule_Delete.json                                           |
| [forwardingRulesGetSample.ts][forwardingrulesgetsample]                                               | Gets properties of a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/ForwardingRule_Get.json                                                                             |
| [forwardingRulesListSample.ts][forwardingruleslistsample]                                             | Lists forwarding rules in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/ForwardingRule_List.json                                                                                          |
| [forwardingRulesUpdateSample.ts][forwardingrulesupdatesample]                                         | Updates a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/ForwardingRule_Patch.json                                                                                      |
| [inboundEndpointsCreateOrUpdateSample.ts][inboundendpointscreateorupdatesample]                       | Creates or updates an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/InboundEndpoint_Put.json                                                                                   |
| [inboundEndpointsDeleteSample.ts][inboundendpointsdeletesample]                                       | Deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/InboundEndpoint_Delete.json                                                 |
| [inboundEndpointsGetSample.ts][inboundendpointsgetsample]                                             | Gets properties of an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/InboundEndpoint_Get.json                                                                                   |
| [inboundEndpointsListSample.ts][inboundendpointslistsample]                                           | Lists inbound endpoints for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/InboundEndpoint_List.json                                                                                                 |
| [inboundEndpointsUpdateSample.ts][inboundendpointsupdatesample]                                       | Updates an inbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/InboundEndpoint_Patch.json                                                                                            |
| [outboundEndpointsCreateOrUpdateSample.ts][outboundendpointscreateorupdatesample]                     | Creates or updates an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/OutboundEndpoint_Put.json                                                                                 |
| [outboundEndpointsDeleteSample.ts][outboundendpointsdeletesample]                                     | Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/OutboundEndpoint_Delete.json                                               |
| [outboundEndpointsGetSample.ts][outboundendpointsgetsample]                                           | Gets properties of an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/OutboundEndpoint_Get.json                                                                                 |
| [outboundEndpointsListSample.ts][outboundendpointslistsample]                                         | Lists outbound endpoints for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/OutboundEndpoint_List.json                                                                                               |
| [outboundEndpointsUpdateSample.ts][outboundendpointsupdatesample]                                     | Updates an outbound endpoint for a DNS resolver. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/OutboundEndpoint_Patch.json                                                                                          |
| [virtualNetworkLinksCreateOrUpdateSample.ts][virtualnetworklinkscreateorupdatesample]                 | Creates or updates a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/VirtualNetworkLink_Put.json                                                                    |
| [virtualNetworkLinksDeleteSample.ts][virtualnetworklinksdeletesample]                                 | Deletes a virtual network link to a DNS forwarding ruleset. WARNING: This operation cannot be undone. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/VirtualNetworkLink_Delete.json                                  |
| [virtualNetworkLinksGetSample.ts][virtualnetworklinksgetsample]                                       | Gets properties of a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/VirtualNetworkLink_Get.json                                                                    |
| [virtualNetworkLinksListSample.ts][virtualnetworklinkslistsample]                                     | Lists virtual network links to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/VirtualNetworkLink_List.json                                                                                 |
| [virtualNetworkLinksUpdateSample.ts][virtualnetworklinksupdatesample]                                 | Updates a virtual network link to a DNS forwarding ruleset. x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2022-07-01/examples/VirtualNetworkLink_Patch.json                                                                             |

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
node dist/dnsForwardingRulesetsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env DNSRESOLVER_SUBSCRIPTION_ID="<dnsresolver subscription id>" DNSRESOLVER_RESOURCE_GROUP="<dnsresolver resource group>" node dist/dnsForwardingRulesetsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dnsforwardingrulesetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsForwardingRulesetsCreateOrUpdateSample.ts
[dnsforwardingrulesetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsForwardingRulesetsDeleteSample.ts
[dnsforwardingrulesetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsForwardingRulesetsGetSample.ts
[dnsforwardingrulesetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsForwardingRulesetsListByResourceGroupSample.ts
[dnsforwardingrulesetslistbyvirtualnetworksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsForwardingRulesetsListByVirtualNetworkSample.ts
[dnsforwardingrulesetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsForwardingRulesetsListSample.ts
[dnsforwardingrulesetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsForwardingRulesetsUpdateSample.ts
[dnsresolverscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsResolversCreateOrUpdateSample.ts
[dnsresolversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsResolversDeleteSample.ts
[dnsresolversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsResolversGetSample.ts
[dnsresolverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsResolversListByResourceGroupSample.ts
[dnsresolverslistbyvirtualnetworksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsResolversListByVirtualNetworkSample.ts
[dnsresolverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsResolversListSample.ts
[dnsresolversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/dnsResolversUpdateSample.ts
[forwardingrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/forwardingRulesCreateOrUpdateSample.ts
[forwardingrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/forwardingRulesDeleteSample.ts
[forwardingrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/forwardingRulesGetSample.ts
[forwardingruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/forwardingRulesListSample.ts
[forwardingrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/forwardingRulesUpdateSample.ts
[inboundendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/inboundEndpointsCreateOrUpdateSample.ts
[inboundendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/inboundEndpointsDeleteSample.ts
[inboundendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/inboundEndpointsGetSample.ts
[inboundendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/inboundEndpointsListSample.ts
[inboundendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/inboundEndpointsUpdateSample.ts
[outboundendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/outboundEndpointsCreateOrUpdateSample.ts
[outboundendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/outboundEndpointsDeleteSample.ts
[outboundendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/outboundEndpointsGetSample.ts
[outboundendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/outboundEndpointsListSample.ts
[outboundendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/outboundEndpointsUpdateSample.ts
[virtualnetworklinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/virtualNetworkLinksCreateOrUpdateSample.ts
[virtualnetworklinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/virtualNetworkLinksDeleteSample.ts
[virtualnetworklinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/virtualNetworkLinksGetSample.ts
[virtualnetworklinkslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/virtualNetworkLinksListSample.ts
[virtualnetworklinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v1/typescript/src/virtualNetworkLinksUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-dnsresolver?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dnsresolver/arm-dnsresolver/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
