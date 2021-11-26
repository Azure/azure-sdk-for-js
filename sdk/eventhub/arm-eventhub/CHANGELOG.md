# Release History

## 5.0.0-beta.2 (2021-11-26)
    
**Features**

  - Added operation group SchemaRegistry
  - Added operation Namespaces.listNetworkRuleSet
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface NamespacesListNetworkRuleSetOptionalParams
  - Added Interface NetworkRuleSetListResult
  - Added Interface ProxyResource
  - Added Interface SchemaGroupListResult
  - Added Interface SchemaRegistryCreateOrUpdateOptionalParams
  - Added Interface SchemaRegistryDeleteOptionalParams
  - Added Interface SchemaRegistryGetOptionalParams
  - Added Interface SchemaRegistryListByNamespaceNextOptionalParams
  - Added Interface SchemaRegistryListByNamespaceOptionalParams
  - Added Type Alias KeyType_2
  - Added Type Alias NamespacesListNetworkRuleSetResponse
  - Added Type Alias SchemaCompatibility
  - Added Type Alias SchemaGroup
  - Added Type Alias SchemaRegistryCreateOrUpdateResponse
  - Added Type Alias SchemaRegistryGetResponse
  - Added Type Alias SchemaRegistryListByNamespaceNextResponse
  - Added Type Alias SchemaRegistryListByNamespaceResponse
  - Added Type Alias SchemaType
  - Interface Destination has a new optional parameter dataLakeAccountName
  - Interface Destination has a new optional parameter dataLakeFolderPath
  - Interface Destination has a new optional parameter dataLakeSubscriptionId
  - Interface ErrorResponse has a new optional parameter error
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface Operation has a new optional parameter properties
  - Interface OperationDisplay has a new optional parameter description
  - Class EventHubManagementClient has a new parameter $host
  - Class EventHubManagementClient has a new parameter apiVersion
  - Class EventHubManagementClient has a new parameter schemaRegistry
  - Class EventHubManagementClient has a new parameter subscriptionId
  - Add parameters of ProxyResource to TypeAlias ArmDisasterRecovery
  - Add parameters of ProxyResource to TypeAlias AuthorizationRule
  - Add parameters of ProxyResource to TypeAlias ConsumerGroup
  - Add parameters of ProxyResource to TypeAlias Eventhub
  - Add parameters of ProxyResource to TypeAlias NetworkRuleSet
  - Add parameters of ProxyResource to TypeAlias PrivateEndpointConnection
  - Type Alias EHNamespace has a new parameter alternateName
  - Added Enum KnownKeyType
  - Added Enum KnownSchemaCompatibility
  - Added Enum KnownSchemaType

**Breaking Changes**

  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter message
  - Delete parameters of Resource in TypeAlias ArmDisasterRecovery
  - Delete parameters of Resource in TypeAlias AuthorizationRule
  - Delete parameters of Resource in TypeAlias ConsumerGroup
  - Delete parameters of Resource in TypeAlias Eventhub
  - Delete parameters of Resource in TypeAlias NetworkRuleSet
  - Delete parameters of Resource in TypeAlias PrivateEndpointConnection

## 5.0.0-beta.1 (2021-10-09)

This is the first preview for the new version of the `@azure/arm-eventhub` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
