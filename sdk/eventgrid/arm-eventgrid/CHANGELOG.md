## Release History

### 13.0.0-beta.2 (Unreleased)

#### Features Added

#### Breaking Changes

#### Bugs Fixed

#### Other Changes

### 13.0.0-beta.1 (2021-11-16)
    
**Features**

  - Added Type Alias Enum18
  - Added Type Alias Enum19
  - Added Type Alias Enum20
  - Added Type Alias Enum21
  - Type Alias ExtensionTopic has a new parameter systemData
  - Added Enum KnownEnum18
  - Added Enum KnownEnum19
  - Added Enum KnownEnum20
  - Added Enum KnownEnum21

**Breaking Changes**

  - Removed operation group EventChannels
  - Removed operation group PartnerNamespaces
  - Removed operation group PartnerRegistrations
  - Removed operation group PartnerTopicEventSubscriptions
  - Removed operation group PartnerTopics
  - Operation PrivateEndpointConnections.beginDelete has a new signature
  - Operation PrivateEndpointConnections.beginDeleteAndWait has a new signature
  - Operation PrivateEndpointConnections.beginUpdate has a new signature
  - Operation PrivateEndpointConnections.beginUpdateAndWait has a new signature
  - Operation PrivateEndpointConnections.get has a new signature
  - Operation PrivateEndpointConnections.listByResource has a new signature
  - Interface DomainUpdateParameters no longer has parameter sku
  - Interface Operation no longer has parameter isDataAction
  - Interface TopicUpdateParameters no longer has parameter sku
  - Class EventGridManagementClient no longer has parameter eventChannels
  - Class EventGridManagementClient no longer has parameter partnerNamespaces
  - Class EventGridManagementClient no longer has parameter partnerRegistrations
  - Class EventGridManagementClient no longer has parameter partnerTopicEventSubscriptions
  - Class EventGridManagementClient no longer has parameter partnerTopics
  - Type Alias Domain no longer has parameter sku
  - Type Alias Topic no longer has parameter sku
  - Type Alias Topic no longer has parameter kind
  - Type Alias Topic no longer has parameter extendedLocation
  - Removed Enum KnownEnum25
  - Removed Enum KnownEnum26
  - Removed Enum KnownEnum27
  - Removed Enum KnownEnum28
  - Removed Enum KnownEventChannelProvisioningState
  - Removed Enum KnownPartnerNamespaceProvisioningState
  - Removed Enum KnownPartnerRegistrationProvisioningState
  - Removed Enum KnownPartnerRegistrationVisibilityState
  - Removed Enum KnownPartnerTopicActivationState
  - Removed Enum KnownPartnerTopicProvisioningState
  - Removed Enum KnownPartnerTopicReadinessState
  - Removed Enum KnownResourceKind
  - Removed Enum KnownSku
  - Enum KnownAdvancedFilterOperatorType no longer has value IsNotNull
  - Enum KnownAdvancedFilterOperatorType no longer has value IsNullOrUndefined
  - Enum KnownAdvancedFilterOperatorType no longer has value NumberInRange
  - Enum KnownAdvancedFilterOperatorType no longer has value NumberNotInRange
  - Enum KnownAdvancedFilterOperatorType no longer has value StringNotBeginsWith
  - Enum KnownAdvancedFilterOperatorType no longer has value StringNotContains
  - Enum KnownAdvancedFilterOperatorType no longer has value StringNotEndsWith
    
# Release History

### 12.0.0-beta.1 (2021-10-09)

This is the first preview for the new version of the `@azure/arm-eventgrid` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
