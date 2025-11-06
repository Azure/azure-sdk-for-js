# @azure/arm-dnsresolver client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-dnsresolver in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [dnsForwardingRulesetsCreateOrUpdateSample.js][dnsforwardingrulesetscreateorupdatesample]                               | creates or updates a DNS forwarding ruleset. x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_Put.json                                                                                            |
| [dnsForwardingRulesetsDeleteSample.js][dnsforwardingrulesetsdeletesample]                                               | deletes a DNS forwarding ruleset. WARNING: This operation cannot be undone. All forwarding rules within the ruleset will be deleted. x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_Delete.json |
| [dnsForwardingRulesetsGetSample.js][dnsforwardingrulesetsgetsample]                                                     | gets a DNS forwarding ruleset properties. x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_Get.json                                                                                               |
| [dnsForwardingRulesetsListByResourceGroupSample.js][dnsforwardingrulesetslistbyresourcegroupsample]                     | lists DNS forwarding rulesets within a resource group. x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_ListByResourceGroup.json                                                                  |
| [dnsForwardingRulesetsListByVirtualNetworkSample.js][dnsforwardingrulesetslistbyvirtualnetworksample]                   | lists DNS forwarding ruleset resource IDs attached to a virtual network. x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_ListByVirtualNetwork.json                                               |
| [dnsForwardingRulesetsListSample.js][dnsforwardingrulesetslistsample]                                                   | lists DNS forwarding rulesets in all resource groups of a subscription. x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_ListBySubscription.json                                                  |
| [dnsForwardingRulesetsUpdateSample.js][dnsforwardingrulesetsupdatesample]                                               | updates a DNS forwarding ruleset. x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_Patch.json                                                                                                     |
| [dnsResolverDomainListsBulkSample.js][dnsresolverdomainlistsbulksample]                                                 | uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link. x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_BulkDownload.json                                  |
| [dnsResolverDomainListsCreateOrUpdateSample.js][dnsresolverdomainlistscreateorupdatesample]                             | creates or updates a DNS resolver domain list. x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_BulkDomains_Put.json                                                                             |
| [dnsResolverDomainListsDeleteSample.js][dnsresolverdomainlistsdeletesample]                                             | deletes a DNS resolver domain list. WARNING: This operation cannot be undone. x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_Delete.json                                                       |
| [dnsResolverDomainListsGetSample.js][dnsresolverdomainlistsgetsample]                                                   | gets properties of a DNS resolver domain list. x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_BulkDomains_Get.json                                                                             |
| [dnsResolverDomainListsListByResourceGroupSample.js][dnsresolverdomainlistslistbyresourcegroupsample]                   | lists DNS resolver domain lists within a resource group. x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_ListByResourceGroup.json                                                               |
| [dnsResolverDomainListsListSample.js][dnsresolverdomainlistslistsample]                                                 | lists DNS resolver domain lists in all resource groups of a subscription. x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_ListBySubscription.json                                               |
| [dnsResolverDomainListsUpdateSample.js][dnsresolverdomainlistsupdatesample]                                             | updates a DNS resolver domain list. x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_Patch.json                                                                                                  |
| [dnsResolverPoliciesCreateOrUpdateSample.js][dnsresolverpoliciescreateorupdatesample]                                   | creates or updates a DNS resolver policy. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicy_Put.json                                                                                                  |
| [dnsResolverPoliciesDeleteSample.js][dnsresolverpoliciesdeletesample]                                                   | deletes a DNS resolver policy. WARNING: This operation cannot be undone. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicy_Delete.json                                                                |
| [dnsResolverPoliciesGetSample.js][dnsresolverpoliciesgetsample]                                                         | gets properties of a DNS resolver policy. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicy_Get.json                                                                                                  |
| [dnsResolverPoliciesListByResourceGroupSample.js][dnsresolverpolicieslistbyresourcegroupsample]                         | lists DNS resolver policies within a resource group. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicy_ListByResourceGroup.json                                                                       |
| [dnsResolverPoliciesListByVirtualNetworkSample.js][dnsresolverpolicieslistbyvirtualnetworksample]                       | lists DNS resolver policy resource IDs linked to a virtual network. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicy_ListByVirtualNetwork.json                                                       |
| [dnsResolverPoliciesListSample.js][dnsresolverpolicieslistsample]                                                       | lists DNS resolver policies in all resource groups of a subscription. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicy_ListBySubscription.json                                                       |
| [dnsResolverPoliciesUpdateSample.js][dnsresolverpoliciesupdatesample]                                                   | updates a DNS resolver policy. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicy_Patch.json                                                                                                           |
| [dnsResolverPolicyVirtualNetworkLinksCreateOrUpdateSample.js][dnsresolverpolicyvirtualnetworklinkscreateorupdatesample] | creates or updates a DNS resolver policy virtual network link. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicyVirtualNetworkLink_Put.json                                                           |
| [dnsResolverPolicyVirtualNetworkLinksDeleteSample.js][dnsresolverpolicyvirtualnetworklinksdeletesample]                 | deletes a DNS resolver policy virtual network link. WARNING: This operation cannot be undone. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicyVirtualNetworkLink_Delete.json                         |
| [dnsResolverPolicyVirtualNetworkLinksGetSample.js][dnsresolverpolicyvirtualnetworklinksgetsample]                       | gets properties of a DNS resolver policy virtual network link. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicyVirtualNetworkLink_Get.json                                                           |
| [dnsResolverPolicyVirtualNetworkLinksListSample.js][dnsresolverpolicyvirtualnetworklinkslistsample]                     | lists DNS resolver policy virtual network links. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicyVirtualNetworkLink_List.json                                                                        |
| [dnsResolverPolicyVirtualNetworkLinksUpdateSample.js][dnsresolverpolicyvirtualnetworklinksupdatesample]                 | updates a DNS resolver policy virtual network link. x-ms-original-file: 2025-10-01-preview/DnsResolverPolicyVirtualNetworkLink_Patch.json                                                                    |
| [dnsResolversCreateOrUpdateSample.js][dnsresolverscreateorupdatesample]                                                 | creates or updates a DNS resolver. x-ms-original-file: 2025-10-01-preview/DnsResolver_Put.json                                                                                                               |
| [dnsResolversDeleteSample.js][dnsresolversdeletesample]                                                                 | deletes a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: 2025-10-01-preview/DnsResolver_Delete.json                                                                             |
| [dnsResolversGetSample.js][dnsresolversgetsample]                                                                       | gets properties of a DNS resolver. x-ms-original-file: 2025-10-01-preview/DnsResolver_Get.json                                                                                                               |
| [dnsResolversListByResourceGroupSample.js][dnsresolverslistbyresourcegroupsample]                                       | lists DNS resolvers within a resource group. x-ms-original-file: 2025-10-01-preview/DnsResolver_ListByResourceGroup.json                                                                                     |
| [dnsResolversListByVirtualNetworkSample.js][dnsresolverslistbyvirtualnetworksample]                                     | lists DNS resolver resource IDs linked to a virtual network. x-ms-original-file: 2025-10-01-preview/DnsResolver_ListByVirtualNetwork.json                                                                    |
| [dnsResolversListSample.js][dnsresolverslistsample]                                                                     | lists DNS resolvers in all resource groups of a subscription. x-ms-original-file: 2025-10-01-preview/DnsResolver_ListBySubscription.json                                                                     |
| [dnsResolversUpdateSample.js][dnsresolversupdatesample]                                                                 | updates a DNS resolver. x-ms-original-file: 2025-10-01-preview/DnsResolver_Patch.json                                                                                                                        |
| [dnsSecurityRulesCreateOrUpdateSample.js][dnssecurityrulescreateorupdatesample]                                         | creates or updates a DNS security rule for a DNS resolver policy. x-ms-original-file: 2025-10-01-preview/DnsSecurityRule_ManagedDomainList_Put.json                                                          |
| [dnsSecurityRulesDeleteSample.js][dnssecurityrulesdeletesample]                                                         | deletes a DNS security rule for a DNS resolver policy. WARNING: This operation cannot be undone. x-ms-original-file: 2025-10-01-preview/DnsSecurityRule_Delete.json                                          |
| [dnsSecurityRulesGetSample.js][dnssecurityrulesgetsample]                                                               | gets properties of a DNS security rule for a DNS resolver policy. x-ms-original-file: 2025-10-01-preview/DnsSecurityRule_Get.json                                                                            |
| [dnsSecurityRulesListSample.js][dnssecurityruleslistsample]                                                             | lists DNS security rules for a DNS resolver policy. x-ms-original-file: 2025-10-01-preview/DnsSecurityRule_List.json                                                                                         |
| [dnsSecurityRulesUpdateSample.js][dnssecurityrulesupdatesample]                                                         | updates a DNS security rule. x-ms-original-file: 2025-10-01-preview/DnsSecurityRule_Patch.json                                                                                                               |
| [forwardingRulesCreateOrUpdateSample.js][forwardingrulescreateorupdatesample]                                           | creates or updates a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: 2025-10-01-preview/ForwardingRule_Put.json                                                                             |
| [forwardingRulesDeleteSample.js][forwardingrulesdeletesample]                                                           | deletes a forwarding rule in a DNS forwarding ruleset. WARNING: This operation cannot be undone. x-ms-original-file: 2025-10-01-preview/ForwardingRule_Delete.json                                           |
| [forwardingRulesGetSample.js][forwardingrulesgetsample]                                                                 | gets properties of a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: 2025-10-01-preview/ForwardingRule_Get.json                                                                             |
| [forwardingRulesListSample.js][forwardingruleslistsample]                                                               | lists forwarding rules in a DNS forwarding ruleset. x-ms-original-file: 2025-10-01-preview/ForwardingRule_List.json                                                                                          |
| [forwardingRulesUpdateSample.js][forwardingrulesupdatesample]                                                           | updates a forwarding rule in a DNS forwarding ruleset. x-ms-original-file: 2025-10-01-preview/ForwardingRule_Patch.json                                                                                      |
| [inboundEndpointsCreateOrUpdateSample.js][inboundendpointscreateorupdatesample]                                         | creates or updates an inbound endpoint for a DNS resolver. x-ms-original-file: 2025-10-01-preview/InboundEndpoint_Put.json                                                                                   |
| [inboundEndpointsDeleteSample.js][inboundendpointsdeletesample]                                                         | deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: 2025-10-01-preview/InboundEndpoint_Delete.json                                                 |
| [inboundEndpointsGetSample.js][inboundendpointsgetsample]                                                               | gets properties of an inbound endpoint for a DNS resolver. x-ms-original-file: 2025-10-01-preview/InboundEndpoint_Get.json                                                                                   |
| [inboundEndpointsListSample.js][inboundendpointslistsample]                                                             | lists inbound endpoints for a DNS resolver. x-ms-original-file: 2025-10-01-preview/InboundEndpoint_List.json                                                                                                 |
| [inboundEndpointsUpdateSample.js][inboundendpointsupdatesample]                                                         | updates an inbound endpoint for a DNS resolver. x-ms-original-file: 2025-10-01-preview/InboundEndpoint_Patch.json                                                                                            |
| [outboundEndpointsCreateOrUpdateSample.js][outboundendpointscreateorupdatesample]                                       | creates or updates an outbound endpoint for a DNS resolver. x-ms-original-file: 2025-10-01-preview/OutboundEndpoint_Put.json                                                                                 |
| [outboundEndpointsDeleteSample.js][outboundendpointsdeletesample]                                                       | deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. x-ms-original-file: 2025-10-01-preview/OutboundEndpoint_Delete.json                                               |
| [outboundEndpointsGetSample.js][outboundendpointsgetsample]                                                             | gets properties of an outbound endpoint for a DNS resolver. x-ms-original-file: 2025-10-01-preview/OutboundEndpoint_Get.json                                                                                 |
| [outboundEndpointsListSample.js][outboundendpointslistsample]                                                           | lists outbound endpoints for a DNS resolver. x-ms-original-file: 2025-10-01-preview/OutboundEndpoint_List.json                                                                                               |
| [outboundEndpointsUpdateSample.js][outboundendpointsupdatesample]                                                       | updates an outbound endpoint for a DNS resolver. x-ms-original-file: 2025-10-01-preview/OutboundEndpoint_Patch.json                                                                                          |
| [virtualNetworkLinksCreateOrUpdateSample.js][virtualnetworklinkscreateorupdatesample]                                   | creates or updates a virtual network link to a DNS forwarding ruleset. x-ms-original-file: 2025-10-01-preview/VirtualNetworkLink_Put.json                                                                    |
| [virtualNetworkLinksDeleteSample.js][virtualnetworklinksdeletesample]                                                   | deletes a virtual network link to a DNS forwarding ruleset. WARNING: This operation cannot be undone. x-ms-original-file: 2025-10-01-preview/VirtualNetworkLink_Delete.json                                  |
| [virtualNetworkLinksGetSample.js][virtualnetworklinksgetsample]                                                         | gets properties of a virtual network link to a DNS forwarding ruleset. x-ms-original-file: 2025-10-01-preview/VirtualNetworkLink_Get.json                                                                    |
| [virtualNetworkLinksListSample.js][virtualnetworklinkslistsample]                                                       | lists virtual network links to a DNS forwarding ruleset. x-ms-original-file: 2025-10-01-preview/VirtualNetworkLink_List.json                                                                                 |
| [virtualNetworkLinksUpdateSample.js][virtualnetworklinksupdatesample]                                                   | updates a virtual network link to a DNS forwarding ruleset. x-ms-original-file: 2025-10-01-preview/VirtualNetworkLink_Patch.json                                                                             |

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
node dnsForwardingRulesetsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dnsforwardingrulesetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsForwardingRulesetsCreateOrUpdateSample.js
[dnsforwardingrulesetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsForwardingRulesetsDeleteSample.js
[dnsforwardingrulesetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsForwardingRulesetsGetSample.js
[dnsforwardingrulesetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsForwardingRulesetsListByResourceGroupSample.js
[dnsforwardingrulesetslistbyvirtualnetworksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsForwardingRulesetsListByVirtualNetworkSample.js
[dnsforwardingrulesetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsForwardingRulesetsListSample.js
[dnsforwardingrulesetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsForwardingRulesetsUpdateSample.js
[dnsresolverdomainlistsbulksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverDomainListsBulkSample.js
[dnsresolverdomainlistscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverDomainListsCreateOrUpdateSample.js
[dnsresolverdomainlistsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverDomainListsDeleteSample.js
[dnsresolverdomainlistsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverDomainListsGetSample.js
[dnsresolverdomainlistslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverDomainListsListByResourceGroupSample.js
[dnsresolverdomainlistslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverDomainListsListSample.js
[dnsresolverdomainlistsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverDomainListsUpdateSample.js
[dnsresolverpoliciescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPoliciesCreateOrUpdateSample.js
[dnsresolverpoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPoliciesDeleteSample.js
[dnsresolverpoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPoliciesGetSample.js
[dnsresolverpolicieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPoliciesListByResourceGroupSample.js
[dnsresolverpolicieslistbyvirtualnetworksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPoliciesListByVirtualNetworkSample.js
[dnsresolverpolicieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPoliciesListSample.js
[dnsresolverpoliciesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPoliciesUpdateSample.js
[dnsresolverpolicyvirtualnetworklinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPolicyVirtualNetworkLinksCreateOrUpdateSample.js
[dnsresolverpolicyvirtualnetworklinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPolicyVirtualNetworkLinksDeleteSample.js
[dnsresolverpolicyvirtualnetworklinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPolicyVirtualNetworkLinksGetSample.js
[dnsresolverpolicyvirtualnetworklinkslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPolicyVirtualNetworkLinksListSample.js
[dnsresolverpolicyvirtualnetworklinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolverPolicyVirtualNetworkLinksUpdateSample.js
[dnsresolverscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolversCreateOrUpdateSample.js
[dnsresolversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolversDeleteSample.js
[dnsresolversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolversGetSample.js
[dnsresolverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolversListByResourceGroupSample.js
[dnsresolverslistbyvirtualnetworksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolversListByVirtualNetworkSample.js
[dnsresolverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolversListSample.js
[dnsresolversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsResolversUpdateSample.js
[dnssecurityrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsSecurityRulesCreateOrUpdateSample.js
[dnssecurityrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsSecurityRulesDeleteSample.js
[dnssecurityrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsSecurityRulesGetSample.js
[dnssecurityruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsSecurityRulesListSample.js
[dnssecurityrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/dnsSecurityRulesUpdateSample.js
[forwardingrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/forwardingRulesCreateOrUpdateSample.js
[forwardingrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/forwardingRulesDeleteSample.js
[forwardingrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/forwardingRulesGetSample.js
[forwardingruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/forwardingRulesListSample.js
[forwardingrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/forwardingRulesUpdateSample.js
[inboundendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/inboundEndpointsCreateOrUpdateSample.js
[inboundendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/inboundEndpointsDeleteSample.js
[inboundendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/inboundEndpointsGetSample.js
[inboundendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/inboundEndpointsListSample.js
[inboundendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/inboundEndpointsUpdateSample.js
[outboundendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/outboundEndpointsCreateOrUpdateSample.js
[outboundendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/outboundEndpointsDeleteSample.js
[outboundendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/outboundEndpointsGetSample.js
[outboundendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/outboundEndpointsListSample.js
[outboundendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/outboundEndpointsUpdateSample.js
[virtualnetworklinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/virtualNetworkLinksCreateOrUpdateSample.js
[virtualnetworklinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/virtualNetworkLinksDeleteSample.js
[virtualnetworklinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/virtualNetworkLinksGetSample.js
[virtualnetworklinkslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/virtualNetworkLinksListSample.js
[virtualnetworklinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dnsresolver/arm-dnsresolver/samples/v2-beta/javascript/virtualNetworkLinksUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-dnsresolver?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dnsresolver/arm-dnsresolver/README.md
