# Release History
    
## 8.0.0 (2023-02-01)
    
**Features**

  - Added operation Return.beginPost
  - Added operation Return.beginPostAndWait
  - Added Interface AppliedScopeProperties
  - Added Interface CatalogsResult
  - Added Interface Commitment
  - Added Interface GetCatalogNextOptionalParams
  - Added Interface ProxyResource
  - Added Interface ReservationMergeHeaders
  - Added Interface ReservationOrderPurchaseHeaders
  - Added Interface ReservationSplitHeaders
  - Added Interface ReservationSwapProperties
  - Added Interface ReservationUpdateHeaders
  - Added Interface Resource
  - Added Interface SavingsPlanPurchaseRequest
  - Added Interface SavingsPlanToPurchaseCalculateExchange
  - Added Interface SavingsPlanToPurchaseExchange
  - Added Type Alias BillingPlan
  - Added Type Alias CommitmentGrain
  - Added Type Alias GetCatalogNextResponse
  - Added Type Alias SavingsPlanTerm
  - Interface CalculateExchangeRequestProperties has a new optional parameter savingsPlansToPurchase
  - Interface CalculateExchangeResponseProperties has a new optional parameter savingsPlansToPurchase
  - Interface ExchangeResponseProperties has a new optional parameter savingsPlansToPurchase
  - Interface GetCatalogOptionalParams has a new optional parameter filter
  - Interface GetCatalogOptionalParams has a new optional parameter skip
  - Interface GetCatalogOptionalParams has a new optional parameter take
  - Interface Patch has a new optional parameter appliedScopeProperties
  - Interface Patch has a new optional parameter reviewDateTime
  - Interface PurchaseRequest has a new optional parameter appliedScopeProperties
  - Interface PurchaseRequest has a new optional parameter reviewDateTime
  - Interface ReservationOrderResponse has a new optional parameter expiryDateTime
  - Interface ReservationOrderResponse has a new optional parameter reviewDateTime
  - Interface ReservationsProperties has a new optional parameter appliedScopeProperties
  - Interface ReservationsProperties has a new optional parameter expiryDateTime
  - Interface ReservationsProperties has a new optional parameter purchaseDateTime
  - Interface ReservationsProperties has a new optional parameter reviewDateTime
  - Interface ReservationsProperties has a new optional parameter swapProperties
  - Interface ReservationSummary has a new optional parameter noBenefitCount
  - Interface ReservationSummary has a new optional parameter warningCount
  - Interface ReturnPostOptionalParams has a new optional parameter resumeFrom
  - Interface ReturnPostOptionalParams has a new optional parameter updateIntervalInMs
  - Added Enum KnownBillingPlan
  - Added Enum KnownCommitmentGrain
  - Added Enum KnownSavingsPlanTerm
  - Enum KnownAppliedScopeType has a new value ManagementGroup
  - Enum KnownDisplayProvisioningState has a new value NoBenefit
  - Enum KnownDisplayProvisioningState has a new value Warning
  - Added function getContinuationToken
  - Interface QuotaRequestStatusListNextOptionalParams no longer has parameter filter
  - Interface QuotaRequestStatusListNextOptionalParams no longer has parameter skiptoken
  - Interface QuotaRequestStatusListNextOptionalParams no longer has parameter top
  - Interface ReservationListAllNextOptionalParams no longer has parameter filter
  - Interface ReservationListAllNextOptionalParams no longer has parameter orderby
  - Interface ReservationListAllNextOptionalParams no longer has parameter refreshSummary
  - Interface ReservationListAllNextOptionalParams no longer has parameter selectedState
  - Interface ReservationListAllNextOptionalParams no longer has parameter skiptoken
  - Interface ReservationListAllNextOptionalParams no longer has parameter take
  - Interface ReservationResponse no longer has parameter id
  - Interface ReservationResponse no longer has parameter name
  - Interface ReservationResponse no longer has parameter systemData
  - Interface ReservationResponse no longer has parameter type

**Breaking Changes**

  - Removed operation Return.post
  - Operation Reservation.listRevisions has a new signature
  - Operation Reservation.get has a new signature
  
    
## 7.2.0 (2022-09-19)
    
**Features**

  - Added operation group CalculateRefund
  - Added operation group Return
  - Added operation Reservation.archive
  - Added operation Reservation.unarchive
  - Added Interface CalculateRefundPostOptionalParams
  - Added Interface CalculateRefundRequest
  - Added Interface CalculateRefundRequestProperties
  - Added Interface CalculateRefundResponse
  - Added Interface RefundBillingInformation
  - Added Interface RefundPolicyError
  - Added Interface RefundPolicyResult
  - Added Interface RefundPolicyResultProperty
  - Added Interface RefundRequest
  - Added Interface RefundRequestProperties
  - Added Interface RefundResponse
  - Added Interface RefundResponseProperties
  - Added Interface ReservationArchiveOptionalParams
  - Added Interface ReservationUnarchiveOptionalParams
  - Added Interface ReturnPostHeaders
  - Added Interface ReturnPostOptionalParams
  - Added Type Alias CalculateRefundPostResponse
  - Added Type Alias ReturnPostResponse
  - Class AzureReservationAPI has a new parameter calculateRefund
  - Class AzureReservationAPI has a new parameter return
  - Enum KnownErrorResponseCode has a new value RefundLimitExceeded
  - Enum KnownErrorResponseCode has a new value SelfServiceRefundNotSupported
    
    
## 7.1.0 (2022-04-20)
    
**Features**

  - Interface CurrentQuotaLimit has a new optional parameter id
  - Interface CurrentQuotaLimit has a new optional parameter name
  - Interface CurrentQuotaLimit has a new optional parameter type
  - Interface CurrentQuotaLimitBase has a new optional parameter id
  - Interface CurrentQuotaLimitBase has a new optional parameter name
  - Interface CurrentQuotaLimitBase has a new optional parameter type
  - Interface GetCatalogOptionalParams has a new optional parameter offerId
  - Interface GetCatalogOptionalParams has a new optional parameter planId
  - Interface GetCatalogOptionalParams has a new optional parameter publisherId
  - Interface QuotaRequestOneResourceSubmitResponse has a new optional parameter idPropertiesId
  - Interface QuotaRequestOneResourceSubmitResponse has a new optional parameter namePropertiesName
  - Interface QuotaRequestOneResourceSubmitResponse has a new optional parameter typePropertiesType
  - Interface ReservationOrderResponse has a new optional parameter benefitStartTime
  - Interface ReservationsProperties has a new optional parameter benefitStartTime
  - Interface ReservationSummary has a new optional parameter processingCount
  - Enum KnownDisplayProvisioningState has a new value Processing
  - Enum KnownReservationStatusCode has a new value Processing
  - Enum KnownReservedResourceType has a new value VirtualMachineSoftware
    
    
## 7.0.0 (2022-01-21)

The package of @azure/arm-reservations is using our next generation design principles since version 7.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
