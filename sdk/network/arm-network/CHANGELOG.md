# Release History

## 30.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 30.0.0-beta.3 (2021-09-08)
    
**Features**

  - Added operation group ServiceTagInformationOperations
  - Added operation BastionHosts.beginUpdateTags
  - Added operation BastionHosts.beginUpdateTagsAndWait
  - Added Interface ApplicationGatewayGlobalConfiguration
  - Added Interface BastionHostsUpdateTagsOptionalParams
  - Added Interface ExplicitProxySettings
  - Added Interface FirewallPolicySQL
  - Added Interface PrivateEndpointIPConfiguration
  - Added Interface QosDefinition
  - Added Interface ServiceTagInformationListResult
  - Added Interface ServiceTagInformationOperationsListNextOptionalParams
  - Added Interface ServiceTagInformationOperationsListOptionalParams
  - Added Type Alias ApplicationGatewayLoadDistributionAlgorithm
  - Added Type Alias ApplicationGatewayLoadDistributionPolicy
  - Added Type Alias ApplicationGatewayLoadDistributionTarget
  - Added Type Alias BastionHostsUpdateTagsResponse
  - Added Type Alias ServiceTagInformationOperationsListNextResponse
  - Added Type Alias ServiceTagInformationOperationsListResponse
  - Interface ServiceTagInformation has a new optional parameter serviceTagChangeNumber
  - Interface VnetRoute has a new optional parameter bgpConnections
  - Class NetworkManagementClient has a new parameter serviceTagInformationOperations
  - Type Alias ApplicationGateway has a new parameter loadDistributionPolicies
  - Type Alias ApplicationGateway has a new parameter globalConfiguration
  - Type Alias ApplicationGatewayPathRule has a new parameter loadDistributionPolicy
  - Type Alias ApplicationGatewayRequestRoutingRule has a new parameter loadDistributionPolicy
  - Type Alias ApplicationGatewayUrlPathMap has a new parameter defaultLoadDistributionPolicy
  - Type Alias BastionHost has a new parameter scaleUnits
  - Type Alias BastionHost has a new parameter disableCopyPaste
  - Type Alias BastionHost has a new parameter enableFileCopy
  - Type Alias BastionHost has a new parameter enableIpConnect
  - Type Alias BastionHost has a new parameter enableShareableLink
  - Type Alias BastionHost has a new parameter enableTunneling
  - Type Alias BgpConnection has a new parameter hubVirtualNetworkConnection
  - Type Alias DscpConfiguration has a new parameter qosDefinitionCollection
  - Type Alias FirewallPolicy has a new parameter sql
  - Type Alias FirewallPolicy has a new parameter explicitProxySettings
  - Type Alias InboundNatRule has a new parameter frontendPortRangeStart
  - Type Alias InboundNatRule has a new parameter frontendPortRangeEnd
  - Type Alias InboundNatRule has a new parameter backendAddressPool
  - Type Alias NetworkVirtualAppliance has a new parameter sshPublicKey
  - Type Alias PrivateEndpoint has a new parameter applicationSecurityGroups
  - Type Alias PrivateEndpoint has a new parameter ipConfigurations
  - Type Alias PrivateEndpoint has a new parameter customNetworkInterfaceName
  - Type Alias ServiceEndpointPolicy has a new parameter serviceAlias
  - Type Alias ServiceEndpointPolicy has a new parameter contextualServiceEndpointPolicies
  - Type Alias ServiceEndpointPolicyDefinition has a new parameter type
  - Type Alias VirtualHub has a new parameter kind
  - Type Alias VpnGateway has a new parameter enableBgpRouteTranslationForNat
  - Added Enum KnownApplicationGatewayLoadDistributionAlgorithm
    
## 30.0.0-beta.2 (2021-09-06)

**Bug Fixes**

	- fix homepage issues

## 30.0.0-beta.1 (2021-07-15)

This is the first preview for the new version of the `@azure/arm-network` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
