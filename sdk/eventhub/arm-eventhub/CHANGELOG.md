## 30.0.0-beta.2 (2021-10-08)
    
**Features**

  - Added operation Clusters.listBySubscription
  - Added Interface ClustersListBySubscriptionNextOptionalParams
  - Added Interface ClustersListBySubscriptionOptionalParams
  - Added Interface SystemData
  - Added Interface UserAssignedIdentity
  - Added Interface UserAssignedIdentityProperties
  - Added Type Alias ClustersListBySubscriptionNextResponse
  - Added Type Alias ClustersListBySubscriptionResponse
  - Added Type Alias CreatedByType
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias PublicNetworkAccessFlag
  - Interface Encryption has a new optional parameter requireInfrastructureEncryption
  - Interface Identity has a new optional parameter userAssignedIdentities
  - Interface KeyVaultProperties has a new optional parameter identity
  - Type Alias ArmDisasterRecovery has a new parameter systemData
  - Type Alias AuthorizationRule has a new parameter systemData
  - Type Alias Cluster has a new parameter systemData
  - Type Alias ConsumerGroup has a new parameter systemData
  - Type Alias EHNamespace has a new parameter systemData
  - Type Alias EHNamespace has a new parameter privateEndpointConnections
  - Type Alias EHNamespace has a new parameter disableLocalAuth
  - Type Alias Eventhub has a new parameter systemData
  - Type Alias NetworkRuleSet has a new parameter systemData
  - Type Alias NetworkRuleSet has a new parameter publicNetworkAccess
  - Type Alias PrivateEndpointConnection has a new parameter systemData
  - Added Enum KnownCreatedByType
  - Added Enum KnownPublicNetworkAccessFlag
  - Enum KnownSkuName has a new value Premium
  - Enum KnownSkuTier has a new value Premium

**Breaking Changes**

  - Removed operation group Regions
  - Removed operation Namespaces.createOrUpdateIpFilterRule
  - Removed operation Namespaces.createOrUpdateVirtualNetworkRule
  - Removed operation Namespaces.deleteIpFilterRule
  - Removed operation Namespaces.deleteVirtualNetworkRule
  - Removed operation Namespaces.getIpFilterRule
  - Removed operation Namespaces.getVirtualNetworkRule
  - Removed operation Namespaces.listIPFilterRules
  - Removed operation Namespaces.listVirtualNetworkRules
  - Class EventHubManagementClient no longer has parameter regions
  - Removed Enum KnownIPAction
    
## 30.0.0-beta.1 (2021-09-07)

This is the first preview for the new version of the `@azure/arm-eventhub` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
