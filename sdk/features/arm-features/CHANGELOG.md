# Release History

## 30.0.0-beta.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 30.0.0-beta.4 (2021-09-07)

**Bug Fixes**

	- readme samples update

## 30.0.0-beta.3 (2021-07-27)

**Features**

	- Added operation group SubscriptionFeatureRegistrations
	- Added Interface AuthorizationProfile
	- Added Interface ErrorDefinition
	- Added Interface ErrorResponse
	- Added Interface ProxyResource
	- Added Interface SubscriptionFeatureRegistrationList
	- Added Interface SubscriptionFeatureRegistrationProperties
	- Added Interface SubscriptionFeatureRegistrationsCreateOrUpdateOptionalParams
	- Added Interface SubscriptionFeatureRegistrationsDeleteOptionalParams
	- Added Interface SubscriptionFeatureRegistrationsGetOptionalParams
	- Added Interface SubscriptionFeatureRegistrationsListAllBySubscriptionNextOptionalParams
	- Added Interface SubscriptionFeatureRegistrationsListAllBySubscriptionOptionalParams
	- Added Interface SubscriptionFeatureRegistrationsListBySubscriptionNextOptionalParams
	- Added Interface SubscriptionFeatureRegistrationsListBySubscriptionOptionalParams
	- Added Type Alias SubscriptionFeatureRegistration
	- Added Type Alias SubscriptionFeatureRegistrationApprovalType
	- Added Type Alias SubscriptionFeatureRegistrationsCreateOrUpdateResponse
	- Added Type Alias SubscriptionFeatureRegistrationsGetResponse
	- Added Type Alias SubscriptionFeatureRegistrationsListAllBySubscriptionNextResponse
	- Added Type Alias SubscriptionFeatureRegistrationsListAllBySubscriptionResponse
	- Added Type Alias SubscriptionFeatureRegistrationsListBySubscriptionNextResponse
	- Added Type Alias SubscriptionFeatureRegistrationsListBySubscriptionResponse
	- Added Type Alias SubscriptionFeatureRegistrationState
	- Added Enum KnownSubscriptionFeatureRegistrationApprovalType
	- Added Enum KnownSubscriptionFeatureRegistrationState

**Breaking Changes**

	- Removed operation Features.listAllNext
	- Removed operation Features.listNext
	- Class FeatureClient has a new required parameter subscriptionFeatureRegistrations

## 30.0.0-beta.2 (2021-07-16)

This is the first preview for the new version of the `@azure/arm-features` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
