# Release History

## 10.0.0 (2026-06-25)

### Features Added
  - Added operation CalculateExchangeOperations.post
  - Added operation ExchangeOperations.post
  - Added operation QuotaOperations.createOrUpdate
  - Added operation QuotaOperations.update
  - Added operation ReservationOperations.availableScopes
  - Added operation ReservationOperations.merge
  - Added operation ReservationOperations.split
  - Added operation ReservationOperations.update
  - Added operation ReservationOrderOperations.purchase
  - Added operation ReturnOperations.post
  - Class AzureReservationAPI has a new constructor "constructor(credential: TokenCredential, options?: AzureReservationAPIOptionalParams);"
  - Class AzureReservationAPI has a new constructor "getCatalog(subscriptionId: string, options?: GetCatalogOptionalParams): PagedAsyncIterableIterator<Catalog>;"
  - Added Interface AppliedReservationsProperties
  - Added Interface MergeProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PatchProperties
  - Added Interface PurchaseRequestProperties
  - Added Interface ReservationOrderProperties
  - Added Interface RestorePollerOptions
  - Added Interface SavingsPlanPurchaseRequestProperties
  - Added Interface SimplePollerLike
  - Added Interface SplitProperties
  - Interface CurrentQuotaLimitBase has a new optional parameter systemData
  - Interface QuotaRequestDetails has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds

### Breaking Changes
  - Class AzureReservationAPI has a new signature
  - Removed Interface CreateGenericQuotaRequestParameters
  - Removed Interface CurrentQuotaLimit
  - Removed Interface OperationList
  - Removed Interface QuotaLimits
  - Removed Interface QuotaLimitsResponse
  - Removed Interface QuotaRequestDetailsList
  - Removed Interface QuotaRequestOneResourceSubmitResponse
  - Removed Interface QuotaRequestSubmitResponse
  - Removed Interface QuotaRequestSubmitResponse201
  - Removed Interface RefundResponse
  - Removed Interface ReservationList
  - Removed Interface ReservationOrderList
  - Removed Type Alias DisplayProvisioningState
  - Removed Type Alias Location_2
  - Removed Type Alias UserFriendlyAppliedScopeType
  - Removed Type Alias UserFriendlyRenewState
  - Removed Enum KnownDisplayProvisioningState
  - Removed Enum KnownLocation
  - Removed Enum KnownUserFriendlyAppliedScopeType
  - Removed Enum KnownUserFriendlyRenewState

